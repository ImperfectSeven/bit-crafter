import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import { ROUGH_TIERS, BASIC_TIERS, TIERS, ORE_TIERS } from "./item-tiers";


const constantItems = (): Record<string, ItemRecipe[]> => {
    const common = {
        tier: 0,
        profession: PROFESSIONS.Construction,
        station: STRUCTURES.None,
    };

    return {
        'Crude Workbench': [{
            ...common,
            output: 1,
            ingredients: [{ itemName: 'Stick', quantity: 8 }],
            effort: 5,
        }],
        'Farming Field': [{
            ...common,
            output: 1,
            ingredients: [{ itemName: 'Basic Fertilizer', quantity: 1 }],
        }],
        'Large Farming Field': [{
            ...common,
            output: 1,
            ingredients: [{ itemName: 'Basic Fertilizer', quantity: 7 }],
        }],
        'Long Farming Field Row': [{
            ...common,
            output: 1,
            ingredients: [{ itemName: 'Basic Fertilizer', quantity: 5 }],
        }],
        'Short Farming Field Row': [{
            ...common,
            output: 1,
            ingredients: [{ itemName: 'Basic Fertilizer', quantity: 3 }],
        }],
        'Cooking Station': [{
            ...common,
            output: 1,
            ingredients: [
                { itemName: 'Ferralith Ingot', quantity: 5 },
                { itemName: 'Rough Wood Trunk', quantity: 1 },
                { itemName: 'Rough Plant Roots', quantity: 1 },
                { itemName: 'Rough Stone Chunk', quantity: 1 },
            ],
        }],
        'Small Fence': [{
            ...common,
            output: 1,
            ingredients: [{ itemName: 'Rough Wood Log', quantity: 2 }],
        }],
        'Wooden Gate': [{
            ...common,
            output: 1,
            ingredients: [
                { itemName: 'Rough Wood Log', quantity: 4 },
                { itemName: 'Rough Wood Trunk', quantity: 2 }
            ],
        }],
        'Wooden Wall': [{
            ...common,
            output: 1,
            ingredients: [
                { itemName: 'Rough Wood Trunk', quantity: 1 }
            ],
        }],
    };
};

const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];
        const prevRoughTier = tier > 0 ? ROUGH_TIERS[tier - 1] : null;
        const basicTier = BASIC_TIERS[tier];
        const oreTier = ORE_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Construction,
            station: STRUCTURES.None,
        };

        return {
            ...acc,
            [`${roughTier} Barter Counter`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Plank`, quantity: 6 },
                    { itemName: `${roughTier} Cloth Strip`, quantity: 2 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Wood Trunk`, quantity: 2 },
                ],
            }],
            [`${roughTier} Barter Stall`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Plank`, quantity: 6 },
                    { itemName: `${roughTier} Cloth Strip`, quantity: 2 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Wood Trunk`, quantity: 2 },
                ],
            }],
            [`${roughTier} Well`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Brick`, quantity: 10 },
                ],
            }],
            [`${roughTier} Oven`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Clay Lump`, quantity: 20 },
                    { itemName: `${roughTier} Brick Slab`, quantity: 2 },
                ],
            }],
            [`${roughTier} Foraging Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Plant Roots`, quantity: 2 },
                    { itemName: `${roughTier} Wood Trunk Slab`, quantity: 2 },
                ],
            }],
            [`${roughTier} Forestry Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Plant Roots`, quantity: 2 },
                    { itemName: `${roughTier} Wood Trunk Slab`, quantity: 2 },
                ],
            }],
            [`${roughTier} Carpentry Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Wood Logs`, quantity: 20 },
                    { itemName: `${roughTier} Plant Fiber`, quantity: 20 },
                ],
            }],
            [`${roughTier} Carpentry Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Timber`, quantity: 2 },
                    { itemName: `${roughTier} Plant Fiber`, quantity: 40 },
                ],
            }],
            [`${roughTier} Loom`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Timber`, quantity: 4 },
                    { itemName: `${roughTier} Spool of Thread`, quantity: 5 },
                ].concat(tier === 2 ? [{ itemName: `Refined ${prevRoughTier} Cloth`, quantity: 1 }] : []),
            }],
            [`${roughTier} Farming Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Rope`, quantity: 3 },
                    { itemName: `${roughTier} Timber`, quantity: 2 },
                ],
            }],
            [`${roughTier} Fishing Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Timber`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 5 },
                ].concat(tier === 2 ? [{ itemName: `Refined ${prevRoughTier} Plank`, quantity: 1 }] : []),
            }],
            [`${roughTier} Hunting Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Rope`, quantity: 5 },
                    { itemName: `${roughTier} Timber`, quantity: 2 },
                    { itemName: `${roughTier} Slab`, quantity: 2 },
                ],
            }],
            [`${roughTier} Leatherworking Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Rope`, quantity: 5 },
                    { itemName: `${roughTier} Timber`, quantity: 2 },
                    { itemName: `${roughTier} Slab`, quantity: 2 },
                ].concat(tier === 2 ? [{ itemName: `Refined ${prevRoughTier} Leather`, quantity: 1 }] : []),
            }],
            [`${roughTier} Scholar Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Rope`, quantity: 5 },
                    { itemName: `${roughTier} Timber`, quantity: 4 },
                ].concat(tier === 2 ? [{ itemName: `Refined ${prevRoughTier} Plank`, quantity: 1 }] : []),
            }],
            [`${roughTier} Smithing Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Rope`, quantity: 5 },
                    { itemName: `${roughTier} Timber`, quantity: 2 },
                    { itemName: `${roughTier} Slab`, quantity: 2 },
                ].concat(tier === 2 ? [{ itemName: `Refined ${prevRoughTier} Ingot`, quantity: 1 }] : []),
            }],
            [`${roughTier} Stockpile`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Timber`, quantity: 1 },
                    { itemName: `${roughTier} Slab`, quantity: 1 },
                ],
            }],
            [`${roughTier} Tanning Tub`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Rope`, quantity: 5 },
                    { itemName: `${roughTier} Timber`, quantity: 4 },
                ].concat(tier === 2 ? [{ itemName: `Refined ${prevRoughTier} Leather`, quantity: 1 }] : []),
            }],
            [`${roughTier} Kiln`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Clay Lump`, quantity: 200 },
                    { itemName: `${roughTier} Pebbles`, quantity: 40 },
                    { itemName: `${roughTier} Timber`, quantity: 4 },
                ].concat(tier === 2 ? [{ itemName: `Refined ${prevRoughTier} Brick`, quantity: 1 }] : []),
            }],
            [`${roughTier} Chest`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Plank`, quantity: 5 },
                    { itemName: `${roughTier} Rope`, quantity: 1 },
                ],
            }],
            [`${roughTier} Large Chest`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Plank`, quantity: 8 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${oreTier} Nails`, quantity: 2 },
                ],
            }],
            [`${roughTier} Large Stone Chest`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Brick`, quantity: 10 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                ],
            }],
            [`${roughTier} Masonry Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Rope`, quantity: 5 },
                    { itemName: `${roughTier} Stone Chunk`, quantity: 4 },
                ].concat(tier === 2 ? [{ itemName: `Refined ${prevRoughTier} Brick`, quantity: 1 }] : []),
            }],
            [`${roughTier} Mining Station`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Rope`, quantity: 5 },
                    { itemName: `${roughTier} Stone Chunk`, quantity: 4 },
                ].concat(tier === 2 ? [{ itemName: `Refined ${prevRoughTier} Brick`, quantity: 1 }] : []),
            }],
            [`${roughTier} Stone Chest`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Brick`, quantity: 5 },
                    { itemName: `${roughTier} Rope`, quantity: 1 },
                ],
            }],
            // The naming on gate and wall is a bit inconsistent. The prefix isn't used for tier 0 items.
            ...(tier > 0 ? {
                [`${roughTier} Wooden Gate`]: [{
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `${roughTier} Wood Log`, quantity: 4 },
                        { itemName: `${roughTier} Wood Trunk`, quantity: 2 },
                    ],
                }],
                [`${roughTier} Wooden Wall`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Wood Trunk`, quantity: 1 },
                ],
            }]
            } : {}),
            [`${roughTier} Brazier`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 1 },
                ],
            }],
            [`${roughTier} Thin Brazier`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 1 },
                ],
            }],
        };
    }, {});

};


export const buildings = {
    ...constantItems(),
    ...baseActiveItems(TIERS),
};
