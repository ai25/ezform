import { Button } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { nanoid } from "nanoid";
import { useTranslation } from "next-i18next";

import useBuilderStore, { type QuestionWithRelations } from "~/store/builder-store";
import FormBuilderQuestion from "./FormBuilderQuestion";
import DraggableFormBuilderQuestion from "./DraggableFormBuilderQuestion";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const FormBuilderContent: React.FC<{ formId: string }> = ({ formId }) => {
    const { forms, addQuestion, updateQuestion, updateForm } = useBuilderStore();
    const form = forms?.find(form => form.id === formId);
    const { t } = useTranslation(["common", "builder", "sidebar"]);

    function addField() {
        if (!form) return;
        if (!formId) return;
        addQuestion(formId, {
            id: nanoid(8),
            type: "text",
            required: false,
            options: [],
            formId: formId,
            logic: [],
            order: 1,
            responses: [],
            text: t("builder:untitled_question"),
            form: form,
        });
    }
    function handleChangeTitle(question: QuestionWithRelations, text: string) {
        updateQuestion(question.formId, question.id, { text });
    }

    const moveQuestion = React.useCallback(
        (dragIndex: number, hoverIndex: number) => {
            if (!form) return;
            const dragQuestion = form.questions[dragIndex]!;
            const newQuestions = [...form.questions];
            newQuestions.splice(dragIndex, 1);
            newQuestions.splice(hoverIndex, 0, dragQuestion);
            updateForm(formId, { questions: newQuestions });
        },
        [form, formId, updateForm],
    );

    return (
        <div className="space-y-2">
            <div className="">
                <div className="flex items-center justify-between">
                    <div>{t("sidebar:content")}</div>
                    <Button
                        onClick={addField}
                        className="flex items-center justify-center"
                        type="default"
                        size="small"
                        shape="circle"
                        icon={<FaPlus />}
                    />
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto gap-1">
                <DndProvider backend={HTML5Backend}>
                    {(form?.questions as QuestionWithRelations[])?.map((question, index) => (
                        <DraggableFormBuilderQuestion
                            question={question}
                            onTitleUpdate={(question: QuestionWithRelations, text: string) =>
                                handleChangeTitle(question, text)
                            }
                            key={question.id}
                            index={index}
                            moveQuestion={moveQuestion}
                        />
                    ))}
                </DndProvider>
            </div>
        </div>
    );
};

export default FormBuilderContent;
