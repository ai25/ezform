import React from "react";

const ColorPickerField: React.FC<{ value: string; label: string; onChange: (value: string) => void }> = ({
    value,
    label,
    onChange,
}) => {
    return (
        <label>
            {label}
            <div className="flex items-center justify-center gap-2">
                <input
                    type="color"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="h-8 w-8 rounded-full"
                />
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="h-8 w-24 rounded-md border border-gray-300"
                />
            </div>
        </label>
    );
};

export default ColorPickerField;
