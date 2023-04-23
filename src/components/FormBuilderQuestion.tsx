import React from "react";
import { BiText } from "react-icons/bi";
import { FaQuestion, FaSortNumericDown, FaRegQuestionCircle, FaCaretDown, FaSlidersH, FaTrash } from "react-icons/fa";
import {
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlinePicture,
    AiOutlineNumber,
    AiOutlineCheckSquare,
    AiOutlineHome,
} from "react-icons/ai";
import { ImLink } from "react-icons/im";
import { GoCalendar } from "react-icons/go";
import { IoIosStar, IoMdArrowRoundUp, IoIosCheckboxOutline } from "react-icons/io";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { GiTable, GiCheckMark, GiDinosaurEgg } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { BsQuote } from "react-icons/bs";
import { Button, Card, Tag } from "antd";

import useBuilderStore, { type QuestionWithRelations } from "~/store/builder-store";

export function getQuestionTypeIcon(type: QuestionType): JSX.Element {
    switch (type) {
        case "text":
            return <BiText />;
        case "statement":
            return <BsQuote />;
        case "address":
            return <AiOutlineHome />;
        case "email":
            return <AiOutlineMail />;
        case "phone":
            return <AiOutlinePhone />;
        case "website":
            return <ImLink />;
        case "date":
            return <GoCalendar />;
        case "rating":
            return <IoIosStar />;
        case "opinion_scale":
            return <IoMdArrowRoundUp />;
        case "ranking":
            return <FaSortNumericDown />;
        case "file_upload":
            return <RiCheckboxMultipleLine />;
        case "multiple_choice":
            return <IoIosCheckboxOutline />;
        case "checkboxes":
            return <AiOutlineCheckSquare />;
        case "dropdown":
            return <FaCaretDown />;
        case "linear_scale":
            return <FaSlidersH />;
        case "matrix":
            return <GiTable />;
        case "payment":
            return <GrMoney />;
        case "legal":
            return <GiCheckMark />;
        case "image_choice":
            return <AiOutlinePicture />;
        case "boolean":
            return <MdRadioButtonUnchecked />;
        case "number":
            return <AiOutlineNumber />;
        case "question_group":
            return <GiDinosaurEgg />;
        default:
            return <FaRegQuestionCircle />;
    }
}

export const QUESTION_TYPES = new Set([
    "text",
    "statement",
    "address",
    "email",
    "phone",
    "website",
    "date",
    "rating",
    "opinion_scale",
    "ranking",
    "file_upload",
    "multiple_choice",
    "checkboxes",
    "dropdown",
    "linear_scale",
    "matrix",
    "payment",
    "legal",
    "image_choice",
    "boolean",
    "number",
    "dropdown",
    "question_group",
]);
type QuestionType =
    | "text"
    | "statement"
    | "address"
    | "email"
    | "phone"
    | "website"
    | "date"
    | "rating"
    | "opinion_scale"
    | "ranking"
    | "file_upload"
    | "multiple_choice"
    | "checkboxes"
    | "dropdown"
    | "linear_scale"
    | "matrix"
    | "payment"
    | "legal"
    | "image_choice"
    | "boolean"
    | "number"
    | "dropdown"
    | "question_group";

export function isQuestionType(type: string): type is QuestionType {
    return QUESTION_TYPES.has(type);
}

export function getQuestionCategoryByType(type: QuestionType) {
    switch (type) {
        case "text":
        case "statement":
            return "text";
        case "address":
        case "email":
        case "phone":
        case "website":
            return "contact";
        case "date":
            return "date";
        case "rating":
        case "opinion_scale":
        case "ranking":
        case "matrix":
        case "linear_scale":
            return "rating";
        case "file_upload":
            return "file";
        case "multiple_choice":
        case "checkboxes":
        case "dropdown":
        case "image_choice":
        case "boolean":
            return "choice";
        case "number":
            return "number";
        case "payment":
        case "legal":
            return "other";
        case "question_group":
            return "group";
        default:
            return "other";
    }
}

function getColorByCategory(category: string) {
    switch (category) {
        case "text":
            return "blue";
        case "contact":
            return "green";
        case "date":
            return "red";
        case "rating":
            return "orange";
        case "choice":
            return "purple";
        case "file":
            return "cyan";
        case "number":
            return "geekblue";
        case "other":
            return "gold";
        case "group":
            return "lime";
        default:
            return "default";
    }
}

const FormBuilderQuestion: React.FC<{ question: QuestionWithRelations }> = ({ question }) => {
    const Icon = getQuestionTypeIcon(isQuestionType(question.type) ? question.type : "text");
    const color = getColorByCategory(getQuestionCategoryByType(isQuestionType(question.type) ? question.type : "text"));
    const { deleteQuestion } = useBuilderStore();
    function removeQuestion() {
        deleteQuestion(question.formId, question.id);
    }
    return (
        <Card size="small">
            <div className="flex items-center justify-between">
                <Tag className="p-2" color={color}>
                    {Icon}
                </Tag>
                <div className="truncate">{question.text}</div>
                <Button onClick={removeQuestion} type="link" icon={<FaTrash />} />
            </div>
        </Card>
    );
};

export default FormBuilderQuestion;
