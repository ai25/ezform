import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

import { api } from "~/utils/api";
import { ThemeProvider } from "~/hooks/theme";
import * as nextI18nConfig from "../../next-i18next.config.js";
import "~/styles/globals.css";
import { appWithTranslation, useTranslation } from "next-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
    const { i18n } = useTranslation();

    const direction = i18n.dir();
    React.useEffect(() => {
        document.body.dir = direction;
    }, [direction]);
    return (
        <SessionProvider session={session}>
            <ThemeProvider>
                <DndProvider backend={HTML5Backend}>
                    <Component {...pageProps} />
                </DndProvider>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(appWithTranslation(MyApp, nextI18nConfig));
