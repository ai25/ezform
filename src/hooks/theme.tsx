import React, { createContext, useContext, useState } from "react";
import { ConfigProvider, type ThemeConfig, theme as antTheme } from "antd";

import { lightTheme, darkTheme } from "~/config/theme";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ThemeContext = createContext({ theme: "light", setTheme: (theme: string) => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<string>("light");
    const light: ThemeConfig = {
        token: lightTheme,
        algorithm: antTheme.defaultAlgorithm,
    };
    const dark: ThemeConfig = {
        token: {
            ...lightTheme,
            ...darkTheme,
        },
        algorithm: antTheme.darkAlgorithm,
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ConfigProvider theme={theme === "light" ? light : dark}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    );
};
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};
