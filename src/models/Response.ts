import type { Form, Question, Response as PrismaResponse } from "@prisma/client";

export class Response implements PrismaResponse {
    id: string;
    form: Form;
    formId: string;
    question: Question;
    questionId: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(questionId: string, value: string) {
        this.id = "";
        this.question = null as unknown as Question;
        this.questionId = questionId;
        this.form = null as unknown as Form;
        this.formId = "";
        this.answer = value;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
