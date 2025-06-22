
import {
Position,
getBezierPath,
} from 'reactflow';

import 'reactflow/dist/style.css';

export const CustomRecipeEdge = ({
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