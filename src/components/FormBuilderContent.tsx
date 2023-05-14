import React from "react";
import { Button, Modal, Popover } from "antd";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import useBuilderStore from "~/store/builder-store";
import DraggableFormBuilderQuestion from "./DraggableFormBuilderQuestion";
import AddQuestionPopover from "./AddQuestionPopover";
import { TextQuestion } from "~/models/TextQuestion";
import MultipleChoiceQuestion from "~/models/MultipleChoiceQuestion";
import type Question from "~/models/Question";
import { type QuestionType } from "~/types/question-types";
import { NumberQuestion } from "../models/NumberQuestion";
import { DateTimeQuestion } from "~/models/DateTimeQuestion";
import { OpinionScaleQuestion } from "../models/OpinionScaleQuestion";
import { RatingQuestion } from "../models/RatingQuestion";
import { MatrixQuestion } from "../models/MatrixQuestion";
import { DropdownQuestion } from "../models/DropdownQuestion";
import { RankingQuestion } from "../models/RankingQuestion";
import { StrictModeDroppable } from "./StrictModeDroppable";
interface FormBuilderContentProps {
    formId: string;
    onActiveQuestionChange?: (question: Question) => void;
}

const FormBuilderContent: React.FC<FormBuilderContentProps> = ({ formId, onActiveQuestionChange }) => {
    const { forms, addQuestion, updateQuestion, updateForm } = useBuilderStore();
    const form = forms[formId];
    const { t } = useTranslation(["common", "builder", "sidebar"]);

    function handleAddQuestion(type: QuestionType) {
        if (!form) return;
        switch (type) {
            case "text":
                addQuestion(formId, new TextQuestion("text", formId, form.questions.length));
                break;
            case "address":
                addQuestion(formId, new TextQuestion("address", formId, form.questions.length));
                break;
            case "email":
                addQuestion(formId, new TextQuestion("email", formId, form.questions.length));
                break;
            case "long_text":
                addQuestion(formId, new TextQuestion("long_text", formId, form.questions.length));
                break;
            case "phone":
                addQuestion(formId, new TextQuestion("phone", formId, form.questions.length));
                break;
            case "website":
                addQuestion(formId, new TextQuestion("website", formId, form.questions.length));
                break;
            case "boolean":
                addQuestion(formId, new TextQuestion("boolean", formId, form.questions.length));
                break;
            case "file_upload":
                addQuestion(formId, new TextQuestion("file_upload", formId, form.questions.length));
                break;
            case "payment":
                Modal.info({
                    title: "Payment",
                    content: "Coming soon...",
                });
                break;
            case "image_choice":
                addQuestion(formId, new MultipleChoiceQuestion(formId, form.questions.length));
                break;
            case "legal":
                addQuestion(formId, new TextQuestion("legal", formId, form.questions.length));
                break;
            case "multiple_choice":
                addQuestion(formId, new MultipleChoiceQuestion(formId, form.questions.length));
                break;
            case "checkboxes":
                addQuestion(formId, new MultipleChoiceQuestion(formId, form.questions.length));
                break;
            case "number":
                addQuestion(formId, new NumberQuestion("number", formId, form.questions.length));
                break;
            case "date":
                addQuestion(formId, new DateTimeQuestion(formId, form.questions.length));
                break;
            case "opinion_scale":
                addQuestion(formId, new OpinionScaleQuestion(formId, form.questions.length));
                break;
            case "rating":
                addQuestion(formId, new RatingQuestion("star", 5, formId, form.questions.length));
                break;
            case "ranking":
                addQuestion(formId, new RankingQuestion(formId, form.questions.length));
                break;
            case "matrix":
                addQuestion(formId, new MatrixQuestion(formId, form.questions.length));
                break;
            case "dropdown":
                addQuestion(formId, new DropdownQuestion(formId, form.questions.length));
                break;
            case "question_group":
                Modal.info({
                    title: "Question Group",
                    content: "Coming soon...",
                });
                break;
            default:
                console.error(`Unsupported question type: ${type}`);
        }
    }

    const moveQuestion = React.useCallback(
        (sourceIndex: number, destinationIndex: number | undefined) => {
            if (sourceIndex === destinationIndex) return;
            if (!destinationIndex) return;
            if (!form) return;
            const newQuestions = [...form.questions];
            const [removed] = newQuestions.splice(sourceIndex, 1);
            newQuestions.splice(destinationIndex, 0, removed!);
            newQuestions.forEach((question, index) => {
                question.order = index + 1;
            });
            updateForm(formId, { questions: newQuestions });
        },
        [form, formId, updateForm],
    );

    return (
        <div className="space-y-2 ">
            <div className="">
                <div className="flex items-center justify-between">
                    <div>{t("sidebar:overview")}</div>
                    <Popover
                        trigger="click"
                        placement="right"
                        content={<AddQuestionPopover onItemClick={type => handleAddQuestion(type)} />}
                    >
                        <Button
                            className="flex items-center justify-center"
                            type="primary"
                            size="small"
                            shape="circle"
                            icon={<FaPlus />}
                        />
                    </Popover>
                </div>
            </div>

            <div className="max-h-full overflow-auto">
                <DragDropContext onDragEnd={result => moveQuestion(result.source.index, result.destination?.index)}>
                    <StrictModeDroppable droppableId={`questions-${formId}`} type="question">
                        {provided => (
                            <div
                                className="flex flex-col gap-1 overflow-y-auto"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {form?.questions?.map((question, index) => (
                                    <DraggableFormBuilderQuestion question={question} key={question.id} index={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </StrictModeDroppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default FormBuilderContent;
