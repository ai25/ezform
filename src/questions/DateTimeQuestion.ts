import Question from "./Question";
import type { QuestionType } from "~/types/question-types";
import type { Branch, Option, Response, DateTimeQuestion as PrimaDateTimeQuestion } from "@prisma/client";
import { nanoid } from "nanoid";

export class DateTimeQuestion extends Question implements PrimaDateTimeQuestion {
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

    includeTime: boolean;

    constructor(
        formId: string,
        lastQuestionIndex: number,
        includeTime = false,
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
        this.type = "date";
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

        this.includeTime = includeTime;
    }
}
