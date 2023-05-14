/* eslint-disable @typescript-eslint/no-floating-promises */
import { type Question } from "@prisma/client";
import { Segmented, Upload, type UploadProps, message } from "antd";
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
const { Dragger } = Upload;

const props: UploadProps = {
    name: "file",
    multiple: false,
    action: "/api/file",
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};

export const ImageSelect: React.FC<ImageUploaderProps> = ({ formId, question, onSelect }) => {
    const [activeTab, setActiveTab] = useState<SegmentedValue>("Upload");

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
                <Dragger
                    {...props}
                    className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4"
                >
                    <div className="flex flex-col items-center justify-center gap-2">
                        <FaUpload className="text-4xl" />
                        <p className="text-gray-500">Drag and drop or click to upload</p>
                    </div>
                </Dragger>
            ) : (
                <UnsplashSearch onSelect={onSelect} />
            )}
        </div>
    );
};

export default ImageSelect;
