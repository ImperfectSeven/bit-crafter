import type { CraftingRecipe } from "./recipes";

export type RecipeTree = {
  recipe: CraftingRecipe | null;
  ingredients: RecipeTree[];
  quantity: number;
}