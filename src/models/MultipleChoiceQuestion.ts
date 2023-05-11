import Question from "./Question";
import { type QuestionType } from "~/types/question-types";
import type { Option, MultipleChoiceQuestion as PrismaMultipleChoiceQuestion, Branch, Response } from "@prisma/client";
import { nanoid } from "nanoid";

class MultipleChoiceQuestion extends Question implements PrismaMultipleChoiceQuestion {
    id: string;
    formId: string;
    type: QuestionType;
    text: string;
    order: number;
    required: boolean;
    description: string;
    alias: string;
    category: string;
    visible: boolean;
    imageUrl: string;
    imageFit: "contain" | "cover" | "fill" | "none" | "scale-down" = "contain";
    branches: Branch[];
    imagePosition?: "left" | "center" | "right" | "fill" | undefined;
    imageAltText?: string | undefined;
    options: Option[];
    targets: Branch[];
    responses: Response[];
    allowMultiple: boolean;
    minSelections: number | null;
    maxSelections: number | null;
    allowOther: boolean;
    sort: string | null;
    layout: string | null; // vertical, horizontal
    questionId: string;

    constructor(
        formId: string,
        lastQuestionIndex: number,
        text = "...",
        required = false,
        description = "",
        alias = "",
        category = "",
        visible = true,
        imageUrl = "",
        imageFit: "contain" | "cover" | "fill" | "none" | "scale-down" = "contain",
    ) {
        super();
        this.allowMultiple = false;
        this.minSelections = null;
        this.maxSelections = null;
        this.sort = null;
        this.layout = null;
        this.allowOther = false;
        this.id = nanoid();
        this.questionId = this.id;
        this.type = "multiple_choice";
        this.formId = formId;
        this.order = lastQuestionIndex + 1;
        this.text = text;
        this.description = description;
        this.alias = alias;
        this.category = category;
        this.visible = visible;
        this.imageUrl = imageUrl;
        this.imageFit = imageFit;
        this.required = required;
        this.responses = [];
        this.branches = [];
        this.options = [];
        this.targets = [];
    }
}

export default MultipleChoiceQuestion;
