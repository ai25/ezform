import React, { type ReactNode } from "react";

import { usePreferencesStore } from "../store/preferences";

const Sidebar: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { theme } = usePreferencesStore();
    return (
        <aside style={{ backgroundColor: theme.background }} className="h-full min-w-[10rem] max-w-sm p-2 ring-2 ring-blue-600/10 resize-x overflow-auto">
            {children}
        </aside>
    );
};

export default Sidebar;
