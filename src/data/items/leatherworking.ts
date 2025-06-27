import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import { ROUGH_TIERS, BASIC_TIERS, effortCalc, timeCalc, ORE_TIERS, TIERS } from "./item-tiers";


const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];
        const prevRoughTier = tier > 1 ? ROUGH_TIERS[tier - 1] : null;
        const basicTier = BASIC_TIERS[tier];
        const oreTier = ORE_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Leatherworking,
            station: STRUCTURES.LeatherworkingStation,
        };

        return {
            ...acc,
            [`${roughTier} Cleaned Pelt`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${roughTier} Raw Pelt`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${roughTier} Leather`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${roughTier} Tanned Pelt`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Tannin`]: [{
                ...common,
                output: 3,
                ingredients: [
                    { itemName: `${roughTier} Tree Bark`, quantity: 1 },
                    { itemName: "Water Bucket", quantity: 2 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Leather Boots`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Leather`, quantity: 2 },
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Leather Boots`, quantity: 1 }] : []),
                effort: effortCalc(200, tier),
            }],
            [`${roughTier} Leather Gloves`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Leather`, quantity: 1 }
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Leather Gloves`, quantity: 1 }] : []),
                effort: effortCalc(200, tier),
            }],
            [`${roughTier} Leather Leggings`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Leather`, quantity: 4 },
                    { itemName: `${oreTier} Ingot`, quantity: 1 }
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Leather Leggings`, quantity: 1 }] : []),
                effort: effortCalc(200, tier),
            }],
            [`${roughTier} Leather Shirt`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Leather`, quantity: 5 },
                    { itemName: `${oreTier} Ingot`, quantity: 2 }
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Leather Shirt`, quantity: 1 }] : []),
                effort: effortCalc(200, tier),
            }],
            [`${roughTier} Leather Belt`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Leather`, quantity: 1 }
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Leather Belt`, quantity: 2 }] : []),
                effort: effortCalc(200, tier),
            }],
            [`${roughTier} Leather Cap`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Leather`, quantity: 1 },
                    { itemName: `${oreTier} Ingot`, quantity: 1 }
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Leather Cap`, quantity: 1 }] : []),
                effort: effortCalc(200, tier),
            }],
            [`Refined ${roughTier} Leather`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Leather`, quantity: 1 },
                    { itemName: `${basicTier} Leather Treatment`, quantity: 1 }
                ].concat(prevRoughTier ? [{ itemName: `Refined ${prevRoughTier} Leather`, quantity: 2 }] : []),
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Textile`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Animal Hair`, quantity: 1 },
                    { itemName: `${roughTier} Straw`, quantity: 1 }
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Leather Package`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Leather`, quantity: 100 },
                ],
                effort: effortCalc(5, tier),
            }],
            [`${roughTier} Leather Sheeting`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Leather`, quantity: 10 },
                ],
                effort: effortCalc(5, tier),
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
            profession: PROFESSIONS.Leatherworking,
            station: STRUCTURES.TanningTub,
        };

        return {
            ...acc,
            [`${roughTier} Tanned Pelt`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Cleaned Pelt`, quantity: 1 },
                    { itemName: `${basicTier} Tannin`, quantity: 1 },
                ],
                timeInSeconds: timeCalc(tier),
            }],
        };
    }, {});

};


export const leatherWorkingItems: Record<string, ItemRecipe[]> = {
    ...baseActiveItems(TIERS),
    ...basePassiveItems(TIERS),
};