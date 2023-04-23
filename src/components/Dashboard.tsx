import React from "react";
import { Layout } from "antd";
import Header from "./Header";

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Layout>
            <Header />
            <Layout>{children}</Layout>
        </Layout>
    );
};

export default Dashboard;
