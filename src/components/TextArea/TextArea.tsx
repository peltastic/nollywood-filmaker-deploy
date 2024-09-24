import React from "react";

type Props = {
  label?: string;
  className?: string;
  labelStyle2?: boolean;
  value: string;
  changed: (value: string) => void;
  placeholder: string;
};

const TextArea = ({
  label,
  className,
  labelStyle2,
  value,
  changed,
  placeholder,
}: Props) => {
  return (
    <div>
      <label
        className={`block ${
          labelStyle2 ? "text-black-2 font-medium" : "text-gray-3"
        } mb-2 text-[0.88rem] outline-none`}
      >
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          changed(e.target.value)
        }
        value={value}
        className={`${
          className || "resize-none h-[8rem]"
        }  rounded-md  border border-gray-2 w-full`}
      ></textarea>
    </div>
  );
};

export default TextArea;
