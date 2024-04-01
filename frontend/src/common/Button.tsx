import { Button } from "@nextui-org/react";
import React from "react";

interface PropButton extends HTMLButtonElement {
  text: string;
  isLoading: boolean;
  handleFunction(): any;
  Icon?: React.ElementType;
}

const ButtonElement: React.FC<Partial<PropButton>> = (props) => {
  const { text, isLoading, handleFunction, className, Icon, disabled } = props;
  return (
    <Button
      isLoading={isLoading}
      onClick={handleFunction}
      className={className}
      disabled={isLoading}
      isDisabled={disabled}
    >
      {Icon && <Icon className="w-5 h-5 mr-1" aria-hidden="true" />}
      {text}
    </Button>
  );
};

export default ButtonElement;
