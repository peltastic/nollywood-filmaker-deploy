import { Switch } from "@mantine/core";
import React from "react";

type Props = {
  color?: string;
  size?: "lg" | "md" | "sm" | "xl" | "xs";
  label?: React.ReactNode;
  radius?: "lg" | "md" | "sm" | "xl" | "xs";
  checked?: boolean;
  setChecked?: (val: boolean) => void;
  defaultChecked?: boolean
};

const SwitchComponent = (props: Props) => {
  return (
    <div className="flex cursor-pointer items-center">
      <Switch
        color={props.color}
        size={props.size}
        defaultChecked={props.defaultChecked}
        radius={props.radius}
        checked={props.checked}
        onChange={(event) =>
          props.setChecked && props.setChecked(event.currentTarget.checked)
        }
        // label="I agree to sell my privacy"
      />
      {props.label}
    </div>
  );
};

export default SwitchComponent;
