import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomCalender from "@/components/CustomCalender/CustomCalender";
import CustomTime from "../CustomTime/CustomTime";
import CancelImg from "/public/assets/cancel.svg";
import UnstyledButton from "../Button/UnstyledButton";
import SuccessTemplate from "../SuccessTemplate/SuccessTemplate";
import { useChangeServiceToChatMutation } from "@/lib/features/consultants/dashboard/resolve";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import Spinner from "@/app/Spinner/Spinner";
import { useLazyGetSingleConsultantAvailabilityQuery } from "@/lib/features/consultants/dashboard/request";
import { isBefore } from "date-fns";

type Props = {
  close: () => void;
  data: {
    chat_title: string;
    expertise: string;
    nameofservice:
      | "Chat With A Professional"
      | "Read my Script and advice"
      | "Watch the Final cut of my film and advice"
      | "Look at my Budget and advice"
      | "Create a Marketing budget"
      | "Create a Pitch based on my Script"
      | "Draft Legal documents"
      | "Create a Production budget";
    summary?: string;
    userId: string;
    consultant_id?: string;
    orderId: string;
  };
};

const slots = [
  {
    time: "09:00 AM",
    isAvailable: true,
  },
  {
    time: "11:00 AM",
    isAvailable: true,
  },
  {
    time: "01:00PM",
    isAvailable: true,
  },
  {
    time: "03:00 PM",

    isAvailable: true,
  },
  {
    time: "05:00 PM",
    isAvailable: true,
  },
  {
    time: "07:00 PM",
    isAvailable: true,
  },
  {
    time: "09:00 PM",
    isAvailable: true,
  },
  {
    time: "11:00 PM",
    isAvailable: false,
  },
];

const SetChatDate = ({ close, data }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [serviceToChat, { isError, isSuccess, isLoading, error }] =
    useChangeServiceToChatMutation();

  const [getConsultantHours, result] =
    useLazyGetSingleConsultantAvailabilityQuery();
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      nprogress.complete();
      notify("success", "Chat date set successfully");
      close();
    }
  }, [isError, isSuccess]);
  useEffect(() => {
    if (data.consultant_id) {
      getConsultantHours({
        date: moment(selectedDate).format("YYYY-MM-DD"),
        id: data.consultant_id,
      });
    } else {
      if (consultantId) {
        getConsultantHours({
          date: moment(selectedDate).format("YYYY-MM-DD"),
          id: consultantId,
        });
      }
    }
  }, [data.consultant_id, selectedDate]);
  return (
    <>
      <div className="flex items-center mb-6 mt-4">
        <h1 className="font-semibold text-[1.2rem] md:text-[2rem]">
          Choose chat date
        </h1>
        <div
          onClick={close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-5">
        <div className="w-[70%]">
          <CustomCalender
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </div>
        <div className="w-[20%]">
          <CustomTime
            time_slots={result.data?.availableHoursCount.map((el) => {
              const isBeforeNow = isBefore(
                `${moment(selectedDate).format("YYYY-MM-DD")}T${
                  el.time === "9:00" ? "09:00" : el.time
                }:00+01:00`,
                new Date()
              );
              return {
                time: moment(el.time, ["HH:mm"]).format("h:mm A"),
                isAvailable: isBeforeNow ? false : el.isAvailable,
              };
            })}
            selectedTime={selectedTime}
            setSelected={(val) => setSelectedTime(val)}
            isFetching={result.isFetching}
          />
        </div>
      </div>
      <div className="my-8 flex items-center font-medium text-[0.88rem] px-6">
        <UnstyledButton
          clicked={close}
          class="ml-auto border border-black-3 rounded-md py-2 px-2 mr-3"
        >
          Cancel
        </UnstyledButton>
        <UnstyledButton
          disabled={isLoading || !selectedTime}
          clicked={() => {
            if (data && data.nameofservice) {
              nprogress.start();
              serviceToChat({
                chat_title: data.chat_title,
                cid: consultantId!,
                consultant: data.expertise,
                date: moment(selectedDate).format("YYYY-MM-DD"),
                time: `${moment(selectedDate).format("YYYY-MM-DD")}T${moment(
                  selectedTime,
                  ["h:mm A"]
                ).format("HH:mm")}:00+01:00`,
                originalOrderId: data.orderId,
                summary: data.summary || "",
                title: data.nameofservice,
                type: "Chat",
                userId: data.userId,
              });
            }
          }}
          class="w-[8rem] flex items-center justify-center bg-black-3 disabled:opacity-50  text-white py-2 px-2 border border-black-3 rounded-md"
        >
          {isLoading ? (
            <div className="py-1 w-[1rem]">
              <Spinner />
            </div>
          ) : (
            <p>Set Date</p>
          )}
        </UnstyledButton>
      </div>
    </>
  );
};

export default SetChatDate;
