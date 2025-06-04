import { PROFESSIONS, STRUCTURES, TIERS } from "../../types/constants";
import { addProfessionRecipes, addStructureRecipes } from "./utils";

export const ovenRecipes = addStructureRecipes(STRUCTURES.Oven)
.add(TIERS.Tier1, [
    {
        recipeName: 'Plain Bread',
        outputs: [{ itemName: 'Plain Bread', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Basic Embergrain Dough', quantity: 1 }
        ]
    },
    {
        recipeName: 'Plain Berry Pie',
        outputs: [{ itemName: 'Plain Berry Pie', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Plain Raw Berry Pie', quantity: 1 }
        ]
    },
    {
        recipeName: 'Plain Bulb Rolls',
        outputs: [{ itemName: 'Plain Bulb Rolls', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Plain Raw Bulb Rolls', quantity: 1 }
        ]
    },
    {
        recipeName: 'Sugar',
        outputs: [{ itemName: 'Sugar', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Tree Sap', quantity: 1 }
        ]
    }
]);

export const cookingStationRecipes = addProfessionRecipes(PROFESSIONS.Cooking)
.add(TIERS.Tier1, [
    {
        recipeName: 'Basic Embergrain Dough',
        outputs: [{ itemName: 'Basic Embergrain Dough', quantity: 1 }],
        effort: 20,
        ingredients: [{ itemName: 'Basic Embergrain', quantity: 20 }]
    },
    {
        recipeName: 'Plain Cooked Berries',
        outputs: [{ itemName: 'Plain Cooked Berries', quantity: 1 }],
        effort: 20,
        ingredients: [{ itemName: 'Basic Berry', quantity: 5 }]
    },
    {
        recipeName: 'Plain Mushroom Skewer',
        outputs: [{ itemName: 'Plain Mushroom Skewer', quantity: 1 }],
        effort: 20,
        ingredients: [{ itemName: 'Basic Mushroom', quantity: 5 }]
    },
    {
        recipeName: 'Plain Roasted Meat',
        outputs: [{ itemName: 'Plain Roasted Meat', quantity: 1 }],
        effort: 20,
        ingredients: [{ itemName: 'Basic Meat', quantity: 1 }]
    },
    {
        recipeName: 'Plain Skewered Baitfish',
        outputs: [{ itemName: 'Plain Skewered Baitfish', quantity: 1 }],
        effort: 20,
        ingredients: [{ itemName: 'Moonlit Crawdad', quantity: 2 }]
    },
    {
        recipeName: 'Plain Roasted Fish',
        outputs: [{ itemName: 'Plain Roasted Fish', quantity: 1 }],
        effort: 20,
        ingredients: [{ itemName: 'Breezy Fin Darter Filet', quantity: 1 }]
    },
    {
        recipeName: 'Plain Fish and Bulbs',
        outputs: [{ itemName: 'Plain Fish and Bulbs', quantity: 1 }],
        effort: 20,
        ingredients: [
            { itemName: 'Plain Roasted Fish', quantity: 2 },
            { itemName: 'Plain Mashed Bulbs', quantity: 1 }
        ]
    },
    {
        recipeName: 'Plain Ground Meat and Mashed Bulbs',
        outputs: [{ itemName: 'Plain Ground Meat and Mashed Bulbs', quantity: 1 }],
        effort: 20,
        ingredients: [
            { itemName: 'Plain Roasted Meat', quantity: 2 },
            { itemName: 'Plain Mashed Bulbs', quantity: 1 }
        ]
    },
    {
        recipeName: 'Plain Meat Sandwich',
        outputs: [{ itemName: 'Plain Meat Sandwich', quantity: 1 }],
        effort: 20,
        ingredients: [
            { itemName: 'Plain Roasted Meat', quantity: 2 },
            { itemName: 'Plain Bread', quantity: 1 }
        ]
    },
    {
        recipeName: 'Plain Raw Berry Pie',
        outputs: [{ itemName: 'Plain Raw Berry Pie', quantity: 1 }],
        effort: 20,
        ingredients: [
            { itemName: 'Plain Cooked Berries', quantity: 5 },
            { itemName: 'Basic Embergrain Dough', quantity: 1 }
        ]
    },
    {
        recipeName: 'Plain Mushroom Stuffed Bulbs',
        outputs: [{ itemName: 'Plain Mushroom Stuffed Bulbs', quantity: 1 }],
        effort: 20,
        ingredients: [
            { itemName: 'Basic Mushroom', quantity: 10 },
            { itemName: 'Plain Mashed Bulbs', quantity: 2 }
        ]
    },
    {
        recipeName: 'Plain Raw Bulb Rolls',
        outputs: [{ itemName: 'Plain Raw Bulb Rolls', quantity: 1 }],
        effort: 20,
        ingredients: [
            { itemName: 'Plain Masehd Bulbs', quantity: 2 },
            { itemName: 'Basic Embergrain Dough', quantity: 1 }
        ]
    },
    {
        recipeName: 'Plain Hot Tea',
        outputs: [{ itemName: 'Plain Hot Tea', quantity: 1 }],
        effort: 20,
        ingredients: [
            { itemName: 'Basic Flower', quantity: 5 },
            { itemName: 'Water Bucket', quantity: 1 }
        ]
    },
    {
        recipeName: 'Plain Chilling Tea',
        outputs: [{ itemName: 'Plain Chilling Tea', quantity: 1 }],
        effort: 20,
        ingredients: [
            { itemName: 'Basic Flower', quantity: 5 },
            { itemName: 'Water Bucket', quantity: 1 }
        ]
    },
    {
        recipeName: 'Plain Mashed Bulbs Output',
        outputs: [{ itemName: 'Plain Mashed Bulbs', quantity: 1 }],
        effort: 20,
        ingredients: [{ itemName: 'Basic Starbulb', quantity: 5 }]
    }
])
.add(TIERS.Tier2, [
    {
        recipeName: 'Savory Mushroom Skewer',
        outputs: [{ itemName: 'Savory Mushroom Skewer', quantity: 1 }],
        effort: 25,
        ingredients: [{ itemName: 'Simple Mushroom', quantity: 5 }]
    },
    {
        recipeName: 'Savory Skewered Baitfish',
        outputs: [{ itemName: 'Savory Skewered Baitfish', quantity: 1 }],
        effort: 25,
        ingredients: [{ itemName: 'Driftwood Crayfish', quantity: 2 }]
    },
    {
        recipeName: 'Savory Roasted Fish',
        outputs: [{ itemName: 'Savory Roasted Fish', quantity: 1 }],
        effort: 25,
        ingredients: [{ itemName: 'Emberfin Shiner Filet', quantity: 1 }]
    }
]);