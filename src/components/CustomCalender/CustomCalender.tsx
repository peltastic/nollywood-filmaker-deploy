import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import Cell from "./Cell";
import ArrowRight from "/public/assets/calender/arrow-right.svg";
import ArrowLeft from "/public/assets/calender/arrow-left.svg";
import Image from "next/image";
import ArrowImg from "/public/assets/calender/arrow.svg";

const weeks = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
};

const Calendar: React.FC<Props> = ({ value = new Date(), onChange }) => {
  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => onChange(sub(value, { months: 1 }));
  const nextMonth = () => onChange(add(value, { months: 1 }));
  const prevYear = () => onChange(sub(value, { years: 1 }));
  const nextYear = () => onChange(add(value, { years: 1 }));

  const handleClickDate = (index: number) => {
    const date = setDate(value, index);
    onChange(date);
  };

  return (
    <div className="w-full rounded-xl border-r border-b border-l bg-calender-bg px-6 py-6">
      <div className="flex justify-between items-center">
        <div
          onClick={prevMonth}
          className="flex items-center justify-center bg-white h-[2.75rem] w-[2.75rem] rounded-full"
        >
          <Image src={ArrowLeft} alt="arrow-left" />
        </div>
        <div className="flex items-center">
          <div className="bg-white rounded-md px-2 text-[1.5rem] flex items-end mr-2 font-bold py-2">
            <p className="">{format(value, "LLLL")}</p>
            <div className="mb-2">
              <Image src={ArrowImg} alt="arrow-img" />
            </div>
          </div>
          <div className="bg-white rounded-md px-2 text-[1.5rem] flex items-end mr-2 font-bold py-2">
            <p>{format(value, "yyyy")}</p>
            <div className="mb-2">
              <Image src={ArrowImg} alt="arrow-img" />
            </div>
          </div>
        </div>
        <div
          onClick={nextMonth}
          className="flex items-center justify-center bg-white h-[2.75rem] w-[2.75rem] rounded-full"
        >
          <Image src={ArrowRight} alt="arrow-right" />
        </div>
      </div>
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

          return (
            <Cell
              key={date}
              isActive={isCurrentDate}
              onClick={() => handleClickDate(date)}
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
    </div>
  );
};

export default Calendar;
