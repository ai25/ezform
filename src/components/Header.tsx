import { Avatar, Switch, Layout } from "antd";
import React from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "../hooks/theme";

const { Header: AntHeader } = Layout;

export default function Header() {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation("common");

    return (
        <AntHeader className="flex items-center justify-between p-2 ">
            <div>{t("home")}</div>
            <Switch onChange={() => setTheme(theme === "light" ? "dark" : "light")} checked={theme === "light"} />
            <Avatar />
        </AntHeader>
    );
}
