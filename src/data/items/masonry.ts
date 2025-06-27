import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import {  ROUGH_TIERS, BASIC_TIERS, effortCalc, timeCalc, TIERS } from "./item-tiers";


const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];
        const prevRoughTier = tier > 0 ? ROUGH_TIERS[tier - 1] : null;
        const basicTier = BASIC_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Masonry,
            station: STRUCTURES.MasonryStation,
        };

        return {
            ...acc,
            [`${roughTier} Unfired Forester's Pot`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Potter's Mix`, quantity: 5 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Diamond`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Diamond Fragment`, quantity: 5 },
                ],
                effort: effortCalc(100, tier),
            }, {
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Pebbles`, quantity: 20 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Saphire`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Saphire Fragment`, quantity: 5 },
                ],
                effort: effortCalc(100, tier),
            }, {
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Pebbles`, quantity: 20 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Emerald`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Emerald Fragment`, quantity: 5 },
                ],
                effort: effortCalc(100, tier),
            }, {
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Pebbles`, quantity: 20 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Ruby`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Ruby Fragment`, quantity: 5 },
                ],
                effort: effortCalc(100, tier),
            }, {
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Pebbles`, quantity: 20 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`Uncut ${roughTier} Diamond`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Geode`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`Uncut ${roughTier} Sapphire`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Geode`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`Uncut ${roughTier} Emerald`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Geode`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`Uncut ${roughTier} Ruby`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Geode`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Potter's Mix`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Pebbles`, quantity: 5 },
                    { itemName: `${basicTier} Clay Lump`, quantity: 2 },
                ],
                effort: effortCalc(50, tier),
            }],
            [`Refined ${roughTier} Brick`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Brick`, quantity: 5 },
                    { itemName: `${basicTier} Firesand`, quantity: 1 },
                ].concat(prevRoughTier ? [{ itemName: `Refined ${prevRoughTier} Brick`, quantity: 2 }] : []),
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Glass Vial`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Glass`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Diamond Fragment`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Pebbles`, quantity: 20 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Sapphire Fragment`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Pebbles`, quantity: 20 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Emerald Fragment`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Pebbles`, quantity: 20 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Ruby Fragment`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [
                    { itemName: `${roughTier} Pebbles`, quantity: 20 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`Unfired ${roughTier} Brick`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Potter's Mix`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Brick Slab`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Brick`, quantity: 10 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Brick Package`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Brick`, quantity: 100 },
                ],
                effort: effortCalc(100, tier),
            }],
        };
    }, {});

};


const basePassiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];
        const basicTier = BASIC_TIERS[tier];


        const common = {
            tier,
            profession: PROFESSIONS.Masonry,
            station: STRUCTURES.Kiln,
        };

        return {
            ...acc,
            [`${roughTier} Brick`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `Unfired ${roughTier} Brick`, quantity: 1 },
                    { itemName: `${roughTier} Wood Log`, quantity: 1 },
                ],
                timeInSeconds: timeCalc(tier),

            }],
            [`${roughTier} Forester's Pot`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Unfired Forester's Pot`, quantity: 1 },
                    { itemName: `${roughTier} Wood Log`, quantity: 1 },
                ],
                timeInSeconds: timeCalc(tier),
            }],
            [`${roughTier} Glass`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Sand`, quantity: 5 },
                ],
                timeInSeconds: timeCalc(tier),
            }],

        };
    }, {});

};


export const masonryItems: Record<string, ItemRecipe[]> = {
    ...baseActiveItems(TIERS),
    ...basePassiveItems(TIERS),
    Pitch: [{
        tier: 0,
        profession: PROFESSIONS.Masonry,
        station: STRUCTURES.Kiln,
        output: 1,
        ingredients: [
            { itemName: `Tree Sap`, quantity: 5 },
        ],
        timeInSeconds: 300,
    }],

};