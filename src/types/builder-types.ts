export interface Form {
    id: number;
    title: string;
    description?: string;
    questions: Question[];
}

export interface Question {
    id: number;
    text: string;
    type: string;
    order: number;
    options: Option[];
    logic: Logic[];
}

export interface Option {
    id: number;
    text: string;
}

export interface Logic {
    id: number;
    field: string;
    operator: string;
    value: string;
    targetId: number;
}
