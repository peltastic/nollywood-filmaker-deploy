import React from "react";

type Props = {};

const times = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const CustomTime = (props: Props) => {
  return (
    <div className=" grid md:block grid-cols-2 sm:grid-cols-3  mid:grid-cols-4 gap-4 md:gap-0 rounded-xl border-r border-b border-l w-full md:w-[12rem] bg-calender-bg px-4 py-6 ">
      {times.map((el) => (
        <div
          key={el}
          className={`${
            el === "11:00 AM" ? "bg-black-2 text-white" : "text-black-2 bg-white"
          }  text-[1.13rem] font-medium mx-0 md:mx-auto  rounded-md py-3 px-3 mb-2`}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default CustomTime;
