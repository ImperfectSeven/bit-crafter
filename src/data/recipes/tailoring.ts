import { PROFESSIONS, STRUCTURES, TIERS } from "../../types/constants";
import { addProfessionRecipes, addStructureRecipes } from "./utils";

export const tailoringRecipes = addProfessionRecipes(PROFESSIONS.Tailoring)
.add(TIERS.Tier1, [
    {
        recipeName: 'Rough Cloth',
        outputs: [{ itemName: 'Rough Cloth', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Cloth Strip', quantity: 1 },
            { itemName: 'Rough Wispweave Filament', quantity: 5 }
        ],
    },
    {
        recipeName: 'Rough Rope',
        outputs: [{ itemName: 'Rough Rope', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Cloth Strip', quantity: 1 },
        ],
    },
    {
        recipeName: 'Rough Spool of Thread',
        outputs: [{ itemName: 'Rough Spool of Thread', quantity: 1 }],
        effort: 50,
        ingredients: [
            { itemName: 'Rough Plant Fiber', quantity: 40 }
        ],
    },
    {
        recipeName: 'Rough Woven Gloves',
        outputs: [{ itemName: 'Rough Woven Gloves', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 1 },
        ],
    },
    {
        recipeName: 'Rough Woven Shoes',
        outputs: [{ itemName: 'Rough Woven Shoes', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 2 },
        ],
    },
    {
        recipeName: 'Rough Woven Shirt',
        outputs: [{ itemName: 'Rough Woven Shirt', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 4 },
        ],
    },
    {
        recipeName: 'Rough Woven Shorts',
        outputs: [{ itemName: 'Rough Woven Shorts', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 4 },
        ],
    },
    {
        recipeName: 'Rough Woven Belt',
        outputs: [{ itemName: 'Rough Woven Belt', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 2 },
        ],
    },
    {
        recipeName: 'Rough Woven Cap',
        outputs: [{ itemName: 'Rough Woven Cap', quantity: 1 }],
        effort: 200,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 4 },
        ],
    },
    {
        recipeName: 'Refined Rough Cloth',
        outputs: [{ itemName: 'Refined Rough Cloth', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 5 },
            { itemName: 'Rough Textile', quantity: 1 }
        ],
    },
    {
        recipeName: 'Rough Cloth Tarp',
        outputs: [{ itemName: 'Rough Cloth Tarp', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 10 },
        ],
    }, {
        recipeName: 'Rough Cloth Package',
        outputs: [{ itemName: 'Rough Cloth Package', quantity: 1 }],
        effort: 5,
        ingredients: [
            { itemName: 'Rough Cloth', quantity: 100 },
        ],
    }, {
        recipeName: 'Refined Rough Cloth Package',
        outputs: [{ itemName: 'Refined Rough Cloth Package', quantity: 1 }],
        effort: 5,
        ingredients: [
            { itemName: 'Refined Rough Cloth', quantity: 100 },
        ],
    }
])
// Add custom recipes
.add(TIERS.Tier1, [
    {
        recipeName: 'Rough Woven Set (custom)',
        outputs: [
            { itemName: 'Rough Woven Set (custom)', quantity: 1 },
        ],
        effort: 0,
        ingredients: [
           { itemName: 'Rough Woven Cap', quantity: 1 },
            { itemName: 'Rough Woven Shirt', quantity: 1 },
            { itemName: 'Rough Woven Shorts', quantity: 1 },
            { itemName: 'Rough Woven Shoes', quantity: 1 },
            { itemName: 'Rough Woven Gloves', quantity: 1 },
            { itemName: 'Rough Woven Belt', quantity: 1 },
        ],
    }
]);

export const loomRecipes = addStructureRecipes(STRUCTURES.Loom)
.add(TIERS.Tier1, [
    {
        recipeName: 'Rough Cloth Strip',
        outputs: [{ itemName: 'Rough Cloth Strip', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Rough Spool of Thread', quantity: 1 }
        ],
    }
]);