import { Modal } from "@mantine/core";
import React from "react";

interface Props extends React.PropsWithChildren {
  opened: boolean;
  onClose: () => void;
  centered?: boolean;
  withCloseButton?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const ModalComponent = ({
  opened,
  onClose,
  centered,
  children,
  withCloseButton,
  size
}: Props) => {
  return (
    <Modal
      centered={centered}
      withCloseButton={withCloseButton}
      opened={opened}
      onClose={onClose}
      size={size}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
