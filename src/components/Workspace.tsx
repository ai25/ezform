import { Card, Empty, Grid } from "antd";
import React from "react";
import FormItemCard from "./FormItemCard";
import FormItemMenu from "./Menu";

export default function Workspace({ id }: { id: string }) {
    const data = true;
    return (
        <div className="flex-1 p-2 bg-fuchsia-200">
            {data ? (
                <div className="flex flex-wrap">
                    <FormItemCard title="xdd" imageUrl="https://dummyimage.com/300x300/000/fff" workspaceNames={["xd", "xd"]} />
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <Empty description="No forms" />
                </div>
            )}
        </div>
    );
}
