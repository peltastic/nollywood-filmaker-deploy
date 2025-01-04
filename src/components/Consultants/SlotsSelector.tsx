import { time_slots, time_slots_v2 } from "@/utils/constants/constants";
import React from "react";

type Props = {
  updateSlots: (value: string, type: "add" | "remove") => void;
  slots: string[];
};

const SlotsSelector = ({ slots, updateSlots }: Props) => {
  return (
    <div className="font-normal">
      <p className="mt-8 mb-2 text-sm text-gray-1">
        select availability hour slots
      </p>
      <div className="flex flex-wrap gap-4 ">
        {time_slots_v2.map((el) => (
          <div
            key={el}
            onClick={() => {
              if (slots.includes(el)) {
                updateSlots(el, "remove");
              } else {
                updateSlots(el, "add");
              }
            }}
            className={`${
              slots.includes(el)
                ? "border-black-2 border-2 font-semibold text-black-2"
                : "text-gray-1 border font-normal border-gray-1"
            } cursor-pointer    py-2 px-4 rounded-md transition-all`}
          >
            <p>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotsSelector;
