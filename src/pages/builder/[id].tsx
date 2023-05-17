/* eslint-disable react/no-unknown-property */
import { useRouter } from "next/router";
import { type InferGetServerSidePropsType, type GetServerSideProps } from "next";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Dashboard from "~/components/Dashboard";
import Sidebar from "~/components/Sidebar";
import FormBuilderContent from "~/components/FormBuilderContent";
import Workspace from "~/components/Workspace";
import Flowchart from "~/components/flowchart/Flowchart";
import useBuilderStore from "~/store/builder-store";
import QuestionPreview from "~/components/QuestionPreview";
import type Question from "~/models/Question";
import QuestionEditor from "~/components/QuestionEditor";

const FormBuilder: React.FC = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { forms } = useBuilderStore();
    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [activeQuestion, setActiveQuestion] = React.useState<Question | null>(null);
    const [showEditor, setShowEditor] = React.useState(true);
    const form = forms[id as string];
    const router = useRouter();
    const questionId = router.query.q;

    React.useEffect(() => {
        if (form) {
            setQuestions(form.questions);
            if (questionId) {
                setActiveQuestion(questions.find(question => question.id === questionId) ?? null);
            }
        }
    }, [form, questionId, questions]);

    return (
        <Dashboard>
            <Sidebar>
                <FormBuilderContent
                    formId={id as string}
                    onActiveQuestionChange={question => setActiveQuestion(question)}
                />
            </Sidebar>
            {activeQuestion && <QuestionPreview formId={id as string} question={activeQuestion} />}
            {activeQuestion && showEditor && <QuestionEditor question={activeQuestion} formId={id as string} />}
            {/* <Flowchart /> */}
            {form?.design?.fontFamily && (
                <style jsx global>
                    {`
                        @import url("https://fonts.googleapis.com/css2?family=${form.design.fontFamily}&display=swap");
                    `}
                </style>
            )}
        </Dashboard>
    );
};

export default FormBuilder;

export const getServerSideProps: GetServerSideProps = async context => {
    const { params, locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale!, ["common", "builder", "sidebar"])),
            id: params!.id,
        },
    };
};
