import React, { type ReactNode } from "react";

import { usePreferencesStore } from "../store/preferences";
import ResizableComponent from "./ResizableWrapper";

const Sidebar: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { theme } = usePreferencesStore();
    return (
        <ResizableComponent
            style={{ backgroundColor: theme.background }}
            className="hidden max-h-full min-h-full w-full min-w-[10rem] max-w-max p-2 lg:block"
            axis="x"
            handlePosition="e"
        >
            <aside className="z-20 hidden h-full w-full lg:block">{children}</aside>
        </ResizableComponent>
    );
};

export default Sidebar;
