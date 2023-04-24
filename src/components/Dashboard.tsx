import React from "react";
import { Layout, Spin } from "antd";
import Header from "./Header";
import { usePreferencesStore } from "~/store/preferences";

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = usePreferencesStore();
    const [domLoaded, setDomLoaded] = React.useState(false);
    React.useEffect(() => {
        setDomLoaded(true);
    }, []);

    if (!domLoaded) return null;
    return (
        <Layout className="h-screen" style={{ color: theme.text }}>
            <Header />
            <Layout className="flex-row">{children}</Layout>
        </Layout>
    );
};

export default Dashboard;
