import { type Profession, type Structure, type Tier } from "./constants";

export interface CraftingIngredient {
    itemName: string;
    quantity: number;
}

export interface RecipeOutput {
    itemName: string;
    quantity: number | { min: number; max: number };
}

interface RecipeBase {
    recipeName: string; // The game's unique recipe name
    outputs: RecipeOutput[];
    ingredients: CraftingIngredient[];
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
