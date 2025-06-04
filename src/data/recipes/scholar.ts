import { PROFESSIONS, TIERS } from "../../types/constants";
import { addProfessionRecipes } from "./utils";

export const scholarStationRecipes = addProfessionRecipes(PROFESSIONS.Scholar)
.add(TIERS.Tier1, [
    {
        recipeName: 'Basic Ink',
        outputs: [{ itemName: 'Basic Ink', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Basic Pigment', quantity: 1 },
            { itemName: 'Basic Fish Oil', quantity: 2 }
        ]
    },
    {
        recipeName: 'Rough Parchment',
        outputs: [{ itemName: 'Rough Parchment', quantity: 1 }],
        effort: 100,
        ingredients: [{ itemName: 'Rough Tree Bark', quantity: 2 }]
    },
    {
        recipeName: 'Basic Pigment',
        outputs: [{ itemName: 'Basic Pigment', quantity: 1 }],
        effort: 100,
        ingredients: [{ itemName: 'Basic Flower', quantity: 5 }]
    },
    {
        recipeName: 'Beginner\'s Study Journal',
        outputs: [{ itemName: 'Beginner\'s Study Journal', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Parchment', quantity: 2 },
            { itemName: 'Basic Ink', quantity: 2 },
            { itemName: 'Beginner\'s Stone Carving', quantity: 1 }
        ]
    },
    {
        recipeName: 'Beginner\'s Building Blueprint',
        outputs: [{ itemName: 'Beginner\'s Building Blueprint', quantity: 3 }],
        effort: 100,
        ingredients: [{ itemName: 'Beginner\'s Study Journal', quantity: 1 }]
    },
    {
        recipeName: 'Basic Wood Polish',
        outputs: [{ itemName: 'Basic Wood Polish', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Basic Amber Resin', quantity: 1 },
            { itemName: 'Basic Crop Oil', quantity: 1 },
            { itemName: 'Pitch', quantity: 1 },
            { itemName: 'Rough Glass Vial', quantity: 1 }
        ]
    },
    {
        recipeName: 'Beginner\'s Cloth Research',
        outputs: [{ itemName: 'Beginner\'s Cloth Research', quantity: 3 }],
        effort: 100,
        ingredients: [
            { itemName: 'Beginner\'s Study Journal', quantity: 1 },
            { itemName: 'Refined Rough Cloth', quantity: 1 }
        ]
    },
    {
        recipeName: 'Basic Firesand',
        outputs: [{ itemName: 'Basic Firesand', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Gypsite', quantity: 1 },
            { itemName: 'Crushed Rough Shells', quantity: 1 }
        ]
    },
    {
        recipeName: 'Beginner\'s Leather Research',
        outputs: [{ itemName: 'Beginner\'s Leather Research', quantity: 3 }],
        effort: 100,
        ingredients: [
            { itemName: 'Beginner\'s Study Journal', quantity: 1 },
            { itemName: 'Refined Rough Leather', quantity: 1 }
        ]
    },
    {
        recipeName: 'Beginner\'s Wood Research',
        outputs: [{ itemName: 'Beginner\'s Wood Research', quantity: 3 }],
        effort: 100,
        ingredients: [
            { itemName: 'Beginner\'s Study Journal', quantity: 1 },
            { itemName: 'Refined Rough Plank', quantity: 1 }
        ]
    },
    {
        recipeName: 'Beginner\'s Stone Research',
        outputs: [{ itemName: 'Beginner\'s Stone Research', quantity: 3 }],
        effort: 100,
        ingredients: [
            { itemName: 'Beginner\'s Study Journal', quantity: 1 },
            { itemName: 'Refined Rough Brick', quantity: 1 }
        ]
    },
    {
        recipeName: 'Beginner\'s Codex',
        outputs: [{ itemName: 'Beginner\'s Codex', quantity: 3 }],
        effort: 100,
        ingredients: [
            { itemName: 'Beginner\'s Stone Research', quantity: 1 },
            { itemName: 'Beginner\'s Wood Research', quantity: 1 },
            { itemName: 'Beginner\'s Metal Research', quantity: 1 },
            { itemName: 'Beginner\'s Leather Research', quantity: 1 },
            { itemName: 'Beginner\'s Cloth Research', quantity: 1 },
        ]
    },
    {
        recipeName: 'Beginner\'s Metal Research',
        outputs: [{ itemName: 'Beginner\'s Metal Research', quantity: 3 }],
        effort: 100,
        ingredients: [
            { itemName: 'Beginner\'s Study Journal', quantity: 1 },
            { itemName: 'Refined Ferralith Ingot', quantity: 1 }
        ]
    },
    {
        recipeName: 'Basic Leather Treatment',
        outputs: [{ itemName: 'Basic Leather Treatment', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Braxite', quantity: 1 },
            { itemName: 'Basic Fish Oil', quantity: 2 },
            { itemName: 'Rough Glass Vial', quantity: 1 },
            { itemName: 'Water Bucket', quantity: 1 }
        ]
    },
    {
        recipeName: 'Basic Metal Solvent',
        outputs: [{ itemName: 'Basic Metal Solvent', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Basic Citric Berry', quantity: 1 },
            { itemName: 'Rough Pebbles', quantity: 5 },
            { itemName: 'Rough Glass Vial', quantity: 1 },
            { itemName: 'Water Bucket', quantity: 1 }
        ]
    },
    {
        recipeName: 'Basic Healing Potion',
        outputs: [{ itemName: 'Basic Healing Potion', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Basic Flower', quantity: 5 },
            { itemName: 'Rough Mushroom', quantity: 5 },
            { itemName: 'Rough Glass Vial', quantity: 1 },
            { itemName: 'Water Bucket', quantity: 1 },
            { itemName: 'Sugar', quantity: 3 },
        ]
    }
])
.add(TIERS.Tier2, [
    {
        recipeName: 'Simple Ink',
        outputs: [{ itemName: 'Simple Ink', quantity: 1 }],
        effort: 130,
        ingredients: [
            { itemName: 'Simple Pigment', quantity: 1 },
            { itemName: 'Simple Fish Oil', quantity: 2 }
        ]
    },
    {
        recipeName: 'Simple Healing Potion',
        outputs: [{ itemName: 'Simple Healing Potion', quantity: 1 }],
        effort: 130,
        ingredients: [
            { itemName: 'Simple Flower', quantity: 5 },
            { itemName: 'Simple Mushroom', quantity: 5 },
            { itemName: 'Simple Glass Vial', quantity: 1 },
            { itemName: 'Water Bucket', quantity: 1 },
            { itemName: 'Sugar', quantity: 3 },
        ]
    },
    {
        recipeName: 'Simple Firesand',
        outputs: [{ itemName: 'Simple Firesand', quantity: 1 }],
        effort: 130,
        ingredients: [
            { itemName: 'Simple Gypsite', quantity: 1 },
            { itemName: 'Crushed Simple Shells', quantity: 1 }
        ]
    }
]);