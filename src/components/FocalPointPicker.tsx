import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Position {
    x: number;
    y: number;
}

interface Containment {
    x: number;
    y: number;
    width: number;
    height: number;
}

function inPercent(value: number, total: number) {
    return (value / total) * 100;
}

function inNumber(percent: number, total: number) {
    if (percent > 100) {
        throw Error("Invalid number, percent can't be more than 100");
    }
    return (percent / 100) * total;
}

const insideContainment = (x: number, y: number, containment: Containment) => {
    return !(
        x < containment.x ||
        x > containment.x + containment.width ||
        y < containment.y ||
        y > containment.y + containment.height
    );
};

interface FocalPointPickerProps {
    src: string;
    value: Position;
    onChange: (value: Position) => void;
}
const FocalPoint: React.FC<FocalPointPickerProps> = ({ src, value, onChange }) => {
    const [isDown, setIsDown] = useState<boolean>(false);
    const dotRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const handleImageDown = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const image = imageRef.current;
        if (image) {
            const imgRect = image.getBoundingClientRect();
            if (!insideContainment(e.clientX, e.clientY, imgRect)) {
                return;
            }
            setIsDown(true);
            updatePosition(e, imgRect);
            updateDot(imgRect);
        }
    };

    const handleImageUp = () => {
        setIsDown(false);
    };

    const handleDotMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const image = imageRef.current;
        if (!isDown || !image) {
            return;
        }
        const imgRect = image.getBoundingClientRect();
        updatePosition(e, imgRect);
        updateDot(imgRect);
    };

    const updatePosition = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, imgRect: DOMRect) => {
        const x = Math.round(inPercent(e.clientX - imgRect.x, imgRect.width));
        const y = Math.round(inPercent(e.clientY - imgRect.y, imgRect.height));

        onChange({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };

    const updateDot = (imgRect: DOMRect) => {
        const dot = dotRef.current;
        if (dot) {
            dot.style.left = `${inNumber(value.x, imgRect.width) - dot.offsetWidth / 2}px`;
            dot.style.top = `${inNumber(value.y, imgRect.height) - dot.offsetHeight / 2}px`;
        }
    };

    return (
        <div className="h-full w-full">
            <div className="relative aspect-square w-32 select-none">
                <Image
                    unoptimized
                    fill
                    alt=""
                    ref={imageRef}
                    onMouseDown={handleImageDown}
                    onMouseUp={handleImageUp}
                    onMouseMove={handleDotMove}
                    className="absolute left-0 top-0 h-full w-full select-none object-cover"
                    draggable="false"
                    src={src}
                />
                <div
                    // onMouseDown={handleImageDown}
                    // onMouseUp={handleImageUp}
                    // onMouseMove={handleDotMove}
                    ref={dotRef}
                    className="dot absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-500 shadow-md ring-2 ring-white"
                ></div>
            </div>
        </div>
    );
};

export default FocalPoint;
