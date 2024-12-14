import { notify } from "@/utils/notification";
import React, { useState, useEffect } from "react";

type Props = {
  endTime: string;
  openRight?: () => void;
};
const CountdownTimer = (props: Props) => {
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFinalMinutes, setFinalMinutes] = useState<boolean>(false);

  useEffect(() => {
    if (countdownStarted) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(props.endTime).getTime();
        let remainingTime = eventTime - currentTime;
        if (Math.floor((remainingTime / (1000 * 60)) % 60) <= 10 && Math.floor((remainingTime / (1000 * 60 * 60)) % 24) < 1 ) {
          setFinalMinutes(true);
        }

        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
        }

        setTimeRemaining(remainingTime);
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
        setFinalMinutes(false);
        setCountdownStarted(false);
      };
    }
  }, [countdownStarted, props.endTime]);

  useEffect(() => {
    if (props.endTime) {
      handleSetCountdown();
    }
  }, [props.endTime]);

  const handleSetCountdown = () => {
    setCountdownStarted(true);
  };

  const formatTime = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

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
          {hours.toString().padStart(2, "0")}
        </div>
        <p className="mx-6">:</p>
        <div
          className={`${
            isFinalMinutes
              ? "bg-light-red border border-border-red"
              : "bg-admin-chat-bg"
          } w-[4.2rem] h-[4rem] rounded-lg flex items-center justify-center font-semibold`}
        >
          {minutes.toString().padStart(2, "0")}
        </div>
        <p className="mx-6">:</p>
        <div
          className={`${
            isFinalMinutes
              ? "bg-light-red border border-border-red"
              : "bg-admin-chat-bg"
          } w-[4.2rem] h-[4rem] rounded-lg flex items-center justify-center font-semibold`}
        >
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>
    );
  };

  return <>{formatTime(timeRemaining)}</>;
};

export default CountdownTimer;
