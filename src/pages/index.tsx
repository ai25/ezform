import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Dashboard from "~/components/Dashboard";
import Sidebar from "~/components/Sidebar";
import Workspace from "~/components/Workspace";

const Home: NextPage = () => {
    return (
        <Dashboard>
            <Sidebar>
                <div className="flex h-full flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold">Welcome to Typeform</h1>
                </div>
            </Sidebar>
            <Workspace id="1" />
        </Dashboard>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async context => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale!, ["common", "builder", "sidebar"])),
        },
    };
};
