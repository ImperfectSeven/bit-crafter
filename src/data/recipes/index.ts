import type { CraftingRecipe } from '../../types/recipes';
import { farmRecipes, farmingStationRecipes } from './farming';
import { foragingRecipes } from './foraging';
import { kilnRecipes, masonryStationRecipes } from './masonry';
import { tailoringRecipes, loomRecipes } from './tailoring';
import { forestryStationRecipes } from './forestry';
import { carpentyRecipes } from './carpentry';
import { smelterRecipes, smithingStationRecipes } from './blacksmithing';
import { miningStationRecipes } from './mining';
import { tanningTubRecipes, leatherworkingStationRecipes } from './leatherworking';
import { huntingStationRecipes } from './hunting';
import { fishingStationRecipes } from './fishing';
import { ovenRecipes, cookingStationRecipes } from './cooking';
import { scholarStationRecipes } from './scholar';

// Combine all recipes
export const ALL_RECIPES: CraftingRecipe[] = [
    farmRecipes,
    farmingStationRecipes,
    foragingRecipes,
    kilnRecipes,
    masonryStationRecipes,
    tailoringRecipes,
    loomRecipes,
    forestryStationRecipes,
    carpentyRecipes,
    smelterRecipes,
    smithingStationRecipes,
    miningStationRecipes,
    tanningTubRecipes,
    leatherworkingStationRecipes,
    huntingStationRecipes,
    fishingStationRecipes,
    ovenRecipes,
    cookingStationRecipes,
    scholarStationRecipes
].map((recipeBuilder) => recipeBuilder.getRecipes()).flat();
