import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import CustomCalender from "@/components/CustomCalender/CustomCalender";
import CustomTime from "../CustomTime/CustomTime";
import {
  useLazyGetSingleConsultantAvailabilityQuery,
  useUpdateReqAndCreateAppointmentMutation,
} from "@/lib/features/users/dashboard/requests/requests";
import { addDays, addHours, isBefore, setHours } from "date-fns";
import moment from "moment";
import UnstyledButton from "../Button/UnstyledButton";
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { initializeTransactionListener } from "@/lib/socket";
import ServiceInfo from "../ServiceInfo/ServiceInfo";

type Props = {
  cid: string;
  time?: string;
  title?: string;
  extend?: boolean;
  orderId: string;
  date: string;
  close: () => void;
  refetch: () => void;
  continueChat?: (data: { date: string; orderId: string }) => void;
  isLoading?: boolean;
};

const SetChatDateByUser = (props: Props) => {
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [slots, setSlots] = useState<
    | {
        time: string;
        isAvailable: boolean;
      }[]
    | undefined
  >(undefined);
  const [selectedTime, setSelectedTime] = useState<string>(
    props.time
      ? moment(props.time === "9:00" ? "09:00" : props.time, ["HH:mm"]).format(
          "h:mm A"
        )
      : ""
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
      props.refetch();
      props.close();
    }
  }, [isError, isSuccess]);
  return (
    <div className="px-10">
      <div className="flex items-center mb-6 mt-4">
        <h1 className="font-semibold text-[1.1rem] md:text-[1.5rem]">
          Set chat date {props.extend ? `for ${props.title} extension` : null}
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <ServiceInfo activeColor content="Time slots are in West African Time (WAT)" />
      <div className="flex flex-wrap md:flex-nowrap gap-5 mt-6">
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
              const time_stamp = `${moment(selectedDate).format(
                "YYYY-MM-DD"
              )}T${
                el.time === "9:00"
                  ? "09:00"
                  : el.time === "8:00"
                  ? "08:00"
                  : el.time === "7:00"
                  ? "07:00"
                  : el.time === "6:00"
                  ? "06:00"
                  : el.time
              }:00+01:00`;
              const nextDaySixAM = setHours(addDays(new Date(), 1), 5);
              const isBeforeNextDaySixAM = isBefore(time_stamp, nextDaySixAM);
              const hourfromNow = addHours(new Date(), 24);
              // const isBeforeNow = isBefore(time_stamp, new Date());
              // const isBeforeHourFromNow = isBefore(time_stamp, hourfromNow);
              // const isBeforeNow = isBefore(
              //   `${moment(selectedDate).format("YYYY-MM-DD")}T${
              //     el.time === "9:00" ? "09:00" : el.time
              //   }:00+01:00`,
              //   new Date()
              // );
              return {
                time: moment(el.time, ["HH:mm"]).format("h:mm A"),
                isAvailable: isBeforeNextDaySixAM ? false : el.isAvailable,
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
          clicked={props.close}
          class="ml-auto border border-black-3 rounded-md py-2 px-8 mr-3"
        >
          Cancel
        </UnstyledButton>
        <UnstyledButton
          disabled={!selectedTime || isLoading || props.isLoading}
          clicked={() => {
            if (props.extend) {
              props.continueChat &&
                props.continueChat({
                  date: `${moment(selectedDate).format("YYYY-MM-DD")}T${
                    moment(selectedTime, ["h:mm A"]).format("HH:mm") + ":00"
                  }+01:00`,
                  orderId: props.orderId,
                });
              nprogress.start();
              if (userId) {
                initializeTransactionListener(userId);
              }
            } else {
              createAppointment({
                body: {
                  date: moment(selectedDate).format("YYYY-MM-DD"),
                  orderId: props.orderId,
                  time:
                    moment(selectedTime, ["h:mm A"]).format("HH:mm") + ":00",
                },
                cid: props.cid,
              });
            }
          }}
          class="w-[8rem] flex items-center justify-center bg-black-3 disabled:opacity-50  text-white py-2 px-2 border border-black-3 rounded-md"
        >
          {isLoading || props.isLoading ? (
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
