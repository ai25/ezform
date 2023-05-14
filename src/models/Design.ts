import type { Design as PrismaDesign } from "@prisma/client";
import type { Form } from "./Form";
import { nanoid } from "nanoid";

export class Design implements PrismaDesign {
    id: string;
    name: string;
    fontFamily: string;
    fontSize: number;
    textColor: string;
    backgroundColor: string;
    borderColor: string;
    borderRadius: number;
    buttonColor: string;
    buttonHover: string;
    createdAt: Date;
    updatedAt: Date;
    form: Form | null;

    constructor(
        name = "Default",
        fontFamily = "Arial",
        fontSize = 16,
        textColor = "#000000",
        backgroundColor = "#ffffff",
        borderColor = "#000000",
        borderRadius = 0,
        buttonColor = "#000000",
        buttonHover = "#000000",
    ) {
        this.id = nanoid();
        this.name = name;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.textColor = textColor;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.borderRadius = borderRadius;
        this.buttonColor = buttonColor;
        this.buttonHover = buttonHover;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.form = null;
    }
}
