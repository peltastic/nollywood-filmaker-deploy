import React, { useEffect } from "react";
import CustomCalender from "@/components/CustomCalender/CustomCalender";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { FaArrowRight } from "react-icons/fa";
import CustomTime from "@/components/CustomTime/CustomTime";
import { useLazyGetAvailabilityHoursQuery } from "@/lib/features/users/services/chat/chat";
import moment from "moment";

type Props = {
  setDateProps: (val: Date) => void;
  dateProps: Date;
  setPageProps: (val: string) => void;
  serviceSelection?: boolean;
  selectedTime: string;
  setSelected?: (value: string) => void;
  consultantType?: string;
};

const times = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const ChatTime = (props: Props) => {
  const [getAvailableHours, { data, isFetching }] =
    useLazyGetAvailabilityHoursQuery();

  // console.log(moment("9:00", ["HH:mm"]).format("h:mm A"))

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
        Lorem ipsum dolor sit amet consectetur adipisc.
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
          time_slots={data?.availableHoursCount.map((el) =>
            moment(el.time, ["HH:mm"]).format("h:mm A")
          )}
        />
      </div>
      <div className="w-full flex mt-14 mb-14">
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
