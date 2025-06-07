import { useCallback, useState, useEffect } from 'react';
import type {
    Node,
    Edge,
    Connection,
    NodeTypes,
    EdgeTypes
} from 'reactflow';
import ReactFlow,
{
    ConnectionMode,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Panel,
    Position,
    getBezierPath,
    Handle,
    MarkerType
} from 'reactflow';
import { Box, IconButton, Tooltip, Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import type { CraftingRecipe, RecipeOutput } from '../types/recipes';
import { ALL_RECIPES } from '../data/recipes';
import 'reactflow/dist/style.css';

interface RecipeGraphProps {
    recipe: CraftingRecipe;
    quantity: number;
    recipeChoices: Map<string, CraftingRecipe>;
    onRecipeSelect: (itemName: string, recipe: CraftingRecipe) => void;
}

interface RecipeNode extends Node {
    data: {
        label: string;
        quantity: number;
        recipe?: CraftingRecipe;
        alternativeRecipes?: CraftingRecipe[];
        outputItem: string;
        onRecipeSelect: (itemName: string, recipe: CraftingRecipe) => void;
    };
}

interface IngredientNode {
    itemName: string;
    totalQuantity: number;
    requiredBy: Set<string>;
}

const CustomNode = (nodeProps: { data: RecipeNode['data'] }) => {
    const alternativeRecipes = nodeProps.data.alternativeRecipes || [];
    const hasAlternatives = alternativeRecipes.length > 1; // Only show if there are multiple choices
    const currentRecipe = nodeProps.data.recipe;

    const handleRecipeSelect = (event: SelectChangeEvent<string>) => {
        console.log('Selection changed:', event.target.value);
        const selectedRecipe = alternativeRecipes.find(r => r.recipeName === event.target.value);
        console.log('Found recipe:', selectedRecipe);
        if (selectedRecipe) {
            console.log('Calling onRecipeSelect with:', nodeProps.data.outputItem, selectedRecipe);
            nodeProps.data.onRecipeSelect(nodeProps.data.outputItem, selectedRecipe);
        }
    };
    return (
        <div style={{ position: 'relative' }}>            <div style={{
                padding: '8px',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '0.9rem',
                lineHeight: '1.2',
                minWidth: NODE_WIDTH - 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    color: '#333'
                }}>
                    {nodeProps.data.label}
                </div>
                <div style={{
                    marginBottom: hasAlternatives ? '8px' : 0,
                    color: '#666'
                }}>
                    ×{nodeProps.data.quantity}
                </div>
                {hasAlternatives && (
                    <div className="nodrag">                        
                    <Select
                        value={currentRecipe?.recipeName || ''}
                        onChange={handleRecipeSelect}
                        size="small"
                        native={false}
                        className="nodrag"
                        sx={{
                            fontSize: '11px',
                            backgroundColor: 'white',
                            width: '100%',
                            '.MuiSelect-select': {
                                padding: '4px 8px'
                            }
                        }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 200
                                }
                            }
                        }}
                    >
                        {alternativeRecipes.map((recipe: CraftingRecipe) => (
                            <MenuItem
                                key={recipe.recipeName}
                                value={recipe.recipeName}
                                sx={{
                                    fontSize: '11px',
                                    padding: '4px 8px'
                                }}
                            >
                                {recipe.ingredients.map((i) => `${i.quantity}x${i.itemName}`).join(', ')}
                            </MenuItem>))}
                    </Select>
                    </div>
                )}
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="bottom"
                style={{ background: '#555' }}
                isConnectable={false}
            />
            <Handle
                type="target"
                position={Position.Top}
                id="top"
                style={{ background: '#555' }}
                isConnectable={false}
            />
        </div>
    );
};

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    label,
    markerEnd,
}: any) => {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition: sourcePosition || Position.Bottom,
        targetX,
        targetY,
        targetPosition: targetPosition || Position.Top,
    });

    return (
        <>
            <path
                id={id}
                style={{
                    strokeWidth: 1,
                    stroke: '#999',
                    strokeDasharray: '5 5',
                    opacity: 0.7,
                    ...style
                }}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            {label && (
                <text
                    style={{
                        fontSize: '11px',
                        fill: '#666',
                        fontWeight: 400,
                    }}
                >
                    <textPath
                        href={`#${id}`}
                        style={{ fontSize: '12px' }}
                        startOffset="50%"
                        textAnchor="middle"
                        dominantBaseline="central"
                    >
                        {label}
                    </textPath>
                </text>
            )}
        </>
    );
};

const nodeTypes: NodeTypes = {
    custom: CustomNode
};

const edgeTypes: EdgeTypes = {
    custom: CustomEdge
};

const getMainOutput = (recipe: CraftingRecipe): RecipeOutput => {
    // Return first output or first guaranteed output if there are multiple
    return recipe.outputs.find(out => !out.chance) || recipe.outputs[0];
};

const getNodeQuantity = (recipe: CraftingRecipe | undefined, ingredient: IngredientNode | undefined): number => {
    if (!recipe) {
        return ingredient?.totalQuantity || 0;
    }
    const mainOutput = getMainOutput(recipe);
    const qty = mainOutput.quantity;
    return typeof qty === 'number' ? qty : Math.floor((qty.min + qty.max) / 2);
};

const buildGraph = (
    initialRecipe: CraftingRecipe,
    targetQuantity: number,
    recipeChoices: Map<string, CraftingRecipe>,
    onRecipeSelect: (itemName: string, recipe: CraftingRecipe) => void
): { nodes: RecipeNode[]; edges: Edge[] } => {
    const ingredients = new Map<string, IngredientNode>();
    const recipesMap = new Map<string, CraftingRecipe>();
    const recipeTree = new Map<string, Map<string, number>>();
    const alternativeRecipesMap = new Map<string, CraftingRecipe[]>();
    const processedPaths = new Set<string>();

    // Helper to add or get ingredient
    const getOrCreateIngredient = (itemName: string): IngredientNode => {
        if (!ingredients.has(itemName)) {
            ingredients.set(itemName, {
                itemName,
                totalQuantity: 0,
                requiredBy: new Set()
            });
        }
        return ingredients.get(itemName)!;
    };

    // Pre-process for cyclic dependencies
    const cyclicDependencies = new Map<string, Set<string>>();
    ALL_RECIPES.forEach(recipe => {
        const mainOutput = getMainOutput(recipe);
        const dependencyChain = new Set<string>();
        
        const findCyclicDeps = (currentRecipe: CraftingRecipe, chain: Set<string>) => {
            const output = getMainOutput(currentRecipe);
            
            if (chain.has(output.itemName)) {
                if (!cyclicDependencies.has(mainOutput.itemName)) {
                    cyclicDependencies.set(mainOutput.itemName, new Set());
                }
                cyclicDependencies.get(mainOutput.itemName)!.add(output.itemName);
                return;
            }
            
            chain.add(output.itemName);
            
            currentRecipe.ingredients.forEach(ing => {
                const recipes = ALL_RECIPES.filter(r => 
                    r.outputs.some(o => o.itemName === ing.itemName)
                );
                recipes.forEach(r => findCyclicDeps(r, new Set(chain)));
            });
        };
        
        findCyclicDeps(recipe, dependencyChain);
    });

    const getRecipesForItem = (itemName: string): CraftingRecipe[] => {
        if (alternativeRecipesMap.has(itemName)) {
            return alternativeRecipesMap.get(itemName)!;
        }

        // Get all recipes that produce this item
        const recipes = ALL_RECIPES.filter(recipe => 
            recipe.outputs.some(output => output.itemName === itemName)
        );
        
        // Add currently selected recipe if it exists and isn't in the list
        const currentRecipe = recipeChoices.get(itemName);
        if (currentRecipe && !recipes.some(r => r.recipeName === currentRecipe.recipeName)) {
            recipes.push(currentRecipe);
        }
        
        if (recipes.length > 0) {
            alternativeRecipesMap.set(itemName, recipes);
        }
        
        return recipes;
    };

    const collectIngredients = (
        currentRecipe: CraftingRecipe,
        qty: number,
        processedItems: Set<string>,
        depth: number = 0,
        path: string[] = []
    ) => {
        if (depth > 5) {
            console.warn('Max depth reached:', path.join(' -> '));
            return;
        }

        const mainOutput = getMainOutput(currentRecipe);
        const currentPath = [...path, mainOutput.itemName].join('->');
        
        if (processedPaths.has(currentPath)) {
            return;
        }
        processedPaths.add(currentPath);

        // Calculate how many batches we need based on target quantity
        const outputQty = typeof mainOutput.quantity === 'number' ? 
            mainOutput.quantity : 
            Math.floor((mainOutput.quantity.min + mainOutput.quantity.max) / 2);

        const batchesNeeded = Math.ceil(qty / outputQty);

        // Process ingredients first to ensure proper quantity tracking
        currentRecipe.ingredients.forEach(ingredient => {
            const ingredientNode = getOrCreateIngredient(ingredient.itemName);

            // Track that this ingredient is required by all outputs
            currentRecipe.outputs.forEach(output => {
                ingredientNode.requiredBy.add(output.itemName);
            });

            // Calculate exact quantity needed for this ingredient
            const ingQty = ingredient.quantity * batchesNeeded;
            ingredientNode.totalQuantity = ingQty;
            
            // Update recipe tree
            currentRecipe.outputs.forEach(output => {
                if (!recipeTree.has(output.itemName)) {
                    recipeTree.set(output.itemName, new Map());
                }
                recipeTree.get(output.itemName)!.set(ingredient.itemName, ingQty);
            });

            // Check for cyclic dependencies
            const isCyclic = currentRecipe.outputs.some(output => 
                cyclicDependencies.get(output.itemName)?.has(ingredient.itemName)
            );
            
            const selectedRecipe = recipeChoices.get(ingredient.itemName);
            const recipes = getRecipesForItem(ingredient.itemName);
            const bestRecipe = selectedRecipe || recipes[0];

            // Only process if not cyclic or hasn't been processed in this branch
            if (bestRecipe && (!isCyclic || !processedItems.has(ingredient.itemName))) {
                const newProcessedItems = new Set(processedItems);
                newProcessedItems.add(ingredient.itemName);
                collectIngredients(bestRecipe, ingQty, newProcessedItems, depth + 1, [...path, mainOutput.itemName]);
            }
        });

        // Process outputs after ingredients
        currentRecipe.outputs.forEach(output => {
            const outputIngredient = getOrCreateIngredient(output.itemName);
            const actualOutputQty = typeof output.quantity === 'number' ? 
                output.quantity : 
                Math.floor((output.quantity.min + output.quantity.max) / 2);
            
            outputIngredient.totalQuantity = batchesNeeded * actualOutputQty * (output.chance || 1);

            // Add recipe to map for this output
            recipesMap.set(output.itemName, currentRecipe);
        });
    };

    // Start collection with empty sets
    collectIngredients(initialRecipe, targetQuantity, new Set());

    // Build nodes and edges
    const nodes: RecipeNode[] = [];
    const edges: Edge[] = [];
    const processedNodes = new Map<string, string>();

    // First add recipe nodes
    Array.from(recipesMap.entries()).forEach(([itemName, recipe]) => {
        const nodeId = `node-${itemName}`;
        processedNodes.set(itemName, nodeId);
        const alternatives = alternativeRecipesMap.get(itemName) || [];
        nodes.push({
            id: nodeId,
            type: 'custom',
            position: { x: 0, y: 0 },
            data: {
                label: itemName,
                quantity: ingredients.get(itemName)?.totalQuantity || 0,
                recipe: recipeChoices.get(itemName) || recipe,
                alternativeRecipes: alternatives,
                outputItem: itemName,
                onRecipeSelect
            }
        });
    });

    // Then add nodes for all ingredients that don't have recipes
    Array.from(ingredients.entries())
        .filter(([itemName]) => !processedNodes.has(itemName))
        .forEach(([itemName, ingredient]) => {
            const nodeId = `node-${itemName}`;
            processedNodes.set(itemName, nodeId);
            const alternatives = alternativeRecipesMap.get(itemName) || [];
            const recipe = recipeChoices.get(itemName);
            nodes.push({
                id: nodeId,
                type: 'custom',
                position: { x: 0, y: 0 },
                data: {
                    label: itemName,
                    quantity: ingredient.totalQuantity,
                    recipe: recipe,
                    alternativeRecipes: alternatives,
                    outputItem: itemName,
                    onRecipeSelect
                }
            });
        });

    // Add edges between nodes
    recipeTree.forEach((ingredients, outputItem) => {
        const outputNodeId = processedNodes.get(outputItem);
        if (!outputNodeId) return;

        ingredients.forEach((quantity, ingredientItem) => {
            const ingredientNodeId = processedNodes.get(ingredientItem);
            if (!ingredientNodeId) {
                console.warn(`No node found for ingredient: ${ingredientItem}`);
                return;
            }

            edges.push({
                id: `${ingredientNodeId}-${outputNodeId}`,
                source: ingredientNodeId,
                target: outputNodeId,
                sourceHandle: 'bottom',
                targetHandle: 'top',
                label: String(quantity),
                type: 'custom',
                style: { strokeWidth: 2 },
                markerEnd: 'arrowclosed'
            });
        });
    });

    return { nodes, edges };
};

const NODE_WIDTH = 180;
const NODE_HEIGHT = 70;  // Further reduced from 80 to 70
const VERTICAL_SPACING = 40;  // Further reduced from 60 to 40
const HORIZONTAL_SPACING = 40;  // Reduced from 50 to 40

interface NodeWithLevel extends RecipeNode {
    level?: number;
}

const layoutNodes = (nodes: RecipeNode[], edges: Edge[]): RecipeNode[] => {
    // Create a map of node dependencies (what nodes each node depends on)
    const dependencies = new Map<string, Set<string>>();
    const dependents = new Map<string, Set<string>>();

    // Initialize maps
    nodes.forEach(node => {
        dependencies.set(node.id, new Set());
        dependents.set(node.id, new Set());
    });

    // Build dependency graph and detect cycles
    const cycles = new Set<string>();
    edges.forEach(edge => {
        dependencies.get(edge.target)?.add(edge.source);
        dependents.get(edge.source)?.add(edge.target);

        // Check for direct cycles (A -> B -> A)
        if (dependencies.get(edge.source)?.has(edge.target)) {
            cycles.add(edge.source);
            cycles.add(edge.target);
        }
    });

    // Find root nodes (nodes with no dependencies)
    const rootNodes = nodes.filter(node => 
        dependencies.get(node.id)?.size === 0 && !cycles.has(node.id)
    );

    // If no non-cyclic root nodes were found, pick the first node as root
    if (rootNodes.length === 0 && nodes.length > 0) {
        rootNodes.push(nodes[0]);
    }

    // Process nodes in BFS order and assign levels
    const nodeMap = new Map(nodes.map(node => [node.id, { ...node, level: -1 }]));
    const queue = rootNodes.map(node => {
        const n = nodeMap.get(node.id)!;
        n.level = 0;
        return n;
    });

    const processed = new Set<string>();
    const maxIterations = nodes.length * 2; // Prevent infinite loops
    let iterations = 0;

    while (queue.length > 0 && iterations < maxIterations) {
        iterations++;
        const current = queue.shift()!;
        processed.add(current.id);

        // Get dependent nodes
        const deps = Array.from(dependents.get(current.id) || []);
        for (const depId of deps) {
            const depNode = nodeMap.get(depId)!;

            if (cycles.has(depId)) {
                // For cyclic nodes, position them on the same level as their dependencies
                depNode.level = Math.max(
                    current.level,
                    depNode.level === -1 ? current.level : depNode.level
                );
            } else {
                // For non-cyclic nodes, position them one level below
                depNode.level = Math.max(
                    current.level + 1,
                    depNode.level === -1 ? current.level + 1 : depNode.level
                );
            }

            // Only add to queue if all dependencies are processed
            const allDepsProcessed = Array.from(dependencies.get(depId) || [])
                .every(d => processed.has(d));
            
            if (!processed.has(depId) && allDepsProcessed) {
                queue.push(depNode);
            }
        }
    }

    // Position nodes
    const nodesByLevel = new Map<number, NodeWithLevel[]>();
    for (const node of nodeMap.values()) {
        // If node level wasn't set, add it to the last level
        if (node.level === -1) {
            const maxLevel = Math.max(...Array.from(nodeMap.values()).map(n => n.level));
            node.level = maxLevel + 1;
        }

        if (!nodesByLevel.has(node.level)) {
            nodesByLevel.set(node.level, []);
        }
        nodesByLevel.get(node.level)!.push(node);
    }

    // Position nodes on each level
    nodesByLevel.forEach((levelNodes, level) => {
        const totalWidth = levelNodes.length * NODE_WIDTH + 
            (levelNodes.length - 1) * HORIZONTAL_SPACING;
        const startX = -totalWidth / 2;

        levelNodes.forEach((node, index) => {
            node.position = {
                x: startX + index * (NODE_WIDTH + HORIZONTAL_SPACING),
                y: level * (NODE_HEIGHT + VERTICAL_SPACING)
            };
        });
    });

    return Array.from(nodeMap.values());
};

const defaultEdgeOptions = {
    type: 'custom',
    animated: false,
    style: {
        strokeWidth: 1,
        stroke: '#999',
        strokeDasharray: '5 5',
        strokeOpacity: 0.7,
    },
    markerEnd: { type: MarkerType.ArrowClosed },
};

export const RecipeGraph = ({ recipe, quantity, recipeChoices, onRecipeSelect }: RecipeGraphProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // Create mutable refs for the state setters so we can use them in useEffect
    const setEdgesRef = useCallback((eds: Edge[]) => setEdges(eds), [setEdges]);
    // Update graph when recipe, quantity, or recipe choices change
    useEffect(() => {
        const { nodes: newNodes, edges: newEdges } = buildGraph(recipe, quantity, recipeChoices, onRecipeSelect);
        const layoutedNodes = layoutNodes(newNodes, newEdges);
        setNodes(layoutedNodes);
        setEdges(newEdges);
    }, [recipe, quantity, recipeChoices, setNodes, setEdgesRef, onRecipeSelect]);

    const handleConnect = useCallback(
        (params: Connection) => {
            if (params.source && params.target) {
                const edge: Edge = {
                    id: `${params.source}-${params.target}`,
                    source: params.source,
                    target: params.target,
                    ...defaultEdgeOptions,
                };
                setEdges((eds) => [...eds, edge]);
            }
        },
        [setEdges]
    );

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen(!isFullscreen);
    }, [isFullscreen]);

    return (
        <Box
            sx={{
                width: '100%',
                height: isFullscreen ? '100vh' : '600px',
                position: isFullscreen ? 'fixed' : 'relative',
                top: isFullscreen ? 0 : 'auto',
                left: isFullscreen ? 0 : 'auto',
                zIndex: isFullscreen ? 1000 : 1,
                bgcolor: 'background.paper',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <ReactFlow nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={handleConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionMode={ConnectionMode.Loose}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                    minZoom: 0.1,
                    maxZoom: 1.5
                }}
                minZoom={0.1}
                maxZoom={1.5}
            >
                <Background />
                <Controls />
                <Panel position="top-left">
                    <IconButton
                        onClick={toggleFullscreen}
                        sx={{
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'background.default' }
                        }}
                    >
                        <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </Tooltip>
                    </IconButton>
                </Panel>
            </ReactFlow>
        </Box>
    );
};
