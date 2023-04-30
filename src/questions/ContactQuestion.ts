import Question from "./Question";
import type { QuestionType } from "~/types/question-types";
import type { Branch, Option, Response, ContactQuestion as PrimaContactQuestion } from "@prisma/client";
import { nanoid } from "nanoid";

export class ContactQuestion extends Question implements PrimaContactQuestion {
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

    firstNameRequired: boolean;
    lastNameRequired: boolean;
    emailRequired: boolean;
    phoneRequired: boolean;
    companyRequired: boolean;

    constructor(
        formId: string,
        lastQuestionIndex: number,
        firstNameRequired = false,
        lastNameRequired = false,
        emailRequired = false,
        phoneRequired = false,
        companyRequired = false,
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
        this.type = "contact";
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

        this.firstNameRequired = firstNameRequired;
        this.lastNameRequired = lastNameRequired;
        this.emailRequired = emailRequired;
        this.phoneRequired = phoneRequired;
        this.companyRequired = companyRequired;
    }
}
