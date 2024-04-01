import React from "react";
import { Input } from "@nextui-org/react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

interface PropInputField extends HTMLInputElement {
  handleFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label: string;
  variant: string;
  startContent?: React.ReactNode;
  size: string;
}

const InputPassword: React.FC<Partial<PropInputField>> = (props) => {
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

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      size={size ? size : "md"}
      // type={type}
      className={className}
      label={label}
      onChange={handleFunction}
      value={value}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <IoIosEye className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      name={name}
      placeholder={placeholder}
      labelPlacement="outside"
      startContent={startContent}
    />
  );
};

export default InputPassword;
