import { type Form as PrismaForm } from "@prisma/client";
import { nanoid } from "nanoid";
import type Question from "./Question";

export class Form implements PrismaForm {
    id: string;
    title: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    questions: Question[];

    constructor(userId: string, title = "Untitled Form", description = "") {
        this.id = nanoid(8);
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.questions = [];
    }
}
