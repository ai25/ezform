import React, { type ReactNode } from "react";

import { usePreferencesStore } from "../store/preferences";
import ResizableComponent from "./ResizableWrapper";

const Sidebar: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { theme } = usePreferencesStore();
    return (
        <div style={{ backgroundColor: theme.background }} className="hidden max-h-full min-h-full w-56 p-2 lg:block">
            <aside className="z-20 hidden h-full w-full lg:block">{children}</aside>
        </div>
    );
};

export default Sidebar;
