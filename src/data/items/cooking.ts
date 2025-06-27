import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
import { FISH_TIERS, BASIC_TIERS, effortCalc, timeCalc, PLAIN_TIERS, BAIT_FISH_TIERS, TIERS } from "./item-tiers";




const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const plainTier = PLAIN_TIERS[tier];
        const basicTier = BASIC_TIERS[tier];
        const baitFishTier = BAIT_FISH_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Cooking,
            station: STRUCTURES.CookingStation,
        };

        return {
            ...acc,
            [`${basicTier} Embergrain Dough`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Embergrain`, quantity: 1 }],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Cooked Berries`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Berry`, quantity: 5 }],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Mushroom Skewer`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Mushroom`, quantity: 5 }],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Roasted Meat`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Meat`, quantity: 5 }],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Skewered Baitfish`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${baitFishTier} Crawdad`, quantity: 2 }],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Roasted Fish`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${FISH_TIERS[0]} Darter Filet`, quantity: 1 }],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Fish and Bulbs`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${plainTier} Roasted Fish`, quantity: 2 },
                    { itemName: `${plainTier} Mashed Bulbs`, quantity: 1 },
                ],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Ground Meat and Mashed Bulbs`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${plainTier} Roasted Meat`, quantity: 2 },
                    { itemName: `${plainTier} Mashed Bulbs`, quantity: 1 },
                ],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Meat Sandwich`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${plainTier} Roasted Meat`, quantity: 2 },
                    { itemName: `${plainTier} Bread`, quantity: 1 },
                ],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Raw Berry Pie`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${plainTier} Cooked Berries`, quantity: 5 },
                    { itemName: `${basicTier} Embergrain Dough`, quantity: 1 },
                ],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Mushroom Stuffed Bulbs`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Mushroom`, quantity: 10 },
                    { itemName: `${plainTier} Mashed Bulbs`, quantity: 2 },
                ],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Raw Bulb Rolls`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${plainTier} Mashed Bulbs`, quantity: 2 },
                    { itemName: `${basicTier} Embergrain Dough`, quantity: 1 },
                ],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Hot Tea`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Flower`, quantity: 5 },
                    { itemName: `Water Bucket`, quantity: 1 },
                ],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Chilling Tea`]: [{
                ...common,
                output: 1,
                ingredients: [
                    { itemName: `${basicTier} Flower`, quantity: 5 },
                    { itemName: `Water Bucket`, quantity: 1 },
                ],
                effort: effortCalc(20, tier),
            }],
            [`${plainTier} Mashed Bulbs`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Starbulb`, quantity: 5 }],
                effort: effortCalc(20, tier),
            }],
        };
    }, {});

};


const basePassiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

    return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
        const plainTier = PLAIN_TIERS[tier];
        const basicTier = BASIC_TIERS[tier];

        const common = {
            tier,
            profession: PROFESSIONS.Cooking,
            station: STRUCTURES.Oven,
        };

        return {
            ...acc,
            [`${plainTier} Bread`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${basicTier} Embergrain Dough`, quantity: 1 }],
                timeInSeconds: timeCalc(tier),
            }],
            [`${plainTier} Berry Pie`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${plainTier} Raw Berry Pie`, quantity: 1 }],
                timeInSeconds: timeCalc(tier),
            }],
            [`${plainTier} Bulb Rolls`]: [{
                ...common,
                output: 1,
                ingredients: [{ itemName: `${plainTier} Raw Bulb Rolls`, quantity: 1 }],
                timeInSeconds: timeCalc(tier),
            }],
        };
    }, {});

};


export const cookingItems: Record<string, ItemRecipe[]> = {
    ...baseActiveItems(TIERS),
    ...basePassiveItems(TIERS),
    'Sugar': [{
        tier: 0,
        profession: PROFESSIONS.Cooking,
        station: STRUCTURES.Oven,
        output: 1,
        ingredients: [{ itemName: 'Tree Sap', quantity: 1 }],
        timeInSeconds: timeCalc(0),
    }]
};