import React, { type PropsWithChildren } from "react";
import useBuilderStore from "~/store/builder-store";
import type Question from "../models/Question";
import { type Design } from "../models/Design";

interface QuestionContentProps {
    question: Question;
    design: Design;
}

const QuestionContent: React.FC<PropsWithChildren<QuestionContentProps>> = ({ question, children, design }) => {
    const { updateQuestion } = useBuilderStore();

    const style: Record<string, React.CSSProperties> = {
        text: {
            fontSize: design.fontSize,
            fontWeight: 500,
            color: design.textColor,
            fontFamily: design.fontFamily,
        },
        description: {
            fontSize: design.fontSize - 2,
            fontWeight: 400,
            color: design.textColor,
            fontFamily: design.fontFamily,
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
                    className="flex max-w-full items-center justify-center p-2 text-center "
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
