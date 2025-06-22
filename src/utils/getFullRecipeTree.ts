import { ALL_RECIPES } from "../data/recipes";
import { type CraftingRecipe } from "../types/recipes";

interface RecipeTree {
  recipe: CraftingRecipe | null;
  ingredients: RecipeTree[];
  quantity: number;
}

/**
 * Given a recipe and a quantity, returns a tree of all the recipes that are required to make it.
 */
export function getFullRecipeTree(recipe: CraftingRecipe, quantity: number, visited: Set<string> = new Set()): RecipeTree[] {
  const trees: RecipeTree[] = [];

  // for each ingredient of the given recipe
  for (const ingredient of recipe.ingredients) {
    const ingredientQuantityNeeded = ingredient.quantity * quantity;

    // find the recipe that outputs this ingredient
    const ingredientRecipes = ALL_RECIPES.filter((r) => r.outputs.some((o) => o.itemName === ingredient.itemName));

    if (ingredientRecipes.length > 0) {
      // for each recipe that outputs the necessary ingredient (AKA alternate recipes)
      for (const ingredientRecipe of ingredientRecipes) {
        if (visited.has(ingredientRecipe.recipeName)) {
          // Infinite loop detected, skip this recipe
          continue;
        }

        visited.add(ingredientRecipe.recipeName);

        // Get how many of this ingredient this alternate recipe outputs
        const output = ingredientRecipe.outputs.find((o) => o.itemName === ingredient.itemName)!;
        const ingredientRecipeOutputQuantity = outputIsNumeric(output.quantity) ? output.quantity : output.quantity.min;

        const numRecipeIterationsNeeded = Math.ceil(ingredientQuantityNeeded / ingredientRecipeOutputQuantity);
        const ingredientTree = getFullRecipeTree(ingredientRecipe, numRecipeIterationsNeeded, visited);

        trees.push({
          recipe: ingredientRecipe,
          ingredients: ingredientTree,
          quantity: numRecipeIterationsNeeded,
        });

        visited.delete(ingredientRecipe.recipeName);
      }
    } else {
      // Ingredient is not output by any recipe, add it to the tree
      trees.push({
        recipe: null,
        ingredients: [],
        quantity: ingredientQuantityNeeded,
      });
    }
  }

  return trees;
}

function outputIsNumeric(output: number | { min: number; max: number }): output is number {
  return typeof output === 'number';
}

// TESTING
const inputRecipes: CraftingRecipe = ALL_RECIPES.find((r) => r.recipeName === 'Rough Woven Belt')!;

const recipeTree = getFullRecipeTree(inputRecipes, 1);

console.dir(recipeTree, { depth: null });