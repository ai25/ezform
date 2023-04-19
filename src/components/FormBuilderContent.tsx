import React from "react";

import useBuilderStore from "~/store/builder-store";

const FormBuilderContent: React.FC = () => {
    const { forms } = useBuilderStore();

    return (
        <div>
            {forms.map(form => (
                <div key={form.id}>{form.title}</div>
            ))}
        </div>
    );
};

export default FormBuilderContent;
