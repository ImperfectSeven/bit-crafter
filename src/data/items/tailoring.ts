import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import { ROUGH_TIERS, TIERS } from "./item-tiers";

const tailoringStationItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];
        const prevRoughTier = tier > 0 ? ROUGH_TIERS[tier - 1] : null;

        const effortCalc = (baseEffort: number) => baseEffort * (1 + tier);

        const common = {
            tier,
            profession: PROFESSIONS.Tailoring,
            station: STRUCTURES.TailoringStation,
        };

        return {
            ...acc,
            [`${roughTier} Cloth`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Cloth Strip`, quantity: 1 },
                    { itemName: `${roughTier} Wispweave Filament`, quantity: tier < 2 ? 5 : 10 }
                ]
                .concat(tier === 2 ? [{ itemName: `Cloth Maker's Modant`, quantity: 1 }] : []),
                effort: effortCalc(100),
            }],
            [`${roughTier} Rope`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Cloth Strip`, quantity: 1 },
                ],
                effort: effortCalc(100),
            }],
            [`${roughTier} Spool of Thread`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Plant Fiber`, quantity: 40 }
                ],
                effort: effortCalc(50),
            }],
            [`${roughTier} Woven Gloves`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Cloth`, quantity: 1 },
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Woven Gloves`, quantity: 1 }] : []),
                effort: effortCalc(200),
            }],
            [`${roughTier} Woven Shorts`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Cloth`, quantity: 4 },
                    { itemName: `${roughTier} Leather`, quantity: 1 }
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Woven Shorts`, quantity: 1 }] : []),
                effort: effortCalc(200),
            }],
            [`${roughTier} Woven Belt`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Cloth`, quantity: 2 },
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Woven Belt`, quantity: 1 }] : []),
                effort: effortCalc(200),
            }],
            [`${roughTier} Woven Cap`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Cloth`, quantity: 4 },
                    { itemName: `${roughTier} Leather`, quantity: 1 }
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Woven Cap`, quantity: 1 }] : []),
                effort: effortCalc(200),
            }],
            [`${roughTier} Woven Shoes`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Cloth`, quantity: 2 },
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Woven Shoes`, quantity: 1 }] : []),
                effort: effortCalc(200),
            }],
            [`${roughTier} Woven Shirt`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Cloth`, quantity: 5 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevRoughTier ? [{ itemName: `${prevRoughTier} Woven Shirt`, quantity: 1 }] : []),
                effort: effortCalc(200),
            }],
            [`Refined ${roughTier} Cloth`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `${roughTier} Cloth`, quantity: 5 },
                        { itemName: `${roughTier} Textile`, quantity: 1 }
                    ].concat(prevRoughTier ? [{ itemName: `Refined ${prevRoughTier} Cloth`, quantity: 2 }] : []),
                    effort: effortCalc(100),
                }
            ],
            [`${roughTier} Cloth Tarp`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `${roughTier} Cloth`, quantity: 10 },
                    ],
                    effort: effortCalc(100),
                }
            ],
            [`${roughTier} Cloth Package`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `${roughTier} Cloth`, quantity: 100 },
                    ],
                    effort: effortCalc(5),
                }
            ],
            [`Refined ${roughTier} Cloth Package`]: [
                {
                    ...common,
                    output: 1,
                    ingredients: [
                        { itemName: `Refined ${roughTier} Cloth`, quantity: 100 },
                    ],
                    effort: effortCalc(5),
                }
            ],
        }

    }, {});
}


const tailoringLoomItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const roughTier = ROUGH_TIERS[tier];

        const timeCalc = ([5, 15][tier] ?? 0) * 60;

        const common = {
            tier,
            profession: PROFESSIONS.Tailoring,
            station: STRUCTURES.TailoringStation,
        };

        return {
            ...acc,
            [`${roughTier} Cloth Strip`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${roughTier} Spool of Thread`, quantity: 1 },
                ],
                timeInSeconds: timeCalc,
            }],
        };
    }, {});
}

export const tailoringItems = {
    ...tailoringStationItems(TIERS),
    ...tailoringLoomItems(TIERS),
} as const;
