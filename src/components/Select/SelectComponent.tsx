import React from "react";
import { ComboboxItem, Select } from "@mantine/core";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import classes from "@/app/styles/Select.module.css";

type Props = {
  label: string;
  data: {
    label: string;
    value: string;
  }[];
  placeholder: string;
  value?: string;
  setValueProps: (value: string | null, option?: ComboboxItem) => void;
  size?: "lg" | "md" | "xl" | "xs"| "sm"
  rounded?: "lg" | "md" | "xl" | "xs" | "sm"
};

const SelectComponent = (props: Props) => {
  const icon = <IoIosArrowDown className="text-gray-4" />;
  return (
    <div className="">
      {props.label && (
        <label className="block mb-2 text-black-2 font-medium text-[0.88rem]">
          {props.label}
        </label>
      )}
      <Select
        classNames={{
          input: classes.input,
        }}
        size={props.size}
        onChange={props.setValueProps}
        radius={props.rounded}
        rightSection={icon}
        placeholder={props.placeholder}
        data={props.data}
      />
    </div>
  );
};

export default SelectComponent;
