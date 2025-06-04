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
    },
    // #region Tier 1 Armors
    {
        recipeType: 'active',
        outputItem: 'Ferralith Plated Helm',
        effort: 0,
        profession: PROFESSIONS.Smithing,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Ferralith Ingot', quantity: 3 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Ferralith Plated Armor',
        effort: 0,
        profession: PROFESSIONS.Smithing,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Ferralith Ingot', quantity: 4 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Ferralith Plated Legguards',
        effort: 0,
        profession: PROFESSIONS.Smithing,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Ferralith Ingot', quantity: 4 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Ferralith Plated Bracers',
        effort: 0,
        profession: PROFESSIONS.Smithing,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Ferralith Ingot', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Ferralith Plated Boots',
        effort: 0,
        profession: PROFESSIONS.Smithing,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Ferralith Ingot', quantity: 2 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Ferralith Plated Belt',
        effort: 0,
        profession: PROFESSIONS.Smithing,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Ferralith Ingot', quantity: 2 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Woven Cap',
        effort: 0,
        profession: PROFESSIONS.Tailoring,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 4 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Woven Shirt',
        effort: 0,
        profession: PROFESSIONS.Tailoring,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 4 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Woven Shorts',
        effort: 0,
        profession: PROFESSIONS.Tailoring,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 4 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Woven Belt',
        effort: 0,
        profession: PROFESSIONS.Tailoring,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 2 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Woven Gloves',
        effort: 0,
        profession: PROFESSIONS.Tailoring,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Woven Shoes',
        effort: 0,
        profession: PROFESSIONS.Tailoring,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 2 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Leather Cap',
        effort: 0,
        profession: PROFESSIONS.Leatherworking,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 4 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Leather Shirt',
        effort: 0,
        profession: PROFESSIONS.Leatherworking,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 4 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Leather Leggings',
        effort: 0,
        profession: PROFESSIONS.Leatherworking,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 4 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Leather Gloves',
        effort: 0,
        profession: PROFESSIONS.Leatherworking,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Leather Belt',
        effort: 0,
        profession: PROFESSIONS.Leatherworking,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 2 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Leather Boots',
        effort: 0,
        profession: PROFESSIONS.Leatherworking,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 2 },
        ]
    },
    // #endregion Tier 1 Armors
    {
        recipeType: 'active',
        outputItem: 'Rough Leather',
        effort: 0,
        profession: PROFESSIONS.Leatherworking,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Tanned Pelt', quantity: 1 },
        ]
    },
    {
        recipeType: 'passive',
        outputItem: 'Rough Tanned Pelt',
        seconds: 5 * 60,
        structure: STRUCTURES.TanningTub,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Cleaned Pelt', quantity: 1 },
            { itemName: 'Basic Tannin', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Cleaned Pelt',
        effort: 0,
        profession: PROFESSIONS.Leatherworking,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Raw Pelt', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Raw Pelt',
        effort: 0,
        profession: PROFESSIONS.Hunting,
        outputQuantity: 2,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Sagi Bird', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Raw Meat',
        effort: 0,
        profession: PROFESSIONS.Hunting,
        outputQuantity: 4,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Sagi Bird', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Animal Hair',
        effort: 0,
        profession: PROFESSIONS.Hunting,
        outputQuantity: { min: 0, max: 1 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Sagi Bird', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Tannin',
        effort: 0,
        profession: PROFESSIONS.Leatherworking,
        outputQuantity: 3,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Tree Bark', quantity: 1 },
            { itemName: 'Water Bucket', quantity: 2 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Tree Bark',
        effort: 0,
        profession: PROFESSIONS.Forestry,
        outputQuantity: 4,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Wood Trunk', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Water Bucket',
        effort: 0,
        profession: PROFESSIONS.Cooking,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Empty Bucket', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Empty Bucket',
        effort: 0,
        profession: PROFESSIONS.Carpentry,
        outputQuantity: 10,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Plank', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Plank',
        effort: 0,
        profession: PROFESSIONS.Carpentry,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Stripped Wood', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Stripped Wood',
        effort: 0,
        profession: PROFESSIONS.Carpentry,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Wood Log', quantity: 3 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Emberfin Shiner Fillet',
        effort: 65,
        profession: PROFESSIONS.Fishing,
        outputQuantity: { min: 1, max: 2 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Emberfin Shiner', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Simple Fish Oil',
        effort: 65,
        profession: PROFESSIONS.Fishing,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Emberfin Shiner', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Cloth',
        effort: 0,
        profession: PROFESSIONS.Tailoring,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Wispweave Filament', quantity: 5 },
            { itemName: 'Rough Cloth Strip', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Wispweave Filament',
        effort: 0,
        profession: PROFESSIONS.Farming,
        outputQuantity: { min: 2, max: 5 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Wispweave Plant', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Basic Wispweave Seeds',
        effort: 0,
        profession: PROFESSIONS.Farming,
        outputQuantity: { min: 1, max: 3 },
        hasVariableOutput: true,
        ingredients: [
            { itemName: 'Basic Wispweave Plant', quantity: 1 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Cloth Strip',
        effort: 0,
        profession: PROFESSIONS.Tailoring,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Spool of Thread', quantity: 1 }
        ]
    },
    {
        recipeType: 'passive',
        outputItem: 'Basic Wispweave Plant',
        seconds: 5 * 60,
        structure: STRUCTURES.Farm,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Basic Wispweave Seeds', quantity: 1 },
            { itemName: 'Basic Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Spool of Thread',
        effort: 0,
        profession: PROFESSIONS.Tailoring,
        outputQuantity: 1,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Plant Fiber', quantity: 40 }
        ]
    },
    {
        recipeType: 'active',
        outputItem: 'Rough Plant Fiber',
        effort: 0,
        profession: PROFESSIONS.Foraging,
        outputQuantity: 100,
        hasVariableOutput: false,
        ingredients: [
            { itemName: 'Rough Plant Roots', quantity: 1 }
        ]
    }
];
