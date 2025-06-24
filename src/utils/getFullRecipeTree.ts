import { ALL_RECIPES } from "../data/recipes";
import type { RecipeTree, CraftingRecipe } from "../types";



/**
 * Given a recipe and a quantity, returns a tree of all the recipes that are required to make it.
 */
export function getFullRecipeTree(
  recipe: CraftingRecipe,
  quantity: number,
  visited: Set<string> = new Set()
): RecipeTree {
  const ingredients: RecipeTree[] = [];

  if (!('ingredients' in recipe)) {
    return {
      recipe: null,
      quantity,
      ingredients: [],
    };
  }

  for (const ingredient of recipe.ingredients) {
    const ingredientQuantityNeeded = ingredient.quantity * quantity;

    // Find all possible recipes that produce this ingredient
    const ingredientRecipes = ALL_RECIPES.filter((r) =>
      r.outputs.some((o) => o.itemName === ingredient.itemName)
    );

    if (ingredientRecipes.length > 0) {
      // Select the first recipe by default
      const ingredientRecipe = ingredientRecipes[0];

      if (visited.has(ingredientRecipe.recipeName)) {
        continue; // Skip cycles
      }

      visited.add(ingredientRecipe.recipeName);

      const output = ingredientRecipe.outputs.find(
        (o) => o.itemName === ingredient.itemName
      )!;
      const outputQty = outputIsNumeric(output.quantity)
        ? output.quantity
        : output.quantity.min;

      const batchesNeeded = Math.ceil(ingredientQuantityNeeded / outputQty);

      ingredients.push({
        recipe: ingredientRecipe,
        quantity: batchesNeeded,
        ingredients: getFullRecipeTree(ingredientRecipe, batchesNeeded, visited).ingredients,
      });

      visited.delete(ingredientRecipe.recipeName);
    } else {
      // No recipe found, treat as raw ingredient
      ingredients.push({
        recipe: { recipeName: ingredient.itemName, recipeType: 'raw', outputs: [] },
        ingredients: [],
        quantity: ingredientQuantityNeeded,
      });
    }
  }

  return {
    recipe,
    quantity,
    ingredients
  };
}

function outputIsNumeric(output: number | { min: number; max: number }): output is number {
  return typeof output === 'number';
}
