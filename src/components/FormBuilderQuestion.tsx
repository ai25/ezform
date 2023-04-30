import React from "react";
import { Button, Card } from "antd";

import useBuilderStore from "~/store/builder-store";
import QuestionTag from "./QuestionTag";
import { FaTrash } from "react-icons/fa";
import { type QuestionType } from "~/types/question-types";
import type Question from "~/questions/Question";
import { type TextQuestion } from "../questions/TextQuestion";

const FormBuilderQuestion: React.FC<{ question: Question; onTitleUpdate: (text: string) => void }> = ({
    question,
    onTitleUpdate,
}) => {
    const { deleteQuestion } = useBuilderStore();
    const [isEditing, setIsEditing] = React.useState(false);
    function removeQuestion() {
        deleteQuestion(question.formId, question.id);
    }
    function handleFocus() {
        setIsEditing(true);
    }
    function handleChangeText(e: React.FocusEvent<HTMLDivElement>) {
        setIsEditing(false);
        onTitleUpdate(e.target.innerText);
    }
    return (
        <Card size="small">
            <div className="flex items-center justify-between gap-1">
                <QuestionTag type={((question as TextQuestion).subType as QuestionType) ?? question.type} />
                <div
                    suppressContentEditableWarning
                    contentEditable
                    onFocus={handleFocus}
                    onBlur={handleChangeText}
                    spellCheck={isEditing}
                    className={`${isEditing ? "" : "truncate"} cursor-text px-2`}
                >
                    {question.text}
                </div>
                <Button onClick={removeQuestion} type="link" icon={<FaTrash />} />
            </div>
        </Card>
    );
};

export default FormBuilderQuestion;
