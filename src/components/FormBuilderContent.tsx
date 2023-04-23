import { Button } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { nanoid } from "nanoid";
import { useTranslation } from "next-i18next";

import useBuilderStore, { type QuestionWithRelations } from "~/store/builder-store";
import FormBuilderQuestion from "./FormBuilderQuestion";

const FormBuilderContent: React.FC<{ formId: string }> = ({ formId }) => {
    const { forms, addQuestion } = useBuilderStore();
    const form = forms?.find(form => form.id === formId);
    const { t } = useTranslation(["common", "builder", "sidebar"]);
    const [domLoaded, setDomLoaded] = React.useState(false);

    function addField() {
        if (!form) return;
        if (!formId) return;
        addQuestion(formId, {
            id: nanoid(8),
            type: "text",
            required: false,
            options: [],
            formId: formId,
            logic: [],
            order: 1,
            responses: [],
            text: t("builder:untitled_question"),
            form: form,
        });
    }
    React.useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <div className="">
            <div className="">
                <div className="flex items-center justify-between">
                    <div>{t("sidebar:content")}</div>
                    <Button
                        onClick={addField}
                        className="flex items-center justify-center"
                        type="default"
                        size="small"
                        shape="circle"
                        icon={<FaPlus />}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 overflow-y-auto">
                {domLoaded &&
                    (form?.questions as QuestionWithRelations[])?.map(question => (
                        <FormBuilderQuestion question={question} key={question.id} />
                    ))}
            </div>
        </div>
    );
};

export default FormBuilderContent;
