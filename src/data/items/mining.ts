import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import { ROUGH_TIERS, effortCalc, ORE_TIERS, TIERS } from "./item-tiers";


const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];
        const oreTier = ORE_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Mining,
            station: STRUCTURES.MiningStation,
        };

        return {
            ...acc,
            [`${oreTier} Ore Piece`]: [{
                ...common,
                output: 4,
                ingredients: [{ itemName: `${oreTier} Ore Chunk`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${roughTier} Pebbles`]: [{
                ...common,
                output: { min: 8, max: 20 },
                ingredients: [{ itemName: `${roughTier} Stone Chunk`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],
            [`${roughTier} Braxite`]: [{
                ...common,
                output: { min: 0, max: 4 },
                ingredients: [{ itemName: `${roughTier} Stone Chunk`, quantity: 1 }],
                effort: effortCalc(50, tier),
            }],

        };
    }, {});

};


export const miningItems = {
    ...baseActiveItems(TIERS),
};