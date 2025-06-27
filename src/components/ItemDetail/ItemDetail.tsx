import { useEffect, useState } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { buildRecipeTree, computeTotalsFromTree } from "../../utils/buildRecipeTree";
import type { IngredientNode } from "../../types";
import type { ItemName } from "../../data/items";

type ItemDetailProps = {
    itemName: ItemName;
}


const ItemDetail = (props: ItemDetailProps) => {
    const { itemName } = props;
    const [quantity, setQuantity] = useState(1);
    const [recipeTree, setRecipeTree] = useState<IngredientNode | null>(null);
    const [recipeSelectionMap, setRecipeSelectionMap] = useState<Record<ItemName, number>>({});
    const [rawMaterials, setRawMaterials] = useState<Record<string, number>>({});
    const [totalEffort, setTotalEffort] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    // Rebuild tree and totals whenever inputs change
    useEffect(() => {
        const tree = buildRecipeTree(itemName, quantity, new Set(), recipeSelectionMap);
        setRecipeTree(tree);

        const totals = computeTotalsFromTree(tree, recipeSelectionMap);
        setRawMaterials(totals.rawMaterials);
        setTotalEffort(totals.totalEffort);
        setTotalTime(totals.totalTime);
    }, [itemName, quantity, recipeSelectionMap]);

    // Recursive renderer
    function renderNode(node: IngredientNode, depth = 0): React.ReactNode {
        const recipeOptions = node.recipePathOptions ?? [];
        const selectedIndex = recipeSelectionMap[node.itemName] ?? 0;

        return (
            <Box key={`${node.itemName}-${depth}`} sx={{
                pl: 2,
                ml: 0,
                borderLeft: depth > 0 ? '2px dashed #666' : undefined,
                borderRadius: 1,
                backgroundColor: depth === 0 ? 'transparent' : '#222',
                mt: 1,
            }}>
                <Typography variant="body1"
                    sx={{
                        fontWeight: depth === 0 ? 'bold' : 'normal',
                        color: '#ddd',
                        ml: `${depth * 1.5}rem`, // progressively indent each depth level
                        textAlign: 'left',
                    }}>
                    {node.quantity}x <strong>{node.itemName}</strong>
                </Typography>

                {/* If multiple recipes, allow choosing one */}
                {recipeOptions && recipeOptions.length > 1 && (
                    <FormControl size="small" sx={{ mt: 1, mb: 1 }}>
                        <InputLabel>Recipe</InputLabel>
                        <Select
                            label="Recipe"
                            value={selectedIndex}
                            onChange={(e) => {
                                const newSelection = {
                                    ...recipeSelectionMap,
                                    [node.itemName]: Number(e.target.value),
                                };
                                setRecipeSelectionMap(newSelection);
                            }}
                        >
                            {recipeOptions.map((path, idx) => (
                                <MenuItem key={idx} value={idx}>
                                    {path.recipe.ingredients.map(i => `${i.quantity}x ${i.itemName}`).join(", ")}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {/* Render child nodes from the selected recipe */}
                {recipeOptions &&
                    (<Box sx={{ mt: 1 }}>
                        {recipeOptions[selectedIndex]?.ingredients.map(child =>
                            renderNode(child, depth + 1)
                        )}
                    </Box>)
                }
            </Box>
        );
    }

    return (
        <Box mt={4}>
            {/* Quantity Input */}
            <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => {
                    const num = Math.max(1, parseInt(e.target.value) || 1);
                    setQuantity(num);
                }}
                sx={{ mb: 3 }}
            />

            {/* Tree View */}
            <Box
                mt={4}
                p={2}
                sx={{
                    border: '1px solid #444',
                    borderRadius: 2,
                    backgroundColor: '#1a1a1a',
                }}
            >
                <Typography variant="h6" sx={{ mt: 3 }}>
                    Recipe Tree:
                </Typography>
                {recipeTree && renderNode(recipeTree)}
            </Box>

            <Box
                mt={4}
                p={2}
                sx={{
                    border: '1px solid #444',
                    borderRadius: 2,
                    backgroundColor: '#1a1a1a',
                }}
            >

                {/* Totals Summary */}
                <Typography variant="h6">Raw Materials:</Typography>
                <ul>
                    {Object.entries(rawMaterials).map(([name, qty]) => (
                        <li key={name}>{qty}x {name}</li>
                    ))}
                </ul>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Total Effort: {totalEffort}
                </Typography>
                <Typography variant="h6">Total Passive Time: {Math.round(totalTime)}s</Typography>
            </Box>

        </Box>
    );
};

export default ItemDetail;
