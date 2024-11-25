import { Modal } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { BsFillStopwatchFill } from "react-icons/bs";
import ModalComponent from "../Modal/Modal";
import { useDisclosure, useInterval } from "@mantine/hooks";
import RateYourExperience from "./ModalComponents/RateYourExperience";
import {
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
} from "date-fns";
import momentTz from "moment-timezone";
import { notify } from "@/utils/notification";
import { convertToAfricaLagosTz } from "@/utils/helperFunction";

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
type Props = {
  isTime?: boolean;
  timeData?: {
    startTime: string;
    endTime: string;
  };
  openRight?: () => void;
};

const ChatTimer = (props: Props) => {
  const [opened, { open, close }] = useDisclosure();
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [minutes, setMinutes] = useState(0);
  const interval = useInterval(() => {
    if (
      props.timeData &&
      differenceInMinutes(
        convertToAfricaLagosTz(props.timeData.endTime),
        momentTz(new Date()).tz("Africa/Lagos").format()
      ) <= 30
    ) {
      props.openRight && props.openRight();
      notify("error", "", "time is almost up");
      setShowCountdown(true);
      interval.stop();
      console.log("llsks");
    }
  }, 1000);

  useEffect(() => {
    if (props.isTime) {
      interval.start();
    } else {
      setShowCountdown(false);
    }
    return interval.stop;
  }, [props.isTime, props.timeData]);

  useEffect(() => {
    console.log(
      differenceInMinutes(
        convertToAfricaLagosTz(props.timeData!.endTime),
        momentTz(new Date()).tz("Africa/Lagos").format()
      )
    );
  }, []);

  return (
    <>
      <ModalComponent
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="xl"
      >
        <RateYourExperience close={close} />
      </ModalComponent>
      <div className="px-4 border-b border-b-stroke-8 pt-3 pb-6">
        <div className="flex items-center py-6">
          <h1 className=" text-[0.88rem] font-semibold mr-2">
            Conversation Timer
          </h1>
          <div className="">
            <BsFillStopwatchFill className="text-xl" />
          </div>
        </div>
        {showCountdown ? (
          <Countdown
            date={
              props.timeData
                ? Date.now() +
                  differenceInMilliseconds(
                    convertToAfricaLagosTz(props.timeData.endTime),
                    momentTz(new Date()).tz("Africa/Lagos").format()
                  )
                : 0
            }
            renderer={timerRenderer}
          />
        ) : null}
      </div>
    </>
  );
};

export default ChatTimer;
