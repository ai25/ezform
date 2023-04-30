import { create } from "zustand";
import { persist } from "zustand/middleware";
import type Question from "~/questions/Question";
import { type Branch } from "../questions/Branch";
import { type Form } from "../questions/Form";
import { type Option } from "../questions/Option";

interface BuilderState {
    currentFormId: string | null;
    setCurrentFormId: (formId: string) => void;
    forms: Form[];
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
            currentFormId: null,
            setCurrentFormId: (formId: string) => set({ currentFormId: formId }),
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
                                  questions: (form.questions ).map(question =>
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
                                  questions: (form.questions ).map(question =>
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
                                  questions: (form.questions ).map(question =>
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
            addBranch: (formId, questionId, branch) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: (form.questions ).map(question =>
                                      question.id === questionId
                                          ? { ...question, branches: [...question.branches, branch] }
                                          : question,
                                  ),
                              }
                            : form,
                    ),
                })),
            updateBranch: (formId, questionId, branchId, updatedBranch) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: (form.questions ).map(question =>
                                      question.id === questionId
                                          ? {
                                                ...question,
                                                branches: question.branches.map(branch =>
                                                    branch.id === branchId ? { ...branch, ...updatedBranch } : branch,
                                                ),
                                            }
                                          : question,
                                  ),
                              }
                            : form,
                    ),
                })),
            deleteBranch: (formId, questionId, branchId) =>
                set(state => ({
                    forms: state.forms.map(form =>
                        form.id === formId
                            ? {
                                  ...form,
                                  questions: (form.questions ).map(question =>
                                      question.id === questionId
                                          ? {
                                                ...question,
                                                branches: question.branches.filter(branch => branch.id !== branchId),
                                            }
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
