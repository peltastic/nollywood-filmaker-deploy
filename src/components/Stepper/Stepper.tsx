import React from "react";

type Props = {
  data: {
    label: string;
    value: string;
  }[];
  values: string;
};

const Stepper = (props: Props) => {
  return (
    <div className="flex gap-8 text-black-2">
      {props.data.map((el) => (
        <div className="flex items-center " key={el.value}>
          <div
            className={`${
              props.values === el.value ? "bg-black-2 text-white" : ""
            } text-[0.88rem] font-medium mr-2 border border-black-2 flex items-center justify-center rounded-full w-[1.91rem] h-[1.91rem]`}
          >
            {el.value}
          </div>
          <p>{el.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
