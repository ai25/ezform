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
import QuestionBuilderPreview from "~/components/QuestionBuilderPreview";
import type Question from "~/questions/Question";

const FormBuilder: React.FC = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { forms } = useBuilderStore();
    let questions: Question[] = [];
    const [activeQuestion, setActiveQuestion] = React.useState<Question | null>(null);
    const form = forms.find(form => form.id === id);
    if (form) {
        questions = form.questions;
    }
    console.log(activeQuestion);
    return (
        <Dashboard>
            <Sidebar>
                <FormBuilderContent
                    formId={id as string}
                    onActiveQuestionChange={question => setActiveQuestion(question)}
                />
            </Sidebar>
            {activeQuestion && <QuestionBuilderPreview question={activeQuestion} />}
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
