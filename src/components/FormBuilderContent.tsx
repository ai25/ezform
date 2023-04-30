import { Button, Modal, Popover } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "next-i18next";

import useBuilderStore from "~/store/builder-store";
import DraggableFormBuilderQuestion from "./DraggableFormBuilderQuestion";
import AddQuestionPopover from "./AddQuestionPopover";
import { TextQuestion } from "~/questions/TextQuestion";
import MultipleChoiceQuestion from "~/questions/MultipleChoiceQuestion";
import type Question from "~/questions/Question";
import { type QuestionType } from "~/types/question-types";
import { NumberQuestion } from '../questions/NumberQuestion';
import { DateTimeQuestion } from "~/questions/DateTimeQuestion";
import { OpinionScaleQuestion } from '../questions/OpinionScaleQuestion';
import { RatingQuestion } from '../questions/RatingQuestion';
import { MatrixQuestion } from '../questions/MatrixQuestion';
import { DropdownQuestion } from '../questions/DropdownQuestion';
import { RankingQuestion } from '../questions/RankingQuestion';

interface FormBuilderContentProps {
    formId: string;
    onActiveQuestionChange?: (question: Question) => void;
}

const FormBuilderContent: React.FC<FormBuilderContentProps> = ({ formId, onActiveQuestionChange }) => {
    const { forms, addQuestion, updateQuestion, updateForm } = useBuilderStore();
    const form = forms?.find(form => form.id === formId);
    const { t } = useTranslation(["common", "builder", "sidebar"]);

    function handleAddQuestion(type: QuestionType) {
        if (!form) return;
        if (!formId) return;
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
    function handleChangeTitle(question: Question, text: string) {
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
            <div className="flex flex-col gap-1 overflow-y-auto">
                {(form?.questions as Question[])?.map((question, index) => (
                    <DraggableFormBuilderQuestion
                        onSelected={q => onActiveQuestionChange?.(q)}
                        question={question}
                        onTitleUpdate={(question: Question, text: string) => handleChangeTitle(question, text)}
                        key={question.id}
                        index={index}
                        moveQuestion={moveQuestion}
                    />
                ))}
            </div>
        </div>
    );
};

export default FormBuilderContent;
