import Question from "./Question";
import type { TextQuestionType, QuestionType } from "~/types/question-types";
import type { AddressQuestion as PrimaAddressQuestion } from "@prisma/client";
import { nanoid } from "nanoid";
import { type Branch } from "./Branch";
import { type Option } from "./Option";
import { type Response } from "./Response";

class AddressQuestion extends Question implements PrimaAddressQuestion {
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
    line1Required: boolean;
    line2Required: boolean;
    cityRequired: boolean;
    stateRequired: boolean;
    zipRequired: boolean;
    countryRequired: boolean;

    constructor(
        formId: string,
        lastQuestionIndex: number,
        line1Required = false,
        line2Required = false,
        cityRequired = false,
        stateRequired = false,
        zipRequired = false,
        countryRequired = false,
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
        this.type = "address";
        this.formId = formId;
        this.order = lastQuestionIndex + 1;
        this.questionId = this.id;
        this.line1Required = line1Required;
        this.line2Required = line2Required;
        this.cityRequired = cityRequired;
        this.stateRequired = stateRequired;
        this.zipRequired = zipRequired;
        this.countryRequired = countryRequired;
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

export default AddressQuestion;
