// import { PROFESSIONS, STRUCTURES, type ItemRecipe } from "../../types";
// import { FISH_TIERS, ROUGH_TIERS, BASIC_TIERS, effortCalc, timeCalc } from "./item-tiers";


// const baseActiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

//     return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
//         const roughTier = TEMPLATE_TIERS[tier];

//         const common = {
//             tier,
//             profession: PROFESSIONS.Template,
//             station: STRUCTURES.Template,
//         };

//         return {
//             ...acc,
//         };
//     }, {});

// };


// const basePassiveItems = (tiers: readonly number[]): Record<string, ItemRecipe[]> => {

//     return tiers.reduce<Record<string, ItemRecipe[]>>((acc, _currPrefix, tier) => {
//         const roughTier = TEMPLATE_TIERS[tier];

//         const common = {
//             tier,
//             profession: PROFESSIONS.Template,
//             station: STRUCTURES.Template,
//         };

//         return {
//             ...acc,
//         };
//     }, {});

// };


// export const templateItems = {
//     ...baseActiveItems(TIERS),
//     ...basePassiveItems(TIERS),
// };