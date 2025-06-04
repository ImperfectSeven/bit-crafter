import { useState, useEffect } from 'react';
import type { CraftingRecipe, RecipeOutput, CraftingIngredient } from '../types/recipes';
import { ALL_RECIPES } from '../data/recipes';
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
    Divider,
} from '@mui/material';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView as TreeView } from '@mui/x-tree-view/SimpleTreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MaterialWithAlternatives as MaterialAlternatives } from './MaterialWithAlternatives';

interface CalculatedIngredient {
    itemName: string;
    quantity: number;
    isRawMaterial: boolean;
    alternativeRecipes?: CraftingRecipe[];
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

const PARALLEL_SLOTS_PER_STRUCTURE = 10;



const getAverageOutput = (output: RecipeOutput): number => {
    const qty = output.quantity;
    const baseAvg = typeof qty === 'number' ? qty : (qty.min + qty.max) / 2;
    return (output.chance ?? 1) * baseAvg;
};

const getMainOutput = (recipe: CraftingRecipe): RecipeOutput => {
    // Main output is usually the first one with 100% chance
    return recipe.outputs.find(o => !o.chance || o.chance === 1) ?? recipe.outputs[0];
};

const getRecipesForItem = (itemName: string): CraftingRecipe[] => {
    return ALL_RECIPES.filter(recipe => recipe.outputs.some(output => output.itemName === itemName));
};

const getBestRecipeForItem = (itemName: string, preferredType?: 'active' | 'passive'): CraftingRecipe[] => {
    const recipes = getRecipesForItem(itemName);
    if (recipes.length === 0) return [];

    // Sort recipes based on multiple criteria
    return recipes.sort((a, b) => {
        // 1. Prefer the specified type if provided
        if (preferredType) {
            if (a.recipeType === preferredType && b.recipeType !== preferredType) return -1;
            if (b.recipeType === preferredType && a.recipeType !== preferredType) return 1;
        }

        // 2. Compare efficiency (output per effort/time)
        const getEfficiency = (recipe: CraftingRecipe) => {
            const mainOutput = getMainOutput(recipe);
            const avgOutput = getAverageOutput(mainOutput);
            return recipe.recipeType === 'active'
                ? avgOutput / recipe.effort
                : avgOutput / recipe.seconds;
        };

        const efficiencyA = getEfficiency(a);
        const efficiencyB = getEfficiency(b);
        if (efficiencyA !== efficiencyB) return efficiencyB - efficiencyA;

        // 3. If efficiencies are equal, prefer simpler recipes (fewer ingredients)
        return a.ingredients.length - b.ingredients.length;
    });
};

const calculateCraftingAttempts = (recipe: CraftingRecipe, targetQuantity: number): CraftingAttempts => {
    const mainOutput = getMainOutput(recipe);
    const output = mainOutput.quantity;

    if (typeof output === 'number') {
        const attempts = Math.ceil(targetQuantity / output);
        return { min: attempts, max: attempts };
    }

    const minAttempts = Math.ceil(targetQuantity / output.max);
    const maxAttempts = Math.ceil(targetQuantity / output.min);
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
    const mainOutput = getMainOutput(recipe);

    const processRecipe = (r: CraftingRecipe, qty: number, chain: Set<string>) => {
        const rMainOutput = getMainOutput(r);
        if (chain.has(rMainOutput.itemName)) {
            const warningMsg = `Circular recipe detected: ${rMainOutput.itemName} is part of a crafting loop`;
            if (!warnings.includes(warningMsg)) {
                warnings.push(warningMsg);
            }
            return;
        }

        const newChain = new Set(chain);
        newChain.add(rMainOutput.itemName);

        const attempts = Math.ceil(qty / getAverageOutput(rMainOutput));

        if (r.recipeType === 'active') {
            result.totalEffort += r.effort * attempts;
            result.items.push({
                itemName: rMainOutput.itemName,
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
                itemName: rMainOutput.itemName,
                recipeType: 'passive',
                seconds: r.seconds,
                structure: r.structure,
                attempts
            });
        }

        r.ingredients.forEach(ingredient => {
            const recipes = getRecipesForItem(ingredient.itemName);
            if (recipes.length > 0) {
                processRecipe(recipes[0], ingredient.quantity * attempts, newChain);
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
    const mainOutput = getMainOutput(recipe);

    if (recipeChain.has(mainOutput.itemName)) {
        const warningMsg = `Circular recipe detected: ${mainOutput.itemName} is part of a crafting loop`;
        warnings.push(warningMsg);
        return [[{
            itemName: mainOutput.itemName,
            quantity: amount,
            isRawMaterial: true
        }], warnings];
    }

    const newChain = new Set(recipeChain).add(mainOutput.itemName);
    const multiplier = Math.ceil(amount / getAverageOutput(mainOutput));
    
    const ingredients = recipe.ingredients.flatMap(ingredient => {
        const recipeOptions = getBestRecipeForItem(ingredient.itemName);
        if (recipeOptions.length === 0) {
            return [{
                itemName: ingredient.itemName,
                quantity: ingredient.quantity * multiplier,
                isRawMaterial: true,
                alternativeRecipes: []
            }];
        }

        // Add this ingredient as raw material with alternatives
        return [{
            itemName: ingredient.itemName,
            quantity: ingredient.quantity * multiplier,
            isRawMaterial: true,
            alternativeRecipes: recipeOptions
        }];
    });

    const consolidatedIngredients = ingredients.reduce((acc, curr) => {
        const existing = acc.find(item => item.itemName === curr.itemName);
        if (existing) {
            existing.quantity += curr.quantity;
            // Merge alternative recipes, removing duplicates
            if (curr.alternativeRecipes) {
                existing.alternativeRecipes = existing.alternativeRecipes || [];
                curr.alternativeRecipes.forEach(recipe => {
                    if (!existing.alternativeRecipes!.some(r => r.recipeName === recipe.recipeName)) {
                        existing.alternativeRecipes!.push(recipe);
                    }
                });
                // Sort alternatives by efficiency
                existing.alternativeRecipes.sort((a, b) => {
                    const effA = getAverageOutput(getMainOutput(a)) / (a.recipeType === 'active' ? a.effort : a.seconds);
                    const effB = getAverageOutput(getMainOutput(b)) / (b.recipeType === 'active' ? b.effort : b.seconds);
                    return effB - effA;
                });
            }
        } else {
            acc.push({ ...curr });
        }
        return acc;
    }, [] as CalculatedIngredient[]);

    return [consolidatedIngredients, warnings];
};

const consolidateIngredients = (ingredients: CalculatedIngredient[]): CalculatedIngredient[] => {
    return ingredients.reduce((acc: CalculatedIngredient[], curr: CalculatedIngredient) => {
        const existing = acc.find(item => item.itemName === curr.itemName);
        if (existing) {
            existing.quantity += curr.quantity;
            // Merge alternative recipes, removing duplicates
            if (curr.alternativeRecipes) {
                existing.alternativeRecipes = existing.alternativeRecipes || [];
                curr.alternativeRecipes.forEach((recipe: CraftingRecipe) => {
                    if (!existing.alternativeRecipes!.some((r: CraftingRecipe) => r.recipeName === recipe.recipeName)) {
                        existing.alternativeRecipes!.push(recipe);
                    }
                });
                // Sort alternatives by efficiency
                existing.alternativeRecipes.sort((a: CraftingRecipe, b: CraftingRecipe) => {
                    const effA = getAverageOutput(getMainOutput(a)) / (a.recipeType === 'active' ? a.effort : a.seconds);
                    const effB = getAverageOutput(getMainOutput(b)) / (b.recipeType === 'active' ? b.effort : b.seconds);
                    return effB - effA;
                });
            }
        } else {
            // For new ingredients, sort alternatives if they exist
            if (curr.alternativeRecipes) {
                curr.alternativeRecipes.sort((a: CraftingRecipe, b: CraftingRecipe) => {
                    const effA = getAverageOutput(getMainOutput(a)) / (a.recipeType === 'active' ? a.effort : a.seconds);
                    const effB = getAverageOutput(getMainOutput(b)) / (b.recipeType === 'active' ? b.effort : b.seconds);
                    return effB - effA;
                });
            }
            acc.push({ ...curr });
        }
        return acc;
    }, []);
};

const buildRecipeTree = (
    itemName: string,
    quantity: number,
    visitedItems: Set<string> = new Set(),
    currentChain: Set<string> = new Set()
): RecipeTreeItem => {    const id = `${itemName}-${Math.random().toString(36).substr(2, 9)}`;
    const recipe = getBestRecipeForItem(itemName)[0];
    const children: RecipeTreeItem[] = [];

    if (recipe && !visitedItems.has(itemName)) {
        // Check for circular dependencies
        if (currentChain.has(itemName)) {
            return { id, name: itemName, quantity, children: [] };
        }

        visitedItems.add(itemName);
        const newChain = new Set(currentChain).add(itemName);
        const mainOutput = getMainOutput(recipe);

        recipe.ingredients.forEach(ingredient => {
            const multiplier = Math.ceil(quantity / getAverageOutput(mainOutput));
            children.push(
                buildRecipeTree(
                    ingredient.itemName,
                    ingredient.quantity * multiplier,
                    visitedItems,
                    newChain
                )
            );
        });
    }

    return { id, name: itemName, quantity, recipe, children };
};

interface RecipeTreeViewProps {
    root: RecipeTreeItem;
    recipeChoices: Map<string, CraftingRecipe>;
    onRecipeSelect: (itemName: string, recipe: CraftingRecipe) => void;
}

const RecipeTreeView: React.FC<RecipeTreeViewProps> = ({ root, recipeChoices, onRecipeSelect }) => {
    const renderTree = (node: RecipeTreeItem) => {
        // Get recipe alternatives for this node
        const alternatives = node.name ? getBestRecipeForItem(node.name) : [];
        const selectedRecipe = node.name ? recipeChoices.get(node.name) : undefined;

        return (
            <TreeItem
                key={node.id}
                itemId={node.id}
                label={
                    <Box sx={{ display: 'flex', flexDirection: 'column', py: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography>
                                {node.name} ({node.quantity})
                                {node.recipe ? (
                                    <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                                        via {node.recipe.recipeType === 'active' ? node.recipe.profession : node.recipe.structure}
                                    </Typography>
                                ) : node.children.length === 0 && alternatives.length > 0 ? (
                                    <Typography component="span" color="info.main" sx={{ ml: 1 }}>
                                        ({alternatives.length} recipe{alternatives.length > 1 ? 's' : ''} available)
                                    </Typography>
                                ) : node.children.length === 0 && (
                                    <Typography component="span" color="success.main" sx={{ ml: 1 }}>
                                        (raw material)
                                    </Typography>
                                )}
                            </Typography>
                        </Box>
                        {alternatives.length > 1 && node.name && (
                            <Box sx={{ mt: 1, pl: 2 }}>
                                {alternatives.map((alt: CraftingRecipe, idx: number) => (
                                    <Typography
                                        key={idx}
                                        variant="caption"
                                        color={selectedRecipe?.recipeName === alt.recipeName ? "primary" : "text.secondary"}
                                        sx={{ 
                                            display: 'block', 
                                            cursor: 'pointer',
                                            pl: 1,
                                            borderLeft: (theme) => 
                                                selectedRecipe?.recipeName === alt.recipeName 
                                                    ? `2px solid ${theme.palette.primary.main}`
                                                    : '2px solid transparent',
                                            '&:hover': { 
                                                color: 'primary.main',
                                                backgroundColor: 'action.hover'
                                            }
                                        }}
                                        onClick={() => {
                                            if (node.name) {
                                                onRecipeSelect(node.name, alt);
                                            }
                                        }}
                                    >
                                        {alt.recipeType === 'active' ? alt.profession : alt.structure} •{' '}
                                        {alt.ingredients.map(i => `${i.quantity} ${i.itemName}`).join(', ')}
                                    </Typography>
                                ))}
                            </Box>
                        )}
                    </Box>
                }
            >
                {node.children.map((child) => renderTree(child))}
            </TreeItem>
        );
    };

    return (
        <TreeView
            aria-label="recipe tree"
            sx={{ flexGrow: 1 }}
        >
            {renderTree(root)}
        </TreeView>
    );
};



// No longer needed - using Map<string, CraftingRecipe> instead

export const RecipeCalculator: React.FC = () => {
    const [selectedRecipe, setSelectedRecipe] = useState<CraftingRecipe | null>(null);
    const [recipeChoices, setRecipeChoices] = useState<Map<string, CraftingRecipe>>(new Map());
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

    // Group recipes by their main output item
    const groupedRecipes = ALL_RECIPES.reduce((acc, recipe) => {
        const mainOutput = getMainOutput(recipe);
        const key = mainOutput.itemName;
        if (!acc.has(key)) {
            acc.set(key, []);
        }
        acc.get(key)!.push(recipe);
        return acc;
    }, new Map<string, CraftingRecipe[]>());

    // Filter recipes based on search term
    const filteredRecipes = Array.from(groupedRecipes.entries())
        .filter(([itemName]) => itemName.toLowerCase().includes(searchTerm.toLowerCase()))
        .reduce((acc, [itemName, recipes]) => {
            acc.set(itemName, recipes);
            return acc;
        }, new Map<string, CraftingRecipe[]>());

    const getSelectedRecipeForItem = (itemName: string): CraftingRecipe | undefined => {
        return recipeChoices.get(itemName) || getBestRecipeForItem(itemName)[0];
    };

    const handleRecipeChoice = (itemName: string, recipe: CraftingRecipe) => {
        setRecipeChoices(prev => new Map(prev).set(itemName, recipe));
    };

    // Calculate ingredients recursively with recipe choices
    const calculateIngredientsWithChoices = (
        recipe: CraftingRecipe,
        amount: number,
        recipeChain: Set<string> = new Set()
    ): [CalculatedIngredient[], string[]] => {
        const warnings: string[] = [];
        const mainOutput = getMainOutput(recipe);

        if (recipeChain.has(mainOutput.itemName)) {
            warnings.push(`Circular recipe detected: ${mainOutput.itemName} is part of a crafting loop`);
            return [[{
                itemName: mainOutput.itemName,
                quantity: amount,
                isRawMaterial: true
            }], warnings];
        }

        const newChain = new Set(recipeChain).add(mainOutput.itemName);
        const multiplier = Math.ceil(amount / getAverageOutput(mainOutput));

        let ingredients: CalculatedIngredient[] = [];

        for (const ingredient of recipe.ingredients) {
            const recipeOptions = getBestRecipeForItem(ingredient.itemName);
            const selectedRecipe = getSelectedRecipeForItem(ingredient.itemName);
            
            if (selectedRecipe) {
                const [subIngredients, subWarnings] = calculateIngredientsWithChoices(
                    selectedRecipe,
                    ingredient.quantity * multiplier,
                    newChain
                );
                ingredients = ingredients.concat(subIngredients);
                warnings.push(...subWarnings);
            } else {
                ingredients.push({
                    itemName: ingredient.itemName,
                    quantity: ingredient.quantity * multiplier,
                    isRawMaterial: true,
                    alternativeRecipes: recipeOptions
                });
            }
        }

        // Consolidate ingredients
        const consolidated = new Map<string, CalculatedIngredient>();
        for (const ingredient of ingredients) {
            const existing = consolidated.get(ingredient.itemName);
            if (existing) {
                existing.quantity += ingredient.quantity;
                if (ingredient.alternativeRecipes) {
                    existing.alternativeRecipes = existing.alternativeRecipes || [];
                    for (const recipe of ingredient.alternativeRecipes) {
                        if (!existing.alternativeRecipes.some(r => r.recipeName === recipe.recipeName)) {
                            existing.alternativeRecipes.push(recipe);
                        }
                    }
                }
            } else {
                consolidated.set(ingredient.itemName, { ...ingredient });
            }
        }

        return [Array.from(consolidated.values()), warnings];
    };

    // Update results when recipe, quantity, or choices change
    useEffect(() => {
        if (selectedRecipe) {
            const [totals, totalWarnings] = calculateTotals(selectedRecipe, quantity);
            const [ingredients, ingredientWarnings] = calculateIngredientsWithChoices(selectedRecipe, quantity);
            const allWarnings = [...new Set([...totalWarnings, ...ingredientWarnings])];

            setCalculatedResults({
                totals,
                ingredients,
                warnings: allWarnings
            });
            setRecipeWarnings(allWarnings.length > 0 ? allWarnings : []);
        }
    }, [selectedRecipe, quantity, recipeChoices]);

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
                />                {isDropdownOpen && filteredRecipes.size > 0 && (
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
                            {Array.from(filteredRecipes.entries()).map(([itemName, recipes]) => (
                                <Box key={itemName}>
                                    <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>                                        <ListItemText
                                        primary={itemName}
                                        sx={{
                                            fontWeight: 'bold',
                                            '.MuiTypography-root': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    />
                                        <List>                                            {recipes.map((recipe: CraftingRecipe) => (<ListItem
                                                key={recipe.recipeName}
                                                component={'button'}
                                                onClick={() => {
                                                    setSelectedRecipe(recipe);
                                                    setSearchTerm(itemName);
                                                    setIsDropdownOpen(false);
                                                }} sx={{
                                                    pl: 2,
                                                    display: 'block',
                                                    textAlign: 'left',
                                                    width: '100%',
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                                                    }
                                                }}
                                            >
                                                <ListItemText
                                                    primary={<Box>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: 'primary.main',
                                                                fontWeight: 500
                                                            }}
                                                        >
                                                            {recipe.recipeType === 'active'
                                                                ? `via ${recipe.profession}`
                                                                : `using ${recipe.structure}`
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: 'text.primary',
                                                                display: 'block',
                                                                mt: 0.5
                                                            }}
                                                        >                                                            Using: {recipe.ingredients.map((i: CraftingIngredient) =>
                                                                `${i.quantity} ${i.itemName}`).join(', ')}
                                                        </Typography>
                                                    </Box>
                                                    }
                                                />
                                            </ListItem>
                                            ))}
                                        </List>
                                    </ListItem>
                                    <Divider />
                                </Box>
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
                            {getMainOutput(selectedRecipe).itemName}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Outputs:
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                {selectedRecipe.outputs.map((output: RecipeOutput, index: number) => (
                                    <Typography key={index} variant="body2">
                                        {output.itemName}: {
                                            typeof output.quantity === 'number'
                                                ? output.quantity
                                                : `${output.quantity.min}-${output.quantity.max}`
                                        }
                                        {output.chance && output.chance < 1 &&
                                            ` (${Math.round(output.chance * 100)}% chance)`
                                        }
                                    </Typography>
                                ))}
                            </Box>

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
                    </Paper>                    <Paper sx={{ p: 3 }}>                        <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Raw Materials Needed</Typography>
                        <List>
                            {calculatedResults.ingredients
                                .filter((ingredient: CalculatedIngredient) => ingredient.isRawMaterial)
                                .map((ingredient: CalculatedIngredient) => (
                                    <MaterialAlternatives
                                        key={ingredient.itemName}
                                        itemName={ingredient.itemName}
                                        quantity={ingredient.quantity}
                                        alternativeRecipes={ingredient.alternativeRecipes}
                                        onSelectAlternative={(recipe) => {
                                            handleRecipeChoice(ingredient.itemName, recipe);
                                        }}
                                    />
                                ))}
                        </List>
                    </Box>

                        <Box>
                            <Typography variant="h6" gutterBottom>Recipe Tree</Typography>
                            <RecipeTreeView
                                root={buildRecipeTree(getMainOutput(selectedRecipe).itemName, quantity)}
                                recipeChoices={recipeChoices}
                                onRecipeSelect={handleRecipeChoice}
                            />
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};
