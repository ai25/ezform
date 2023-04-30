import React from "react";
import { ConfigProvider, type ThemeConfig, theme as antTheme } from "antd";

import { lightTheme, darkTheme } from "~/config/theme";
import { usePreferencesStore } from "~/store/preferences";

// eslint-disable-next-line @typescript-eslint/no-empty-function

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme } = usePreferencesStore();
    const light: ThemeConfig = {
        token: lightTheme,
    };
    const dark: ThemeConfig = {
        token: {
            ...darkTheme,
            colorBgBase: "#080808"
        },
        algorithm: antTheme.darkAlgorithm,
    };

    return <ConfigProvider theme={theme.dark ? dark : light}>{children}</ConfigProvider>;
};
