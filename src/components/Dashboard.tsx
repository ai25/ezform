import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Workspace from "./Workspace";

export default function Dashboard({ workspaceId }: { workspaceId: string }) {
    return (
        <>
            <Header />
            <div className="flex">
                <Sidebar />
                <Workspace id={workspaceId} />
            </div>
        </>
    );
}
