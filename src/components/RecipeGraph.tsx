import { useCallback, useState } from 'react';
import type {
    Node,
    Edge,
    Connection,
    NodeTypes,
    EdgeTypes
} from 'reactflow';
import ReactFlow, {
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
import { Box, IconButton, Tooltip } from '@mui/material';
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

const CustomNode = (nodeProps: any) => {
    const hasAlternatives = nodeProps.data.alternativeRecipes && nodeProps.data.alternativeRecipes.length > 1;
    return (
        <>
            {/* Source handle at bottom */}            <div style={{ padding: '10px', background: '#fff', border: '1px solid #ccc', borderRadius: '5px' }}>
                <div style={{ fontWeight: 'bold' }}>{nodeProps.data.label}</div>
                <div>x{nodeProps.data.quantity}</div>
                {hasAlternatives && (
                    <button 
                        onClick={() => nodeProps.data.onRecipeSelect(nodeProps.data.outputItem, nodeProps.data.recipe)}
                        style={{ fontSize: '12px', padding: '2px 5px', marginTop: '5px' }}
                    >
                        Select Recipe
                    </button>
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
        </>
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

const buildGraph = (
    initialRecipe: CraftingRecipe,
    targetQuantity: number,
    recipeChoices: Map<string, CraftingRecipe>
): { nodes: RecipeNode[]; edges: Edge[] } => {
    const ingredients = new Map<string, IngredientNode>();
    const recipesMap = new Map<string, CraftingRecipe>();
    const recipeTree = new Map<string, Map<string, number>>();
    const alternativeRecipesMap = new Map<string, CraftingRecipe[]>();

    const getBestRecipeForItem = (itemName: string): CraftingRecipe[] => {
        const recipes = ALL_RECIPES.filter(recipe => {
            const mainOutput = getMainOutput(recipe);
            return mainOutput.itemName === itemName;
        });
        if (recipes.length > 0) {
            alternativeRecipesMap.set(itemName, recipes);
        }
        return recipes;
    };    const collectIngredients = (
        currentRecipe: CraftingRecipe,
        qty: number,
        visited: Set<string> = new Set()
    ) => {
        const mainOutput = getMainOutput(currentRecipe);
        const outputQty = typeof mainOutput.quantity === 'number' ? 
            mainOutput.quantity : 
            (mainOutput.quantity.min + mainOutput.quantity.max) / 2;
        
        recipesMap.set(mainOutput.itemName, currentRecipe);

        if (!recipeTree.has(mainOutput.itemName)) {
            recipeTree.set(mainOutput.itemName, new Map());
        }

        if (visited.has(mainOutput.itemName)) {
            return;
        }
        visited.add(mainOutput.itemName);

        currentRecipe.ingredients.forEach(ingredient => {
            const batchesNeeded = Math.ceil(qty / outputQty);
            recipeTree.get(mainOutput.itemName)!.set(ingredient.itemName, ingredient.quantity * batchesNeeded);

            if (!ingredients.has(ingredient.itemName)) {
                ingredients.set(ingredient.itemName, {
                    itemName: ingredient.itemName,
                    totalQuantity: 0,
                    requiredBy: new Set()
                });
            }

            const consolidatedIngredient = ingredients.get(ingredient.itemName)!;
            // Add to the total quantity instead of replacing it
            consolidatedIngredient.totalQuantity += batchesNeeded * ingredient.quantity;
            consolidatedIngredient.requiredBy.add(mainOutput.itemName);

            const selectedRecipe = recipeChoices.get(ingredient.itemName);
            const bestRecipe = selectedRecipe || getBestRecipeForItem(ingredient.itemName)[0];
            if (bestRecipe) {
                recipesMap.set(ingredient.itemName, bestRecipe);
                collectIngredients(
                    bestRecipe,
                    qty * ingredient.quantity,
                    new Set(visited)
                );
            }
        });
    };

    collectIngredients(initialRecipe, targetQuantity);

    const nodes: RecipeNode[] = [];
    const edges: Edge[] = [];
    const processedNodes = new Map<string, string>();

    // Add recipe nodes
    Array.from(recipesMap.entries()).forEach(([itemName, recipe]) => {
        const nodeId = `node-${itemName}`;
        processedNodes.set(itemName, nodeId);
        nodes.push({
            id: nodeId,
            type: 'custom',
            position: { x: 0, y: 0 },
            data: {
                label: itemName,
                quantity: ingredients.get(itemName)?.totalQuantity || targetQuantity,
                recipe,
                alternativeRecipes: alternativeRecipesMap.get(itemName),
                outputItem: itemName,
                onRecipeSelect: () => {} // Will be replaced by component's onRecipeSelect
            }
        });
    });

    // Add raw material nodes
    Array.from(ingredients.entries())
        .filter(([itemName]) => !recipesMap.has(itemName))
        .forEach(([itemName, ingredient]) => {
            const nodeId = `node-${itemName}`;
            processedNodes.set(itemName, nodeId);
            nodes.push({
                id: nodeId,
                type: 'custom',
                position: { x: 0, y: 0 },
                data: {
                    label: itemName,
                    quantity: ingredient.totalQuantity,
                    outputItem: itemName,
                    onRecipeSelect: () => {} // Will be replaced by component's onRecipeSelect
                }
            });
        });    // Add edges
    for (const [outputItem, ingredients] of recipeTree.entries()) {
        const outputNodeId = processedNodes.get(outputItem);
        if (!outputNodeId) continue;

        for (const [ingredientItem, quantity] of ingredients.entries()) {
            const ingredientNodeId = processedNodes.get(ingredientItem);
            if (!ingredientNodeId) continue;            
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
        }
    }

    return { nodes, edges };
};

const NODE_WIDTH = 180;
const NODE_HEIGHT = 100;
const VERTICAL_SPACING = 100;
const HORIZONTAL_SPACING = 50;

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

    // Build dependency graph
    edges.forEach(edge => {
        dependencies.get(edge.target)?.add(edge.source);
        dependents.get(edge.source)?.add(edge.target);
    });

    // Find root nodes (nodes with no dependencies)
    const rootNodes = nodes.filter(node => dependencies.get(node.id)?.size === 0);

    // Assign levels through BFS
    const nodesWithLevel: NodeWithLevel[] = nodes.map(node => ({ ...node, level: -1 }));
    const nodeMap = new Map(nodesWithLevel.map(node => [node.id, node]));

    // Start with root nodes at level 0
    const queue: NodeWithLevel[] = rootNodes.map(node => ({ ...node, level: 0 }));
    queue.forEach(node => nodeMap.set(node.id, node));    while (queue.length > 0) {
        const current = queue.shift()!;
        const dependentNodes = Array.from(dependents.get(current.id) || []);

        for (const depId of dependentNodes) {
            const depNode = nodeMap.get(depId);
            if (depNode && current.level !== undefined) {
                // Node's level should be one more than its highest dependency
                const newLevel = current.level + 1;
                const currentLevel = depNode.level ?? -1;
                if (currentLevel === -1 || currentLevel < newLevel) {
                    depNode.level = newLevel;
                    queue.push(depNode);
                }
            }
        }
    }

    // Group nodes by level
    const nodesByLevel = new Map<number, NodeWithLevel[]>();
    Array.from(nodeMap.values()).forEach(node => {
        if (!nodesByLevel.has(node.level!)) {
            nodesByLevel.set(node.level!, []);
        }
        nodesByLevel.get(node.level!)!.push(node);
    });    // Position nodes
    nodesByLevel.forEach((levelNodes, level) => {
        const totalWidth = levelNodes.length * NODE_WIDTH + (levelNodes.length - 1) * HORIZONTAL_SPACING;
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
    const [isFullscreen, setIsFullscreen] = useState(false);    const { nodes: initialNodes, edges: initialEdges } = buildGraph(recipe, quantity, recipeChoices);
    const layoutedNodes = layoutNodes(initialNodes, initialEdges);

    const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
            }}
        >
            <ReactFlow
                nodes={nodes.map(node => ({
                    ...node,
                    data: { ...node.data, onRecipeSelect }
                }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={handleConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionMode={ConnectionMode.Loose}
                fitView
            >
                <Background />
                <Controls />                <Panel position="top-left">
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
