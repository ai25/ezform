import { Avatar } from "antd";
import React from "react";
import { useTranslation } from "next-i18next";
import { usePreferencesStore } from "../store/preferences";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
    const { theme, toggleTheme } = usePreferencesStore();
    const { t } = useTranslation("common");

    return (
        <header
            style={{ backgroundColor: theme.background }}
            className="relative z-10 flex items-center justify-between p-2 ring-2 ring-blue-600/10"
        >
            <div className="">{t("home")}</div>
            <button className="flex items-center justify-center text-2xl" onClick={() => toggleTheme()}>
                {theme.dark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-yellow-500" />}
            </button>
            <Avatar />
        </header>
    );
}
