import Question from "./Question";
import type { QuestionType } from "~/types/question-types";
import type { Branch, Option, Response, DropdownQuestion as PrimaDropdownQuestion } from "@prisma/client";
import { nanoid } from "nanoid";

export class DropdownQuestion extends Question implements PrimaDropdownQuestion {
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
    imagePosition: "left" | "center" | "right";
    imageAltText?: string | undefined;
    options: Option[];
    targets: Branch[];
    responses: Response[];
    questionId: string;

    sort: string | null;

    constructor(
        formId: string,
        lastQuestionIndex: number,
        options: Option[] = [],
        sort: string | null = null,
        text = "...",
        required = false,
        description = "",
        alias = "",
        category = "",
        visible = true,
        imageUrl = "",
        imageFit: "contain" | "cover" | "fill" | "none" | "scale-down" = "contain",
        imagePosition: "left" | "center" | "right" = "left",
    ) {
        super();
        this.id = nanoid();
        this.questionId = this.id;
        this.type = "dropdown";
        this.formId = formId;
        this.order = lastQuestionIndex + 1;
        this.text = text;
        this.description = description;
        this.alias = alias;
        this.category = category;
        this.visible = visible;
        this.imageUrl = imageUrl;
        this.imageFit = imageFit;
        this.imagePosition = imagePosition;
        this.required = required;
        this.responses = [];
        this.branches = [];
        this.targets = [];

        this.options = options;
        this.sort = sort;
    }
}
