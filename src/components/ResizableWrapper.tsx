import React, { type CSSProperties, useState, type PropsWithChildren } from "react";
import { Resizable, type ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css";
import { usePreferencesStore } from "../store/preferences";

const getHandleStyle = (handlePosition: ResizableComponentProps["handlePosition"], color: string): CSSProperties => {
    const handleSize = "2rem";
    const handleThickness = "0.2rem";
    const handleMargin = "0.3rem";

    const baseStyle: CSSProperties = {
        position: "absolute",
        userSelect: "none",
        backgroundColor: color,
        borderRadius: "0.2rem",
        cursor: "pointer",
    };

    const verticalStyle: CSSProperties = {
        width: handleThickness,
        height: handleSize,
        top: "50%",
        transform: "translateY(-50%)",
    };

    const horizontalStyle: CSSProperties = {
        width: handleSize,
        height: handleThickness,
        left: "50%",
        transform: "translateX(-50%)",
    };

    const cornerStyle: CSSProperties = {
        width: handleSize,
        height: handleSize,
    };

    const positionStyles: Record<ResizableComponentProps["handlePosition"], Partial<CSSProperties>> = {
        s: { ...horizontalStyle, top: "auto", bottom: handleMargin, cursor: "ns-resize" },
        w: { ...verticalStyle, left: handleMargin, right: "auto", cursor: "ew-resize" },
        e: { ...verticalStyle, left: "auto", right: handleMargin, cursor: "ew-resize" },
        n: { ...horizontalStyle, top: handleMargin, bottom: "auto", cursor: "ns-resize" },
        sw: {
            ...cornerStyle,
            top: "auto",
            bottom: handleMargin,
            left: handleMargin,
            right: "auto",
            cursor: "nesw-resize",
        },
        nw: {
            ...cornerStyle,
            top: handleMargin,
            bottom: "auto",
            left: handleMargin,
            right: "auto",
            cursor: "nwse-resize",
        },
        se: {
            ...cornerStyle,
            top: "auto",
            bottom: handleMargin,
            left: "auto",
            right: handleMargin,
            cursor: "nwse-resize",
        },
        ne: {
            ...cornerStyle,
            top: handleMargin,
            bottom: "auto",
            left: "auto",
            right: handleMargin,
            cursor: "nesw-resize",
        },
    };

    return { ...baseStyle, ...positionStyles[handlePosition] };
};
interface ResizableComponentProps {
    axis: "x" | "y" | "both" | undefined;
    handlePosition: "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";
    className?: string;
    style?: CSSProperties;
}

const ResizableComponent: React.FC<PropsWithChildren<ResizableComponentProps>> = ({
    axis,
    handlePosition,
    className,
    style,
    children,
}) => {
    const [size, setSize] = useState({ width: 160, height: 800 });

    const { theme } = usePreferencesStore();

    const onResize = (
        event: React.SyntheticEvent<Element, Event>,
        { size }: { size: { height: number; width: number } },
    ) => {
        setSize({ height: size.height, width: size.width });
    };
    return (
        <Resizable
            resizeHandles={[handlePosition]}
            axis={axis}
            handle={<div style={getHandleStyle(handlePosition, theme.text)} />}
            width={size.width}
            height={size.height}
            onResize={onResize}
        >
            <div
                className={`${className ? className : ""} `}
                style={{ ...style, width: `${size.width}px`, height: `${size.height}px` }}
            >
                {children}
            </div>
        </Resizable>
    );
};

export default ResizableComponent;
