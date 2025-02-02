import React from "react";
import { ComboboxItem, Select } from "@mantine/core";
import { IoIosArrowDown } from "react-icons/io";
import classes from "@/app/styles/Select.module.css";

type Props = {
  label: string;
  data: {
    label: string;
    value: string;
  }[];
  placeholder: string;
  value?: string | null;
  setValueProps: (value: string | null, option?: ComboboxItem) => void;
  size?: "lg" | "md" | "xl" | "xs" | "sm";
  rounded?: "lg" | "md" | "xl" | "xs" | "sm";
  largeLabel?: boolean;
  noIcon?: boolean;
  darkBorder?: boolean
  defaultValue?: string | null
  disabled?: boolean
};

const SelectComponent = (props: Props) => {
  const icon = <IoIosArrowDown className="text-gray-4" />;
  return (
    <div className="">
      {props.label && (
        <label
          className={`block mb-2 text-black-2 font-medium ${
            props.largeLabel ? "" : "text-[0.88rem]"
          } `}
        >
          {props.label}
        </label>
      )}
      <Select
        classNames={{
          input: classes.input,
        }}
        className={`border rounded-md ${props.darkBorder ? "border-black-3" : "border-stroke-9"} border-black`}
        size={props.size}
        onChange={props.setValueProps}
        radius={props.rounded}
        rightSection={props.noIcon ? null : icon}
        placeholder={props.placeholder}
        data={props.data}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        value={props.value}
      />
    </div>
  );
};

export default SelectComponent;
