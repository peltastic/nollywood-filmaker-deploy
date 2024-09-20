import React from "react";
import { Input } from "@mantine/core";

type Props = {
  type: string;
  placeholder: string;
  className: string;
  label?: string;
  changed: (value: string) => void;
  value?: string;
};

const InputComponent = ({
  type,
  placeholder,
  className,
  label,
  changed,
  value,
}: Props) => {
  return (
    <div className="w-full">
      {label ? (
        <label className="block mb-2 text-black-2 font-medium text-[0.88rem]">
          {label}
        </label>
      ) : null}
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changed(e.target.value)
        }
        className={`${className}  border rounded-md border-gray-2 outline-none`}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default InputComponent;
