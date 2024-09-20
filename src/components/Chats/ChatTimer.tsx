import Image from "next/image";
import React from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { BsFillStopwatchFill } from "react-icons/bs";

type Props = {};

const timerRenderer = ({
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  const isFinalMinutes = minutes <= 10;
  return (
    <div
      className={`flex items-center text-[2rem] ${
        isFinalMinutes ? "text-dark-red" : "text-black-3"
      } font-semibold`}
    >
      <div
        className={`${
          isFinalMinutes
            ? " bg-light-red border border-border-red"
            : "bg-admin-chat-bg"
        }  w-[4.2rem] h-[4rem] rounded-lg flex items-center justify-center `}
      >
        <p>{hours < 10 ? "0" + hours : hours}</p>
      </div>
      <p className="mx-6">:</p>
      <p
        className={`${
          isFinalMinutes
            ? "bg-light-red border border-border-red"
            : "bg-admin-chat-bg"
        } w-[4.2rem] h-[4rem] rounded-lg flex items-center justify-center font-semibold`}
      >
        {minutes < 10 ? "0" + minutes : minutes}
      </p>
      <p className="mx-6">:</p>
      <p
        className={`${
          isFinalMinutes
            ? "bg-light-red border border-border-red"
            : "bg-admin-chat-bg"
        } w-[4.2rem] h-[4rem] rounded-lg flex items-center justify-center font-semibold`}
      >
        {seconds < 10 ? "0" + seconds : seconds}
      </p>
    </div>
  );
};

const ChatTimer = (props: Props) => {
  return (
    <div className="px-4 border-b border-b-stroke-8 pt-3 pb-6">
      <div className="flex items-center py-6">
        <h1 className=" text-[0.88rem] font-semibold mr-2">
          Conversation Timer
        </h1>
        <div className="">
          <BsFillStopwatchFill className="text-xl" />
        </div>
      </div>
      <Countdown date={Date.now() + 3600000} renderer={timerRenderer} />
    </div>
  );
};

export default ChatTimer;
