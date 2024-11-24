import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TestImage from "/public/assets/test-avatar.png";
import HoverCardComponent from "../HoverCard/HoverCardComponent";
import SchedulerPopUp from "./SchedulerPopUp";

type Props = {
  allocatedTime: string;
  index: number;
  data: {
    date: string;
    time: {
      hours: number;
      minutes: number;
      seconds: number;
    };
  }[];

  date: Date;
};

const SchedulerSlots = (props: Props) => {
  // const [timeSlot, ]
  const [isTime, setIsTime] = useState<boolean>(false);

  useEffect(() => {
    const slotTimeStamp =
      moment(props.date).format("YYYY-MM-DD") + props.allocatedTime;
    const isDate = props.data.find(
      (el) =>
        moment(el.date).format("YYYY-MM-DD") +
          `${el.time.hours}:${
            el.time.minutes < 10 ? `0${el.time.minutes}` : el.time.minutes
          }` ===
        slotTimeStamp
    );

    if (isDate) {
      setIsTime(true);
    } else {
      setIsTime(false);
    }
  }, [props.date, props.allocatedTime]);
  return (
    <div
      className={`
      
       relative  h-[4rem] border-b-stroke-10  border-r-stroke-10 border-r border-b`}
    >
      {isTime && (
        <HoverCardComponent
          closeDelay={1000}
          target={
            <div
              className={` ${
                isTime
                  ? "bg-schedule-bg border-2 rounded-md border-r-2 border-b-2 border-black-3"
                  : ""
              } absolute w-[95%] left-1/2 top-1 -translate-x-1/2  h-[7rem] py-2 px-2 cursor-pointer`}
            >
              <div className="">
                <div className="flex">
                  <div className="bg-black-3 text-white mr-1 rounded-md text-[0.5rem] px-1 py-1 font-bold">
                    {props.allocatedTime}
                  </div>
                  <div className="bg-black-3 text-white rounded-md text-[0.5rem] px-1 py-1 font-bold">
                    {Number(props.allocatedTime.split(":")[0]) + 1}:
                    {props.allocatedTime.split(":")[1]}
                  </div>
                </div>
                <p className="text-[0.63rem] font-bold mt-1">
                  No Country for Old Men
                </p>
                <div className="flex absolute bottom-1">
                  <Image
                    src={TestImage}
                    alt="test-image"
                    className="w-[1.5rem] h-[1.5rem] mr-1"
                  />
                  <Image
                    src={TestImage}
                    alt="test-image"
                    className="w-[1.5rem] h-[1.5rem]"
                  />
                </div>
              </div>
            </div>
          }
        >
          <SchedulerPopUp />
        </HoverCardComponent>
      )}
    </div>
  );
};

export default SchedulerSlots;
