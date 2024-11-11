import { Modal } from "@mantine/core";
import React from "react";

interface Props extends React.PropsWithChildren {
  opened: boolean;
  onClose: () => void;
  centered?: boolean;
  withCloseButton?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "auto" | string;
  fullscreen?: boolean;
  disabled?: "active"
}

const ModalComponent = ({
  opened,
  onClose,
  centered,
  children,
  withCloseButton,
  size,
  fullscreen,
  disabled,
}: Props) => {
  return (
    <Modal
      closeOnClickOutside={!disabled ? true : false }
      centered={centered}
      withCloseButton={withCloseButton}
      opened={opened}
      onClose={onClose}
      size={size}
      fullScreen={fullscreen}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
