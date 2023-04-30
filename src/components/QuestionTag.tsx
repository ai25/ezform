import React, { type PropsWithChildren } from "react";
import { BiText } from "react-icons/bi";
import {
    FaQuestion,
    FaSortNumericDown,
    FaRegQuestionCircle,
    FaCaretDown,
    FaSlidersH,
    FaTrash,
    FaMoneyBillWaveAlt,
    FaObjectGroup,
    FaToggleOff,
    FaBalanceScale,
} from "react-icons/fa";
import {
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlinePicture,
    AiOutlineNumber,
    AiOutlineCheckSquare,
    AiOutlineHome,
    AiOutlineBorderlessTable,
} from "react-icons/ai";
import { HiViewGrid } from "react-icons/hi";
import { ImLink } from "react-icons/im";
import { GoCalendar } from "react-icons/go";
import { IoIosStar, IoMdArrowRoundUp, IoIosCheckboxOutline } from "react-icons/io";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { GiTable, GiCheckMark, GiDinosaurEgg } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { MdGroupWork, MdLinearScale, MdRadioButtonUnchecked } from "react-icons/md";
import { BsQuote } from "react-icons/bs";
import { type QuestionType } from "~/types/question-types";

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
        case "ranking":
            return <FaSortNumericDown />;
        case "file_upload":
            return <RiCheckboxMultipleLine />;
        case "multiple_choice":
            return <RiCheckboxMultipleLine />;
        case "checkboxes":
            return <AiOutlineCheckSquare />;
        case "dropdown":
            return <FaCaretDown />;
        case "linear_scale":
            return <MdLinearScale />;
        case "matrix":
            return <AiOutlineBorderlessTable />;
        case "payment":
            return <FaMoneyBillWaveAlt />;
        case "legal":
            return <FaBalanceScale />;
        case "image_choice":
            return <AiOutlinePicture />;
        case "boolean":
            return <FaToggleOff />;
        case "number":
            return <AiOutlineNumber />;
        case "question_group":
            return <HiViewGrid />;
        default:
            return <FaRegQuestionCircle />;
    }
}
export function getQuestionsByCategory(category: string): QuestionType[] {
    switch (category) {
        case "text":
            return ["text", "statement"];
        case "contact":
            return ["address", "email", "phone", "website"];
        case "date":
            return ["date"];
        case "rating":
            return ["rating", "linear_scale", "matrix"];
        case "choice":
            return ["multiple_choice", "checkboxes", "dropdown", "image_choice", "boolean"];
        case "file":
            return ["file_upload"];
        case "number":
            return ["number"];
        case "group":
            return ["question_group"];
        case "other":
            return ["legal", "payment"];
        default:
            return [];
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
            return "#3B82F6";
        case "contact":
            return "#EF4444";
        case "date":
            return "#14B8A6";
        case "rating":
            return "#F59E0B";
        case "choice":
            return "#8B5CF6";
        case "file":
            return "#10B981";
        case "number":
            return "#F472B6";
        case "other":
            return "#4B5563";
        case "group":
            return "#6B7280";
        default:
            return "#4B5563";
    }
}
const QuestionTag: React.FC<{ type: QuestionType }> = ({ type }) => {
    const Icon = getQuestionTypeIcon(isQuestionType(type) ? type : "text");
    const color = getColorByCategory(getQuestionCategoryByType(isQuestionType(type) ? type : "text"));
    return (
        <div style={{ backgroundColor: color }} className={`flex  items-center justify-center rounded  p-1 text-white`}>
            {Icon}
        </div>
    );
};

export default QuestionTag;
