import React from "react";
import useBuilderStore from "~/store/builder-store";
import type Question from "~/models/Question";
import { Button, Modal } from "antd";
import ImageSelect from "./ImageSelect";
import { type UnsplashSearchResponse } from "~/types/unsplash";
import ResizableComponent from "./ResizableWrapper";
import { Design } from "../models/Design";
import ColorPickerField from "./ColorPickerField";
import { usePreferencesStore } from "../store/preferences";
import FontFaceInput from "./FontFaceInput";
import FocalPoint from "./FocalPointPicker";

interface QuestionEditorProps {
    question: Question;
    formId: string;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, formId }) => {
    const [showModal, setShowModal] = React.useState(false);
    const { updateQuestion, updateForm, forms } = useBuilderStore();
    const { theme } = usePreferencesStore();
    const form = forms[formId];
    const [pos, setPos] = React.useState({ x: 0, y: 0 });
    if (!form) return null;
    const { design } = form;
    if (!design) {
        updateForm(formId, { design: new Design() });
        return null;
    }
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
    const onPosChange = ({ x, y }: { x: number; y: number }) => {
        console.log(x, y);
        setPos({ x, y });
        updateQuestion(formId, question.id, { imagePosition: `${x}% ${y}%` as "center" });
    };

    return (
        <div style={{ backgroundColor: theme.background }} className="hidden h-full w-56 overflow-hidden p-2 lg:flex">
            <div className="flex h-full w-full max-w-full flex-col gap-2">
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
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button onClick={() => updateQuestion(formId, question.id, { imageFit: "contain" })}>
                        Contain
                    </Button>
                    <Button onClick={() => updateQuestion(formId, question.id, { imageFit: "cover" })}>Cover</Button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button onClick={() => updateQuestion(formId, question.id, { imagePosition: "left" })}>Left</Button>
                    <Button onClick={() => updateQuestion(formId, question.id, { imagePosition: "center" })}>
                        Center
                    </Button>
                    <Button onClick={() => updateQuestion(formId, question.id, { imagePosition: "right" })}>
                        Right
                    </Button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 ">
                    {Object.entries(design).map(([key, value]) => {
                        if (key.toLowerCase().includes("color")) {
                            return (
                                <ColorPickerField
                                    key={key}
                                    label={key}
                                    value={value as string}
                                    onChange={color => updateForm(formId, { design: { ...design, [key]: color } })}
                                />
                            );
                        }
                    })}
                    <FontFaceInput
                        font={design.fontFamily}
                        onChange={fontFamily => updateForm(formId, { design: { ...design, fontFamily } })}
                    />
                    <input
                        className="w-full"
                        type="number"
                        value={design.fontSize}
                        onChange={e =>
                            updateForm(formId, { design: { ...design, fontSize: parseInt(e.currentTarget.value) } })
                        }
                    />
                </div>
                <FocalPoint src={question.imageUrl} value={pos} onChange={onPosChange} />
            </div>
        </div>
    );
};

export default QuestionEditor;
