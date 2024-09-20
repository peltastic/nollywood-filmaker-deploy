import { Checkbox } from "@mantine/core";
import React, { ReactNode } from "react";

type Props = {
  label: ReactNode;
  checked?: boolean;
  setCheckedProps?: (value: boolean) => void;
  color?: string;
};

const CheckboxComponent = (props: Props) => {
  return (
    <Checkbox
      color={props.color}
      onChange={(event) =>
        props.setCheckedProps && props.setCheckedProps(event.target.checked)
      }
      checked={props.checked}
      label={props.label}
    />
  );
};

export default CheckboxComponent;
