import { type Question } from "@prisma/client";
import { Segmented } from "antd";
import { type SegmentedValue } from "antd/es/segmented";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { type UnsplashSearchResponse } from "~/types/unsplash";
import UnsplashSearch from "./UnsplashSearch";

interface ImageUploaderProps {
    onUpload: (file: File) => void;
    onSelect: (image: UnsplashSearchResponse["results"][0]) => void;
    formId: string;
    question: Question;
}

export const ImageSelect: React.FC<ImageUploaderProps> = ({ formId, question, onSelect }) => {
    const [activeTab, setActiveTab] = useState<SegmentedValue>("Upload");

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            // onUpload(file);
        }
    };

    return (
        <div className="h-full w-full p-4">
            <Segmented
                className="mb-4 flex w-full items-center justify-center"
                block
                options={["Upload", "Unsplash"]}
                value={activeTab}
                onChange={setActiveTab}
            />
            {activeTab === "Upload" ? (
                <div
                    className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4"
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleFileDrop}
                >
                    <div className="mb-2 text-gray-500">
                        <FaUpload size={32} />
                    </div>
                    <p className="text-gray-500">Drag &amp; Drop your image here</p>
                </div>
            ) : (
                <UnsplashSearch onSelect={onSelect} />
            )}
        </div>
    );
};

export default ImageSelect;
