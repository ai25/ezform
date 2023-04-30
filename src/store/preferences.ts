import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferencesState {
    theme: {
        dark: boolean;
        background: string;
        primary: string;
        text: string;
    };
    toggleTheme: () => void;
    language: string;
    setLanguage: (language: string) => void;
    flowChartZoom: number;
    setFlowChartZoom: (prevZoom: number, delta: number) => void;
}
const colors = {
    dark: {
        background: "#1f1f1f",
        primary: "#7d17ff",
        text: "#fff",
    },
    light: {
        background: "#fafafa",
        primary: "#7d17ff",
        text: "#1a202c",
    },
};
export const usePreferencesStore = create<PreferencesState>()(
    persist(
        (set, get) => ({
            theme: {
                dark: false,
                background: get()?.theme.dark ? colors.dark.background : colors.light.background,
                primary: get()?.theme.dark ? colors.dark.primary : colors.light.primary,
                text: get()?.theme.dark ? colors.dark.text : colors.light.text,
            },
            toggleTheme: () => {
                const dark = !get().theme.dark;
                set({
                    theme: {
                        dark,
                        background: dark ? colors.dark.background : colors.light.background,
                        primary: dark ? colors.dark.primary : colors.light.primary,
                        text: dark ? colors.dark.text : colors.light.text,
                    },
                });
            },
            language: "en",
            setLanguage: language => set({ language }),
            flowChartZoom: 1,
            setFlowChartZoom: (prevZoom, delta) => set({ flowChartZoom: Math.max(0.5, Math.min(3, prevZoom * delta)) }),
        }),
        {
            name: "preferences-storage",
        },
    ),
);
