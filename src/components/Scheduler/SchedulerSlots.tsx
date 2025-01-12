import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TestImage from "/public/assets/test-avatar.png";
import HoverCardComponent from "../HoverCard/HoverCardComponent";
import SchedulerPopUp from "./SchedulerPopUp";
import { time_slots } from "@/utils/constants/constants";
import { IGetCalendarAppointmentResponse } from "@/interfaces/consultants/calendar/calendar";
import { truncateStr } from "@/utils/helperFunction";
import { AspectRatio } from "@mantine/core";

type Props = {
  allocatedTime: string;
  index: number;
  data: IGetCalendarAppointmentResponse[];
  time_slots: { time: string; upperBound: number; lowerBound: number }[];

  date: Date;
};

const SchedulerSlots = (props: Props) => {
  const [slotData, setSlotData] = useState<IGetCalendarAppointmentResponse>();
  const [isTime, setIsTime] = useState<boolean>(false);

  useEffect(() => {
    const at = props.time_slots.filter(
      (el) => el.upperBound >= props.index && el.lowerBound <= props.index
    );

    const slotTimeStamp = `${moment(props.date).format("YYYY-MM-DD")}T${moment(
      at[0].time,
      ["h:mm A"]
    ).format("HH:mm")}:00+01:00`;
    console.log(slotTimeStamp);
    const isDate = props.data.find((el) => el.booktime === slotTimeStamp);
    if (isDate) {
      setSlotData(isDate);
      setIsTime(true);
    } else {
      setIsTime(false);
    }
  }, [props.date]);
  return (
    <div
      className={`
      
       relative  h-[7rem] border-b-stroke-10  border-r-stroke-10 border-r border-b`}
    >
      {isTime && (
        <HoverCardComponent
          closeDelay={500}
          target={
            <div
              className={` ${
                isTime
                  ? "bg-schedule-bg border-2 rounded-md border-r-2 border-b-2 border-black-3"
                  : ""
              } absolute w-[95%] left-1/2 top-1 -translate-x-1/2  h-[6rem] py-2 px-2 cursor-pointer`}
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
                  {slotData?.chat_title && truncateStr(slotData.chat_title, 25)}
                </p>
                {slotData && (
                  <div className="flex absolute bottom-1">
                    <AspectRatio ratio={1800/1800}>
                      <Image
                        src={slotData.user.profilepics}
                        alt="test-image"
                        className="w-[1.5rem] h-[1.5rem] rounded-full"
                        width={50}
                        height={50}
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>
            </div>
          }
        >
          {slotData && <SchedulerPopUp data={slotData} />}
        </HoverCardComponent>
      )}
    </div>
  );
};

export default SchedulerSlots;
