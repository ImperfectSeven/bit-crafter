import { type ItemRecipe, PROFESSIONS, STRUCTURES } from "../../types";
import { ROUGH_TIERS, effortCalc, BASIC_TIERS, BEGINNER_TIERS, ORE_TIERS, TIERS } from "./item-tiers";

const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currbasicTier, tier) => {

        const basicTier = BASIC_TIERS[tier];
        const roughTier = ROUGH_TIERS[tier];
        const beginnerTier = BEGINNER_TIERS[tier];
        const oreTier = ORE_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Scholar,
            station: STRUCTURES.ScholarStation,
        };

        return {
            ...acc,
            [`${basicTier} Ink`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Pigment`, quantity: 1 },
                    { itemName: `${basicTier} Fish Oil`, quantity: 2 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Parchment`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${roughTier} Tree Bark`, quantity: 2 }],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Pigment`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Flower`, quantity: 5 }],
                effort: effortCalc(100, tier),
            }],
            [`${beginnerTier}'s Study Journal`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Parchment`, quantity: 2 },
                    { itemName: `${basicTier} Ink`, quantity: 2 },
                    { itemName: `${beginnerTier}'s Stone Carving`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${beginnerTier}'s Building Blueprint`]: [{
                ...common,
                output: 3,
                ingredients: [{ itemName: `${beginnerTier}'s Study Journal`, quantity: 1 }],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Wood Polish`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Amber Resin`, quantity: 1 },
                    { itemName: `${basicTier} Crop Oil`, quantity: 2 },
                    { itemName: `Pitch`, quantity: 1 },
                    { itemName: `${roughTier} Glass Vial`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${beginnerTier}'s Cloth Research`]: [{
                ...common,
                output: 3,
                ingredients: [
                    { itemName: `${beginnerTier}'s Study Journal`, quantity: 1 },
                    { itemName: `Refined ${roughTier} Cloth`, quantity: 1 }
                ],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Firesand`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Gypsite`, quantity: 1 },
                    { itemName: `Crushed ${roughTier} Shells`, quantity: 2 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${beginnerTier}'s Leather Research`]: [{
                ...common,
                output: 3,
                ingredients: [
                    { itemName: `${beginnerTier}'s Study Journal`, quantity: 1 },
                    { itemName: `Refined ${roughTier} Leather`, quantity: 1 }
                ],
                effort: effortCalc(100, tier),
            }],
            [`${beginnerTier}'s Wood Research`]: [{
                ...common,
                output: 3,
                ingredients: [
                    { itemName: `${beginnerTier}'s Study Journal`, quantity: 1 },
                    { itemName: `Refined ${roughTier} Plank`, quantity: 1 }
                ],
                effort: effortCalc(100, tier),
            }],
            [`${beginnerTier}'s Stone Research`]: [{
                ...common,
                output: 3,
                ingredients: [
                    { itemName: `${beginnerTier}'s Study Journal`, quantity: 1 },
                    { itemName: `Refined ${roughTier} Brick`, quantity: 1 }
                ],
                effort: effortCalc(100, tier),
            }],
            [`${beginnerTier}'s Codex`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${beginnerTier}'s Stone Research`, quantity: 1 },
                    { itemName: `${beginnerTier}'s Wood Research`, quantity: 1 },
                    { itemName: `${beginnerTier}'s Metal Research`, quantity: 1 },
                    { itemName: `${beginnerTier}'s Leather Research`, quantity: 1 },
                    { itemName: `${beginnerTier}'s Cloth Research`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
            [`${beginnerTier}'s Metal Research`]: [{
                ...common,
                output: 3,
                ingredients: [
                    { itemName: `${beginnerTier}'s Study Journal`, quantity: 1 },
                    { itemName: `Refined ${oreTier} Ingot`, quantity: 1 }
                ],
                effort: effortCalc(100, tier),
            }],
            [`${basicTier} Leather Treatment`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Braqxite`, quantity: 1 },
                    { itemName: `${basicTier} Fish Oil`, quantity: 2 },
                    { itemName: `${roughTier} Glass Vial`, quantity: 1 },
                    { itemName: `Water Bucket`, quantity: 1 },
                ],
                effort: effortCalc(100, tier),
            }],
        }
    }, {});
}

export const scholarItems = {
    ...baseActiveItems(TIERS),
} as const;