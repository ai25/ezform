import React from "react";
import { type DragSourceMonitor, useDrag } from "react-dnd";
interface NodeProps {
    id: string;
    item: DragItem;
}
export interface DragItem {
    id: string;
    type: string;
    x: number;
    y: number;
}

export const ItemTypes = { NODE: "node" };

const Node: React.FC<NodeProps> = ({ id, item }) => {
    const nodeStyle: React.CSSProperties = {
        position: "absolute",
        transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
        width: 100,
        height: 50,
        backgroundColor: "blue",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "grab",
    };
    const { x, y } = item;
    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.NODE,
        item: { type: ItemTypes.NODE, id, x, y },
        collect: (monitor: DragSourceMonitor) => {
            const isDragging = monitor.isDragging();
            return { isDragging };
        },
    });
    const updatedNodeStyle = {
        ...nodeStyle,
        opacity: isDragging ? 0 : 1,
    };
    return <div id={`node-${id}`} ref={drag} onMouseDown={e => e.stopPropagation()} style={updatedNodeStyle} />;
};

export default React.memo(Node);
