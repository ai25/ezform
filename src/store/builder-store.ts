import { create } from "zustand";
import { persist } from "zustand/middleware";
import type Question from "~/models/Question";
import { type Branch } from "../models/Branch";
import { type Form } from "../models/Form";
import { type Option } from "../models/Option";
import { Design } from "../models/Design";

interface BuilderState {
    forms: Record<string, Form>;
    addForm: (form: Form) => void;
    updateForm: (formId: string, updatedForm: Partial<Form>) => void;
    deleteForm: (formId: string) => void;
    addQuestion: (formId: string, question: Question) => void;
    updateQuestion: (formId: string, questionId: string, updatedQuestion: Partial<Question>) => void;
    deleteQuestion: (formId: string, questionId: string) => void;
    addOption: (formId: string, questionId: string, option: Option) => void;
    updateOption: (formId: string, questionId: string, optionId: string, updatedOption: Partial<Option>) => void;
    deleteOption: (formId: string, questionId: string, optionId: string) => void;
    addBranch: (formId: string, questionId: string, branch: Branch) => void;
    updateBranch: (formId: string, questionId: string, branchId: string, updatedBranch: Partial<Branch>) => void;
    deleteBranch: (formId: string, questionId: string, branchId: string) => void;
}

const useBuilderStore = create<BuilderState>()(
    persist(
        (set, get) => ({
            forms: {},
            addForm: form => set(state => ({ forms: { ...state.forms, [form.id]: form } })),
            updateForm: (formId, updatedForm) =>
                set(state => ({
                    forms: { ...state.forms, [formId]: { ...state.forms[formId]!, ...updatedForm } },
                })),
            deleteForm: formId =>
                set(state => {
                    const { [formId]: _, ...remainingForms } = state.forms;
                    return { forms: remainingForms };
                }),
            addQuestion: (formId, question) =>
                set(state => ({
                    forms: {
                        ...state.forms,
                        [formId]: {
                            ...state.forms[formId]!,
                            questions: [...state.forms[formId]!.questions, question],
                        },
                    },
                })),
            updateQuestion: (formId, questionId, updatedQuestion) =>
                set(state => {
                    const updatedQuestions = state.forms[formId]!.questions.map(question =>
                        question.id === questionId ? { ...question, ...updatedQuestion } : question,
                    );
                    return {
                        forms: { ...state.forms, [formId]: { ...state.forms[formId]!, questions: updatedQuestions } },
                    };
                }),
            deleteQuestion: (formId, questionId) =>
                set(state => {
                    const remainingQuestions = state.forms[formId]!.questions.filter(
                        question => question.id !== questionId,
                    );
                    return {
                        forms: { ...state.forms, [formId]: { ...state.forms[formId]!, questions: remainingQuestions } },
                    };
                }),
            addOption: (formId, questionId, option) =>
                set(state => {
                    const updatedQuestions = state.forms[formId]!.questions.map(question =>
                        question.id === questionId ? { ...question, options: [...question.options, option] } : question,
                    );
                    return {
                        forms: { ...state.forms, [formId]: { ...state.forms[formId]!, questions: updatedQuestions } },
                    };
                }),
            updateOption: (formId, questionId, optionId, updatedOption) =>
                set(state => {
                    const updatedQuestions = state.forms[formId]!.questions.map(question =>
                        question.id === questionId
                            ? {
                                  ...question,
                                  options: question.options.map(option =>
                                      option.id === optionId ? { ...option, ...updatedOption } : option,
                                  ),
                              }
                            : question,
                    );
                    return {
                        forms: { ...state.forms, [formId]: { ...state.forms[formId]!, questions: updatedQuestions } },
                    };
                }),
            deleteOption: (formId, questionId, optionId) =>
                set(state => {
                    const updatedQuestions = state.forms[formId]!.questions.map(question =>
                        question.id === questionId
                            ? {
                                  ...question,
                                  options: question.options.filter(option => option.id !== optionId),
                              }
                            : question,
                    );
                    return {
                        forms: { ...state.forms, [formId]: { ...state.forms[formId]!, questions: updatedQuestions } },
                    };
                }),
            addBranch: (formId, questionId, branch) =>
                set(state => {
                    const updatedQuestions = state.forms[formId]!.questions.map(question =>
                        question.id === questionId
                            ? { ...question, branches: [...question.branches, branch] }
                            : question,
                    );
                    return {
                        forms: { ...state.forms, [formId]: { ...state.forms[formId]!, questions: updatedQuestions } },
                    };
                }),
            updateBranch: (formId, questionId, branchId, updatedBranch) =>
                set(state => {
                    const updatedQuestions = state.forms[formId]!.questions.map(question =>
                        question.id === questionId
                            ? {
                                  ...question,
                                  branches: question.branches.map(branch =>
                                      branch.id === branchId ? { ...branch, ...updatedBranch } : branch,
                                  ),
                              }
                            : question,
                    );
                    return {
                        forms: { ...state.forms, [formId]: { ...state.forms[formId]!, questions: updatedQuestions } },
                    };
                }),
            deleteBranch: (formId, questionId, branchId) =>
                set(state => {
                    const updatedQuestions = state.forms[formId]!.questions.map(question =>
                        question.id === questionId
                            ? {
                                  ...question,
                                  branches: question.branches.filter(branch => branch.id !== branchId),
                              }
                            : question,
                    );
                    return {
                        forms: { ...state.forms, [formId]: { ...state.forms[formId]!, questions: updatedQuestions } },
                    };
                }),
        }),
        {
            name: "builder-store",
        },
    ),
);

export default useBuilderStore;
