import type { Tier } from "../data/types";

export interface IngredientNode {
  itemId: string;
  itemName: string;
  quantity: number;
  isRawMaterial: boolean;
  recipePathOptions?: {
    recipe: ItemDataRecipe;
    ingredients: (IngredientNode | undefined)[];
  }[];
}

export interface RecipeTotals {
  rawMaterials: Record<string, number>; // Raw ingredient name -> total quantity
  totalEffort: number;
  totalTime: number; // in seconds
}

export type ItemData = {
    name: string;
    description: string;
    tier: Tier;
    rarity: number;
    recipes: ItemDataRecipe[];
    extractionSkill: string;
};

export type ItemDataRecipe = {
  levelRequirement: [number, number];
  ingredients: { id: string; quantity: number }[];
  outputQuantity: number;
  timeRequirement: number;
  effortRequirement: number;
  isPassive: boolean;
};