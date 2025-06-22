import type { Node } from "reactflow";
import { Handle, Position } from "reactflow";
import type { CraftingRecipe } from "../../types/recipes";
import { Box } from "@mui/material";
import { getNodeStyle } from "./utils";

const NODE_WIDTH = 180;
const NODE_HEIGHT = 70;  // Further reduced from 80 to 70

export type CustomRecipeNodeProps = {
    label: string;
    quantity: number;
    recipe: CraftingRecipe | null;
    alternativeRecipes?: CraftingRecipe[];
    outputItem: string;
};

export const CustomRecipeNode = (nodeData: { data: Node<CustomRecipeNodeProps>["data"] }) => {
    const { alternativeRecipes, recipe, label, quantity } = nodeData.data;

    const hasAlternatives = alternativeRecipes && alternativeRecipes.length > 1;
    const nodeStyle = getNodeStyle(recipe);

    return (
        <Box sx={{ position: 'relative' }}>
            <Handle type="target" id="input" position={Position.Top} style={{ background: '#555' }} />
            <Box sx={{
                padding: '8px',
                background: nodeStyle.backgroundColor,
                border: `1px solid ${nodeStyle.borderColor}`,
                borderRadius: '5px',
                fontSize: '0.9rem',
                lineHeight: '1.2',
                minWidth: NODE_WIDTH - 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
                {nodeStyle.label && (
                    <div style={{
                        fontSize: '0.7rem',
                        color: nodeStyle.labelColor,
                        marginBottom: '2px',
                        fontWeight: 500
                    }}>
                        {nodeStyle.label}
                    </div>
                )}
                <div style={{
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    color: nodeStyle.labelColor
                }}>
                    {label}
                </div>
                <div style={{
                    marginBottom: hasAlternatives ? '8px' : 0,
                    color: '#666'
                }}>
                    ×{quantity}
                </div>
            </Box>
            <Handle type="source" id="output" position={Position.Bottom} style={{ background: '#555' }} />
        </Box>
    );
};
