import React, { useEffect, useState } from "react";
import {
  startOfWeek,
  getDate,
  getMonth,
  getYear,
  addWeeks,
  subWeeks,
} from "date-fns";
import Time from "/public/assets/consultant/time.svg";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { getMonthName } from "@/utils/helperFunction";
import { days } from "@/utils/constants/constants";

type Props = {
  value?: Date;
  setValue: (val: Date) => void;
};



const time_slots = [
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
];

const Scheduler = ({ value = new Date(), setValue }: Props) => {
  const [startOfWeekState, setStartOfWeekState] = useState<Date>(
    startOfWeek(value, { weekStartsOn: 1 })
  );

  useEffect(() => {
    setStartOfWeekState(startOfWeek(value, { weekStartsOn: 1 }));
  }, [value]);

  return (
    <div>
      <div className="flex items-center py-8 justify-between">
        <UnstyledButton
          clicked={() => setValue(new Date())}
          class="border font-semibold text-[0.75rem] rounded-md px-6 py-3 border-stroke-5 shadow-md shadow-[#1018281A]"
        >
          Today
        </UnstyledButton>
        <div className="flex items-center">
          <UnstyledButton
            clicked={() => setValue(subWeeks(value, 1))}
            class="border font-semibold text-[0.75rem] rounded-md px-3 py-3 border-stroke-5 shadow-md shadow-[#1018281A]"
          >
            <IoIosArrowBack />
          </UnstyledButton>
          <p className="font-bold text-[0.75rem] text-black-3 mx-6">
            {getMonthName(getMonth(startOfWeekState))}{" "}
            {getDate(startOfWeekState)} - {getDate(startOfWeekState) + 6},{" "}
            {getYear(startOfWeekState)}
          </p>
          <UnstyledButton
            clicked={() => setValue(addWeeks(value, 1))}
            class="border font-semibold text-[0.75rem] rounded-md px-3 py-3 border-stroke-5 shadow-md shadow-[#1018281A]"
          >
            <IoIosArrowForward />
          </UnstyledButton>
        </div>
        <div className="flex text-[0.75rem] text-black-2   rounded-md items-center border border-stroke-5 shadow-md shadow-[#1018281A] ">
          <div className="border-r py-3  border-r-stroke-5 flex items-center justify-center px-3">
            <p>Week</p>
          </div>
          <div className="border-r flex items-center justify-center py-3 px-3 border-r-stroke-5">
            <p>Month</p>
          </div>
          <div className="border-r flex items-center justify-center py-3 px-3 border-r-stroke-5">
            <p>Year</p>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <div className="w-[6rem] border-t border-r border-b  border-b-stroke-10  border-t-stroke-10 border-r-stroke-10 ">
          <div className="border-b  border-b-stroke-10 px-4 h-[4rem] flex items-center justify-center">
            <Image src={Time} alt="time" />
          </div>
          {time_slots.map((el) => (
            <div
              className="border-b border-b-stroke-10 font-bold text-black-2 h-[4rem] text-[0.75rem] flex items-center justify-center"
              key={el}
            >
              <p>{el}</p>
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-7  border-t border-t-stroke-10">
          {days.map((el, index) => (
            <div
              className="border-b flex items-center text-black-3 font-medium text-[0.88rem]  justify-center border-b-stroke-10 h-[4rem] border-r text-center"
              key={el}
            >
              <p>
                {el}&nbsp;{getDate(startOfWeekState) + index}
              </p>
            </div>
          ))}
          {Array.from({ length: days.length * time_slots.length }).map(() => (
            <div className="border-b border-b-stroke-10 border-r border-r-stroke-10 h-[4rem]"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
