import { useState, useEffect } from 'react';
import { type CraftingRecipe, type CraftingIngredient, SAMPLE_RECIPES } from '../types/recipes';
import { useClickOutside } from '../hooks/useClickOutside';
import {
    Typography,
    TextField,
    Paper,
    Box,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Alert,
} from '@mui/material';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView as TreeView } from '@mui/x-tree-view/SimpleTreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CalculatedIngredient {
    itemName: string;
    quantity: number;
    isRawMaterial: boolean;
}

interface CraftingAttempts {
    min: number;
    max: number;
}

interface CraftingTotalItem {
    itemName: string;
    attempts: number;
    recipeType: 'active' | 'passive';
}

interface ActiveTotalItem extends CraftingTotalItem {
    recipeType: 'active';
    effort: number;
    profession: string;
}

interface PassiveTotalItem extends CraftingTotalItem {
    recipeType: 'passive';
    seconds: number;
    structure: string;
}

type CraftingTotalItemType = ActiveTotalItem | PassiveTotalItem;

interface StructureUsage {
    structure: string;
    attempts: number;
    totalBatches: number;
}

interface CraftingTotals {
    totalEffort: number;
    totalSeconds: number;
    items: CraftingTotalItemType[];
    structureUsage: StructureUsage[];
}

interface RecipeTreeItem {
    id: string;
    name: string;
    quantity: number;
    recipe?: CraftingRecipe;
    children: RecipeTreeItem[];
}

const getAverageOutput = (outputQty: number | { min: number; max: number }): number => {
    if (typeof outputQty === 'number') {
        return outputQty;
    }
    return (outputQty.min + outputQty.max) / 2;
};

const getRecipeForItem = (itemName: string): CraftingRecipe | undefined => {
    return SAMPLE_RECIPES.find(recipe => recipe.outputItem === itemName);
};

const buildRecipeTree = (
    itemName: string,
    quantity: number,
    visitedItems: Set<string> = new Set(),
    currentChain: Set<string> = new Set()
): RecipeTreeItem => {
    const id = `${itemName}-${Math.random().toString(36).substr(2, 9)}`;
    const recipe = getRecipeForItem(itemName);
    const children: RecipeTreeItem[] = [];

    if (recipe && !visitedItems.has(itemName)) {
        // Check for circular dependencies
        if (currentChain.has(itemName)) {
            return { id, name: itemName, quantity, children: [] };
        }

        visitedItems.add(itemName);
        const newChain = new Set(currentChain).add(itemName);        recipe.ingredients.forEach((ingredient: CraftingIngredient) => {
            const subRecipe = getRecipeForItem(ingredient.itemName);
            const multiplier = Math.ceil(quantity / getAverageOutput(recipe.outputQuantity));
            if (subRecipe) {
                children.push(
                    buildRecipeTree(
                        ingredient.itemName,
                        ingredient.quantity * multiplier,
                        visitedItems,
                        newChain
                    )
                );
            } else {
                // This is a raw material
                children.push({
                    id: `${ingredient.itemName}-${Math.random().toString(36).substr(2, 9)}`,
                    name: ingredient.itemName,
                    quantity: ingredient.quantity * multiplier,
                    children: []
                });
            }
        });
    }

    return { id, name: itemName, quantity, recipe, children };
};

const RecipeTreeView = ({ root }: { root: RecipeTreeItem }) => {
    const renderTree = (node: RecipeTreeItem) => (
        <TreeItem
            key={node.id}
            itemId={node.id}
            label={                <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
                    <Typography>
                        {node.name} ({node.quantity})
                        {node.recipe ? (
                            <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                                via {node.recipe.recipeType === 'active' ? node.recipe.profession : node.recipe.structure}
                            </Typography>
                        ) : node.children.length === 0 && (
                            <Typography component="span" color="success.main" sx={{ ml: 1 }}>
                                (raw material)
                            </Typography>
                        )}
                    </Typography>
                </Box>
            }
        >
            {node.children.map((child) => renderTree(child))}
        </TreeItem>
    );

    return (
        <TreeView
            aria-label="recipe tree"
            // defaultExpandIcon={<ChevronRightIcon />}
            // defaultCollapseIcon={<ExpandMoreIcon />}
            sx={{ flexGrow: 1 }}
        >
            {renderTree(root)}
        </TreeView>
    );
};

export const RecipeCalculator = () => {
    const [selectedRecipe, setSelectedRecipe] = useState<CraftingRecipe | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [recipeWarnings, setRecipeWarnings] = useState<string[]>([]);
    const [calculatedResults, setCalculatedResults] = useState<{
        totals: CraftingTotals;
        ingredients: CalculatedIngredient[];
        warnings: string[];
    } | null>(null);
    
    const searchContainerRef = useClickOutside(() => setIsDropdownOpen(false));
    
    const PARALLEL_SLOTS_PER_STRUCTURE = 10;

    const filteredRecipes = SAMPLE_RECIPES.filter(recipe => 
        recipe.outputItem.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const calculateCraftingAttempts = (recipe: CraftingRecipe, targetQuantity: number): CraftingAttempts => {
        if (typeof recipe.outputQuantity === 'number') {
            const attempts = Math.ceil(targetQuantity / recipe.outputQuantity);
            return { min: attempts, max: attempts };
        }

        const minAttempts = Math.ceil(targetQuantity / recipe.outputQuantity.max);
        const maxAttempts = Math.ceil(targetQuantity / recipe.outputQuantity.min);
        return { min: minAttempts, max: maxAttempts };
    };

    const formatCraftingAttempts = (attempts: CraftingAttempts): string => {
        if (attempts.min === attempts.max) {
            return `${attempts.min}`;
        }
        return `${attempts.min}-${attempts.max}`;
    };

    const calculateTotals = (
        recipe: CraftingRecipe, 
        amount: number, 
        recipeChain: Set<string> = new Set()
    ): [CraftingTotals, string[]] => {
        const result: CraftingTotals = {
            totalEffort: 0,
            totalSeconds: 0,
            items: [],
            structureUsage: []
        };
        const warnings: string[] = [];

        const processRecipe = (r: CraftingRecipe, qty: number, chain: Set<string>) => {
            if (chain.has(r.outputItem)) {
                const warningMsg = `Circular recipe detected: ${r.outputItem} is part of a crafting loop`;
                if (!warnings.includes(warningMsg)) {
                    warnings.push(warningMsg);
                }
                return;
            }

            const newChain = new Set(chain);
            newChain.add(r.outputItem);

            const attempts = Math.ceil(qty / getAverageOutput(r.outputQuantity));
            
            if (r.recipeType === 'active') {
                result.totalEffort += r.effort * attempts;
                result.items.push({
                    itemName: r.outputItem,
                    recipeType: 'active',
                    effort: r.effort,
                    profession: r.profession,
                    attempts
                });
            } else {
                let structureUsage = result.structureUsage.find(su => su.structure === r.structure);
                if (!structureUsage) {
                    structureUsage = {
                        structure: r.structure,
                        attempts: 0,
                        totalBatches: 0
                    };
                    result.structureUsage.push(structureUsage);
                }
                structureUsage.attempts += attempts;
                
                const totalBatches = Math.ceil(attempts / PARALLEL_SLOTS_PER_STRUCTURE);
                structureUsage.totalBatches = Math.max(structureUsage.totalBatches, totalBatches);
                
                const totalTime = r.seconds * totalBatches;
                result.totalSeconds = Math.max(result.totalSeconds, totalTime);

                result.items.push({
                    itemName: r.outputItem,
                    recipeType: 'passive',
                    seconds: r.seconds,
                    structure: r.structure,
                    attempts
                });
            }

            r.ingredients.forEach(ingredient => {
                const subRecipe = SAMPLE_RECIPES.find(sr => sr.outputItem === ingredient.itemName);
                if (subRecipe) {
                    processRecipe(subRecipe, ingredient.quantity * attempts, newChain);
                }
            });
        };

        processRecipe(recipe, amount, recipeChain);
        return [result, warnings];
    };

    const calculateIngredientsRecursive = (
        recipe: CraftingRecipe, 
        amount: number, 
        recipeChain: Set<string> = new Set()
    ): [CalculatedIngredient[], string[]] => {
        const warnings: string[] = [];

        if (recipeChain.has(recipe.outputItem)) {
            const warningMsg = `Circular recipe detected: ${recipe.outputItem} is part of a crafting loop`;
            if (!warnings.includes(warningMsg)) {
                warnings.push(warningMsg);
            }
            return [[{
                itemName: recipe.outputItem,
                quantity: amount,
                isRawMaterial: true
            }], warnings];
        }

        const newChain = new Set(recipeChain);
        newChain.add(recipe.outputItem);

        const getMultiplier = (outputQty: number | { min: number; max: number }) => {
            if (typeof outputQty === 'number') {
                return Math.ceil(amount / outputQty);
            }
            return Math.ceil(amount / getAverageOutput(outputQty));
        };

        const multiplier = getMultiplier(recipe.outputQuantity);
        const ingredients = recipe.ingredients.flatMap(ingredient => {
            const subRecipe = SAMPLE_RECIPES.find(r => r.outputItem === ingredient.itemName);
            if (subRecipe) {
                const intermediateItem = {
                    itemName: ingredient.itemName,
                    quantity: ingredient.quantity * multiplier,
                    isRawMaterial: false
                };
                
                const [subIngredients, subWarnings] = calculateIngredientsRecursive(
                    subRecipe,
                    ingredient.quantity * multiplier,
                    newChain
                );
                warnings.push(...subWarnings);

                return [intermediateItem, ...subIngredients];
            }
            return [{
                itemName: ingredient.itemName,
                quantity: ingredient.quantity * multiplier,
                isRawMaterial: true
            }];
        });

        const consolidatedIngredients = ingredients.reduce((acc, curr) => {
            const existing = acc.find(item => item.itemName === curr.itemName);
            if (existing) {
                existing.quantity += curr.quantity;
            } else {
                acc.push({ ...curr });
            }
            return acc;
        }, [] as CalculatedIngredient[]);

        return [consolidatedIngredients, warnings];
    };

    // Update results when recipe or quantity changes
    useEffect(() => {
        if (selectedRecipe) {
            const [totals, totalWarnings] = calculateTotals(selectedRecipe, quantity);
            const [ingredients, ingredientWarnings] = calculateIngredientsRecursive(selectedRecipe, quantity);
            const allWarnings = [...new Set([...totalWarnings, ...ingredientWarnings])];
            
            setCalculatedResults({
                totals,
                ingredients,
                warnings: allWarnings
            });
            
            if (allWarnings.length > 0) {
                setRecipeWarnings(allWarnings);
            } else {
                setRecipeWarnings([]);
            }
        }
    }, [selectedRecipe, quantity]);

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Bitcraft Recipe Calculator
            </Typography>
            
            <Box sx={{ mb: 4, position: 'relative' }} ref={searchContainerRef}>
                <TextField
                    fullWidth
                    label="Search Recipe"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Type to search recipes..."
                />
                {isDropdownOpen && filteredRecipes.length > 0 && (
                    <Paper 
                        sx={{ 
                            position: 'absolute',
                            zIndex: 1,
                            width: '100%',
                            mt: 1,
                            maxHeight: 400,
                            overflow: 'auto'
                        }}
                        elevation={3}
                    >
                        <List>
                            {filteredRecipes.map(recipe => (
                                <ListItem
                                    component={'button'}
                                    key={recipe.outputItem}
                                    onClick={() => {
                                        setSelectedRecipe(recipe);
                                        setSearchTerm(recipe.outputItem);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <ListItemText 
                                        primary={recipe.outputItem}
                                        secondary={recipe.hasVariableOutput 
                                            ? `Output: ${(recipe.outputQuantity as {min: number; max: number}).min}-${(recipe.outputQuantity as {min: number; max: number}).max}`
                                            : `Output: ${recipe.outputQuantity}`
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
            </Box>

            {selectedRecipe && calculatedResults && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recipeWarnings.length > 0 && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            {recipeWarnings.map((warning, index) => (
                                <div key={index}>{warning}</div>
                            ))}
                        </Alert>
                    )}

                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            {selectedRecipe.outputItem}
                        </Typography>
                        
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Output per craft: {selectedRecipe.hasVariableOutput 
                                    ? `${(selectedRecipe.outputQuantity as {min: number; max: number}).min}-${(selectedRecipe.outputQuantity as {min: number; max: number}).max} (variable)`
                                    : String(selectedRecipe.outputQuantity)
                                }
                            </Typography>
                            
                            {selectedRecipe.hasVariableOutput && (
                                <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
                                    Note: Material calculations use average output - actual requirements may vary
                                </Typography>
                            )}

                            <Box sx={{ mt: 2 }}>
                                <Chip 
                                    label={selectedRecipe.recipeType === 'active' 
                                        ? `Profession: ${selectedRecipe.profession}`
                                        : `Structure: ${selectedRecipe.structure}`
                                    }
                                    color="primary"
                                    variant="outlined"
                                />
                            </Box>
                        </Box>

                        <TextField
                            type="number"
                            label="Target Quantity"
                            fullWidth
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            sx={{ mb: 3 }}
                        />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography>
                                Crafting attempts needed: {formatCraftingAttempts(calculateCraftingAttempts(selectedRecipe, quantity))}
                            </Typography>
                            
                            {calculatedResults.totals.totalEffort > 0 && (
                                <Typography>
                                    Total Effort Required: {calculatedResults.totals.totalEffort} EP
                                </Typography>
                            )}
                            {calculatedResults.totals.totalSeconds > 0 && (
                                <Typography>
                                    Total Processing Time: {Math.floor(calculatedResults.totals.totalSeconds / 60)} minutes {calculatedResults.totals.totalSeconds % 60} seconds
                                </Typography>
                            )}

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography color="primary">View Process Breakdown</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        {calculatedResults.totals.items.map((item, index) => (
                                            <ListItem key={index}>
                                                <ListItemText
                                                    primary={`${item.itemName} (${item.attempts} attempts)`}
                                                    secondary={
                                                        item.recipeType === 'active'
                                                            ? `${item.effort * item.attempts} EP (${item.profession})`
                                                            : `${Math.floor(item.seconds * item.attempts / 60)}m ${(item.seconds * item.attempts) % 60}s (${item.structure})`
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>

                            {calculatedResults.totals.structureUsage.length > 0 && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography color="primary">Structure Usage</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {calculatedResults.totals.structureUsage.map((usage, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText
                                                        primary={`${usage.structure}: ${usage.attempts} total attempts in ${usage.totalBatches} batches`}
                                                        secondary={usage.attempts > PARALLEL_SLOTS_PER_STRUCTURE ? 
                                                            `Using all ${PARALLEL_SLOTS_PER_STRUCTURE} parallel slots` : undefined}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </Box>
                    </Paper>                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom>Raw Materials Needed</Typography>
                            <List>
                                {calculatedResults.ingredients
                                    .filter((ingredient: CalculatedIngredient) => ingredient.isRawMaterial)
                                    .map((ingredient: CalculatedIngredient) => (
                                        <ListItem key={ingredient.itemName}>
                                            <ListItemText 
                                                primary={`${ingredient.itemName}: ${ingredient.quantity}`}
                                                sx={{ color: 'success.main' }}
                                            />
                                        </ListItem>
                                    ))}
                            </List>
                        </Box>

                        <Box>
                            <Typography variant="h6" gutterBottom>Recipe Tree</Typography>
                            <RecipeTreeView 
                                root={buildRecipeTree(selectedRecipe.outputItem, quantity)} 
                            />
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};
