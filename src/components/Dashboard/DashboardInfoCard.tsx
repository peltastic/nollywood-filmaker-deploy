import React from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

type Props = {
  change?: "increase" | "decrease";
  title: string
  value: string
  percentage: number
};

const DashboardInfoCard = ({ change, title, value, percentage }: Props) => {
  return (
    <div className="border rounded-lg py-4 px-6 border-stroke-10">
      <h2 className="text-gray-8 text-[0.69rem]">{title.toUpperCase()}</h2>
      <div className="flex mt-4">
        <p className="mr-auto text-black-8 font-bold text-[1.31rem]">{value}</p>
        <div
          className={`flex font-medium items-center ${
            change === "increase" ? "text-positive-green" : "text-negative-red"
          }`}
        >
          <p className="text-[0.82rem]">
            {change === "increase" ? "+" : "-"}{percentage}%
          </p>
          {change === "increase" ? (
            <IoIosArrowRoundUp />
          ) : (
            <IoIosArrowRoundDown />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardInfoCard;
