import React, { useEffect, useState } from "react";
import {
  startOfWeek,
  getDate,
  getMonth,
  getYear,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
} from "date-fns";
import Time from "/public/assets/consultant/time.svg";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { getMonthName } from "@/utils/helperFunction";
import { days } from "@/utils/constants/constants";
import SchedulerSlots from "./SchedulerSlots";
import { IGetCalendarAppointmentResponse } from "@/interfaces/consultants/calendar/calendar";

type Props = {
  value?: Date;
  setValue: (val: Date) => void;
  data:IGetCalendarAppointmentResponse[];
  
};

// const time_slots = [
//   "09:00 AM",
//   "10:00 AM",
//   "11:00 AM",
//   "12:00 PM",
//   "01:00 PM",
//   "02:00 PM",
//   "03:00 PM",
//   "04:00 PM",
//   "05:00 PM",
//   "06:00 PM",
//   "07:00 PM",
//   "08:00 PM",
//   "09:00 PM",
//   "10:00 PM",
//   "11:00 PM",
//   "12:00 PM",
//   "01:00 AM",
// ];

const time_slots = [
  {
    time: "09:00 AM",
    upperBound: 7,
    lowerBound: 1,
  },
  {
    time: "10:00 AM",
    upperBound: 14,
    lowerBound: 8,
  },
  {
    time: "11:00 AM",
    upperBound: 21,
    lowerBound: 15,
  },
  {
    time: "12:00 PM",
    upperBound: 28,
    lowerBound: 22,
  },
  {
    time: "01:00 PM",
    upperBound: 35,
    lowerBound: 29,
  },
  {
    time: "02:00 PM",
    upperBound: 42,
    lowerBound: 36,
  },
  {
    time: "03:00 PM",
    upperBound: 49,
    lowerBound: 43,
  },
  {
    time: "04:00 PM",
    upperBound: 56,
    lowerBound: 50,
  },
  {
    time: "05:00 PM",
    upperBound: 63,
    lowerBound: 57,
  },
  {
    time: "06:00 PM",
    upperBound: 70,
    lowerBound: 64,
  },
  {
    time: "07:00 PM",
    upperBound: 77,
    lowerBound: 71,
  },
  {
    time: "08:00 PM",
    upperBound: 84,
    lowerBound: 78,
  },
  {
    time: "09:00 PM",
    upperBound: 91,
    lowerBound: 85,
  },
  {
    time: "10:00 PM",
    upperBound: 98,
    lowerBound: 92,
  },
  {
    time: "11:00 PM",
    upperBound: 105,
    lowerBound: 99,
  },
  {
    time: "12:00 AM",
    upperBound: 112,
    lowerBound: 106,
  },
  {
    time: "01:00 AM",
    upperBound: 119,
    lowerBound: 113,
  },
];

const Scheduler = ({ value = new Date(), setValue, data }: Props) => {
  const [fromStartWeekCounter, setFromStartWeekCounter] = useState<number>(7);
  const [startOfWeekState, setStartOfWeekState] = useState<Date>(
    startOfWeek(value, { weekStartsOn: 0 })
  );

  useEffect(() => {
    setStartOfWeekState(startOfWeek(value, { weekStartsOn: 0 }));
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
            clicked={() => {
              if (fromStartWeekCounter === 7) {
                setFromStartWeekCounter((prev) => prev - 14);
              } else {
                setFromStartWeekCounter((prev) => prev - 7);
              }
              setValue(subWeeks(value, 1));
            }}
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
            clicked={() => {
              if (fromStartWeekCounter === -7) {
                setFromStartWeekCounter((prev) => prev + 14);
              } else {
                setFromStartWeekCounter((prev) => prev + 7);
              }
              setValue(addWeeks(value, 1));
            }}
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
              key={el.upperBound}
            >
              <p>{el.time}</p>
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
                {el}&nbsp;
                {fromStartWeekCounter > 0
                  ? getDate(
                      addDays(
                        startOfWeek(new Date(), { weekStartsOn: 0 }),
                        fromStartWeekCounter - (7 - (index + 1 - 1))
                      )
                    )
                  : getDate(
                      subDays(
                        startOfWeek(new Date(), { weekStartsOn: 0 }),
                        Math.abs(fromStartWeekCounter + (index + 1 - 1))
                      )
                    )}
              </p>
            </div>
          ))}
          {fromStartWeekCounter && (
            <>
              {Array.from({
                length: days.length * time_slots.length,
              }).map((el, index) => {
                const no = index + 1;
                const slotValue = no % 7 || 7;

                return (
                  <SchedulerSlots
                    time_slots={time_slots}
                    key={index}
                    allocatedTime={
                      no < 8
                        ? "09:00"
                        : no > 7 && no < 15
                        ? "10:00"
                        : no > 14 && no < 22
                        ? "11:00"
                        : no > 21 && no < 29
                        ? "12:00"
                        : no > 28 && no < 36
                        ? "13:00"
                        : no > 35 && no < 43
                        ? "14:00"
                        : no > 42 && no < 50
                        ? "15:00"
                        : "16:00"
                    }
                    date={
                      fromStartWeekCounter > 0
                        ? addDays(
                            startOfWeek(new Date(), { weekStartsOn: 0 }),
                            fromStartWeekCounter - (7 - (slotValue - 1))
                          )
                        : subDays(
                            startOfWeek(new Date(), { weekStartsOn: 0 }),
                            Math.abs(fromStartWeekCounter + (slotValue - 1))
                          )
                    }
                    data={data}
                    index={index + 1}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
