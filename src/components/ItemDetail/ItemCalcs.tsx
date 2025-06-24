import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import type { CraftingRecipe } from "../../types/recipes";
import { getFullRecipeTree } from "../../utils/getFullRecipeTree";
import { summarizeRecipeTree } from "../../utils/summarizeRecipeTree";
import { TocTwoTone } from "@mui/icons-material";

type ItemCalcsProps = {
    quantityNeeded: number;
    recipe: CraftingRecipe;
};

const ItemCalcs = (props: ItemCalcsProps) => {
    // const { effortPer, totalEffortNeeded, timePer, totalTimeNeeded, quantityNeeded } = props;
    const { recipe, quantityNeeded } = props;

    const recipeTree = getFullRecipeTree(recipe, quantityNeeded);
    const recipeTreeSummary = summarizeRecipeTree(recipeTree);

    const { totalEffort, totalTime } = Object.keys(recipeTreeSummary).reduce((acc, curr) => {
        acc.totalEffort += recipeTreeSummary[curr].totalEffort;
        acc.totalTime += recipeTreeSummary[curr].totalTime;
        return acc;
    }, { totalEffort: 0, totalTime: 0 });

    console.dir(recipeTreeSummary, { depth: null });

    return (

        <List>
            <ListItemText key="total" primary={`Total`} secondary={(<Stack>
                <Typography>{totalEffort} EP</Typography>
                <Typography>{totalTime}s</Typography>
            </Stack>)}></ListItemText>
            {
                // Make sure these entries are sorted from rawest to most processed
                Object.values(recipeTreeSummary).sort((a, b) => b.maxDepth - a.maxDepth).map((recipeStats) => (
                    <ListItemText key={recipeStats.recipeName} primary={`${recipeStats.recipeName} x${recipeStats.totalRuns}`} secondary={(<Stack>
                        <Typography>{recipeStats.totalEffort} EP</Typography>
                        <Typography>{recipeStats.totalTime}s</Typography>
                    </Stack>)}>
                    </ListItemText>
                ))}
        </List>
    );
};

export default ItemCalcs;