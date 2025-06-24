import type { RecipeTree } from "../types"; // Adjust path as needed

interface RecipeStats {
  recipeName: string;
  totalRuns: number;
  totalEffort: number;
  totalTime: number;
  maxDepth: number;
}

export function summarizeRecipeTree(tree: RecipeTree): Record<string, RecipeStats> {
  const result: Record<string, RecipeStats> = {};

  const walk = (node: RecipeTree, depth: number) => {
    const { recipe, quantity } = node;

    if (recipe) {
      const recipeName = recipe.recipeName;
      const effort = recipe.recipeType === 'active' ? recipe.effort : 0;
      const time = recipe.recipeType === 'passive' ? recipe.seconds : 0;

      if (!result[recipeName]) {
        result[recipeName] = {
          recipeName,
          totalRuns: 0,
          totalEffort: 0,
          totalTime: 0,
          maxDepth: depth
        };
      }

      result[recipeName].totalRuns += quantity;
      result[recipeName].totalEffort += effort * quantity;
      result[recipeName].totalTime += (time * Math.ceil(quantity / 10));
      result[recipeName].maxDepth = Math.max(result[recipeName].maxDepth, depth);
    }

    node.ingredients.forEach(child => walk(child, depth + 1));
  };

  walk(tree, 0);
  return result;
}
