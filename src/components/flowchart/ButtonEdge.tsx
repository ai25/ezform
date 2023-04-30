import React from "react";
import { type EdgeProps, getBezierPath } from "reactflow";

const foreignObjectSize = 40;

const onEdgeClick = (evt: React.MouseEvent<HTMLElement>, id: string) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
};

const ButtonEdge: React.FC<EdgeProps> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 2}
                y={labelY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div>
                    <button className="edgebutton" onClick={event => onEdgeClick(event, id)}>
                        ×
                    </button>
                </div>
            </foreignObject>
        </>
    );
};

export default React.memo(ButtonEdge);
