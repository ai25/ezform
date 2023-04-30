import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import FormBuilderQuestion from "./FormBuilderQuestion";
import type Question from "~/questions/Question";
interface FormBuilderQuestionProps {
    question: Question;
    onTitleUpdate: (question: Question, text: string) => void;
}

interface DraggableFormBuilderQuestionProps extends FormBuilderQuestionProps {
    index: number;
    moveQuestion: (dragIndex: number, hoverIndex: number) => void;
    onSelected: (question: Question) => void;
}

interface DragItem {
    type: string;
    id: string;
    index: number;
}

const DraggableFormBuilderQuestion: React.FC<DraggableFormBuilderQuestionProps> = ({
    question,
    onTitleUpdate,
    index,
    moveQuestion,
    onSelected,
}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    const [, drop] = useDrop({
        accept: "question",
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveQuestion(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "question",
        item: { type: "question", id: question.id, index },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    drag(drop(ref));

    const opacity = isDragging ? 0 : 1;

    return (
        <div onSelect={() => onSelected(question)} ref={ref} style={{ opacity }} className="cursor-grab">
            <FormBuilderQuestion
                question={question}
                onTitleUpdate={(text: string) => onTitleUpdate(question, text)}
                key={question.id}
            />
        </div>
    );
};

export default DraggableFormBuilderQuestion;
