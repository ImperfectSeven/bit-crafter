import React, { useState } from 'react';
import type { CraftingRecipe } from '../types/recipes';
import { ALL_RECIPES } from '../data/recipes';
import {
    Typography,
    Box,
    List,
    ListItem,
    Button,
    Collapse,
} from '@mui/material';

interface MaterialWithAlternativesProps {
    itemName: string;
    quantity: number;
    alternativeRecipes?: CraftingRecipe[];
    onSelectAlternative: (recipe: CraftingRecipe) => void;
}

export const MaterialWithAlternatives = ({ 
    itemName,
    quantity,
    alternativeRecipes,
    onSelectAlternative
}: MaterialWithAlternativesProps) => {
    const [showDetails, setShowDetails] = useState(false);
    
    // Use provided alternatives or find all recipes for this item
    const alternatives = alternativeRecipes || ALL_RECIPES.filter(recipe => 
        recipe.outputs.some(output => output.itemName === itemName)
    );

    // Sort alternatives by efficiency
    const sortedAlternatives = [...alternatives].sort((a, b) => {
        const getEfficiency = (recipe: CraftingRecipe) => {
            const mainOutput = recipe.outputs.find(o => !o.chance || o.chance === 1) ?? recipe.outputs[0];
            const avgOutput = typeof mainOutput.quantity === 'number' 
                ? mainOutput.quantity 
                : (mainOutput.quantity.min + mainOutput.quantity.max) / 2;
            return recipe.recipeType === 'active' 
                ? avgOutput / recipe.effort 
                : avgOutput / recipe.seconds;
        };
        return getEfficiency(b) - getEfficiency(a);
    });

    return (
        <React.Fragment>
            <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {itemName}
                            <Typography component="span" sx={{ ml: 1, color: 'text.secondary' }}>
                                × {quantity}
                            </Typography>
                        </Typography>
                        {alternatives.length > 1 && (
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" color="info.main" sx={{ mb: 1, display: 'block' }}>
                                    Choose recipe to use:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {sortedAlternatives.map((recipe, idx) => (
                                        <Button
                                            key={idx}
                                            size="small"
                                            variant="outlined"
                                            onClick={() => onSelectAlternative(recipe)}
                                            sx={{
                                                fontSize: '0.8125rem',
                                                textTransform: 'none',
                                                minHeight: 0,
                                                padding: '4px 8px'
                                            }}
                                        >
                                            {recipe.ingredients.map(i => `${i.quantity} ${i.itemName}`).join(' + ')}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>
                    {alternatives.length > 0 && (
                        <Button
                            onClick={() => setShowDetails(!showDetails)}
                            size="small"
                            variant={showDetails ? "outlined" : "text"}
                            color="primary"
                            sx={{ 
                                ml: 2,
                                minWidth: 100,
                                alignSelf: 'flex-start',
                                '&:hover': {
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            {showDetails ? 'Hide' : 'Show'} Details
                        </Button>
                    )}
                </Box>
            </ListItem>
            <Collapse in={showDetails}>
                <ListItem sx={{ pl: 4 }}>
                    <Box sx={{ width: '100%' }}>
                        <List sx={{ 
                            pl: 1,
                            '& .MuiListItem-root': {
                                borderRadius: 1,
                                mb: 1,
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                            }
                        }}>
                            {sortedAlternatives.map((recipe, idx) => (
                                <ListItem 
                                    key={idx} 
                                    sx={{ 
                                        py: 1,
                                        px: 2,
                                        backgroundColor: 'action.hover',
                                        '&:hover': {
                                            backgroundColor: 'action.selected',
                                            cursor: 'pointer',
                                            transform: 'translateX(4px)',
                                            transition: 'all 0.2s'
                                        }
                                    }}
                                    onClick={() => onSelectAlternative(recipe)}
                                >
                                    <Box sx={{ width: '100%' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                                            {recipe.recipeName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                            {recipe.recipeType === 'active' 
                                                ? `${recipe.profession} • ${recipe.effort} Effort Points` 
                                                : `${recipe.structure} • ${Math.floor(recipe.seconds / 60)} minutes`}
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                                            Ingredients: {recipe.ingredients.map(i => `${i.quantity} ${i.itemName}`).join(', ')}
                                        </Typography>
                                        {recipe.outputs.length > 1 && (
                                            <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>
                                                Extra outputs: {recipe.outputs
                                                    .filter(o => o.itemName !== itemName)
                                                    .map(o => `${typeof o.quantity === 'number' ? o.quantity : `${o.quantity.min}-${o.quantity.max}`} ${o.itemName}`)
                                                    .join(', ')}
                                            </Typography>
                                        )}
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </ListItem>
            </Collapse>
        </React.Fragment>
    );
};
