import type { IngredientNode, RecipeTotals } from "../types";
import { itemData } from "../data/item_data";

export function buildRecipeTree(
  itemId: string,
  quantity: number,
  recipeSelectionMap: Record<string, number> = {},
  visited: Set<string> = new Set()
): IngredientNode | undefined {
  const item = itemData[itemId];

  if (!item) {
    return;
  }

  // Prevent cycles
  if (visited.has(itemId)) {
    return {
      itemId,
      itemName: item.name,
      quantity,
      isRawMaterial: false
    };
  }

  const newVisited = new Set(visited);
  newVisited.add(itemId);

  if (!item.recipes || item.recipes.length === 0) {
    // Raw material
    return {
      itemId,
      itemName: item.name,
      quantity,
      isRawMaterial: true
    };
  }

  // Choose recipe
  const selectedIndex = recipeSelectionMap[itemId] ?? 0;
  const selectedRecipe = item.recipes[selectedIndex];

  if (!selectedRecipe) {
    throw new Error(`No recipe at index ${selectedIndex} for item ${itemId}`);
  }

  const recipePaths = item.recipes.map((recipe) => {
    const multiplier = Math.ceil(quantity / recipe.outputQuantity);
    const ingredients = recipe.ingredients.map((ing: { id: string; quantity: number }) =>
      buildRecipeTree(
        ing.id,
        ing.quantity * multiplier,
        recipeSelectionMap,
        newVisited
      )
    );

    return {
      recipe,
      ingredients,
    };
  });

  return {
    itemId,
    itemName: item.name,
    quantity,
    recipePathOptions: recipePaths,
    isRawMaterial: false
  };
}

export function computeTotalsFromTree(
  tree: IngredientNode | undefined,
  recipeSelectionMap: Record<string, number> = {}
): RecipeTotals {
  const totals: RecipeTotals = {
    rawMaterials: {},
    totalEffort: 0,
    totalTime: 0,
  };

  if (!tree) return totals;

  function walk(node: IngredientNode) {
    if (!node.recipePathOptions || node.recipePathOptions.length === 0) {
      // Raw material
      totals.rawMaterials[node.itemName] ??= 0;
      totals.rawMaterials[node.itemName] += node.quantity;
      return;
    }

    const selectedIndex = recipeSelectionMap[node.itemId] ?? 0;
    const selectedPath = node.recipePathOptions[selectedIndex];

    if (!selectedPath) return;

    const recipe = selectedPath.recipe;

    if (recipe.effortRequirement) {
      totals.totalEffort += recipe.effortRequirement;
    }

    if (recipe.timeRequirement) {
      // ⚠ Simple sum for now — you can later improve batching logic
      totals.totalTime += recipe.timeRequirement;
    }

    for (const ingredientNode of selectedPath.ingredients) {
      if (ingredientNode) {
        walk(ingredientNode);
      }
    }
  }

  walk(tree);

  return totals;
}

export function findItemIdByName(name: string): string | undefined {
  const itemId = Object.keys(itemData).find((id) => itemData[id].name === name);
  return itemId;
}