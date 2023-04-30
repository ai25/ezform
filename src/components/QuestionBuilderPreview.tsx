import React from "react";
import type Question from "~/questions/Question";

interface QuestionBuilderPreviewProps {
    question: Question
}
const QuestionBuilderPreview: React.FC<QuestionBuilderPreviewProps> = ({question}) => {
    return <div>{question.text}</div>
};

export default QuestionBuilderPreview;