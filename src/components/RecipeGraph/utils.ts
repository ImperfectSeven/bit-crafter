import type { CraftingRecipe } from "../../types/recipes";
import { PROFESSION_COLORS, STRUCTURE_COLORS } from "./styles";

// Get color based on recipe type (profession or structure)
export const getNodeStyle = (recipe: CraftingRecipe | null) => {
    if (!recipe) {
        return {
            backgroundColor: '#fff',
            borderColor: '#ccc',
            labelColor: '#333'
        };
    }
    if (recipe.recipeType === 'active' && recipe.profession) {
        return {
            backgroundColor: `${PROFESSION_COLORS[recipe.profession]}20`,
            borderColor: PROFESSION_COLORS[recipe.profession],
            labelColor: PROFESSION_COLORS[recipe.profession],
            label: recipe.profession
        };
    }

    if (recipe.recipeType === 'passive' && recipe.structure) {
        return {
            backgroundColor: `${STRUCTURE_COLORS[recipe.structure]}20`,
            borderColor: STRUCTURE_COLORS[recipe.structure],
            labelColor: STRUCTURE_COLORS[recipe.structure],
            label: recipe.structure
        };
    }

    return {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        labelColor: '#333'
    };
};