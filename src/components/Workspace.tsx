import { Button, Empty, Layout } from "antd";
import React from "react";
import { nanoid } from "nanoid";
import { type User } from "@prisma/client";
import { useTranslation } from "next-i18next";

import FormItemCard from "./FormItemCard";
import useBuilderStore from "~/store/builder-store";
import { Form } from "~/models/Form";
import { useSession } from "next-auth/react";

const { Content } = Layout;

const Workspace: React.FC<{ id: string }> = ({ id }) => {
    const { forms, addForm } = useBuilderStore();
    const { data } = useSession();
    const { t } = useTranslation(["common", "builder"]);

    function createNewForm() {
        // if (!data) return console.error("No user data");
        addForm(new Form(data?.user.id ?? "1"));
    }

    return (
        <Content className="p-2">
            {Object.keys(forms).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {Object.values(forms).map((form, index) => (
                        <div key={index} className="flex flex-wrap">
                            <FormItemCard
                                id={form.id}
                                imageUrl="https://via.placeholder.com/150"
                                title={form.title}
                                workspaceNames={["csa", "dsa"]}
                            />
                        </div>
                    ))}
                    <Button onClick={createNewForm} type="primary" size="large">
                        Create Form
                    </Button>
                </div>
            ) : (
                <div className="flex h-full items-center justify-center">
                    <Empty description="No forms" />
                    <Button onClick={createNewForm} type="primary" size="large">
                        Create Form
                    </Button>
                </div>
            )}
        </Content>
    );
};

export default Workspace;
