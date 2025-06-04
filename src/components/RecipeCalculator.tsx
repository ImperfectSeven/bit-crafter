import { useState } from 'react';
import { type CraftingRecipe, SAMPLE_RECIPES } from '../types/recipes';
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
} from '@mui/material';
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

export const RecipeCalculator = () => {
    const [selectedRecipe, setSelectedRecipe] = useState<CraftingRecipe | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const searchContainerRef = useClickOutside(() => setIsDropdownOpen(false));
    
    const PARALLEL_SLOTS_PER_STRUCTURE = 10;

    const filteredRecipes = SAMPLE_RECIPES.filter(recipe => 
        recipe.outputItem.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getAverageOutput = (outputQty: number | { min: number; max: number }): number => {
        if (typeof outputQty === 'number') {
            return outputQty;
        }
        return (outputQty.min + outputQty.max) / 2;
    };

    const calculateTotals = (recipe: CraftingRecipe, amount: number): CraftingTotals => {
        const result: CraftingTotals = {
            totalEffort: 0,
            totalSeconds: 0,
            items: [],
            structureUsage: []
        };

        const processRecipe = (r: CraftingRecipe, qty: number) => {
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
                // Find or create structure usage entry
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
                
                // Calculate batches needed (rounded up)
                const totalBatches = Math.ceil(attempts / PARALLEL_SLOTS_PER_STRUCTURE);
                structureUsage.totalBatches = Math.max(structureUsage.totalBatches, totalBatches);
                
                // Total time is seconds per attempt * number of full batches needed
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

            // Process ingredients recursively
            r.ingredients.forEach(ingredient => {
                const subRecipe = SAMPLE_RECIPES.find(sr => sr.outputItem === ingredient.itemName);
                if (subRecipe) {
                    processRecipe(subRecipe, ingredient.quantity * attempts);
                }
            });
        };

        processRecipe(recipe, amount);
        return result;
    };

    const calculateCraftingAttempts = (recipe: CraftingRecipe, targetAmount: number): CraftingAttempts => {
        if (typeof recipe.outputQuantity === 'number') {
            const attempts = Math.ceil(targetAmount / recipe.outputQuantity);
            return { min: attempts, max: attempts };
        }
        // Calculate attempts based on average output
        const avgAttempts = Math.ceil(targetAmount / getAverageOutput(recipe.outputQuantity));
        // Also calculate min/max for display purposes
        return {
            min: Math.ceil(targetAmount / recipe.outputQuantity.max),
            max: Math.ceil(targetAmount / recipe.outputQuantity.min),
            average: avgAttempts
        } as CraftingAttempts & { average: number };
    };

    const formatCraftingAttempts = (attempts: CraftingAttempts & { average?: number }): string => {
        if ('average' in attempts && attempts.average) {
            return `${attempts.average} (range: ${attempts.min}-${attempts.max})`;
        }
        return attempts.min === attempts.max ?
            attempts.min.toString() :
            `${attempts.min}-${attempts.max}`;
    };

    const calculateIngredientsRecursive = (recipe: CraftingRecipe, amount: number): CalculatedIngredient[] => {
        const getMultiplier = (outputQty: number | { min: number; max: number }) => {
            if (typeof outputQty === 'number') {
                return Math.ceil(amount / outputQty);
            }
            // Use average output instead of minimum
            return Math.ceil(amount / getAverageOutput(outputQty));
        };        const multiplier = getMultiplier(recipe.outputQuantity);
        const ingredients = recipe.ingredients.map(ingredient => {
            const subRecipe = SAMPLE_RECIPES.find(r => r.outputItem === ingredient.itemName);
            if (subRecipe) {
                // Mark the current ingredient as an intermediate item since it can be crafted
                const intermediateItem = [{
                    itemName: ingredient.itemName,
                    quantity: ingredient.quantity * multiplier,
                    isRawMaterial: false
                }];
                // Get the sub-ingredients needed to craft this intermediate item
                const subIngredients = calculateIngredientsRecursive(subRecipe, ingredient.quantity * multiplier);
                return [...intermediateItem, ...subIngredients];
            }
            return [{
                itemName: ingredient.itemName,
                quantity: ingredient.quantity * multiplier,
                isRawMaterial: true
            }];
        });

        const flatIngredients = ingredients.flat();
        return flatIngredients.reduce((acc, curr) => {
            const existing = acc.find(item => item.itemName === curr.itemName);
            if (existing) {
                existing.quantity += curr.quantity;
            } else {
                acc.push({ ...curr });
            }
            return acc;
        }, [] as CalculatedIngredient[]);
    };

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

            {selectedRecipe && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

                        {(() => {
                            const totals = calculateTotals(selectedRecipe, quantity);
                            return (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography>
                                        Crafting attempts needed: {formatCraftingAttempts(calculateCraftingAttempts(selectedRecipe, quantity))}
                                    </Typography>
                                    
                                    {totals.totalEffort > 0 && (
                                        <Typography>
                                            Total Effort Required: {totals.totalEffort} EP
                                        </Typography>
                                    )}
                                    {totals.totalSeconds > 0 && (
                                        <Typography>
                                            Total Processing Time: {Math.floor(totals.totalSeconds / 60)} minutes {totals.totalSeconds % 60} seconds
                                        </Typography>
                                    )}

                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography color="primary">View Process Breakdown</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <List>
                                                {totals.items.map((item, index) => (
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

                                    {totals.structureUsage.length > 0 && (
                                        <Accordion>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography color="primary">View Structure Usage</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <List>
                                                    {totals.structureUsage.map((usage, index) => (
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
                            );
                        })()}
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom>Raw Materials Needed</Typography>
                            <List>
                                {calculateIngredientsRecursive(selectedRecipe, quantity)
                                    .filter(ingredient => ingredient.isRawMaterial)
                                    .map(ingredient => (
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
                            <Typography variant="h6" gutterBottom>Intermediate Items</Typography>
                            <List>
                                {calculateIngredientsRecursive(selectedRecipe, quantity)
                                    .filter(ingredient => !ingredient.isRawMaterial)
                                    .map(ingredient => (
                                        <ListItem key={ingredient.itemName}>
                                            <ListItemText 
                                                primary={`${ingredient.itemName}: ${ingredient.quantity}`}
                                                sx={{ color: 'info.main' }}
                                            />
                                        </ListItem>
                                    ))}
                            </List>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};
