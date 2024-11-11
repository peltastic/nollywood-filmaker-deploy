import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
  differenceInCalendarDays,
  getMonth,
  getDate,
  subMonths,
  addMonths,
} from "date-fns";
import Cell from "./Cell";
import ArrowRight from "/public/assets/calender/arrow-right.svg";
import ArrowLeft from "/public/assets/calender/arrow-left.svg";
import Image from "next/image";
import ArrowImg from "/public/assets/calender/arrow.svg";
import { useEffect, useState } from "react";
import { months_data } from "@/utils/helperFunction";

const weeks = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
};

const Calendar: React.FC<Props> = ({ value = new Date(), onChange }) => {
  const [calendarPrivateDateState, setCalendarPrivateDateState] = useState(new Date())
  const startDate = startOfMonth(calendarPrivateDateState);
  const endDate = endOfMonth(calendarPrivateDateState);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const [openMonthSelection, setOpenMonthSelection] = useState<boolean>(false);
  const prevMonth = () => {
    setOpenMonthSelection(false);
    setCalendarPrivateDateState(sub(calendarPrivateDateState, { months: 1 }));
  };
  const nextMonth = () => {
    setOpenMonthSelection(false);
    setCalendarPrivateDateState(add(calendarPrivateDateState, { months: 1 }));
  };
  const prevYear = () => onChange(sub(calendarPrivateDateState, { years: 1 }));
  const nextYear = () => onChange(add(calendarPrivateDateState, { years: 1 }));


  const handleClickDate = (index: number) => {
    const date = setDate(calendarPrivateDateState, index);
    onChange(date);
  };

  

  const updateCalenderMonth = (month_value: number) => {
    const currDate = new Date()
    let updatedDate
    const currentMonth = getMonth(currDate);
    if (month_value < currentMonth) {
     updatedDate = subMonths(currDate, currentMonth - month_value);
     setCalendarPrivateDateState(updatedDate)
    } else if (month_value> currentMonth) {
      updatedDate =addMonths(currDate, month_value - currentMonth)
      setCalendarPrivateDateState(updatedDate)
    } 
    setOpenMonthSelection(false)
  };

  return (
    <div className="w-full rounded-xl border-r border-b border-l bg-calender-bg px-2 sm:px-6 py-6">
      <div className="flex flex-wrap sm:justify-between items-center">
        <div
          onClick={prevMonth}
          className="cursor-pointer flex order-1 mr-2 sm:mr-0 items-center justify-center bg-white h-[2.75rem] w-[2.75rem] rounded-full"
        >
          <Image src={ArrowLeft} alt="arrow-left" />
        </div>
        <div className="flex order-3 md:order-2 mb-2 sm:mb-0 mt-4 sm:mt-0 items-center">
          <div
            onClick={() => setOpenMonthSelection(!openMonthSelection)}
            className="cursor-pointer hover:bg-gray-bg-5 transition-all bg-white rounded-md px-2 text-[1.5rem] flex items-end mr-2 font-bold py-2"
          >
            <p className="">{format(calendarPrivateDateState, "LLLL")}</p>
            <div className="mb-2">
              <Image src={ArrowImg} alt="arrow-img" />
            </div>
          </div>
          <div className="bg-white hover:bg-gray-bg-5 transition-all rounded-md px-2 text-[1.5rem] flex items-end mr-2 font-bold py-2">
            <p>{format(calendarPrivateDateState, "yyyy")}</p>
            <div className="mb-2">
              <Image src={ArrowImg} alt="arrow-img" />
            </div>
          </div>
        </div>
        <div
          onClick={nextMonth}
          className="flex cursor-pointer order-2 md:order-3 mx-2  sm:mx-0 items-center justify-center bg-white h-[2.75rem] w-[2.75rem] rounded-full"
        >
          <Image src={ArrowRight} alt="arrow-right" />
        </div>
      </div>
      {!openMonthSelection && (
        <div className="grid grid-cols-7 gap-x-[0.35rem] gap-y-[0.35rem] items-center justify-center text-center">
          {/* <Cell onClick={prevYear}>{"<<"}</Cell> */}
          {/* <Cell onClick={nextYear}>{">>"}</Cell> */}

          {weeks.map((week) => (
            <Cell className="text-[1.13rem] font-bold py-10 ">{week}</Cell>
          ))}

          {Array.from({ length: prefixDays }).map((_, index) => (
            <Cell key={index} />
          ))}

          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1;
            const isCurrentDate = date === value.getDate();
            const cellDate = new Date(
              `${format(calendarPrivateDateState, "yyyy")}-${Number(getMonth(calendarPrivateDateState)) + 1}-${date}`
            );
            const currentDate = new Date(
              `${format(value, "yyyy")}-${
                Number(getMonth(value)) + 1
              }-${getDate(value)}`
            );
            const difference = differenceInCalendarDays(
              cellDate,
              new Date(
                `${format(new Date(), "yyyy")}-${
                  Number(getMonth(new Date())) + 1
                }-${getDate(new Date())}`
              )
            );
            return (
              <Cell
                key={date}
                isActive={currentDate.getTime() === cellDate.getTime()}
                onClick={() => {
                  if (difference < 0) return;
                  handleClickDate(date);
                }}
                className={`${difference < 0 ? "text-gray-2" : null} `}
              >
                {date}
              </Cell>
            );
          })}

          {Array.from({ length: suffixDays }).map((_, index) => (
            <Cell className="text-gray-2" key={index}>
              {index + 1}
            </Cell>
          ))}
        </div>
      )}
      {openMonthSelection && (
        <div className="grid grid-cols-3 gap-6  mt-10">
          {months_data.map((el) => (
            <div
              onClick={() => updateCalenderMonth(el.value)}
              className="hover:bg-gray-bg-5 transition-all text-black-3 py-3 rounded-md cursor-pointer bg-white font-semibold flex justify-center"
              key={el.value}
            >
              {el.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
