import { ItemData, type ItemName } from "../data/items";
import type { IngredientNode,  RecipePath, RecipeTotals } from "../types";


export function buildRecipeTree(
  itemName: ItemName,
  quantity: number,
  visited: Set<string> = new Set(),
  preferredRecipeIndexMap: Record<ItemName, number> = {}
): IngredientNode {
  if (visited.has(itemName)) {
    return {
      itemName,
      quantity,
      recipePathOptions: undefined,
    };
  }

  visited.add(itemName);
  const recipes = ItemData[itemName];
  const recipePathOptions: RecipePath[] = recipes.map(recipe => {
    const ingredients: IngredientNode[] = recipe.ingredients.map(ingredient => {
      const totalQty = ingredient.quantity * quantity;

      if (ItemData[ingredient.itemName as ItemName]) {
        return buildRecipeTree(
          ingredient.itemName as ItemName,
          totalQty,
          new Set(visited),
          preferredRecipeIndexMap
        );
      } else {
        return {
          itemName: ingredient.itemName,
          quantity: totalQty,
        };
      }
    });

    return {
      recipe,
      ingredients,
    };
  });

  return {
    itemName,
    quantity,
    recipePathOptions,
  };
}

export function computeTotalsFromTree(
  tree: IngredientNode,
  recipeSelectionMap: Record<string, number> = {}
): RecipeTotals {
  const totals: RecipeTotals = {
    rawMaterials: {},
    totalEffort: 0,
    totalTime: 0,
  };

  // Temporarily hold time-based crafts per structure
  const passiveCrafts: Record<string, number[]> = {};

  function walk(node: IngredientNode) {
    const options = node.recipePathOptions;

    if (!options || options.length === 0) {
      // Raw material
      totals.rawMaterials[node.itemName] ??= 0;
      totals.rawMaterials[node.itemName] += node.quantity;
      return;
    }

    const selectedIndex = recipeSelectionMap[node.itemName] ?? 0;
    const selectedPath = options[selectedIndex];
    const recipe = selectedPath.recipe;

    // Add effort directly
    if (recipe.effort) {
      totals.totalEffort += recipe.effort;
    }

    // Handle passive crafting time
    if (recipe.timeInSeconds && recipe.station) {
      const outputCount =
        typeof recipe.output === "number"
          ? recipe.output
          : (recipe.output.min + recipe.output.max) / 2;

      const timesToRun = Math.ceil(node.quantity / outputCount);

      const list = passiveCrafts[recipe.station] ?? [];
      for (let i = 0; i < timesToRun; i++) {
        list.push(recipe.timeInSeconds);
      }
      passiveCrafts[recipe.station] = list;
    }

    // Recurse
    for (const ingredientNode of selectedPath.ingredients) {
      walk(ingredientNode);
    }
  }

  walk(tree);

  // Process batches: group every 10 crafts and take max time per batch
  for (const [station, times] of Object.entries(passiveCrafts)) {
    const batches: number[][] = [];

    for (let i = 0; i < times.length; i += 10) {
      batches.push(times.slice(i, i + 10));
    }

    for (const batch of batches) {
      totals.totalTime += Math.max(...batch);
    }
  }

  return totals;
}