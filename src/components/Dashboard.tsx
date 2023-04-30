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
        <Layout className="h-screen max-w-full overflow-hidden" style={{ color: theme.text }}>
            <Header />
            <Layout className="max-w-full flex-row overflow-hidden">{children}</Layout>
        </Layout>
    );
};

export default Dashboard;
