import { useEffect, useMemo, useState } from "react";
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { buildRecipeTree, computeTotalsFromTree } from "../../utils/buildRecipeTree";
import { TierColors, TierNames, type IngredientNode } from "../../types";
import { ChevronRight, ExpandMore, SwapHoriz } from "@mui/icons-material";
import { itemData } from "../../data/item_data";
import type { Tier } from "../../data/types";

type ItemDetailProps = {
    itemId: string;
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
}


const ItemDetail = ({ itemId, quantity, onQuantityChange }: ItemDetailProps) => {
    const [recipeTree, setRecipeTree] = useState<IngredientNode | null>(null);
    const [recipeSelectionMap, setRecipeSelectionMap] = useState<Record<string, number>>({});
    const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});
    const [rawMaterials, setRawMaterials] = useState<Record<string, number>>({});
    const [totalEffort, setTotalEffort] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        if (itemId) {
            const tree = buildRecipeTree(itemId, quantity, recipeSelectionMap, new Set());
            if (tree) setRecipeTree(tree);

            const totals = computeTotalsFromTree(tree, recipeSelectionMap);
            setRawMaterials(totals.rawMaterials);
            setTotalEffort(totals.totalEffort);
            setTotalTime(totals.totalTime);
        }

    }, [itemId, quantity, recipeSelectionMap]);

    // Group rawMaterials by tier using useMemo so it recalculates when rawMaterials changes
    const groupedByTier = useMemo(() => {
        const grouped: Partial<Record<Tier, { name: string; quantity: number }[]>> = {};

        Object.entries(rawMaterials).forEach(([itemName, quantity]) => {
            const itemEntry = Object.values(itemData).find(i => i.name === itemName);
            if (!itemEntry) return;
            const tier = itemEntry.tier;
            if (!grouped[tier]) grouped[tier] = [];
            grouped[tier].push({ name: itemName, quantity });
        });

        return grouped;
    }, [rawMaterials]);


    function renderNode(node: IngredientNode, depth = 0): React.ReactNode {
        const recipeOptions = node.recipePathOptions ?? [];
        const selectedIndex = recipeSelectionMap[node.itemName] ?? 0;
        const selectedRecipe = recipeOptions[selectedIndex];
        const isCollapsed = collapsedMap[node.itemName] ?? true;
        const hasAlternates = recipeOptions.length > 1;

        return (
            <Box
                key={`${node.itemName}-${depth}`}
                sx={{
                    ml: `${depth * 1.5}rem`,
                    pl: 1,
                    borderLeft: depth > 0 ? "2px dashed #666" : undefined,
                    mt: 1,
                }}
            >
                <Box display="flex" alignItems="center">
                    {selectedRecipe?.ingredients.length > 0 && (
                        <IconButton
                            size="small"
                            onClick={() => {
                                setCollapsedMap({
                                    ...collapsedMap,
                                    [node.itemName]: !isCollapsed,
                                });
                            }}
                            sx={{ mr: 1 }}
                        >
                            {isCollapsed ? <ChevronRight fontSize="small" /> : <ExpandMore fontSize="small" />}
                        </IconButton>
                    )}

                    <Typography
                        sx={{
                            fontWeight: depth === 0 ? "bold" : "normal",
                            color: "#ddd",
                            textAlign: "left",
                            fontSize: "1.1rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "100%",  // don’t let individual lines force width
                        }}
                        noWrap
                    >
                        {node.quantity}× {node.itemName}
                    </Typography>

                    {hasAlternates && (
                        <SwapHoriz
                            fontSize="small"
                            sx={{ color: "#888", ml: 1 }}
                            titleAccess="Alternate recipes available"
                        />
                    )}
                </Box>

                {hasAlternates && !isCollapsed && (
                    <FormControl
                        size="small"
                        fullWidth
                        sx={{ mt: 0.5, mb: 0.5, minWidth: "200px", maxWidth: "100%" }}
                    >
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
                                    {path.recipe.ingredients
                                        .map((i) => `${i.quantity}×${itemData[i.id].name}`)
                                        .join(", ")}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {!isCollapsed &&
                    selectedRecipe?.ingredients.map((child) => child ? renderNode(child, depth + 1) : null)}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                margin: "0 auto",
            }}
        >
            <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => {
                    const num = Math.max(1, parseInt(e.target.value) || 1);
                    onQuantityChange(num);
                }}
                sx={{ mb: 3, width: "150px", fontSize: "1rem" }}
                size="medium"
            />

            <Box
                p={2}
                sx={{
                    border: "1px solid #333",
                    borderRadius: 2,
                    backgroundColor: "#181818",
                    minHeight: "200px",
                }}
            >
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Raw Materials:
                </Typography>

                {Object.keys(groupedByTier)
                    .sort((a, b) => Number(a) - Number(b))
                    .map((tierStr) => {
                        const tier = Number(tierStr) as Tier;
                        const materials = groupedByTier[tier];

                        return !materials ? null : (
                            <Box
                                key={tier}
                                sx={{
                                    border: "1px solid #555",
                                    borderRadius: 2,
                                    p: 1.5,
                                    mb: 2,
                                    backgroundColor: "#222",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: TierColors[tier] || "#ccc",
                                        fontWeight: "bold",
                                        mb: 1,
                                    }}
                                >
                                    {`${tier > 0 ? 'Tier ' : ''}${TierNames[tier]}`}
                                </Typography>

                                {materials.sort((a, b) => a.name.localeCompare(b.name)).map((mat) => (
                                    <Typography key={mat.name} sx={{ ml: 2 }}>
                                        {mat.quantity}× {mat.name}
                                    </Typography>
                                ))}
                            </Box>
                        );
                    })}
            </Box>

            <Box
                mt={4}
                sx={{
                    width: "100%",           // fill parent (Container)
                    maxWidth: "800px",       // or whatever you want the tree section width to cap at
                    minWidth: "600px",       // match your app's min width
                    overflowX: "auto"
                }}
            >
                <Box
                    p={3}
                    sx={{
                        border: "1px solid #444",
                        borderRadius: 2,
                        backgroundColor: "#1a1a1a",
                        minHeight: "300px",
                        width: "100%",
                        minWidth: "100%",
                        maxWidth: "100%",
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Recipe Tree:
                    </Typography>
                    {recipeTree && renderNode(recipeTree)}
                </Box>
            </Box>
        </Box>
    );
}

export default ItemDetail;
