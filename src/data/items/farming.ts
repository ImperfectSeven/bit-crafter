import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import { FISH_TIERS, ROUGH_TIERS, BASIC_TIERS, effortCalc, timeCalc, TIERS } from "./item-tiers";




const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const basicTier = BASIC_TIERS[tier];
        const roughTier = ROUGH_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Farming,
            station: STRUCTURES.FarmingStation,
        };

        return {
            ...acc,
            [`${basicTier} Fertilizer`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Flower`, quantity: 5 }],
                effort: effortCalc(25, tier),
            },
            {
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Food Waste`, quantity: 2 }],
                effort: effortCalc(25, tier),
            },
            {
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Berry`, quantity: 2 }],
                effort: effortCalc(25, tier),
            },
            {
                ...common,
                output: 1,
                ingredients: [{ itemName: `${FISH_TIERS[tier]} Darter Fillet`, quantity: 2 }],
                effort: effortCalc(25, tier),
            },
            ],
            [`${basicTier} Embergrain Seeds`]: [{
                ...common,
                output: { min: 1, max: 3 },
                ingredients: [{ itemName: `${basicTier} Embergrain Plant`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Embergrain`]: [{
                ...common,
                output: { min: 1, max: 3 },
                ingredients: [{ itemName: `${basicTier} Embergrain Plant`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
            [`${ROUGH_TIERS[tier]} Straw`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Embergrain Plant`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Starbulb Seeds`]: [{
                ...common,
                output: { min: 1, max: 3 },
                ingredients: [{ itemName: `${basicTier} Starbulb Plant`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Starbulb`]: [{
                ...common,
                output: { min: 1, max: 3 },
                ingredients: [{ itemName: `${basicTier} Starbulb Plant`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Crop Oil`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [{ itemName: `${basicTier} Starbulb Plant`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Wispweave Seeds`]: [{
                ...common,
                output: { min: 1, max: 3 },
                ingredients: [{ itemName: `${basicTier} Wispweave Plant`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Wispweave Filament`]: [{
                ...common,
                output: { min: 2, max: 5 },
                ingredients: [{ itemName: `${basicTier} Wispweave Plant`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
        };
    }, {});
}

const basePassiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const basicTier = BASIC_TIERS[tier];
        const prevBasicTier = tier > 0 ? BASIC_TIERS[tier - 1] : null;


        const common = {
            tier,
            profession: PROFESSIONS.Farming,
            station: STRUCTURES.Farm,
        };

        return {
            ...acc,
            [`${basicTier} Embergrain Plant`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `${basicTier} Embergrain Seeds`, quantity: 1 },
                        { itemName: `${basicTier} Fertilizer`, quantity: 1 }
                    ].concat(tier > 0 ? [{ itemName: `Water Bucket`, quantity: 1 }] : []),
                    timeInSeconds: timeCalc(tier),
                },
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        tier === 0 ? { itemName: `Wild Grain Seeds`, quantity: 5 } : { itemName: `${prevBasicTier} Embergrain Plant`, quantity: 5 },
                        { itemName: `${basicTier} Fertilizer`, quantity: 1 }
                    ],
                    timeInSeconds: timeCalc(tier),
                },
            ],
            [`${basicTier} Starbulb Plant`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `${basicTier} Starbulb Seeds`, quantity: 1 },
                        { itemName: `${basicTier} Fertilizer`, quantity: 1 }
                    ].concat(tier > 0 ? [{ itemName: `Water Bucket`, quantity: 1 }] : []),
                    timeInSeconds: timeCalc(tier),
                },
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        tier === 0 ? { itemName: `Wild Vegetable Seeds`, quantity: 5 } : { itemName: `${prevBasicTier} Starbulb Plant`, quantity: 5 },
                        { itemName: `${basicTier} Fertilizer`, quantity: 1 }
                    ],
                    timeInSeconds: timeCalc(tier),
                },
            ],
            [`${basicTier} Wispweave Plant`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `${basicTier} Wispweave Seeds`, quantity: 1 },
                        { itemName: `${basicTier} Fertilizer`, quantity: 1 }
                    ].concat(tier > 0 ? [{ itemName: `Water Bucket`, quantity: 1 }] : []),
                    timeInSeconds: timeCalc(tier),
                },
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        tier === 0 ? { itemName: `Wild Fiberplant Seeds`, quantity: 5 } : { itemName: `${prevBasicTier} Wispweave Plant`, quantity: 5 },
                        { itemName: `${basicTier} Fertilizer`, quantity: 1 }
                    ],
                    timeInSeconds: timeCalc(tier),
                },
            ],
        };
    }, {});
}


export const farmingItems = {
    ...baseActiveItems(TIERS),
    ...basePassiveItems(TIERS),
} as const;
