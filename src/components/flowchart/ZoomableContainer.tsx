import React, { useState, useRef } from "react";
import { usePreferencesStore } from "~/store/preferences";

interface ZoomableContainerProps {
    children: React.ReactNode;
    className?: string;
}

const ZoomableContainer: React.FC<ZoomableContainerProps> = ({ children, className }) => {
    const { flowChartZoom, setFlowChartZoom } = usePreferencesStore();
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        const delta = event.deltaY < 0 ? 1.1 : 0.9;
        setFlowChartZoom(flowChartZoom, delta);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.button !== 0) return;
        console.log("mouse down", event.currentTarget.id);
        if (event.currentTarget.id !== "zoomable-container") return;
        event.stopPropagation();
        setDragging(true);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!dragging) return;
        setPosition(prevPosition => ({
            x: prevPosition.x + event.movementX,
            y: prevPosition.y + event.movementY,
        }));
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div
            ref={containerRef}
            id="zoomable-container"
            className={`relative h-full w-full overflow-hidden ${className ?? ""}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                className="absolute h-full w-full bg-fuchsia-500"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${flowChartZoom})`,
                    transformOrigin: "0 0",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ZoomableContainer;
