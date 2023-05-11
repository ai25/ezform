import React, { useEffect } from "react";
import { Button } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useBuilderStore from "~/store/builder-store";
import { type RankingQuestion } from "../models/RankingQuestion";
import { Option } from "../models/Option";
import DraggableOption from "./DraggableOption";
import { StrictModeDroppable } from "./StrictModeDroppable";
import QuestionContent from "./QuestionContent";

interface RankingQuestionContentProps {
    question: RankingQuestion;
}

const RankingQuestionContent: React.FC<RankingQuestionContentProps> = ({ question }) => {
    const { updateQuestion, updateOption, deleteOption } = useBuilderStore();

    const moveOption = (sourceIndex: number, destinationIndex: number | undefined) => {
        if (!destinationIndex) return;
        const newOptions = [...question.options];
        const [removed] = newOptions.splice(sourceIndex, 1);
        newOptions.splice(destinationIndex, 0, removed!);
        updateQuestion(question.formId, question.id, { options: newOptions });
    };

    const optionChange = (option: Option, event: React.ChangeEvent<HTMLInputElement>) => {
        updateOption(question.formId, question.id, option.id, { text: event.target.value });
    };

    const removeOption = (option: Option) => {
        deleteOption(question.formId, question.id, option.id);
    };

    return (
        <QuestionContent question={question}>
            <DragDropContext onDragEnd={result => moveOption(result.source.index, result.destination?.index)}>
                <StrictModeDroppable droppableId={`options-${question.id}`} type="option">
                    {provided => (
                        <div className="flex flex-col gap-2" ref={provided.innerRef} {...provided.droppableProps}>
                            {question.options.map((option, index) => (
                                <div key={option.id}>
                                    <DraggableOption
                                        option={option}
                                        index={index}
                                        optionChange={optionChange}
                                        removeOption={removeOption}
                                    />
                                </div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
            <Button
                onClick={() =>
                    updateQuestion(question.formId, question.id, {
                        options: [...question.options, new Option(question.id, "New Option")],
                    })
                }
            >
                Add Option
            </Button>
        </QuestionContent>
    );
};

export default RankingQuestionContent;
