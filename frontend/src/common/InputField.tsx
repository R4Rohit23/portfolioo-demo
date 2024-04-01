import React from "react";
import { Input } from "@nextui-org/react";

interface PropInputField extends HTMLInputElement {
  handleFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label: string;
  variant: string;
  startContent?: React.ReactNode;
  size: string;
}

const InputField: React.FC<Partial<PropInputField>> = (props) => {
  const {
    type,
    label,
    className,
    handleFunction,
    value,
    name,
    placeholder,
    startContent,
    size,
  } = props;
  return (
    <Input
      size={size ? size : "md"}
      type={type}
      className={className}
      label={label}
      onChange={handleFunction}
      value={value}
      name={name}
      placeholder={placeholder}
      labelPlacement="outside"
      startContent={startContent}
    />
  );
};

export default InputField;
