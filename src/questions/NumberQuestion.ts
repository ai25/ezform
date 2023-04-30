import Question from "./Question";
import type { QuestionType } from "~/types/question-types";
import type { Branch, Option, Response, NumberQuestion as PrimaNumberQuestion } from "@prisma/client";
import { nanoid } from "nanoid";
import { type NumberQuestionType } from "../types/question-types";

export class NumberQuestion extends Question implements PrimaNumberQuestion {
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
    imageFit: string;
    branches: Branch[];
    options: Option[];
    targets: Branch[];
    responses: Response[];
    questionId: string;
    subType: NumberQuestionType;
    min: number | null;
    max: number | null;

    constructor(
        subType: NumberQuestionType,
        formId: string,
        lastQuestionIndex: number,
        min = null,
        max = null,
        text = "...",
        required = false,
        description = "",
        alias = "",
        category = "",
        visible = true,
        imageUrl = "",
        imageFit = "",
    ) {
        super();
        this.id = nanoid();
        this.questionId = this.id;
        this.type = "number";
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
        this.subType = subType;
        this.min = min;
        this.max = max;
    }
}
