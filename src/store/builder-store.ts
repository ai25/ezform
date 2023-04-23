import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Prisma } from '@prisma/client';


export type FormWithRelations = Prisma.FormGetPayload<{
    include: {
        questions: {
            include: {
                options: true,
                logic: true,
            }
        },
        responses: true,
        user: true,
    }
}>
export type QuestionWithRelations = Prisma.QuestionGetPayload<{
    include: {
        options: true,
        logic: true,
        responses: true,
        form: true,
    }
}>
export type OptionWithRelations = Prisma.OptionGetPayload<{
    include: {
        question: true,
    }
}>
export type LogicWithRelations = Prisma.LogicGetPayload<{
    include: {
        question: true,
    }
}>

interface BuilderState {
    forms: FormWithRelations[];
    addForm: (form: FormWithRelations) => void;
    updateForm: (formId: string, updatedForm: Partial<FormWithRelations>) => void;
    deleteForm: (formId: string) => void;
    addQuestion: (formId: string, question: QuestionWithRelations) => void;
    updateQuestion: (formId: string, questionId: string, updatedQuestion: Partial<QuestionWithRelations>) => void;
    deleteQuestion: (formId: string, questionId: string) => void;
    addOption: (formId: string, questionId: string, option: OptionWithRelations) => void;
    updateOption: (formId: string, questionId: string, optionId: string, updatedOption: Partial<OptionWithRelations>) => void;
    deleteOption: (formId: string, questionId: string, optionId: string) => void;
    addLogic: (formId: string, questionId: string, logic: LogicWithRelations) => void;
    updateLogic: (formId: string, questionId: string, logicId: string, updatedLogic: Partial<LogicWithRelations>) => void;
    deleteLogic: (formId: string, questionId: string, logicId: string) => void;
}

const useBuilderStore = create<BuilderState>()(
    persist(
        set => ({
            forms: [],
            addForm(form) {
                set(state => ({ forms: [...state.forms, form] }));
            },
            updateForm: (formId, updatedForm) =>
                set(state => ({
                    forms: state.forms.map(form => (form.id === formId ? { ...form, ...updatedForm } : form)),
                })),
            deleteForm: formId => set(state => ({ forms: state.forms.filter(form => form.id !== formId) })),
            addQuestion: (formId, question) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId ? { ...form, questions: [...form.questions, question] } : form,
                    ),
                })),
            updateQuestion: (formId, questionId, updatedQuestion) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: form.questions.map(question =>
                                      question.id === questionId ? { ...question, ...updatedQuestion } : question,
                                  ),
                              }
                            : form,
                    ),
                })),
            deleteQuestion: (formId, questionId) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? { ...form, questions: form.questions.filter(question => question.id !== questionId) }
                            : form,
                    ),
                })),
            addOption: (formId, questionId, option) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: (form.questions as QuestionWithRelations[]).map(question => 
                                      question.id === questionId
                                          ? { ...question, options: [...question.options, option] }
                                          : question,
                                  ),
                              }
                            : form,
                    ),
                })),
            updateOption: (formId, questionId, optionId, updatedOption) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: (form.questions as QuestionWithRelations[]).map(question =>
                                      question.id === questionId
                                          ? {
                                                ...question,
                                                options: question.options.map(option =>
                                                    option.id === optionId ? { ...option, ...updatedOption } : option,
                                                ),
                                            }
                                          : question,
                                  ),
                              }
                            : form,
                    ),
                })),
            deleteOption: (formId, questionId, optionId) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: (form.questions as QuestionWithRelations[]).map(question =>
                                      question.id === questionId
                                          ? {
                                                ...question,
                                                options: question.options.filter(option => option.id !== optionId),
                                            }
                                          : question,
                                  ),
                              }
                            : form,
                    ),
                })),
            addLogic: (formId, questionId, logic) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: (form.questions as QuestionWithRelations[]).map(question =>
                                      question.id === questionId
                                          ? { ...question, logic: [...question.logic, logic] }
                                          : question,
                                  ),
                              }
                            : form,
                    ),
                })),
            updateLogic: (formId, questionId, logicId, updatedLogic) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: (form.questions as QuestionWithRelations[]).map(question =>
                                      question.id === questionId
                                          ? {
                                                ...question,
                                                logic: question.logic.map(logic =>
                                                    logic.id === logicId ? { ...logic, ...updatedLogic } : logic,
                                                ),
                                            }
                                          : question,
                                  ),
                              }
                            : form,
                    ),
                })),
            deleteLogic: (formId, questionId, logicId) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: (form.questions as QuestionWithRelations[]).map(question =>
                                      question.id === questionId
                                          ? { ...question, logic: question.logic.filter(logic => logic.id !== logicId) }
                                          : question,
                                  ),
                              }
                            : form,
                    ),
                })),
        }),
        {
            name: "builder-store",
        },
    ),
);

export default useBuilderStore;
