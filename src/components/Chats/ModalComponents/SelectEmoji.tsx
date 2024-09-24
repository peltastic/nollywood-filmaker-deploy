import React, { useState } from "react";
import {
  TerribleEmoji,
  AmazingEmoji,
  Badmoji,
  GoodEmoji,
  OkayEmoji,
} from "@/components/Svgs/Emojis";

export interface IEmojiData {
  emotion: "Terrible" | "Bad" | "Okay" | "Good" | "Amazing";

  value: string;
}
type Props = {
  data: IEmojiData[];
  title: string;
};

const SelectEmoji = ({ data, title }: Props) => {
  const [selectedQualityEmoji, setSelectedQualityEmoji] = useState<string>("");
  return (
    <div className="">
      <h1 className="font-medium text-[0.88rem] text-black-2 my-6">{title}</h1>
      <div className="grid grid-cols-5 gap-6 ">
        {data.map((el) => (
          <div
            onClick={() => setSelectedQualityEmoji(el.value)}
            className={` ${
              selectedQualityEmoji === el.value ? "bg-black-3" : ""
            } border  border-stroke-9 h-[7.2rem] flex items-center justify-center rounded-md cursor-pointer`}
          >
            {el.emotion === "Terrible" ? (
              <div className="">
                <TerribleEmoji light={selectedQualityEmoji === el.value} />
                <p
                  className={`text-[0.7rem] text-center mt-2  ${
                    el.value === selectedQualityEmoji ? "text-white" : ""
                  }`}
                >
                  {el.emotion}
                </p>
              </div>
            ) : el.emotion === "Amazing" ? (
              <div className="">
                <AmazingEmoji light={selectedQualityEmoji === el.value} />
                <p
                  className={`text-[0.7rem] mt-2 text-center  ${
                    el.value === selectedQualityEmoji ? "text-white" : ""
                  }`}
                >
                  {el.emotion}
                </p>
              </div>
            ) : el.emotion === "Bad" ? (
              <div className="">
                <Badmoji light={selectedQualityEmoji === el.value} />
                <p
                  className={`text-[0.7rem] mt-2 text-center  ${
                    el.value === selectedQualityEmoji ? "text-white" : ""
                  }`}
                >
                  {el.emotion}
                </p>
              </div>
            ) : el.emotion === "Good" ? (
              <div className="">
                <GoodEmoji light={selectedQualityEmoji === el.value} />
                <p
                  className={`text-[0.7rem] mt-2 text-center  ${
                    el.value === selectedQualityEmoji ? "text-white" : ""
                  }`}
                >
                  {el.emotion}
                </p>
              </div>
            ) : (
              <div className="">
                <OkayEmoji light={selectedQualityEmoji === el.value} />
                <p
                  className={`text-[0.7rem] mt-2 text-center  ${
                    el.value === selectedQualityEmoji ? "text-white" : ""
                  }`}
                >
                  {el.emotion}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectEmoji;
