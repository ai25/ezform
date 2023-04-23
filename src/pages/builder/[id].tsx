import { useRouter } from "next/router";
import { type InferGetServerSidePropsType, type GetServerSideProps } from "next";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Dashboard from "~/components/Dashboard";
import Sidebar from "~/components/Sidebar";
import FormBuilderContent from "~/components/FormBuilderContent";
import Workspace from "~/components/Workspace";
import { Layout } from "antd";

const FormBuilder: React.FC = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Dashboard>
            <Layout>
                <Sidebar>
                    <FormBuilderContent formId={id} />
                </Sidebar>
            </Layout>
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
