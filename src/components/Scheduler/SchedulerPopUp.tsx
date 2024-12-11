import React from "react";
import { MdLocationOn } from "react-icons/md";
import { HiOutlineCalendar } from "react-icons/hi2";
import Time from "/public/assets/consultant/time.svg";
import { MdPeopleAlt } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";

import Image from "next/image";
import { IGetCalendarAppointmentResponse } from "@/interfaces/consultants/calendar/calendar";
import { truncateStr } from "@/utils/helperFunction";
import moment from "moment";

type Props = {
  data?: IGetCalendarAppointmentResponse;
};

const SchedulerPopUp = (props: Props) => {
  return (
    <div className="bg-white w-[30rem] text-black-3 py-6">
      <h1 className="font-bold mb-6">{props.data?.chat_title}</h1>
      <div className="flex items-center font-bold py-4 border-t-stroke-11 border-t-2 break-words">
        <MdLocationOn className="mr-3 text-xl" />
        <p className="text-[0.75rem]">Filmmaker Messenger</p>
      </div>
      <div className="flex items-center font-bold py-4 border-t-stroke-11 border-t-2">
        <div className="flex w-[50%] items-start border-r-2 border-r-stroke-11">
          <HiOutlineCalendar className="mr-3 text-xl" />
          <p className="text-[0.75rem]">{moment(props.data?.booktime).format("YYYY-MM-DD")}</p>
        </div>
        <div className="flex items-center w-[50%]  pl-4">
          <Image src={Time} alt="" className="mr-2" />
          <p className="text-[0.75rem]">
          {moment(props.data?.booktime).format("LT")}</p>
        </div>
      </div>
      <div className="flex items-center font-bold py-4 border-t-stroke-11 border-t-2">
        <MdPeopleAlt className="mr-3 text-xl" />
        <p className="text-[0.75rem]">You, Niyi@gmail.com</p>
      </div>
      <div className="flex items-center font-bold py-4 border-t-stroke-11 border-t-2">
        <BsFillPencilFill className="mr-3 text-xl" />
        <p className="text-[0.75rem]">I don’t have any notes at the moment</p>
      </div>
    </div>
  );
};

export default SchedulerPopUp;
