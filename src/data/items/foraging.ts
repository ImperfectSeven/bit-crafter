import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import { ROUGH_TIERS, TIERS, effortCalc } from "./item-tiers";

const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Foraging,
            station: STRUCTURES.ForagingStation,
        };
        return {
            ...acc,
            [`${roughTier} Plant Fiber`]: [{
                ...common,
                output: 100,
                ingredients: [{ itemName: `${roughTier} Plant Roots`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
        };
    }, {});

};


export const foragingItems = {
    ...baseActiveItems(TIERS),
};