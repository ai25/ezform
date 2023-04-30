export type TextQuestionType =
    | "text"
    | "statement"
    | "address"
    | "email"
    | "phone"
    | "website"
    | "legal"
    | "boolean"
    | "long_text"
    | "file_upload";
export type NumberQuestionType = "number" | "currency" | "percent";
export type QuestionType =
    | TextQuestionType
    | "number"
    | "date"
    | "contact"
    | "rating"
    | "opinion_scale"
    | "ranking"
    | "multiple_choice"
    | "checkboxes"
    | "dropdown"
    | "linear_scale"
    | "matrix"
    | "payment"
    | "legal"
    | "image_choice"
    | "boolean"
    | "dropdown"
    | "question_group";
