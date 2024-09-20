import React, { ReactNode } from "react";

type Props = {
  class?: string;
  type?: "submit" | "button" | "reset";
  children: ReactNode;
  clicked?: () => void;
  disabled?: boolean;
};

const UnstyledButton = (props: Props) => {
  return (
    <button
      onClick={props.clicked}
      disabled={props.disabled}
      className={props.class}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default UnstyledButton;
