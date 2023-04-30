import React from "react";
import { useTranslation } from "next-i18next";
import QuestionTag, { getQuestionsByCategory } from "./QuestionTag";
import { Button } from "antd";
import { type QuestionType } from "~/types/question-types";

const AddQuestionPopover: React.FC<{ onItemClick: (type: QuestionType) => void }> = ({ onItemClick }) => {
    const { t } = useTranslation(["builder"]);
    const categories = [
        { type: "text", questions: getQuestionsByCategory("text") },
        { type: "group", questions: getQuestionsByCategory("group") },
        { type: "contact", questions: getQuestionsByCategory("contact") },
        { type: "date", questions: getQuestionsByCategory("date") },
        { type: "rating", questions: getQuestionsByCategory("rating") },
        { type: "choice", questions: getQuestionsByCategory("choice") },
        { type: "file", questions: getQuestionsByCategory("file") },
        { type: "number", questions: getQuestionsByCategory("number") },
        { type: "other", questions: getQuestionsByCategory("other") },
    ];

    return (
        <div className="flex flex-wrap overflow-auto">
            {categories.map(category => (
                <div key={category.type} className="flex min-w-min flex-col items-start px-2">
                    <p className="mt-2 text-sm font-medium">{t(`builder:${category.type}`)}</p>
                    <div className="flex flex-col items-start justify-center gap-2">
                        {category.questions.map(type => (
                            <Button
                                onClick={() => onItemClick(type)}
                                key={`${category.type}-${type}`}
                                className="flex items-center justify-center gap-2"
                                icon={<QuestionTag type={type} />}
                            >
                                <p className="text-xs">{t(`builder:${type}`)}</p>
                            </Button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddQuestionPopover;
