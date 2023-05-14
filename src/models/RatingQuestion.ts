import Question from "./Question";
import type { QuestionType } from "~/types/question-types";
import type { Branch, Option, Response, RatingQuestion as PrimaRatingQuestion } from "@prisma/client";
import { nanoid } from "nanoid";

export class RatingQuestion extends Question implements PrimaRatingQuestion {
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

    outOf: number;
    ratingType: string; // star, heart, thumb, smiley

    constructor(
        ratingType: string, // star, heart, thumb, smiley
        outOf: number,
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
        imagePosition: "left" | "center" | "right" = "left",
    ) {
        super();
        this.id = nanoid();
        this.questionId = this.id;
        this.type = "rating";
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
        this.options = [];
        this.targets = [];

        this.outOf = outOf;
        this.ratingType = ratingType;
    }
}
