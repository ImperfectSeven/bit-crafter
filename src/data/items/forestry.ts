import { type ItemRecipe, PROFESSIONS, STRUCTURES } from "../../types";
import { effortCalc, ROUGH_TIERS, BASIC_TIERS, TIERS } from "./item-tiers";

const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Forestry,
            station: STRUCTURES.ForestryStation,
        };

        return {
            ...acc,
            [`${roughTier} Wood Log`]: [{
                ...common,
                output: 6,
                ingredients: [{ itemName: `${roughTier} Wood Trunk`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${[BASIC_TIERS[tier]]} Amber Resin`]: [{
                ...common,
                output: { min: 0, max: 1 },
                ingredients: [{ itemName: `${roughTier} Wood Trunk`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${roughTier} Tree Bark`]: [{
                ...common,
                output: 4,
                ingredients: [{ itemName: `${roughTier} Wood Trunk`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${roughTier} Wood Log Package`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${roughTier} Wood Log`, quantity: 100 }],
                effort: effortCalc(5, tier),
            }],
        }
    }, {});
}

export const forestryItems = {
    ...baseActiveItems(TIERS),
} as const;