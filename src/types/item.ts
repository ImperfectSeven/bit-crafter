import { type Profession, type Structure, type Tier } from "./constants";

export type ItemRecipe = {
    output: number | { min: number; max: number };
    ingredients: {
        itemName: string,
        quantity: number
    }[],
    effort?: number;
    timeInSeconds?: number;
    station: Structure;
    profession: Profession;
    tier: number;
};

export interface IngredientNode {
  itemName: string;
  quantity: number;
  recipePathOptions?: RecipePath[];
}

export interface RecipePath {
  recipe: ItemRecipe;
  ingredients: IngredientNode[];
}

export interface RecipeTotals {
  rawMaterials: Record<string, number>; // Raw ingredient name -> total quantity
  totalEffort: number;
  totalTime: number; // in seconds
}