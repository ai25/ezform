import { type Branch as PrismaBranch } from "@prisma/client";
import type Question from "./Question";

export class Branch implements PrismaBranch {
    id: string;
    questionId: string;
    question: Question;
    order: number;
    condition: string;
    targetId: string;
    target: Question;

    constructor(questionId: string, order = 1, condition = "", targetId = "") {
        this.id = "";
        this.questionId = questionId;
        this.question = null as unknown as Question;
        this.order = order;
        this.condition = condition;
        this.targetId = targetId;
        this.target = null as unknown as Question;
    }
}
