import { time_slots, time_slots_v2 } from "@/utils/constants/constants";
import React, { useState } from "react";
import SwitchComponent from "../Switch/SwitchComponent";

type Props = {
  updateSlots: (
    value: string,
    type: "add" | "remove",
    bulkSlots?: string[]
  ) => void;
  slots: string[];
};

const SlotsSelector = ({ slots, updateSlots }: Props) => {
  const [morning, setMorning] = useState<boolean>(false);
  const [day, setDay] = useState<boolean>(false);
  const [night, setNight] = useState<boolean>(false);
  const [odd, setOdd] = useState<boolean>(false);
  const [even, setEven] = useState<boolean>(false);
  return (
    <div className="font-normal">
      <p className=" text-sm   mt-8 font-medium mb-2">
        select availability hour slots by clicking on them
      </p>
      <div className="text-xs font-medium flex flex-wrap items-center mb-6 my-1 ">
        <p className=" mr-3 mt-2">Shortcuts:</p>
        <div className="flex items-center mt-2 ">
          <p className="mr-2">morning hours</p>
          <div className="cursor-pointer">
            <SwitchComponent
              setChecked={() => {
                setMorning(true);
                setDay(false);
                setEven(false);
                setNight(false);
                setOdd(false);
                updateSlots("", "add", ["09:00", "10:00", "11:00"]);
              }}
              checked={morning}
              size="xs"
              color="#181818"
            />
          </div>
        </div>
        <div className="flex items-center ml-2 mt-2">
          <p className="mr-2">day hours</p>
          <div className="cursor-pointer">
            <SwitchComponent
              setChecked={() => {
                setMorning(false);
                setDay(true);
                setEven(false);
                setNight(false);
                setOdd(false);
                updateSlots("", "add", [
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00",
                ]);
              }}
              checked={day}
              size="xs"
              color="#181818"
            />
          </div>
        </div>
        <div className="flex items-center ml-2 mt-2">
          <p className="mr-2">night hours</p>
          <div className="cursor-pointer">
            <SwitchComponent
              setChecked={() => {
                setMorning(false);
                setDay(false);
                setEven(false);
                setNight(true);
                setOdd(false);
                updateSlots("", "add", [
                  "19:00",
                  "20:00",
                  "21:00",
                  "22:00",
                  "23:00",
                ]);
              }}
              checked={night}
              size="xs"
              color="#181818"
            />
          </div>
        </div>
        <div className="flex items-center ml-2 mt-2">
          <p className="mr-2">odd hours</p>
          <div className="cursor-pointer">
            <SwitchComponent
              setChecked={() => {
                setMorning(false);
                setDay(false);
                setEven(false);
                setNight(false);
                setOdd(true);
                updateSlots("", "add", [
                  "09:00",
                  "11:00",
                  "13:00",
                  "15:00",
                  "17:00",
                  "19:00",
                  "21:00",
                  "23:00",
                ]);
              }}
              checked={odd}
              size="xs"
              color="#181818"
            />
          </div>
        </div>
        <div className="flex items-center ml-2 mt-2">
          <p className="mr-2">even hours</p>
          <div className="cursor-pointer">
            <SwitchComponent
              setChecked={() => {
                setMorning(false);
                setDay(false);
                setEven(true);
                setNight(false);
                setOdd(false);
                updateSlots("", "add", [
                  "10:00",
                  "12:00",
                  "14:00",
                  "16:00",
                  "18:00",
                  "20:00",
                  "22:00",
                ]);
              }}
              checked={even}
              size="xs"
              color="#181818"
            />
          </div>
        </div>
      </div>
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
