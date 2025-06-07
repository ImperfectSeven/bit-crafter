import { PROFESSIONS, TIERS } from "../../types/constants";
import { addProfessionRecipes } from "./utils";

export const carpentyRecipes = addProfessionRecipes(PROFESSIONS.Carpentry)
.add(TIERS.Tier1, [
    {
        recipeName: 'Deed: Cart',
        effort: 100,
        outputs: [{ itemName: 'Deed: Cart', quantity: 1 }],
        ingredients: [
            { itemName: 'Rough Plank', quantity: 2 },
            { itemName: 'Rough Rope', quantity: 1 }
        ]
    },
    {
        recipeName: 'Rough Plank',
        effort: 40,
        outputs: [{ itemName: 'Rough Plank', quantity: 1 }],
        ingredients: [
            { itemName: 'Rough Stripped Wood', quantity: 1 },
        ]
    },
    {
        recipeName: 'Rough Stripped Wood',
        effort: 50,
        outputs: [{ itemName: 'Rough Stripped Wood', quantity: 1 }],
        ingredients: [
            { itemName: 'Rough Wood Log', quantity: 3 },
        ]
    },
    {
        recipeName: 'Refined Rough Plank',
        effort: 100,
        outputs: [{ itemName: 'Refined Rough Plank', quantity: 1 }],
        ingredients: [
            { itemName: 'Rough Plank', quantity: 5 },
            { itemName: 'Basic Wood Polish', quantity: 1 }
        ]
    },
    {
        recipeName: 'Empty Bucket',
        effort: 50,
        outputs: [{ itemName: 'Empty Bucket', quantity: 10 }],
        ingredients: [
            { itemName: 'Rough Plank', quantity: 1 },
        ]
    },
    {
        recipeName: 'Campfire Kit',
        effort: 100,
        outputs: [{ itemName: 'Campfire Kit', quantity: 1 }],
        ingredients: [
            { itemName: 'Rough Plank', quantity: 4 },
            { itemName: 'Rough Pebbles', quantity: 4 }
        ]
    },
    {
        recipeName: 'Rough Timber',
        effort: 100,
        outputs: [{ itemName: 'Rough Timber', quantity: 1 }],
        ingredients: [
            { itemName: 'Rough Plank', quantity: 20 },
        ]
    },
    {
        recipeName: 'Rough Wood Plank Package',
        effort: 5,
        outputs: [{ itemName: 'Rough Wood Plank Package', quantity: 1 }],
        ingredients: [
            { itemName: 'Rough Plank', quantity: 100 },
        ]
    },
    {
        recipeName: 'Refined Rough Wood Plank Package',
        effort: 5,
        outputs: [{ itemName: 'Refined Rough Wood Plank Package', quantity: 1 }],
        ingredients: [
            { itemName: 'Refined Rough Plank', quantity: 100 },
        ]
    }
])
.add(TIERS.Tier2, [
    {
        recipeName: 'Simple Stripped Wood',
        effort: 65,
        outputs: [{ itemName: 'Simple Stripped Wood', quantity: 1 }],
        ingredients: [
            { itemName: 'Simple Wood Log', quantity: 3 },
        ]
    }
]);