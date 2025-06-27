import { type ItemRecipe, PROFESSIONS, STRUCTURES } from "../../types";
import { ORE_TIERS, ROUGH_TIERS, BASIC_TIERS, effortCalc, timeCalc, TIERS } from "./item-tiers";


const baseBlacksmithingStationItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const oreTier = ORE_TIERS[tier];
        const prevOreTier = tier > 0 ? ORE_TIERS[tier - 1] : null;
        const basicTier = BASIC_TIERS[tier];
        const roughTier = ROUGH_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Smithing,
            station: STRUCTURES.SmithingStation,
        };

        return {
            ...acc,
            [`${oreTier} Ore Concentrate`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${oreTier} Ore Piece`, quantity: 2 }],
                effort: effortCalc(50, tier)
            }],
            [`${oreTier} Ingot`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `Molten ${oreTier}`, quantity: 1 }],
                effort: effortCalc(100, tier)
            }],
            [`${oreTier} Nails`]: [{
                ...common,
                output: 5,
                ingredients: [{ itemName: `${oreTier} Ingot`, quantity: 1 }],
                effort: effortCalc(100, tier)
            }],
            [`${oreTier} Plated Bracers`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${oreTier} Ingot`, quantity: 1 }].concat(prevOreTier ? [{ itemName: `${prevOreTier} Plated Bracers`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Plated Boots`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${oreTier} Ingot`, quantity: 2 }].concat(prevOreTier ? [{ itemName: `${prevOreTier} Plated Boots`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`Refined ${oreTier} Ingot`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 5 },
                    { itemName: `${basicTier} Metal Solvent`, quantity: 1 }
                ].concat(prevOreTier ? [{ itemName: `Refined ${prevOreTier} Ingot`, quantity: 2 }] : []),
                effort: effortCalc(100, tier)
            }],
            [`${oreTier} Shortsword`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 5 },
                    { itemName: `${roughTier} Rope`, quantity: 1 },
                    { itemName: `${roughTier} Plank`, quantity: 1 },
                    { itemName: `${roughTier} Leather`, quantity: 1 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Shortsword`, quantity: 1 }] : []),
                effort: effortCalc(100, tier)
            }],
            [`${oreTier} Claymore`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 5 },
                    { itemName: `${roughTier} Rope`, quantity: 1 },
                    { itemName: `${roughTier} Plank`, quantity: 1 },
                    { itemName: `${roughTier} Leather`, quantity: 1 }

                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Claymore`, quantity: 1 }] : []),
                effort: effortCalc(100, tier)
            }],
            [`${oreTier} Hoe`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }

                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Hoe`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Plated Armor`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 5 },
                    { itemName: `${roughTier} Cloth`, quantity: 2 },
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Plated Armor`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Quill`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Quill`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Rod`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }

                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Rod`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Machete`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Machete`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Daggers`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 5 },
                    { itemName: `${roughTier} Rope`, quantity: 1 },
                    { itemName: `${roughTier} Plank`, quantity: 1 },
                    { itemName: `${roughTier} Leather`, quantity: 1 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Daggers`, quantity: 1 }] : []),
                effort: effortCalc(100, tier)
            }],
            [`${oreTier} Plated Legguards`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 5 },
                    { itemName: `${roughTier} Cloth`, quantity: 2 },
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Plated Legguards`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Plated Belt`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 2 },
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Plated Belt`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Scissors`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Scissors`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Axe`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Axe`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Saw`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Saw`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Crossbow`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 5 },
                    { itemName: `${roughTier} Rope`, quantity: 1 },
                    { itemName: `${roughTier} Plank`, quantity: 1 },
                    { itemName: `${roughTier} Leather`, quantity: 1 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Crossbow`, quantity: 1 }] : []),
                effort: effortCalc(100, tier)
            }],
            [`${oreTier} Knife`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Knife`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Hammer`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Hammer`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Pickaxe`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Pickaxe`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Mace`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 5 },
                    { itemName: `${roughTier} Rope`, quantity: 1 },
                    { itemName: `${roughTier} Plank`, quantity: 1 },
                    { itemName: `${roughTier} Leather`, quantity: 1 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Mace`, quantity: 1 }] : []),
                effort: effortCalc(100, tier)
            }],
            [`${oreTier} Spear & Shield`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 5 },
                    { itemName: `${roughTier} Rope`, quantity: 1 },
                    { itemName: `${roughTier} Plank`, quantity: 1 },
                    { itemName: `${roughTier} Leather`, quantity: 1 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Spear & Shield`, quantity: 1 }] : []),
                effort: effortCalc(100, tier)
            }],
            [`${oreTier} Chisel`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Chisel`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Bow`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Rope`, quantity: 2 },
                    { itemName: `${roughTier} Plank`, quantity: 2 },
                    { itemName: `${roughTier} Leather`, quantity: 2 }
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Bow`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Plated Helm`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 4 },
                    { itemName: `${roughTier} Cloth`, quantity: 1 },
                ].concat(prevOreTier ? [{ itemName: `${prevOreTier} Plated Helm`, quantity: 1 }] : []),
                effort: effortCalc(200, tier)
            }],
            [`${oreTier} Ingot Package`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 100 },
                ],
                effort: effortCalc(5, tier),
            }],
            [`${oreTier} Frames`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ingot`, quantity: 10 },
                ],
                effort: effortCalc(100, tier)
            }]
        };
    }, {});
}

const baseBlacksmithingSmelterItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const oreTier = ORE_TIERS[tier];
        const roughTier = ROUGH_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Smithing,
            station: STRUCTURES.Smelter,
        };

        return {
            ...acc,
            [`Molten ${oreTier}`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${oreTier} Ore Concentrate`, quantity: 1 },
                    { itemName: `${roughTier} Wood Log`, quantity: 1 }
                ],
                timeInSeconds: timeCalc(tier)
            }]
        };
    }, {});
}

export const blacksmithingItems = {
    ...baseBlacksmithingStationItems(TIERS),
    ...baseBlacksmithingSmelterItems(TIERS),
};