import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import { FISH_TIERS, ROUGH_TIERS, BASIC_TIERS, effortCalc, timeCalc, HUNTING_TIERS, TIERS } from "./item-tiers";


const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const huntingTier = HUNTING_TIERS[tier];
        const roughTier = ROUGH_TIERS[tier];
        const basicTier = BASIC_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Hunting,
            station: STRUCTURES.HuntingStation,
        };

        return {
            ...acc,
            [`${roughTier} Raw Pelt`]: [{
                ...common,
                output: 2,
                ingredients: [{ itemName: `${huntingTier}`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${basicTier} Raw Meat`]: [{
                ...common,
                output: 4,
                ingredients: [{ itemName: `${huntingTier}`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${roughTier} Animal Hair`]: [{
                ...common,
                output: {min: 0, max: 1},
                ingredients: [{ itemName: `${huntingTier}`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],

        };
    }, {});

};

export const huntingItems = {
    ...baseActiveItems(TIERS),
};