import Question from "./Question";
import type { QuestionType } from "~/types/question-types";
import type {
    Branch,
    Option,
    Response,
    MatrixQuestion as PrimaMatrixQuestion,
    Row as PrimaRow,
    Column as PrimaColumn,
} from "@prisma/client";
import { nanoid } from "nanoid";

export class MatrixQuestion extends Question implements PrimaMatrixQuestion {
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
    questionId: string;

    rows: Row[];
    columns: Column[];

    constructor(
        formId: string,
        lastQuestionIndex: number,
        rows: Row[] = [],
        columns: Column[] = [],
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
        this.id = nanoid();
        this.questionId = this.id;
        this.type = "matrix";
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

        this.rows = rows;
        this.columns = columns;
    }
}

export class Row implements PrimaRow {
    id: string;
    text: string;
    matrixQuestionId: string;

    constructor(text: string, matrixQuestionId: string) {
        this.id = nanoid();
        this.text = text;
        this.matrixQuestionId = matrixQuestionId;
    }
}

export class Column implements PrimaColumn {
    id: string;
    text: string;
    matrixQuestionId: string;

    constructor(text: string, matrixQuestionId: string) {
        this.id = nanoid();
        this.text = text;
        this.matrixQuestionId = matrixQuestionId;
    }
}
