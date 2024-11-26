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
import CountdownTimer from "../Timer/CountdownTimer";

type Props = {
  isTime?: boolean;
  sessionOver?: boolean;
  timeData?: {
    startTime: string;
    endTime: string;
  };
  openRight?: () => void;
  type?: "user" | "consultant" | "admin";
  opened?: boolean;
};

const ChatTimer = (props: Props) => {
  const [opened, { open, close }] = useDisclosure();

  const [endTime, setEndTime] = useState<number>(0);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const interval = useInterval(() => {
    if (
      props.timeData &&
      differenceInMinutes(
        // convertToAfricaLagosTz(props.timeData.endTime),
        props.timeData.endTime,
        momentTz(new Date()).tz("Africa/Lagos").format()
      ) <= 10
    ) {
      setShowTimer(true);
      props.openRight && props.openRight();
      notify("error", "", "time is almost up");
      // if (!props.sessionOver) {
      // }
      interval.stop();
    }
  }, 1000);

  useEffect(() => {
    if (props.sessionOver) {
      return () => {};
    }
    if (props.type === "consultant") {
      return () => {}
    }
    if (
      props.isTime &&
      props.timeData &&
      differenceInMinutes(
        // convertToAfricaLagosTz(props.timeData.endTime),
        props.timeData.endTime,
        momentTz(new Date()).tz("Africa/Lagos").format()
      ) <= 10
    ) {
      if (!showTimer) {
        setShowTimer(true);
        if (!opened) {
          notify("error", "", "time is almost up");
          props.openRight && props.openRight();
        }
      }
      return () => {};
    }

    if (props.isTime) {
      setShowTimer(false)
      interval.start();
    }

    return interval.stop;
  }, [props.timeData]);
  useEffect(() => {
    if (props.type === "user") {
      setShowTimer(false);
    }
  }, [props.type]);

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
      {props.timeData && props.isTime && showTimer && (
        <div className="px-4 border-b border-b-stroke-8 pt-3 pb-6">
          <div className="flex items-center py-6">
            <h1 className=" text-[0.88rem] font-semibold mr-2">
              Conversation Timer
            </h1>
            <div className="">
              <BsFillStopwatchFill className="text-xl" />
            </div>
          </div>

          <CountdownTimer endTime={props.timeData.endTime} />
        </div>
      )}
    </>
  );
};

export default ChatTimer;

// const timerRenderer = ({
//   hours,
//   minutes,
//   seconds,
//   completed,
// }: CountdownRenderProps) => {
//   const isFinalMinutes = minutes <= 10;
//   return (
//     <div
//       className={`flex items-center text-[2rem] ${
//         isFinalMinutes ? "text-dark-red" : "text-black-3"
//       } font-semibold`}
//     >
//       <div
//         className={`${
//           isFinalMinutes
//             ? " bg-light-red border border-border-red"
//             : "bg-admin-chat-bg"
//         }  w-[4.2rem] h-[4rem] rounded-lg flex items-center justify-center `}
//       >
//         <p>{hours < 10 ? "0" + hours : hours}</p>
//       </div>
//       <p className="mx-6">:</p>
//       <p
//         className={`${
//           isFinalMinutes
//             ? "bg-light-red border border-border-red"
//             : "bg-admin-chat-bg"
//         } w-[4.2rem] h-[4rem] rounded-lg flex items-center justify-center font-semibold`}
//       >
//         {minutes < 10 ? "0" + minutes : minutes}
//       </p>
//       <p className="mx-6">:</p>
//       <p
//         className={`${
//           isFinalMinutes
//             ? "bg-light-red border border-border-red"
//             : "bg-admin-chat-bg"
//         } w-[4.2rem] h-[4rem] rounded-lg flex items-center justify-center font-semibold`}
//       >
//         {seconds < 10 ? "0" + seconds : seconds}
//       </p>
//     </div>
//   );
// };
