import { useContext, useState } from "react";
import { SelectedItemContext } from "../../Context";
import {
    Box,
    Divider,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import useRecipes from "../../hooks/useRecipes";
import type { CraftingRecipe } from "../../types/recipes";
import { RecipeGraph } from "../RecipeGraph/RecipeGraph";
import ItemCalcs from "./ItemCalcs";

const ItemDetail = () => {
    const selectedItem = useContext(SelectedItemContext);
    const { recipes } = useRecipes();
    const [selectedSourceRecipe, setSelectedSourceRecipe] = useState<CraftingRecipe | null>(null);
    const [desiredQuantity, setDesiredQuantity] = useState<number>(1);

    const madeByRecipes = recipes.filter((recipe) =>
        recipe.outputs.some((output) => output.itemName === selectedItem)
    );

    const handleRecipeChange = (event: any) => {
        const selectedName = event.target.value as string;
        const foundRecipe = madeByRecipes.find((recipe) => recipe.recipeName === selectedName) || null;
        setSelectedSourceRecipe(foundRecipe);
    };

    return (
        <Stack padding={2} spacing={2}>
            <Paper>
                <Stack direction="column" padding={2} spacing={2}>
                    <Typography variant="h3" textAlign="center">{selectedItem}</Typography>
                    <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" marginTop={2}>
                        <FormControl variant="standard" sx={{ maxWidth: 100 }}>
                            <InputLabel htmlFor="desired-quantity">Quantity</InputLabel>
                            <Input
                                id="desired-quantity"
                                type="number"
                                value={desiredQuantity}
                                onChange={(e) => setDesiredQuantity(parseInt(e.target.value) || 0)}
                                inputProps={{ min: 1 }}
                            />
                        </FormControl>
                        <FormControl variant="standard" sx={{ minWidth: 300 }}>
                            <InputLabel id="source-recipe-select-label">Source Recipe</InputLabel>
                            <Select
                                labelId="source-recipe-select-label"
                                id="source-recipe-select"
                                value={selectedSourceRecipe?.recipeName || ""}
                                onChange={handleRecipeChange}
                            >
                                {madeByRecipes.map((recipe) => (
                                    <MenuItem key={recipe.recipeName} value={recipe.recipeName}>
                                        {recipe.recipeName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Divider />
                    {selectedSourceRecipe && <ItemCalcs quantityNeeded={desiredQuantity} recipe={selectedSourceRecipe} />}
                </Stack>
            </Paper>
            {selectedSourceRecipe && (

                <Paper>
                    <Box padding={2}>
                        <RecipeGraph recipe={selectedSourceRecipe} quantity={desiredQuantity} />
                    </Box>
                </Paper>
            )}
        </Stack>
    );
};

export default ItemDetail;
