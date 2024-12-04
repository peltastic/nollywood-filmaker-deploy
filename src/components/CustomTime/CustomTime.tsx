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
          ? "w-full xl:w-[14rem] mt-6 xl:mt-0"
          : "w-full md:w-[12rem]"
      } grid md:block grid-cols-2 sm:grid-cols-3  mid:grid-cols-4 gap-4 md:gap-0 rounded-xl border-r border-b border-l mid:h-[28rem] overflow-y-scroll  bg-calender-bg px-4 py-6 `}
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
              className={`w-full\ ${
                el.time === props.selectedTime
                  ? "bg-black-2 text-white"
                  : "text-black-2 bg-white"
              }  text-[1.13rem] disabled:cursor-not-allowed relative transition-all cursor-pointer font-medium mx-0 md:mx-auto  rounded-md py-3 px-3 mb-2`}
            >
              {el.time}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default CustomTime;
