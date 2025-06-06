import { type Profession, type Structure, type Tier } from "./constants";

export interface CraftingIngredient {
    itemName: string;
    quantity: number;
}

export interface RecipeOutput {
    itemName: string;
    quantity: number | { min: number; max: number };
    chance?: number; // Optional probability of getting this output (0-1), default is 1
}

interface RecipeBase {
    recipeName: string; // The game's unique recipe name
    outputs: RecipeOutput[];
    ingredients: CraftingIngredient[];
    hasVariableOutput?: boolean;
    tier: Tier;
}

export interface ActiveRecipe extends RecipeBase {
    recipeType: 'active';
    profession: Profession;
    effort: number;
}

export interface PassiveRecipe extends RecipeBase {
    recipeType: 'passive';
    seconds: number;
    structure: Structure;
}

export type CraftingRecipe = ActiveRecipe | PassiveRecipe;
