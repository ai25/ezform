import { type QuestionType } from "~/types/question-types";
import type {
    Response,
    Question as PrismaQuestion,
    Branch,
    Option,
    TextQuestion,
    NumberQuestion,
    AddressQuestion,
    ContactQuestion,
    MatrixQuestion,
    OpinionScaleQuestion,
    RatingQuestion,
    RankingQuestion,
    MultipleChoiceQuestion,
    DropdownQuestion,
    DateTimeQuestion,
} from "@prisma/client";

abstract class Question implements PrismaQuestion {
    abstract id: string;
    abstract formId: string;
    abstract order: number;
    abstract type: QuestionType;
    abstract text: string;
    abstract description: string;
    abstract alias: string;
    abstract category: string;
    abstract visible: boolean;
    abstract imageUrl: string;
    abstract imageFit: "cover" | "contain" | "fill" | "none" | "scale-down";
    abstract imagePosition: "left" | "center" | "right";
    abstract imageAltText?: string;
    abstract required: boolean;
    abstract responses: Response[];
    abstract branches: Branch[];
    abstract options: Option[];
    abstract targets: Branch[];
    textQuestion?: TextQuestion;
    numberQuestion?: NumberQuestion;
    addressQuestion?: AddressQuestion;
    contactQuestion?: ContactQuestion;
    matrixQuestion?: MatrixQuestion;
    opinionScaleQuestion?: OpinionScaleQuestion;
    ratingQuestion?: RatingQuestion;
    rankingQuestion?: RankingQuestion;
    multipleChoiceQuestion?: MultipleChoiceQuestion;
    dropdownQuestion?: DropdownQuestion;
    dateTimeQuestion?: DateTimeQuestion;
}

export default Question;
