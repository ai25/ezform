import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Form, Question, Option, Logic } from "../types/builder-types";

interface BuilderState {
    forms: Form[];
    activeFormId: number | null;
    setActiveForm: (formId: number) => void;
    addForm: (form: Form) => void;
    updateForm: (formId: number, updatedForm: Partial<Form>) => void;
    deleteForm: (formId: number) => void;
    addQuestion: (formId: number, question: Question) => void;
    updateQuestion: (formId: number, questionId: number, updatedQuestion: Partial<Question>) => void;
    deleteQuestion: (formId: number, questionId: number) => void;
    addOption: (formId: number, questionId: number, option: Option) => void;
    updateOption: (formId: number, questionId: number, optionId: number, updatedOption: Partial<Option>) => void;
    deleteOption: (formId: number, questionId: number, optionId: number) => void;
    addLogic: (formId: number, questionId: number, logic: Logic) => void;
    updateLogic: (formId: number, questionId: number, logicId: number, updatedLogic: Partial<Logic>) => void;
    deleteLogic: (formId: number, questionId: number, logicId: number) => void;
}

const useBuilderStore = create<BuilderState>()(
    persist(
        set => ({
            forms: [],
            activeFormId: null,
            setActiveForm: formId => set(state => ({ activeFormId: formId })),
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
                                  questions: form.questions.map(question =>
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
                                  questions: form.questions.map(question =>
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
                                  questions: form.questions.map(question =>
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
                                  questions: form.questions.map(question =>
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
                                  questions: form.questions.map(question =>
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
                                  questions: form.questions.map(question =>
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
            getStorage: () => localStorage,
        },
    ),
);

export default useBuilderStore;
