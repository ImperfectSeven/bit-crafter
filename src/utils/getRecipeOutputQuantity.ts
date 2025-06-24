// import type { CraftingRecipe } from "../types";

// export const getRecipeOutput = (recipe: CraftingRecipe) => {
//     const newOutputs = recipe.outputs.map((output) => ({
//         ...output,
//         quantity: typeof output.quantity === 'number' ? output.quantity : outputMinMaxCalc(output.quantity),
//     }));

//     return {
//         ...recipe,
//         outputs: newOutputs,
//     };
// };

// // Function that handles a single value given a range of output quantities
// const outputMinMaxCalc = (output: { min: number; max: number }) =>
//     Math.floor((output.min + output.max) / 2);
