import type { CraftingRecipe } from '../../types/recipes';
import { farmRecipes, farmingRecipes } from './farming';
import { foragingRecipes } from './foraging-station';
import { kilnRecipes } from './kiln';
import { tailoringRecipes, loomRecipes } from './tailoring';
import { forestryRecipes } from './forestry-station';
import { carpentyRecipes } from './carpentry';
import { smelterRecipes, smithingStationRecipes } from './blacksmithing';

// Combine all recipes
export const ALL_RECIPES: CraftingRecipe[] = [
    farmRecipes,
    farmingRecipes,
    foragingRecipes,
    kilnRecipes,
    tailoringRecipes,
    loomRecipes,
    forestryRecipes,
    carpentyRecipes,
    smelterRecipes,
    smithingStationRecipes
].map((recipeBuilder) => recipeBuilder.getRecipes()).flat();
