import { Switch } from "@mantine/core";
import React from "react";

type Props = {
  color?: string;
  size?: "lg" | "md" | "sm" | "xl" | "xs";
  label?: React.ReactNode;
};

const SwitchComponent = (props: Props) => {
  return (
    <div className="flex items-center">
      <Switch
        color={props.color}
        size={props.size}
        defaultChecked
        // label="I agree to sell my privacy"
      />
      {props.label}
    </div>
  );
};

export default SwitchComponent;
