import { PROFESSIONS, STRUCTURES, TIERS } from '../../types/constants';
import { addProfessionRecipes, addStructureRecipes } from './utils';

export const kilnRecipes = addStructureRecipes(STRUCTURES.Kiln)
.add(TIERS.Tier1, [
    {
        recipeName: 'Rough Brick',
        outputs: [{ itemName: 'Rough Brick', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Unfired Rough Brick', quantity: 1 },
            { itemName: 'Rough Wood Log', quantity: 1 }
        ]
    },
    {
        recipeName: 'Rough Forester\'s Pot',
        outputs: [{ itemName: 'Rough Forester\'s Pot', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Rough Unfired Forester\'s Pot', quantity: 1 },
            { itemName: 'Rough Wood Log', quantity: 1 }
        ]
    },
    {
        recipeName: 'Rough Glass',
        outputs: [{ itemName: 'Rough Glass', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Basic Sand', quantity: 5 }
        ]
    },
    {
        recipeName: 'Pitch',
        outputs: [{ itemName: 'Pitch', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Tree Sap', quantity: 1 }
        ]
    }
]);

export const masonryStationRecipes = addProfessionRecipes(PROFESSIONS.Masonry)
.add(TIERS.Tier1, [
    {
        recipeName: 'Rough Unfired Forester\'s Pot',
        outputs: [{ itemName: 'Rough Unfired Forester\'s Pot', quantity: 1 }],
        effort: 100,
        ingredients: [{ itemName: 'Basic Potter\s Mix', quantity: 5 }]
    },
    {
        recipeName: 'Rough Diamond',
        outputs: [{ itemName: 'Rough Diamond', quantity: 1 }],
        effort: 100,
        ingredients: [{ itemName: 'Rough Diamond Fragment', quantity: 5 }]
    },
    {
        recipeName: 'Rough Sapphire',
        outputs: [{ itemName: 'Rough Sapphire', quantity: 1 }],
        effort: 100,
        ingredients: [{ itemName: 'Rough Sapphire Fragment', quantity: 5 }]
    },
    {
        recipeName: 'Rough Gem',
        outputs: [
            { itemName: 'Uncut Rough Ruby', quantity: { min: 0, max: 1 } },
            { itemName: 'Uncut Rough Diamond', quantity: { min: 0, max: 1 } },
            { itemName: 'Uncut Rough Emerald', quantity: { min: 0, max: 1 } },
            { itemName: 'Uncut Rough Sapphire', quantity: { min: 0, max: 1 } },
        ],
        effort: 100,
        ingredients: [{ itemName: 'Rough Geode', quantity: 5 }]
    },
    {
        recipeName: 'Rough Jakyl Fang Amulet',
        outputs: [{ itemName: 'Rough Jakyl Fang Amulet', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Jakyl Fang', quantity: 1 },
            { itemName: 'Ferralith Ingot', quantity: 2 },
            { itemName: 'Jakyl Fur', quantity: 1 },
        ]
    },
    {
        recipeName: 'Basic Potter\'s Mix',
        outputs: [{ itemName: 'Basic Potter\'s Mix', quantity: 1 }],
        effort: 50,
        ingredients: [
            { itemName: 'Rough Pebbles', quantity: 5 },
            { itemName: 'Basic Clay Lump', quantity: 2 }
        ]
    },
    {
        recipeName: 'Refined Rough Brick',
        outputs: [{ itemName: 'Refined Rough Brick', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Brick', quantity: 5 },
            { itemName: 'Basic Firesand', quantity: 1 }
        ]
    },
    {
        recipeName: 'Rough Umbura Fang Amulet',
        outputs: [{ itemName: 'Rough Umbura Fang Amulet', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Umbura Fang', quantity: 1 },
            { itemName: 'Ferralith Ingot', quantity: 2 },
            { itemName: 'Umbura Fur', quantity: 1 },
        ]
    },
    {
        recipeName: 'Rough Glass Vial',
        outputs: [{ itemName: 'Rough Glass Vial', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Glass', quantity: 1 },
        ]
    },
    {
        recipeName: 'Rough Gem Fragments',
        outputs: [
            { itemName: 'Rough Diamond Fragment', quantity: { min: 0, max: 1 } },
            { itemName: 'Rough Sapphire Fragment', quantity: { min: 0, max: 1 } },
            { itemName: 'Rough Emerald Fragment', quantity: { min: 0, max: 1 } },
            { itemName: 'Rough Ruby Fragment', quantity: { min: 0, max: 1 } },
            { itemName: 'Rough Diamond', quantity: { min: 0, max: 1 } },
            { itemName: 'Rough Sapphire', quantity: { min: 0, max: 1 } },
            { itemName: 'Rough Emerald', quantity: { min: 0, max: 1 } },
            { itemName: 'Rough Ruby', quantity: { min: 0, max: 1 } },
        ],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Pebbles', quantity: 20 },
        ]
    },
    { 
        recipeName: 'Unfired Rough Brick',
        outputs: [{ itemName: 'Unfired Rough Brick', quantity: 1 }],
        effort: 100,
        ingredients: [{ itemName: 'Basic Potter\'s Mix', quantity: 1 }]
    },
    {
        recipeName: 'Rough Brick Slab',
        outputs: [{ itemName: 'Rough Brick Slab', quantity: 1 }],
        effort: 100,
        ingredients: [{ itemName: 'Rough Brick', quantity: 10 }]
    },
    {
        recipeName: 'Rough Brick Package',
        outputs: [{ itemName: 'Rough Brick Package', quantity: 1 }],
        effort: 100,
        ingredients: [{ itemName: 'Rough Brick', quantity: 100 }]
    }

]);