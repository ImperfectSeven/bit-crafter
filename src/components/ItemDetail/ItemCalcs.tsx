import { Stack, Typography } from "@mui/material";
import type { CraftingRecipe } from "../../types/recipes";
import { getFullRecipeTree } from "../../utils/getFullRecipeTree";

type ItemCalcsProps = {
    quantityNeeded: number;
    recipe: CraftingRecipe;
};

const ItemCalcs = (props: ItemCalcsProps) => {
    // const { effortPer, totalEffortNeeded, timePer, totalTimeNeeded, quantityNeeded } = props;
    const { recipe, quantityNeeded } = props;

    const recipeTree = getFullRecipeTree(recipe, quantityNeeded);
    const { totalEffort, totalSeconds } = recipeTree.reduce((total, recipe) => {
        if (recipe.recipe?.recipeType === 'active') total.totalEffort += recipe.recipe.effort * recipe.quantity;
        if (recipe.recipe?.recipeType === 'passive') total.totalSeconds += recipe.recipe.seconds * recipe.quantity;

        return total;
    }, { totalEffort: 0, totalSeconds: 0 });

    return (
        <Stack direction="row" justifyContent={'space-evenly'}>
            <Stack direction={'row'} spacing={1}>
                <Typography>Total Effort:</Typography>
                <Typography>{totalEffort} EP</Typography>
            </Stack>
            <Stack direction={'row'} spacing={1}>
                <Typography>Total Time:</Typography>
                <Typography>{totalSeconds}s</Typography>
            </Stack>
        </Stack>
    );
};

export default ItemCalcs;