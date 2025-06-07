import { PROFESSIONS, TIERS } from '../../types/constants';
import { addProfessionRecipes } from './utils';

export const forestryStationRecipes = addProfessionRecipes(PROFESSIONS.Forestry)
.add(TIERS.Tier1, [
    {
        recipeName: 'Potted Oak Sapling',
        effort: 100,
        outputs: [
            { itemName: 'Potted Oak Sapling', quantity: 1 },
        ],
        ingredients: [
            { itemName: 'Oak Seed', quantity: 1 },
            { itemName: 'Basic Fertilizer', quantity: 2 },
            { itemName: 'Water Bucket', quantity: 3 },
            { itemName: 'Rough Forester\s Pot', quantity: 1 }
        ]
    },
    {
        recipeName: 'Rough Wood Log Output',
        effort: 50,
        outputs: [
            { itemName: 'Rough Wood Log', quantity: 6 },
            { itemName: 'Basic Amber Resin', quantity: { min: 0, max: 1 } }
        ],
        ingredients: [
            { itemName: 'Rough Wood Trunk', quantity: 1 }
        ]
    },
    {
        recipeName: 'Rough Tree Bark Output',
        effort: 100,
        outputs: [
            { itemName: 'Rough Tree Bark', quantity: 4 },
            { itemName: 'Basic Amber Resin', quantity: { min: 0, max: 1 } }
        ],
        ingredients: [
            { itemName: 'Rough Wood Trunk', quantity: 1 }
        ]
    },
    {
        recipeName: 'Rough Wood Log Package',
        effort: 5,
        outputs: [
            { itemName: 'Rough Wood Log Package', quantity: 1 },
        ],
        ingredients: [
            { itemName: 'Rough Wood Log', quantity: 100 }
        ]
    },
])
.add(TIERS.Tier2, [
    {
        recipeName: 'Simple Tree Bark Output',
        effort: 130,
        outputs: [
            { itemName: 'Simple Tree Bark', quantity: 4 },
            { itemName: 'Simple Amber Resin', quantity: { min: 0, max: 1 } }
        ],
        ingredients: [
            { itemName: 'Simple Wood Trunk', quantity: 1 }
        ]
    },
    {
        recipeName: 'Simple Wood Log Output',
        effort: 65,
        outputs: [
            { itemName: 'Simple Wood Log', quantity: 6 },
            { itemName: 'Simple Amber Resin', quantity: { min: 0, max: 1 } }
        ],
        ingredients: [
            { itemName: 'Simple Wood Log', quantity: 1 }
        ]
    }
]);