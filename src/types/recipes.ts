import { PROFESSIONS, type Profession, STRUCTURES, type Structure } from "./constants";

export interface CraftingIngredient {
    itemName: string;
    quantity: number;
}

interface RecipeBase {
    outputItem: string;
    outputQuantity: number | { min: number; max: number };
    ingredients: CraftingIngredient[];
    hasVariableOutput?: boolean;
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

// Example Bitcraft recipes
export const SAMPLE_RECIPES: CraftingRecipe[] = [
    {
        recipeType: 'active',
        outputItem: 'Rough Pebbles',
        profession: PROFESSIONS.Mining,
        effort: 50,
        outputQuantity: { min: 8, max: 20 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Rough Stone Chunk', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Braxite',
        profession: PROFESSIONS.Mining,
        effort: 50,
        outputQuantity: { min: 0, max: 4 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Rough Stone Chunk', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Potter\'s Mix',
        profession: PROFESSIONS.Masonry,
        effort: 50,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Pebbles', quantity: 5 },
            { itemName: 'Basic Clay Lump', quantity: 2 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Unfired Rough Brick',
        profession: PROFESSIONS.Masonry,
        effort: 100,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Basic Potter\'s Mix', quantity: 1 }
        ]
    },
    {
        recipeType: 'passive',
        outputItem: 'Rough Brick',
        structure: STRUCTURES.Kiln,
        seconds: 5 * 60,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Unfired Rough Brick', quantity: 1 },
            { itemName: 'Rough Wood Log', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Wood Log',
        profession: PROFESSIONS.Forestry,
        effort: 50,
        outputQuantity: 6,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Wood Trunk', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Amber Resin',
        profession: PROFESSIONS.Forestry,
        effort: 50,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Rough Wood Trunk', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Brick Slab',
        profession: PROFESSIONS.Masonry,
        effort: 100,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Brick', quantity: 10 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Embergrain Seeds',
        profession: PROFESSIONS.Farming,
        effort: 100,
        outputQuantity: { min: 1, max: 3 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Embergrain Plant', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Embergrain',
        profession: PROFESSIONS.Farming,
        effort: 100,
        outputQuantity: { min: 30, max: 50 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Embergrain Plant', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Straw',
        profession: PROFESSIONS.Farming,
        effort: 100,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Embergrain Plant', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: `Rough Brick Slab`,
        profession: PROFESSIONS.Masonry,
        effort: 100,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Brick', quantity: 10 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Embergrain Seeds',
        profession: PROFESSIONS.Farming,
        effort: 100,
        outputQuantity: { min: 1, max: 3 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Embergrain Plant', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Embergrain',
        profession: PROFESSIONS.Farming,
        effort: 100,
        outputQuantity: { min: 30, max: 50 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Embergrain Plant', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Straw',
        profession: PROFESSIONS.Farming,
        effort: 100,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Embergrain Plant', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Uncut Rough Ruby',
        effort: 100,
        profession: PROFESSIONS.Masonry,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Rough Geode', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Uncut Rough Diamond',
        effort: 100,
        profession: PROFESSIONS.Masonry,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Rough Geode', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Uncut Rough Emerald',
        effort: 100,
        profession: PROFESSIONS.Masonry,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Rough Geode', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Uncut Rough Sapphire',
        effort: 100,
        profession: PROFESSIONS.Masonry,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Rough Geode', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Breezy Fin Darter Fillet',
        effort: 50,
        profession: PROFESSIONS.Fishing,
        outputQuantity: { min: 1, max: 2 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Breezy Fin Darter', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Fish Oil',
        effort: 50,
        profession: PROFESSIONS.Fishing,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Breezy Fin Darter', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Simple Bait',
        effort: 65,
        profession: PROFESSIONS.Fishing,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Driftwood Crayfish', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Crushed Simple Shells',
        effort: 65,
        profession: PROFESSIONS.Fishing,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Driftwood Crayfish', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Fertilizer',
        effort: 25,
        profession: PROFESSIONS.Farming,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Breezy Fin Darter Fillet', quantity: 2 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Starbulb Seeds',
        effort: 100,
        profession: PROFESSIONS.Farming,
        outputQuantity: { min: 1, max: 3 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Starbulb Plant', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Starbulb',
        effort: 100,
        profession: PROFESSIONS.Farming,
        outputQuantity: { min: 5, max: 10 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Starbulb Plant', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Crop Oil',
        effort: 100,
        profession: PROFESSIONS.Farming,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Starbulb Plant', quantity: 1 }
        ]
    }
];
