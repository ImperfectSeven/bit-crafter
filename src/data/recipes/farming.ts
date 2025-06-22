import { PROFESSIONS, STRUCTURES, TIERS } from '../../types/constants';
import { addProfessionRecipes, addStructureRecipes } from './utils';

// Example of structure recipes
export const farmRecipes = addStructureRecipes(STRUCTURES.Farm)
.add(TIERS.Tier1, [
    {
        recipeName: 'Basic Embergrain Plant',
        outputs: [{ itemName: 'Basic Embergrain Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Basic Embergrain Seeds', quantity: 1 },
            { itemName: 'Basic Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeName: 'Basic Embergrain Plant Starter',
        outputs: [{ itemName: 'Basic Embergrain Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Wild Grain Seeds', quantity: 5 },
            { itemName: 'Basic Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeName: 'Basic Starbulb Plant',
        outputs: [{ itemName: 'Basic Starbulb Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Basic Starbulb Seeds', quantity: 1 },
            { itemName: 'Basic Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeName: 'Basic Starbulb Plant Starter',
        outputs: [{ itemName: 'Basic Starbulb Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Wild Vegetable Seeds', quantity: 5 },
            { itemName: 'Basic Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeName: 'Basic Wispweave Plant',
        outputs: [{ itemName: 'Basic Wispweave Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Basic Wispweave Seeds', quantity: 1 },
            { itemName: 'Basic Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeName: 'Basic Wispweave Plant Starter',
        outputs: [{ itemName: 'Basic Wispweave Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Wild Fiberplant Seeds', quantity: 5 },
            { itemName: 'Basic Fertilizer', quantity: 1 },
        ]
    },

])
.add(TIERS.Tier2, [
    {
        recipeName: 'Simple Embergrain Plant',
        outputs: [{ itemName: 'Simple Embergrain Plant', quantity: 1 }],
        seconds: 15 * 60,
        ingredients: [
            { itemName: 'Simple Embergrain Seeds', quantity: 1 },
            { itemName: 'Simple Fertilizer', quantity: 1 },
            { itemName: 'Water Bucket', quantity: 1 },
        ]
    },
    {
        recipeName: 'Simple Embergrain Plant Starter',
        outputs: [{ itemName: 'Simple Embergrain Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Basic Embergrain Plant', quantity: 5 },
            { itemName: 'Simple Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeName: 'Simple Starbulb Plant',
        outputs: [{ itemName: 'Simple Starbulb Plant', quantity: 1 }],
        seconds: 15 * 60,
        ingredients: [
            { itemName: 'Starbulb Starbulb Seeds', quantity: 1 },
            { itemName: 'Simple Fertilizer', quantity: 1 },
            { itemName: 'Water Bucket', quantity: 1 },
        ]
    },
    {
        recipeName: 'Simple Starbulb Plant Starter',
        outputs: [{ itemName: 'Simple Starbulb Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Basic Starbulb Plant', quantity: 5 },
            { itemName: 'Simple Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeName: 'Simple Wispweave Plant',
        outputs: [{ itemName: 'Simple Wispweave Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Simple Wispweave Seeds', quantity: 1 },
            { itemName: 'Simple Fertilizer', quantity: 1 },
            { itemName: 'Water Bucket', quantity: 1 },
        ]
    },
    {
        recipeName: 'Simple Wispweave Plant Starter',
        outputs: [{ itemName: 'Simple Wispweave Plant', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Basic Wispweave Plant', quantity: 5 },
            { itemName: 'Simple Fertilizer', quantity: 1 },
        ]
    },
])
.add(TIERS.Tier3, [
    {
        recipeName: 'Infused Embergrain Plant',
        outputs: [{ itemName: 'Infused Embergrain Plant', quantity: 1 }],
        seconds: 30 * 60,
        ingredients: [
            { itemName: 'Simple Embergrain Plant', quantity: 5 },
            { itemName: 'Infused Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeName: 'Infused Starbulb Plant',
        outputs: [{ itemName: 'Infused Starbulb Plant', quantity: 1 }],
        seconds: 30 * 60,
        ingredients: [
            { itemName: 'Simple Starbulb Plant', quantity: 5 },
            { itemName: 'Infused Fertilizer', quantity: 1 },
        ]
    },
    {
        recipeName: 'Infused Wispweave Plant',
        outputs: [{ itemName: 'Infused Wispweave Plant', quantity: 1 }],
        seconds: 30 * 60,
        ingredients: [
            { itemName: 'Simple Wispweave Plant', quantity: 5 },
            { itemName: 'Infused Fertilizer', quantity: 1 },
        ]
    },
]);

export const farmingStationRecipes = addProfessionRecipes(PROFESSIONS.Farming)
.add(TIERS.Tier1, [
    {
        recipeName: 'Basic Fertilizer (Flower)',
        outputs: [{ itemName: 'Basic Fertilizer', quantity: 1 }],
        effort: 25,
        ingredients: [
            { itemName: 'Basic Flower', quantity: 5 }
        ]
    },
    {
        recipeName: 'Basic Fertilizer (Food Waste)',
        outputs: [{ itemName: 'Basic Fertilizer', quantity: 1 }],
        effort: 25,
        ingredients: [
            { itemName: 'Basic Food Waste', quantity: 2 }
        ]
    },
    {
        recipeName: 'Basic Fertilizer (Fish)',
        outputs: [{ itemName: 'Basic Fertilizer', quantity: 1 }],
        effort: 25,
        ingredients: [
            { itemName: 'Breezy Fin Darter Fillet', quantity: 2 }
        ]
    },
    {
        recipeName: 'Basic Fertilizer (Berry)',
        outputs: [{ itemName: 'Basic Fertilizer', quantity: 1 }],
        effort: 25,
        ingredients: [
            { itemName: 'Basic Berry', quantity: 2 }
        ]
    },
    {
        recipeName: 'Basic Embergrain Products',
        outputs: [
            { itemName: 'Basic EmberGrain Seeds', quantity: { min: 1, max: 3 } },
            { itemName: 'Basic EmberGrain', quantity: { min: 30, max: 50 } },
            { itemName: 'Rough Straw', quantity: { min: 0, max: 1 } }
        ],
        effort: 100,
        ingredients: [
            { itemName: 'Basic Embergrain Plant', quantity: 1 }
        ]
    },
    {
        recipeName: 'Basic Starbulb Products',
        outputs: [
            { itemName: 'Basic Starbulb Seeds', quantity: { min: 1, max: 3 } },
            { itemName: 'Basic Starbulb', quantity: { min: 5, max: 10 } },
            { itemName: 'Basic Crop Oil', quantity: { min: 0, max: 1 } }
        ],
        effort: 100,
        ingredients: [
            { itemName: 'Basic Starbulb Plant', quantity: 1 }
        ]
    },
    {
        recipeName: 'Basic Wispweave Products',
        outputs: [
            { itemName: 'Basic Wispweave Seeds', quantity: { min: 1, max: 3 } },
            { itemName: 'Rough Wispweave Filament', quantity: { min: 2, max: 5 } },
        ],
        effort: 100,
        ingredients: [
            { itemName: 'Basic Wispweave Plant', quantity: 1 }
        ]
    },
])
.add(TIERS.Tier2, [
    {
        recipeName: 'Simple Fertilizer (Flower)',
        outputs: [{ itemName: 'Simple Fertilizer', quantity: 1 }],
        effort: 30,
        ingredients: [
            { itemName: 'Simple Flower', quantity: 5 }
        ]
    },
    {
        recipeName: 'Simple Fertilizer (Food Waste)',
        outputs: [{ itemName: 'Simple Fertilizer', quantity: 1 }],
        effort: 30,
        ingredients: [
            { itemName: 'Simple Food Waste', quantity: 2 }
        ]
    },
    {
        recipeName: 'Simple Fertilizer (Fish)',
        outputs: [{ itemName: 'Simple Fertilizer', quantity: 1 }],
        effort: 30,
        ingredients: [
            { itemName: 'Emberfin Shiner Filet', quantity: 2 }
        ]
    },
    {
        recipeName: 'Simple Fertilizer (Berry)',
        outputs: [{ itemName: 'Simple Fertilizer', quantity: 1 }],
        effort: 30,
        ingredients: [
            { itemName: 'Simple Berry', quantity: 2 }
        ]
    },
    {
        recipeName: 'Simple Embergrain Products',
        outputs: [
            { itemName: 'Simple EmberGrain Seeds', quantity: { min: 1, max: 3 } },
            { itemName: 'Simple EmberGrain', quantity: { min: 30, max: 50 } },
            { itemName: 'Simple Straw', quantity: { min: 0, max: 1 } }
        ],
        effort: 130,
        ingredients: [
            { itemName: 'Simple Embergrain Plant', quantity: 1 }
        ]
    },
    {
        recipeName: 'Simple Starbulb Products',
        outputs: [
            { itemName: 'Simple Starbulb Seeds', quantity: { min: 1, max: 3 } },
            { itemName: 'Simple Starbulb', quantity: { min: 5, max: 10 } },
            { itemName: 'Simple Crop Oil', quantity: { min: 0, max: 1 } }
        ],
        effort: 130,
        ingredients: [
            { itemName: 'Simple Starbulb Plant', quantity: 1 }
        ]
    },
    {
        recipeName: 'Simple Wispweave Products',
        outputs: [
            { itemName: 'Simple Wispweave Seeds', quantity: { min: 1, max: 3 } },
            { itemName: 'Simple Wispweave Filament', quantity: { min: 2, max: 5 } },
        ],
        effort: 130,
        ingredients: [
            { itemName: 'Simple Wispweave Plant', quantity: 1 }
        ]
    }
]);