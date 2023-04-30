import { type Option as PrismaOption } from "@prisma/client";
import { nanoid } from "nanoid";

export class Option implements PrismaOption {
    id: string;
    text: string;
    questionId: string;
    dropdownQuestionId: string | null;
    multipleChoiceQuestionId: string | null;
    rankingQuestionId: string | null;

    constructor(questionId: string, text = "") {
        this.id = nanoid();
        this.questionId = questionId;
        this.text = text;
        this.dropdownQuestionId = null;
        this.multipleChoiceQuestionId = null;
        this.rankingQuestionId = null;
    }
}
