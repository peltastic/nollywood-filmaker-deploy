import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import CustomCalender from "@/components/CustomCalender/CustomCalender";
import CustomTime from "../CustomTime/CustomTime";
import {
  useLazyGetSingleConsultantAvailabilityQuery,
  useUpdateReqAndCreateAppointmentMutation,
} from "@/lib/features/users/dashboard/requests/requests";
import { isBefore } from "date-fns";
import moment from "moment";
import UnstyledButton from "../Button/UnstyledButton";
import Spinner from "@/app/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";

type Props = {
  cid: string;
  time: string;
  orderId: string;
  date: string;
  close: () => void;
};

const SetChatDateByUser = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(props.date));
  const [slots, setSlots] = useState<
    | {
        time: string;
        isAvailable: boolean;
      }[]
    | undefined
  >(undefined);
  const [selectedTime, setSelectedTime] = useState<string>(
    moment(props.time === "9:00" ? "09:00" : props.time, ["HH:mm"]).format(
      "h:mm A"
    )
  );

  const [getConsultantHours, result] =
    useLazyGetSingleConsultantAvailabilityQuery();
  const [createAppointment, { isError, isLoading, isSuccess, error }] =
    useUpdateReqAndCreateAppointmentMutation();
  useEffect(() => {
    getConsultantHours({
      date: moment(selectedDate).format("YYYY-MM-DD"),
      id: props.cid,
    });
  }, [selectedDate]);
  useEffect(() => {
    if (result.isError) {
      setSlots(undefined);
    }
    if (result.isSuccess) {
      setSlots(result.data.availableHoursCount);
    }
  }, [result.data, result.isError, result.isSuccess]);
  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      nprogress.complete();
      notify("success", "Chat date updated successfully");
      props.close();
    }
  }, [isError, isSuccess]);
  return (
    <div className="px-10">
      <div className="flex items-center mb-6 mt-4">
        <h1 className="font-semibold text-[1.2rem] md:text-[2rem]">
          Set chat date
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-5">
        <div className="w-[70%]">
          {selectedDate && (
            <CustomCalender
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          )}
        </div>
        <div className="w-[20%]">
          <CustomTime
            time_slots={slots?.map((el) => {
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
          class="ml-auto border border-black-3 rounded-md py-2 px-8 mr-3"
        >
          Cancel
        </UnstyledButton>
        <UnstyledButton
          disabled={!selectedTime || isLoading}
          clicked={() => {
            nprogress.start();
            createAppointment({
              body: {
                date: moment(selectedDate).format("YYYY-MM-DD"),
                orderId: props.orderId,
                time: moment(selectedTime, ["h:mm A"]).format("HH:mm") + ":00",
              },
              cid: props.cid,
            });
          }} 
          class="w-[8rem] flex items-center justify-center bg-black-3 disabled:opacity-50  text-white py-2 px-2 border border-black-3 rounded-md"
        >
          {isLoading ? (
            <div className="py-1 w-[1rem]">
              <Spinner />
            </div>
          ) : (
            <p>Save</p>
          )}
        </UnstyledButton>
      </div>
    </div>
  );
};

export default SetChatDateByUser;
