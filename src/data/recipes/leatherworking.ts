import { PROFESSIONS, STRUCTURES, TIERS } from "../../types/constants";
import { addProfessionRecipes, addStructureRecipes } from "./utils";

export const tanningTubRecipes = addStructureRecipes(STRUCTURES.TanningTub)
.add(TIERS.Tier1, [
    {
        recipeName: 'Rough Tanned Pelt',
        outputs: [{ itemName: 'Rough Tanned Pelt', quantity: 1 }],
        seconds: 10 * 60,
        ingredients: [
            { itemName: 'Rough Cleaned Pelt', quantity: 1 },
            { itemName: 'Basic Tannin', quantity: 1 }
        ]
    }
]);

export const leatherworkingStationRecipes = addProfessionRecipes(PROFESSIONS.Leatherworking)
.add(TIERS.Tier1, [
    {
        recipeName: 'Rough Cleaned Pelt',
        outputs: [{ itemName: 'Rough Cleaned Pelt', quantity: 1 }],
        effort: 50,
        ingredients: [
            { itemName: 'Rough Raw Pelt', quantity: 1 }
        ]
    },
    {
        recipeName: 'Rough Leather',
        outputs: [{ itemName: 'Rough Leather', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Tanned Pelt', quantity: 1 }
        ]
    },
    {
        recipeName: 'Basic Tannin',
        outputs: [{ itemName: 'Basic Tannin', quantity: 3 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Tree Bark', quantity: 1 },
            { itemName: 'Water Bucket', quantity: 2 }
        ]
    },
    {
        recipeName: 'Rough Leather Boots',
        outputs: [{ itemName: 'Rough Leather Boots', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 2 }
        ]
    },
    {
        recipeName: 'Rough Leather Gloves',
        outputs: [{ itemName: 'Rough Leather Boots', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 1 }
        ]
    },
    {
        recipeName: 'Refined Rough Leather',
        outputs: [{ itemName: 'Refined Rough Leather', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 5 },
            { itemName: 'Basic Leather Treatment', quantity: 1 },
        ]
    },
    {
        recipeName: 'Rough Textile',
        outputs: [{ itemName: 'Rough Textile', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Animal Hair', quantity: 1 },
            { itemName: 'Rough Straw', quantity: 1 },
        ]
    },
    {
        recipeName: 'Rough Leather Cap',
        outputs: [{ itemName: 'Rough Leather Cap', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 4 }
        ]
    },
    {
        recipeName: 'Rough Leather Belt',
        outputs: [{ itemName: 'Rough Leather Belt', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 2 }
        ]
    },
    {
        recipeName: 'Rough Leather Leggings',
        outputs: [{ itemName: 'Rough Leather Leggings', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 4 }
        ]
    },
    {
        recipeName: 'Rough Leather Shirt',
        outputs: [{ itemName: 'Rough Leather Shirt', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 4 }
        ]
    },
    {
        recipeName: 'Rough Leather Package',
        outputs: [{ itemName: 'Rough Leather Package', quantity: 1 }],
        effort: 5,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 100 }
        ]
    },
    {
        recipeName: 'Rough Leather Sheeting',
        outputs: [{ itemName: 'Rough Leather Sheeting', quantity: 1 }],
        effort: 5,
        ingredients: [
            { itemName: 'Rough Leather', quantity: 10 }
        ]
    },
])
// Add custom recipes
.add(TIERS.Tier1, [
    {
        recipeName: 'Rough Leather Armor Set (custom)',
        outputs: [ { itemName: 'Rough Leather Armor Set (custom)', quantity: 1 } ],
        effort: 0,
        ingredients: [
            { itemName: 'Rough Leather Boots', quantity: 1 },
            { itemName: 'Rough Leather Gloves', quantity: 1 },
            { itemName: 'Rough Leather Cap', quantity: 1 },
            { itemName: 'Rough Leather Belt', quantity: 1 },
            { itemName: 'Rough Leather Leggings', quantity: 1 },
            { itemName: 'Rough Leather Shirt', quantity: 1 }
        ]
    }
]);
