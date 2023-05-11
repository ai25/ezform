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

const FormBuilder: React.FC = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { forms } = useBuilderStore();
    let questions: Question[] = [];
    const [activeQuestion, setActiveQuestion] = React.useState<Question | null>(null);
    const form = forms.find(form => form.id === id);
    const router = useRouter();
    const questionId = router.query.q;
    function setActiveQuestionById(id: string) {
        setActiveQuestion(questions.find(question => question.id === id) ?? null);
    }

    React.useEffect(() => {
        if (form) {
            questions = form.questions;
            if (questionId) {
                setActiveQuestionById(questionId as string);
            }
        }
    }, [form, questionId]);

    return (
        <Dashboard>
            <Sidebar>
                <FormBuilderContent
                    formId={id as string}
                    onActiveQuestionChange={question => setActiveQuestion(question)}
                />
            </Sidebar>
            {activeQuestion && <QuestionPreview formId={id as string} question={activeQuestion} />}
            {/* <Flowchart /> */}
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
