import { Button, Empty, Layout } from "antd";
import React from "react";
import { nanoid } from "nanoid";
import { type User } from "@prisma/client";
import { useTranslation } from "next-i18next";

import FormItemCard from "./FormItemCard";
import useBuilderStore, { FormWithRelations } from "~/store/builder-store";

const { Content } = Layout;

const Workspace: React.FC<{ id: string }> = ({ id }) => {
    const { forms, addForm } = useBuilderStore();
    const user: User = {
        id: "1",
        name: "John Doe",
        email: "johndoe@example.com",
        image: "https://via.placeholder.com/150",
        emailVerified: new Date(),
    };
    const { t } = useTranslation(["common", "builder"]);

    function createNewForm() {
        addForm({
            id: nanoid(8),
            title: t("builder:untitled_form"),
            questions: [],
            description: "",
            // workspaceId: id,
            userId: user.id,
            user: user,
            responses: [],
        });
    }

    return (
        <Content className="p-2">
            {forms.length > 0 ? (
                forms.map((form, index) => (
                    <div key={index} className="flex flex-wrap">
                        <FormItemCard
                            id={form.id}
                            imageUrl="https://via.placeholder.com/150"
                            title={form.title}
                            workspaceNames={["csa", "dsa"]}
                        />
                    </div>
                ))
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
