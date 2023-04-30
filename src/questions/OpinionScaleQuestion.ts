import Question from "./Question";
import type { QuestionType } from "~/types/question-types";
import type { Branch, Option, Response, OpinionScaleQuestion as PrimaOpinionScaleQuestion } from "@prisma/client";
import { nanoid } from "nanoid";

export class OpinionScaleQuestion extends Question implements PrimaOpinionScaleQuestion {
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
    min: number;
    max: number;
    startLabel: string | null;
    middleLabel: string | null;
    endLabel: string | null;

    constructor(
        formId: string,
        lastQuestionIndex: number,
        min = 1,
        max = 5,
        startLabel = null,
        middleLabel = null,
        endLabel = null,
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
        this.type = "opinion_scale";
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

        this.min = min;
        this.max = max;
        this.startLabel = startLabel;
        this.middleLabel = middleLabel;
        this.endLabel = endLabel;
    }
}
