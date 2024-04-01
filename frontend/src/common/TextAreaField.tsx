import React from "react";
import { Textarea } from "@nextui-org/react";

interface PropInputField extends HTMLInputElement {
    handleFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    label: string;
    variant: string;
    size?: string;
}

const TextAreaField: React.FC<Partial<PropInputField>> = (props) => {
    const {
        type,
        label,
        className,
        handleFunction,
        value,
        name,
        placeholder,
        size,
    } = props;
    return (
        <Textarea
            size={size ? size : "sm"}
            type={type}
            className={className}
            label={label}
            onChange={handleFunction}
            value={value}
            name={name}
            placeholder={placeholder}
        />
    );
};

export default TextAreaField;
