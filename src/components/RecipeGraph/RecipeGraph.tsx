import { useCallback, useState, useEffect } from 'react';
import type {
    Node,
    Edge,
    Connection,
} from 'reactflow';
import ReactFlow,
{
    ConnectionMode,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Panel,
    MarkerType
} from 'reactflow';
import { Box, IconButton, Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import type { CraftingRecipe, RecipeOutput } from '../../types/recipes';
import { ALL_RECIPES } from '../../data/recipes';
import 'reactflow/dist/style.css';
import { CustomRecipeNode, type CustomRecipeNodeProps } from './CustomRecipeNode';
import { CustomRecipeEdge } from './CustomRecipeEdge';
import type { CustomItemNodeProps } from './CustomItemNode';


interface RecipeGraphProps {
    recipe: CraftingRecipe;
    quantity: number;
}

type RecipeNodeType = Node<CustomRecipeNodeProps>;

interface IngredientNode {
    itemName: string;
    totalQuantity: number;
    requiredBy: Set<string>;
}

const getMainOutput = (recipe: CraftingRecipe): RecipeOutput => {
    return recipe.outputs[0];
};

const buildGraph = (
    initialRecipe: CraftingRecipe,
    targetQuantity: number
): { nodes: RecipeNodeType[]; edges: Edge[] } => {
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

            const recipes = getRecipesForItem(ingredient.itemName);
            const bestRecipe = recipes[0];

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

            outputIngredient.totalQuantity = batchesNeeded * actualOutputQty;

            // Add recipe to map for this output
            recipesMap.set(output.itemName, currentRecipe);
        });
    };

    // Start collection with empty sets
    collectIngredients(initialRecipe, targetQuantity, new Set());

    // Build nodes and edges
    const nodes: RecipeNodeType[] = [];
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
                recipe: recipe,
                alternativeRecipes: alternatives,
                outputItem: itemName,
            }
        });
    });

    // ✅ PATCHED: Add ingredient-only nodes
    ingredients.forEach((ingredientNode, itemName) => {
        if (!processedNodes.has(itemName)) {
            const nodeId = `node-${itemName}`;
            processedNodes.set(itemName, nodeId);
            nodes.push({
                id: nodeId,
                type: 'custom', // Optionally use a different node type like 'basic'
                position: { x: 0, y: 0 },
                data: {
                    label: itemName,
                    quantity: ingredientNode.totalQuantity,
                    recipe: null,
                    alternativeRecipes: [],
                    outputItem: itemName,
                }
            });
        }
    });

    // Add edges between nodes
    recipeTree.forEach((ingredientsMap, outputItem) => {
        const outputNodeId = processedNodes.get(outputItem);
        if (!outputNodeId) {
            console.warn(`No node found for output: ${outputItem}`);
            return;
        }

        ingredientsMap.forEach((quantity, ingredientItem) => {
            const ingredientNodeId = processedNodes.get(ingredientItem);
            if (!ingredientNodeId) {
                console.warn(`No node found for ingredient: ${ingredientItem}`);
                return;
            }

            edges.push({
                id: `${ingredientNodeId}-${outputNodeId}`,
                source: ingredientNodeId,
                target: outputNodeId,
                sourceHandle: 'output',
                targetHandle: 'input',
                label: String(quantity),
                type: 'custom',
                style: { strokeWidth: 2 },
                markerEnd: {
                    type: MarkerType.ArrowClosed
                },
                data: { quantity } // optionally useful for edge rendering
            });
        });
    });

    return { nodes, edges };
};

const NODE_WIDTH = 180;
const NODE_HEIGHT = 70;  // Further reduced from 80 to 70
const VERTICAL_SPACING = 40;  // Further reduced from 60 to 40
const HORIZONTAL_SPACING = 40;  // Reduced from 50 to 40

interface NodeWithLevel extends RecipeNodeType {
    level?: number;
}

const layoutNodes = (nodes: RecipeNodeType[], edges: Edge[]): RecipeNodeType[] => {
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
        strokeWidth: 3,
        stroke: '#999',
        strokeDasharray: '5 5',
        strokeOpacity: 0.7,
    },
    markerEnd: { type: MarkerType.ArrowClosed },
};

export const RecipeGraph = ({ recipe, quantity }: RecipeGraphProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // Create mutable refs for the state setters so we can use them in useEffect
    const setEdgesRef = useCallback((eds: Edge[]) => setEdges(eds), [setEdges]);
    // Update graph when recipe, quantity, or recipe choices change
    useEffect(() => {
        const { nodes: newNodes, edges: newEdges } = buildGraph(recipe, quantity);
        const layoutedNodes = layoutNodes(newNodes, newEdges);
        setNodes(layoutedNodes);
        setEdges(newEdges);
    }, [recipe, quantity, setNodes, setEdgesRef]);

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
                nodeTypes={{ custom: CustomRecipeNode }}
                edgeTypes={{ custom: CustomRecipeEdge }}
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
