// Connector.tsx

import React from "react";

interface ConnectorProps {
    fromPosition: { x: number; y: number };
    toPosition: { x: number; y: number };
    key: string;
}

const calculateConnectorPath = (
    fromPosition: { x: number; y: number },
    toPosition: { x: number; y: number },
): string => {
    const fromX = fromPosition.x;
    const fromY = fromPosition.y;
    const toX = toPosition.x;
    const toY = toPosition.y;

    const dx = toX - fromX;
    const dy = toY - fromY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const controlPointX = fromX + dx / 2;
    const controlPointY = fromY + dy / 2 - distance / 4;

    const path = `M ${fromX} ${fromY} Q ${controlPointX} ${controlPointY} ${toX} ${toY}`;

    return path;
};

const Connector: React.FC<ConnectorProps> = ({ fromPosition, toPosition }) => {
    const path = calculateConnectorPath(fromPosition, toPosition);

    const connectorStyle = {
        stroke: "black",
        strokeWidth: 2,
        fill: "none",
    };

    return <path d={path} style={connectorStyle} />;
};

export default Connector;
