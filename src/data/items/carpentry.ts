import { type ItemRecipe, PROFESSIONS, STRUCTURES } from "../../types";
import { ROUGH_TIERS, effortCalc, BASIC_TIERS, TIERS, ORE_TIERS } from "./item-tiers";

const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];
        const prevRoughTier = tier > 0 ? ROUGH_TIERS[tier - 1] : null;
        const basicTier = BASIC_TIERS[tier];

        const prevOreTier = tier > 0 ? ORE_TIERS[tier - 1] : null;

        const common = {
            tier,
            profession: PROFESSIONS.Carpentry,
            station: STRUCTURES.CarpentryStation,
        };

        return {
            ...acc,
            [`${roughTier} Stripped Wood`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [{ itemName: `${roughTier} Wood Log`, quantity: 3 }],
                    effort: effortCalc(50, tier),
                }
            ],
            [`${roughTier} Plank`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `${roughTier} Stripped Wood`, quantity:  tier <= 1 ? 1 : 2 }
                    ].concat(tier === 2 ? [{ itemName: `Woodworking Sandpaper`, quantity: 1 }] : []),
                    effort: effortCalc(40, tier),
                }
            ],
            [`Refined ${roughTier} Plank`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `${roughTier} Plank`, quantity: 5 }, { itemName: `${basicTier} Wood Polish`, quantity: 1 }
                    ].concat(prevRoughTier ? [{ itemName: `Refined ${prevRoughTier} Plank`, quantity: 2 }] : []),
                    effort: effortCalc(100, tier),
                }
            ],
            [`${roughTier} Timber`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Plank`, quantity: 20 }
                ].concat(tier > 1 ? [{ itemName: `${prevOreTier} Nails`, quantity: 10 }] : []),
                effort: effortCalc(100, tier),
            }],
            [`${roughTier} Wood Plank Package`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${roughTier} Plank`, quantity: 100 }],
                effort: effortCalc(5, tier),
            }]
        }
    }, {});
}

const constantItems: Record<string, ItemRecipe[]> = {
    'Empty Bucket': [{
        tier: 0,
        profession: PROFESSIONS.Carpentry,
        station: STRUCTURES.CarpentryStation,
        output: 10,
        ingredients: [{ itemName: `Rough Plank`, quantity: 1 }],
        effort: 50,
    }],
    'Campfire Kit': [{
        tier: 0,
        profession: PROFESSIONS.Carpentry,
        station: STRUCTURES.CarpentryStation,
        output: 1,
        ingredients: [{ itemName: `Rough Plank`, quantity: 4 }, { itemName: `Rough Pebbles`, quantity: 4 }],
        effort: 100,
    }],
    'Deed: Cart': [{
        tier: 0,
        profession: PROFESSIONS.Carpentry,
        station: STRUCTURES.CarpentryStation,
        output: 1,
        ingredients: [{ itemName: `Rough Plank`, quantity: 2 }, { itemName: `Rough Rope`, quantity: 1 }],
    }]
};

export const carpentryItems = {
    ...constantItems,
    ...baseActiveItems(TIERS),
}