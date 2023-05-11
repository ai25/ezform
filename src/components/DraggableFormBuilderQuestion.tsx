import React from "react";
import { Card, Button } from "antd";
import { Draggable } from "react-beautiful-dnd";
import QuestionTag from "./QuestionTag";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import Link from "next/link";
import { usePreferencesStore } from "../store/preferences";
import type Question from "~/models/Question";
import useBuilderStore from "~/store/builder-store";
import { type TextQuestion } from "../models/TextQuestion";
import { type QuestionType } from "../types/question-types";

interface FormBuilderQuestionProps {
    question: Question;
}

interface DraggableFormBuilderQuestionProps extends FormBuilderQuestionProps {
    index: number;
}

const DraggableFormBuilderQuestion: React.FC<DraggableFormBuilderQuestionProps> = ({ question, index }) => {
    const { deleteQuestion } = useBuilderStore();
    const router = useRouter();
    const isActive = router.query.q === question.id;
    const { theme } = usePreferencesStore();

    function removeQuestion() {
        deleteQuestion(question.formId, question.id);
    }

    const backgroundColor = isActive ? theme.active : theme.background;

    return (
        <Draggable draggableId={question.id} index={index}>
            {(provided, snapshot) => (
                <Link href={`/builder/${question.formId}?q=${question.id}`}>
                    <Card
                        bodyStyle={{ backgroundColor, borderRadius: "0.4rem" }}
                        className="select-none"
                        size="small"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.5 : 1,
                        }}
                    >
                        <div className="flex items-center justify-between gap-1">
                            {question.order}
                            <QuestionTag type={((question as TextQuestion).subType as QuestionType) ?? question.type} />
                            <div className={`flex-1 select-text truncate px-2`}>{question.text}</div>
                            <Button onClick={removeQuestion} type="link" icon={<FaTrash />} />
                            <div {...provided.dragHandleProps} className="cursor-grab">
                                <MdDragIndicator className="text-xl" />
                            </div>
                        </div>
                    </Card>
                </Link>
            )}
        </Draggable>
    );
};

export default DraggableFormBuilderQuestion;
