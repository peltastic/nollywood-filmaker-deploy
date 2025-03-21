import { Skeleton } from "@mantine/core";
import React from "react";
import SlotDisabledImg from "/public/assets/chats/slot-disabled.png";
import Image from "next/image";

type Props = {
  serviceSelection?: boolean;
  selectedTime: string;
  setSelected?: (value: string) => void;
  time_slots?: {
    time: string;
    isAvailable: boolean;
  }[];
  isFetching?: boolean;
};

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
    <div
      className={` ${
        props.serviceSelection
          ? "w-full xl:w-[15rem] mt-6 xl:mt-0"
          : "w-full md:w-[15rem]"
      } grid xl:block sm:grid-cols-2 mid:grid-cols-2 gap-4 lg:gap-4 rounded-xl border-r border-b border-l mid:h-[28rem] overflow-y-scroll  bg-calender-bg px-4 py-6 `}
    >
      {props.isFetching ? (
        <>
          <div className="mb-2">
            <Skeleton height={50} />
          </div>
          <div className="mb-2">
            <Skeleton height={50} />
          </div>
          <div className="mb-2">
            <Skeleton height={50} />
          </div>
          <div className="mb-2">
            <Skeleton height={50} />
          </div>
          <div className="mb-2">
            <Skeleton height={50} />
          </div>
          <div className="mb-2">
            <Skeleton height={50} />
          </div>
          <div className="mb-2">
            <Skeleton height={50} />
          </div>
        </>
      ) : !props.time_slots ? (
        <div className="text-[0.8rem] bg-white disabled:cursor-not-allowed relative transition-all cursor-pointer font-medium mx-0 md:mx-auto  rounded-md py-3 px-3 mb-2">No Slots Available</div>
      ) : (
        <>
          {props.time_slots?.map((el) => (
            <button
              style={{
                backgroundImage: el.isAvailable
                  ? ""
                  : `url(${SlotDisabledImg.src})`,
                // backgroundSize: "cover",
              }}
              disabled={!el.isAvailable}
              onClick={() => props.setSelected && props.setSelected(el.time)}
              key={el.time}
              className={`w-full ${
                el.time === props.selectedTime
                  ? "bg-black-2 text-white"
                  : "text-black-2 bg-white"
              }  text-[0.90rem] flex items-center disabled:cursor-not-allowed relative transition-all cursor-pointer font-medium mx-0 md:mx-auto  rounded-md py-3 px-3 mb-2`}
            >
              {el.time} <span className="pl-2 ml-auto ">WAT</span>
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default CustomTime;
