import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import { FISH_TIERS, ROUGH_TIERS, BASIC_TIERS, effortCalc, BAIT_FISH_TIERS, TIERS } from "./item-tiers";


const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const fishTier = FISH_TIERS[tier];
        const baitFishTier = BAIT_FISH_TIERS[tier];
        const basicTier = BASIC_TIERS[tier];
        const roughTier = ROUGH_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Fishing,
            station: STRUCTURES.FishingStation,
        };

        return {
            ...acc,
            [`${fishTier} Filet`]: [{
                ...common,
                output: { min: 1, max: 2 },
                ingredients: [{ itemName: `${fishTier}`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${basicTier} Fish Oil`]: [{
                ...common,
                output: { min: 1, max: 2 },
                ingredients: [{ itemName: `${fishTier}`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${basicTier} Chum`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${fishTier}`, quantity: 10 },
                    { itemName: `${basicTier} Raw Meat`, quantity: 5 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Bait`]: [{
                ...common,
                output: 2,
                ingredients: [{ itemName: `${baitFishTier}`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`Crushed ${roughTier} Shells`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [{ itemName: `${baitFishTier}`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
        };
    }, {});

};


export const fishingItems = {
    ...baseActiveItems(TIERS),
};