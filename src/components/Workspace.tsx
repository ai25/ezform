import { Card, Empty, Grid } from "antd";
import React from "react";
import FormItemMenu from "./Menu";

export default function Workspace({ id }: { id: string }) {
    const data = null;
    return (
        <div className="flex-1 p-2 bg-fuchsia-200">
            {data ? (
                <div className="flex flex-wrap">
                    <Card className="">
                        <div>
                            <p>Form 1</p>
                            <FormItemMenu />
                        </div>
                    </Card>
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <Empty description="No forms" />
                </div>
            )}
        </div>
    );
}
