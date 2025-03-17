import React, { useEffect } from "react";
import CustomCalender from "@/components/CustomCalender/CustomCalender";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { FaArrowRight } from "react-icons/fa";
import CustomTime from "@/components/CustomTime/CustomTime";
import { useLazyGetAvailabilityHoursQuery } from "@/lib/features/users/services/chat/chat";
import moment from "moment";
import { addDays, addHours, isBefore, setHours } from "date-fns";

type Props = {
  setDateProps: (val: Date) => void;
  dateProps: Date;
  setPageProps: (val: string) => void;
  serviceSelection?: boolean;
  selectedTime: string;
  setSelected?: (value: string) => void;
  consultantType?: string;
};

const ChatTime = (props: Props) => {
  const [getAvailableHours, { data, isFetching }] =
    useLazyGetAvailabilityHoursQuery();

  useEffect(() => {
    if (props.consultantType) {
      getAvailableHours({
        date: moment(new Date()).format("YYYY-MM-DD"),
        expertise: props.consultantType,
      });
    }
  }, []);
  return (
    <div className="">
      <h1 className="font-bold text-[1.5rem]">Let’s start with your details</h1>
      <h2 className="text-[1.13rem]">
        Please select a date and time for your chat appointment.
      </h2>
      <div className="flex flex-wrap xl:flex-nowrap gap-x-4 mt-10">
        <CustomCalender
          value={props.dateProps}
          onChange={(date) => {
            if (props.consultantType) {
              getAvailableHours({
                date: moment(date).format("YYYY-MM-DD"),
                expertise: props.consultantType,
              });
            }
            props.setDateProps(date);
          }}
        />
        <CustomTime
          setSelected={props.setSelected}
          selectedTime={props.selectedTime}
          serviceSelection={props.serviceSelection}
          isFetching={isFetching}
          time_slots={data?.availableHoursCount.map((el) => {
            const time_stamp = `${moment(props.dateProps).format(
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
            return {
              time: moment(el.time, ["HH:mm"]).format("h:mm A"),
              isAvailable:
              isBeforeNextDaySixAM
                  ? false
                  : el.isAvailable,
            };
          })}
        />
      </div>
      <div className="w-full flex mt-20 mb-14">
        <UnstyledButton
          type="button"
          clicked={() => props.setPageProps("1")}
          class="rounded-md px-4 transition-all hover:bg-gray-bg-1 border-stroke-2 border"
        >
          Back
        </UnstyledButton>
        <UnstyledButton
          clicked={() => props.setPageProps("3")}
          type="submit"
          disabled={!props.selectedTime}
          class="flex py-2 px-4 hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
        >
          <p className="mr-2">Next</p>
          <FaArrowRight className="text-[0.7rem]" />
        </UnstyledButton>
      </div>
    </div>
  );
};

export default ChatTime;
