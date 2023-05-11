import React from "react";
import useBuilderStore from "~/store/builder-store";
import type Question from "~/models/Question";
import { Button, Modal } from "antd";
import ImageSelect from "./ImageSelect";
import { type UnsplashSearchResponse } from "~/types/unsplash";
import ResizableComponent from "./ResizableWrapper";

interface QuestionEditorProps {
    question: Question;
    formId: string;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, formId }) => {
    const { updateQuestion } = useBuilderStore();
    const [showModal, setShowModal] = React.useState(false);

    const onSelect = (image: UnsplashSearchResponse["results"][0]) => {
        updateQuestion(formId, question.id, { imageUrl: image.urls.regular, imageAltText: image.description });
        setShowModal(false);
    };

    const onUpload = (file: File) => {
        const reader = new FileReader();
        const result = reader.result?.toString();
        reader.onload = () => {
            updateQuestion(formId, question.id, { imageUrl: result });
        };
    };

    return (
        <ResizableComponent className="hidden min-w-0 overflow-hidden p-2 lg:block" axis="x" handlePosition="w">
            <div className="flex h-full max-w-fit flex-col gap-2">
                <Button onClick={() => setShowModal(true)}>Select Image</Button>
                <Modal
                    onOk={() => setShowModal(false)}
                    onCancel={() => setShowModal(false)}
                    open={showModal}
                    centered
                    mask={false}
                >
                    <ImageSelect question={question} formId={formId} onSelect={onSelect} onUpload={onUpload} />
                </Modal>
                <div className="flex flex-wrap items-center justify-center gap-2 bg-blue-500">
                    <Button onClick={() => updateQuestion(formId, question.id, { imageFit: "contain" })}>
                        Contain
                    </Button>
                    <Button onClick={() => updateQuestion(formId, question.id, { imageFit: "cover" })}>Cover</Button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 bg-blue-500">
                    <Button onClick={() => updateQuestion(formId, question.id, { imagePosition: "left" })}>Left</Button>
                    <Button onClick={() => updateQuestion(formId, question.id, { imagePosition: "center" })}>
                        Center
                    </Button>
                    <Button onClick={() => updateQuestion(formId, question.id, { imagePosition: "right" })}>
                        Right
                    </Button>
                </div>
            </div>
        </ResizableComponent>
    );
};

export default QuestionEditor;
