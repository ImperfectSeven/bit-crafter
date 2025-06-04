import { PROFESSIONS, type Profession, STRUCTURES, type Structure, type Tier } from "./constants";

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

// Example Bitcraft recipes - now using game's recipe names
// export const SAMPLE_RECIPES: CraftingRecipe[] = [
//     {
//         recipeName: 'Break Stone Chunk',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Pebbles',
//             quantity: { min: 8, max: 20 }
//         }],
//         profession: PROFESSIONS.Mining,
//         effort: 50,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Rough Stone Chunk', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Break Stone',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Braxite',
//             quantity: { min: 0, max: 4 }
//         }],
//         profession: PROFESSIONS.Mining,
//         effort: 50,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Rough Stone Chunk', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Basic Potter\'s Mix',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Potter\'s Mix',
//             quantity: 1
//         }],
//         profession: PROFESSIONS.Masonry,
//         effort: 50,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Pebbles', quantity: 5 },
//             { itemName: 'Basic Clay Lump', quantity: 2 }
//         ]
//     },
//     {
//         recipeName: 'Unfired Rough Brick',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Unfired Rough Brick',
//             quantity: 1
//         }],
//         profession: PROFESSIONS.Masonry,
//         effort: 100,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Basic Potter\'s Mix', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Fire Rough Brick',
//         recipeType: 'passive',
//         outputs: [{
//             itemName: 'Rough Brick',
//             quantity: 1
//         }],
//         structure: STRUCTURES.Kiln,
//         seconds: 5 * 60,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Unfired Rough Brick', quantity: 1 },
//             { itemName: 'Rough Wood Log', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Chop Wood',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Wood Log',
//             quantity: 6
//         }],
//         profession: PROFESSIONS.Forestry,
//         effort: 50,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Wood Trunk', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Harvest Amber Resin',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Amber Resin',
//             quantity: { min: 0, max: 1 }
//         }],
//         profession: PROFESSIONS.Forestry,
//         effort: 50,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Rough Wood Trunk', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Rough Brick Slab',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Brick Slab',
//             quantity: 1
//         }],
//         profession: PROFESSIONS.Masonry,
//         effort: 100,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Brick', quantity: 10 }
//         ]
//     },
//     {
//         recipeName: 'Embergrain Seeds',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Embergrain Seeds',
//             quantity: { min: 1, max: 3 }
//         }],
//         profession: PROFESSIONS.Farming,
//         effort: 100,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Basic Embergrain Plant', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Embergrain',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Embergrain',
//             quantity: { min: 30, max: 50 }
//         }],
//         profession: PROFESSIONS.Farming,
//         effort: 100,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Basic Embergrain Plant', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Straw',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Straw',
//             quantity: { min: 0, max: 1 }
//         }],
//         profession: PROFESSIONS.Farming,
//         effort: 100,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Basic Embergrain Plant', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Cut Rough Ruby',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Uncut Rough Ruby',
//             quantity: { min: 0, max: 1 }
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Masonry,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Rough Geode', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Cut Rough Diamond',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Uncut Rough Diamond',
//             quantity: { min: 0, max: 1 }
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Masonry,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Rough Geode', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Cut Rough Emerald',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Uncut Rough Emerald',
//             quantity: { min: 0, max: 1 }
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Masonry,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Rough Geode', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Cut Rough Sapphire',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Uncut Rough Sapphire',
//             quantity: { min: 0, max: 1 }
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Masonry,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Rough Geode', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Fillet Breezy Fin Darter',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Breezy Fin Darter Fillet',
//             quantity: { min: 1, max: 2 }
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Fishing,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Breezy Fin Darter', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Extract Fish Oil',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Fish Oil',
//             quantity: 1
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Fishing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Breezy Fin Darter', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Craft Simple Bait',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Simple Bait',
//             quantity: 1
//         }],
//         effort: 65,
//         profession: PROFESSIONS.Fishing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Driftwood Crayfish', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Crush Simple Shells',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Crushed Simple Shells',
//             quantity: { min: 0, max: 1 }
//         }],
//         effort: 65,
//         profession: PROFESSIONS.Fishing,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Driftwood Crayfish', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Basic Fertilizer',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Fertilizer',
//             quantity: 1
//         }],
//         effort: 25,
//         profession: PROFESSIONS.Farming,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Breezy Fin Darter Fillet', quantity: 2 }
//         ]
//     },
//     {
//         recipeName: 'Starbulb Seeds',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Starbulb Seeds',
//             quantity: { min: 1, max: 3 }
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Farming,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Basic Starbulb Plant', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Starbulb',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Starbulb',
//             quantity: { min: 5, max: 10 }
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Farming,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Basic Starbulb Plant', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Crop Oil',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Crop Oil',
//             quantity: { min: 0, max: 1 }
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Farming,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Basic Starbulb Plant', quantity: 1 }
//         ]
//     },
//     // #region Tier 1 Armors
//     {
//         recipeName: 'Ferralith Plated Helm',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Plated Helm',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 3 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Plated Armor',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Plated Armor',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Plated Legguards',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Plated Legguards',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Plated Bracers',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Plated Bracers',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Plated Boots',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Plated Boots',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Plated Belt',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Plated Belt',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Rough Woven Cap',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Woven Cap',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Tailoring,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Cloth', quantity: 4 },
//         ]
//     },
//     {
//         recipeName: 'Rough Woven Shirt',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Woven Shirt',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Tailoring,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Cloth', quantity: 4 },
//         ]
//     },
//     {
//         recipeName: 'Rough Woven Shorts',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Woven Shorts',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Tailoring,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Cloth', quantity: 4 },
//         ]
//     },
//     {
//         recipeName: 'Rough Woven Belt',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Woven Belt',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Tailoring,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Cloth', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Rough Woven Gloves',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Woven Gloves',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Tailoring,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Cloth', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Rough Woven Shoes',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Woven Shoes',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Tailoring,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Cloth', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Rough Leather Cap',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Leather Cap',
//             quantity: 1
//         }],
//         effort: 200,
//         profession: PROFESSIONS.Leatherworking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Leather', quantity: 4 },
//         ]
//     },
//     {
//         recipeName: 'Rough Leather Shirt',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Leather Shirt',
//             quantity: 1
//         }],
//         effort: 200,
//         profession: PROFESSIONS.Leatherworking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Leather', quantity: 4 },
//         ]
//     },
//     {
//         recipeName: 'Rough Leather Leggings',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Leather Leggings',
//             quantity: 1
//         }],
//         effort: 200,
//         profession: PROFESSIONS.Leatherworking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Leather', quantity: 4 },
//         ]
//     },
//     {
//         recipeName: 'Rough Leather Gloves',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Leather Gloves',
//             quantity: 1
//         }],
//         effort: 200,
//         profession: PROFESSIONS.Leatherworking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Leather', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Rough Leather Belt',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Leather Belt',
//             quantity: 1
//         }],
//         effort: 200,
//         profession: PROFESSIONS.Leatherworking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Rough Leather Boots',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Leather Boots',
//             quantity: 1
//         }],
//         effort: 200,
//         profession: PROFESSIONS.Leatherworking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },
//     // #endregion Tier 1 Armors
//     // #region Tier 1 Tools
//     {
//         recipeName: 'Ferralith Axe',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Axe',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Chisel',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Chisel',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Hoe',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Hoe',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Mace',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Mace',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 5 },
//             { itemName: 'Rough Rope', quantity: 1 },
//             { itemName: 'Rough Plank', quantity: 1 },
//             { itemName: 'Rough Leather', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Quill',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Quill',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Saw',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Saw',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Shortsword',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Shortsword',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 5 },
//             { itemName: 'Rough Rope', quantity: 1 },
//             { itemName: 'Rough Plank', quantity: 1 },
//             { itemName: 'Rough Leather', quantity: 1 },
//         ]
//     },{
//         recipeName: 'Ferralith Bow',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Bow',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Claymore',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Claymore',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 5 },
//             { itemName: 'Rough Rope', quantity: 1 },
//             { itemName: 'Rough Plank', quantity: 1 },
//             { itemName: 'Rough Leather', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Hammer',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Hammer',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },
//     {
//         recipeName: 'Ferralith Knife',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Knife',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },{
//         recipeName: 'Ferralith Machete',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Machete',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },{
//         recipeName: 'Ferralith Pickaxe',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Pickaxe',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },{
//         recipeName: 'Ferralith Rod',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Rod',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },{
//         recipeName: 'Ferralith Scissors',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Scissors',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 4 },
//             { itemName: 'Rough Rope', quantity: 2 },
//             { itemName: 'Rough Plank', quantity: 2 },
//             { itemName: 'Rough Leather', quantity: 2 },
//         ]
//     },{
//         recipeName: 'Ferralith Spear & Shield',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Ferralith Spear & Shield',
//             quantity: 1
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Smithing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Ferralith Ingot', quantity: 5 },
//             { itemName: 'Rough Rope', quantity: 1 },
//             { itemName: 'Rough Plank', quantity: 1 },
//             { itemName: 'Rough Leather', quantity: 1 },
//         ]
//     },
//     // #endregion Tier 1 Tools
//     {
//         recipeName: 'Rough Leather',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Leather',
//             quantity: 1
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Leatherworking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Tanned Pelt', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Tan Pelt',
//         recipeType: 'passive',
//         outputs: [{
//             itemName: 'Rough Tanned Pelt',
//             quantity: 1
//         }],
//         seconds: 5 * 60,
//         structure: STRUCTURES.TanningTub,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Cleaned Pelt', quantity: 1 },
//             { itemName: 'Basic Tannin', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Clean Pelt',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Cleaned Pelt',
//             quantity: 1
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Leatherworking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Raw Pelt', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Hunt Sagi Bird',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Raw Pelt',
//             quantity: 2
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Hunting,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Sagi Bird', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Cook Basic Raw Meat',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Raw Meat',
//             quantity: 4
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Hunting,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Sagi Bird', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Extract Animal Hair',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Animal Hair',
//             quantity: { min: 0, max: 1 }
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Hunting,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Sagi Bird', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Basic Tannin',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Tannin',
//             quantity: 3
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Leatherworking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Tree Bark', quantity: 1 },
//             { itemName: 'Water Bucket', quantity: 2 }
//         ]
//     },
//     {
//         recipeName: 'Harvest Tree Bark',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Tree Bark',
//             quantity: 4
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Forestry,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Wood Trunk', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Boil Water',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Water Bucket',
//             quantity: 1
//         }],
//         effort: 1,
//         profession: PROFESSIONS.Cooking,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Empty Bucket', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Craft Empty Bucket',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Empty Bucket',
//             quantity: 10
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Carpentry,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Plank', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Craft Rough Plank',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Plank',
//             quantity: 1
//         }],
//         effort: 40,
//         profession: PROFESSIONS.Carpentry,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Stripped Wood', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Strip Wood',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Stripped Wood',
//             quantity: 1
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Carpentry,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Wood Log', quantity: 3 }
//         ]
//     },
//     {
//         recipeName: 'Fillet Emberfin Shiner',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Emberfin Shiner Fillet',
//             quantity: { min: 1, max: 2 }
//         }],
//         effort: 65,
//         profession: PROFESSIONS.Fishing,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Emberfin Shiner', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Extract Simple Fish Oil',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Simple Fish Oil',
//             quantity: 1
//         }],
//         effort: 65,
//         profession: PROFESSIONS.Fishing,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Emberfin Shiner', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Rough Cloth',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Cloth',
//             quantity: 1
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Tailoring,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Wispweave Filament', quantity: 5 },
//             { itemName: 'Rough Cloth Strip', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Harvest Wispweave Filament',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Wispweave Filament',
//             quantity: { min: 2, max: 5 }
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Farming,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Basic Wispweave Plant', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Wispweave Seeds',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Wispweave Seeds',
//             quantity: { min: 1, max: 3 }
//         }],
//         effort: 0,
//         profession: PROFESSIONS.Farming,
//         hasVariableOutput: true,
//         ingredients: [
//             { itemName: 'Basic Wispweave Plant', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Rough Cloth Strip',
//         recipeType: 'passive',
//         outputs: [{
//             itemName: 'Rough Cloth Strip',
//             quantity: 1
//         }],
//         seconds: 5 * 60,
//         structure: STRUCTURES.Loom,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Spool of Thread', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Plant Basic Wispweave',
//         recipeType: 'passive',
//         outputs: [{
//             itemName: 'Basic Wispweave Plant',
//             quantity: 1
//         }],
//         seconds: 5 * 60,
//         structure: STRUCTURES.Farm,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Basic Wispweave Seeds', quantity: 1 },
//             { itemName: 'Basic Fertilizer', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Rough Spool of Thread',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Spool of Thread',
//             quantity: 1
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Tailoring,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Plant Fiber', quantity: 40 }
//         ]
//     },
//     {
//         recipeName: 'Rough Plant Fiber',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Plant Fiber',
//             quantity: 100
//         }],
//         effort: 50,
//         profession: PROFESSIONS.Foraging,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Plant Roots', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Assemble Campfire Kit',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Campfire Kit',
//             quantity: 1
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Carpentry,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Plank', quantity: 4 },
//             { itemName: 'Rough Pebbles', quantity: 4 }
//         ]
//     },
//     {
//         recipeName: 'Wood Polish',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Basic Wood Polish',
//             quantity: 1
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Scholar,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Basic Amber Resin', quantity: 1 },
//             { itemName: 'Basic Crop Oil', quantity: 1 },
//             { itemName: 'Pitch', quantity: 1 },
//             { itemName: 'Rough Glass Vial', quantity: 1 }
//         ]
//     },
//     {
//         recipeName: 'Create Pitch',
//         recipeType: 'passive',
//         outputs: [{
//             itemName: 'Pitch',
//             quantity: 1
//         }],
//         seconds: 5 * 60,
//         structure: STRUCTURES.Kiln,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Tree Sap', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Rough Glass Vial',
//         recipeType: 'active',
//         outputs: [{
//             itemName: 'Rough Glass Vial',
//             quantity: 1
//         }],
//         effort: 100,
//         profession: PROFESSIONS.Masonry,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Rough Glass', quantity: 1 },
//         ]
//     },
//     {
//         recipeName: 'Create Rough Glass',
//         recipeType: 'passive',
//         outputs: [{
//             itemName: 'Rough Glass',
//             quantity: 1
//         }],
//         seconds: 5 * 60,
//         structure: STRUCTURES.Kiln,
//         hasVariableOutput: false,
//         ingredients: [
//             { itemName: 'Basic Sand', quantity: 5 },
//         ]
//     },
// ];
