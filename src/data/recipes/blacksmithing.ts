import { PROFESSIONS, STRUCTURES, TIERS } from "../../types/constants";
import { addProfessionRecipes, addStructureRecipes } from "./utils";

export const smelterRecipes = addStructureRecipes(STRUCTURES.Smelter)
    .add(TIERS.Tier1, [
        {
            recipeName: 'Molten Ferralith',
            outputs: [{ itemName: 'Molten Ferralith', quantity: 1 }],
            seconds: 5 * 60,
            ingredients: [
                { itemName: 'Ferralith Ore Concentrate', quantity: 1 },
                { itemName: 'Rough Wood Log', quantity: 1 }
            ]
        }
    ])
    .add(TIERS.Tier2, [
        {
            recipeName: 'Molten Pyrelite',
            outputs: [{ itemName: 'Molten Pyrelite', quantity: 1 }],
            seconds: 15 * 60,
            ingredients: [
                { itemName: 'Pyrelite Ore Concentrate', quantity: 1 },
                { itemName: 'Simple Wood Log', quantity: 1 }
            ]
        }
    ]);

export const smithingStationRecipes = addProfessionRecipes(PROFESSIONS.Smithing)
    .add(TIERS.Tier1, [
        {
            recipeName: 'Ferralith Ore Concentrate',
            effort: 50,
            outputs: [{ itemName: 'Ferralith Ore Concentrate', quantity: 1 }],
            ingredients: [{ itemName: 'Ferralith Ore Piece', quantity: 2 }]
        },
        {
            recipeName: 'Ferralith Ingot',
            effort: 100,
            outputs: [{ itemName: 'Ferralith Ingot', quantity: 1 }],
            ingredients: [{ itemName: 'Molten Ferralith', quantity: 1 }]
        },
        {
            recipeName: 'Ferralith Nails',
            effort: 100,
            outputs: [{ itemName: 'Ferralith Nails', quantity: 5 }],
            ingredients: [{ itemName: 'Ferralith Ingot', quantity: 1 }]
        },
        {
            recipeName: 'Ferralith Plated Bracers',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Plated Bracers', quantity: 1 }],
            ingredients: [{ itemName: 'Ferralith Ingot', quantity: 1 }]
        },
        {
            recipeName: 'Ferralith Plated Boots',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Plated Boots', quantity: 1 }],
            ingredients: [{ itemName: 'Ferralith Ingot', quantity: 2 }]
        },
        {
            recipeName: 'Refined Ferralth Ingot',
            effort: 100,
            outputs: [{ itemName: 'Refined Ferralth Ingot', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 5 },
                { itemName: 'Basic Metal Solvent', quantity: 1 }
            ]
        },
        {
            recipeName: 'Ferralith Shortsword',
            effort: 100,
            outputs: [{ itemName: 'Ferralith Shortsword', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 5 },
                { itemName: 'Rough Rope', quantity: 1 },
                { itemName: 'Rough Plank', quantity: 1 },
                { itemName: 'Rough Leather', quantity: 1 },
            ]
        },
        {
            recipeName: 'Ferralith Claymore',
            effort: 100,
            outputs: [{ itemName: 'Ferralith Claymore', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 5 },
                { itemName: 'Rough Rope', quantity: 1 },
                { itemName: 'Rough Plank', quantity: 1 },
                { itemName: 'Rough Leather', quantity: 1 },
            ]
        },
        {
            recipeName: 'Ferralith Hoe',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Hoe', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Plated Armor',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Plated Armor', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 5 },
                { itemName: 'Rough Cloth', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Quill',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Quill', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Rod',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Rod', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Machete',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Machete', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Daggers',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Daggers', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 5 },
                { itemName: 'Rough Rope', quantity: 1 },
                { itemName: 'Rough Plank', quantity: 1 },
                { itemName: 'Rough Leather', quantity: 1 },
            ]
        },
        {
            recipeName: 'Ferralith Plated Legguards',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Plated Legguards', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Cloth', quantity: 1 },
            ]
        },
        {
            recipeName: 'Ferralith Plated Belt',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Plated Belt', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Scissors',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Scissors', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Axe',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Axe', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Saw',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Saw', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Crossbow',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Crossbow', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 5 },
                { itemName: 'Rough Rope', quantity: 1 },
                { itemName: 'Rough Plank', quantity: 1 },
                { itemName: 'Rough Leather', quantity: 1 },
            ]
        },
        {
            recipeName: 'Ferralith Knife',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Knife', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Hammer',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Hammer', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Pickaxe',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Pickaxe', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Mace',
            effort: 100,
            outputs: [{ itemName: 'Ferralith Mace', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 5 },
                { itemName: 'Rough Rope', quantity: 1 },
                { itemName: 'Rough Plank', quantity: 1 },
                { itemName: 'Rough Leather', quantity: 1 },
            ]
        },
        {
            recipeName: 'Ferralith Spear & Shield',
            effort: 100,
            outputs: [{ itemName: 'Ferralith Spear & Shield', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 5 },
                { itemName: 'Rough Rope', quantity: 1 },
                { itemName: 'Rough Plank', quantity: 1 },
                { itemName: 'Rough Leather', quantity: 1 },
            ]
        },
        {
            recipeName: 'Ferralith Chisel',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Chisel', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Plated Helm',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Plated Helm', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Cloth', quantity: 1 },
            ]
        },
        {
            recipeName: 'Ferralith Bow',
            effort: 200,
            outputs: [{ itemName: 'Ferralith Bow', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 4 },
                { itemName: 'Rough Rope', quantity: 2 },
                { itemName: 'Rough Plank', quantity: 2 },
                { itemName: 'Rough Leather', quantity: 2 },
            ]
        },
        {
            recipeName: 'Ferralith Ingot Package',
            effort: 5,
            outputs: [{ itemName: 'Ferralith Ingot Package', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 100 },
            ]
        },
        {
            recipeName: 'Ferralith Frames',
            effort: 100,
            outputs: [{ itemName: 'Ferralith Frames', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 10 },
            ]
        }

    ])
    // Add custom recipes
    .add(TIERS.Tier1, [
        {
            recipeName: 'Ferralith Armor Set (custom)',
            effort: 0,
            outputs: [{ itemName: 'Ferralith Armor Set (custom)', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Plated Bracers', quantity: 1 },
                { itemName: 'Ferralith Plated Boots', quantity: 1 },
                { itemName: 'Ferralith Plated Armor', quantity: 1 },
                { itemName: 'Ferralith Plated Legguards', quantity: 1 },
                { itemName: 'Ferralith Plated Belt', quantity: 1 },
                { itemName: 'Ferralith Plated Helm', quantity: 1 }
            ]
        },
        {
            recipeName: 'Ferralith Tools Set (custom)',
            effort: 0,
            outputs: [{ itemName: 'Ferralith Tools Set (custom)', quantity: 1 }],
            ingredients: [
                { itemName: 'Ferralith Saw', quantity: 1 },
                { itemName: 'Ferralith Hoe', quantity: 1 },
                { itemName: 'Ferralith Rod', quantity: 1 },
                { itemName: 'Ferralith Machete', quantity: 1 },
                { itemName: 'Ferralith Axe', quantity: 1 },
                { itemName: 'Ferralith Bow', quantity: 1 },
                { itemName: 'Ferralith Knife', quantity: 1 },
                { itemName: 'Ferralith Chisel', quantity: 1 },
                { itemName: 'Ferralith Pickaxe', quantity: 1 },
                { itemName: 'Ferralith Quill', quantity: 1 },
                { itemName: 'Ferralith Hammer', quantity: 1 },
                { itemName: 'Ferralith Scissors', quantity: 1 },

            ]
        }
    ])
    .add(TIERS.Tier2, [
        {
            recipeName: 'Pyrelite Ore Concentrate',
            effort: 65,
            outputs: [{ itemName: 'Pyrelite Ore Concentrate', quantity: 1 }],
            ingredients: [
                { itemName: 'Pyrelite Ore Piece', quantity: 2 }
            ]
        },
        {
            recipeName: 'Pyrelite Ingot',
            effort: 130,
            outputs: [{ itemName: 'Pyrelite Ingot', quantity: 1 }],
            ingredients: [{ itemName: 'Molten Pyrelite', quantity: 1 }]
        }
    ]);