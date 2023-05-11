import React, { type PropsWithChildren } from "react";
import useBuilderStore from "~/store/builder-store";
import type Question from "../models/Question";

interface QuestionContentProps {
    question: Question;
}

const QuestionContent: React.FC<PropsWithChildren<QuestionContentProps>> = ({ question, children }) => {
    const { updateQuestion } = useBuilderStore();

    const style: Record<string, React.CSSProperties> = {
        text: {
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "#333",
        },
        description: {
            fontSize: "1rem",
            fontWeight: 400,
            color: "#555",
        },
    };

    return (
        <div className="flex h-full w-full max-w-max flex-col items-center justify-center gap-4 overflow-auto p-12">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                <input
                    type="text"
                    style={style.text}
                    className="flex max-w-full items-center justify-center text-center"
                    value={question.text}
                    onChange={e => updateQuestion(question.formId, question.id, { text: e.target.value })}
                />
                <input
                    type="text"
                    style={style.description}
                    className="flex w-fit items-center justify-center p-2 text-center "
                    value={question.description}
                    placeholder="Description (optional)"
                    onChange={e => updateQuestion(question.formId, question.id, { description: e.target.value })}
                />
            </div>
            {children}
        </div>
    );
};

export default QuestionContent;
