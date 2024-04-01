import { Modal, ModalContent } from "@nextui-org/react";

import React from "react";

interface IOverlayFragment {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;

  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  className?: string;
}

const OverlayFragment = (props: IOverlayFragment) => {
  const { isOpen, setIsOpen, children, size, className } = props;
  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen} size={size}>
      <ModalContent>
        {() => <div className={className}>{children}</div>}
      </ModalContent>
    </Modal>
  );
};

export default OverlayFragment;
