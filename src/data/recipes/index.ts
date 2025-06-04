import type { CraftingRecipe } from '../../types/recipes';
import { farmRecipes, farmingRecipes } from './farming';
import { foragingRecipes } from './foraging-station';
import { kilnRecipes } from './kiln';
import { tailoringRecipes, loomRecipes } from './tailoring';
// Combine all recipes
export const ALL_RECIPES: CraftingRecipe[] = [
    farmRecipes,
    farmingRecipes,
    foragingRecipes,
    kilnRecipes,
    tailoringRecipes,
    loomRecipes
].map((recipeBuilder) => recipeBuilder.getRecipes()).flat();
