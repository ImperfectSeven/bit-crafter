/**
 * Script that handles reading through the JSON Game Data files
 * and extracting item and recipe data into a usable format.
 */

import * as fs from 'fs';
import type { ItemData, ItemDataRecipe } from '../types';
import type { CraftingRecipeDesc, ItemDesc } from '../data/types';

// Relative path to the game data directory
const GAME_DATA_PATH = './src/data/BitCraft_GameData/server/region';

const itemJsonData: ItemDesc[] = JSON.parse(fs.readFileSync(`${GAME_DATA_PATH}/item_desc.json`, 'utf-8'));
const cargoItemJsonData = JSON.parse(fs.readFileSync(`${GAME_DATA_PATH}/cargo_desc.json`, 'utf-8'));
const recipeJsonData: CraftingRecipeDesc[] = JSON.parse(fs.readFileSync(`${GAME_DATA_PATH}/crafting_recipe_desc.json`, 'utf-8'));

const cargoItemIdOffset = 0xffffffff;

const itemData: Record<string, ItemData> = {};


// Scan for through game recipe data to get a list of all recipes that make the given item
const getItemRecipes = (itemId: number, isCargo: boolean) => {
    const recipes: ItemDataRecipe[] = [];

    const itemType = isCargo ? 1 : 0;
    for(const recipe of recipeJsonData ) {
        // Ignore dev only recipes
        if (recipe.required_knowledges.includes(12345)) {
            continue;
        }
        for(const craftedItemStack of recipe.crafted_item_stacks) {
            if (craftedItemStack[0] === itemId && craftedItemStack[2][0] === itemType) {
                const ingredients = [];
                let usesSelf = false;

                for(const ingredient of recipe.consumed_item_stacks) {
                    // Prevent infinite loops by checking if the ingredient is the same as the crafted item
                    if (ingredient[0] === itemId && ingredient[1] === itemType) {
                        usesSelf = true;
                        break;
                    }
                    // Apply offset for cargo items
                    const ingredientId = ingredient[2][0] === 1 ? (cargoItemIdOffset + ingredient[0]).toString() : ingredient[0].toString();
                    ingredients.push({
                        id: ingredientId,
                        quantity: ingredient[1],
                    });
                }

                if (usesSelf) continue;

                recipes.push({
                    levelRequirement: recipe.level_requirements[0],
                    ingredients,
                    outputQuantity: craftedItemStack[1],
                    effortRequirement: recipe.actions_required,
                    timeRequirement: recipe.time_requirement,
                    isPassive: recipe.is_passive,
                });
            }
        }
    }

    return recipes;
};

console.log(`Loading Items...`);
for(const item of itemJsonData) {
    if (itemData[item.id]) {
        console.error(`Duplicate item ID found: ${item.id}. First Item [${itemData[item.id].name}]; Second Item [${item.name}] Skipping...`);
        continue;
    }
    itemData[item.id] = {
        name: item.name,
        description: item.description,
        tier: item.tier,
        rarity: item.rarity[0],
        recipes: getItemRecipes(item.id, false),
        extractionSkill: '', // item.extraction_skill || '',
    };
};

console.log(`Loading Cargo Items...`);
for(const item of cargoItemJsonData) {
    const cargoItemId = cargoItemIdOffset + item.id; // Offset to avoid collision with normal items
    if (itemData[cargoItemId]) {
        console.error(`Duplicate cargo item ID found: ${cargoItemId}. First Item [${itemData[cargoItemId].name}]; Second Item [${item.name}] Skipping...`);
        continue;
    }
    itemData[cargoItemId] = {
        name: item.name,
        description: item.description,
        tier: item.tier,
        rarity: item.rarity[0],
        recipes: getItemRecipes(item.id, true),
        extractionSkill: '', // item.extraction_skill || '',
    };
};

// Now want to write the data to a .ts file but write it as a const object
console.log(`Writing item data to src/data/item_data.ts...`);
const itemDataOutput = `import { type ItemData } from '../types';\nexport const itemData: Record<string, ItemData> = ${JSON.stringify(itemData, null, 2)};`;
fs.writeFileSync(`./src/data/item_data.ts`, itemDataOutput);
