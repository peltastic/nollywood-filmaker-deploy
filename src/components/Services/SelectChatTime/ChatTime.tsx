import React from "react";
import CustomCalender from "@/components/CustomCalender/CustomCalender";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import CustomTime from "@/components/CustomTime/CustomTime";

type Props = {
  setDateProps: (val: Date) => void;
  dateProps: Date;
  setPageProps: (val: string) => void;
  serviceSelection?: boolean;
  selectedTime: string;
  setSelected?: (value: string) => void;
};

const ChatTime = (props: Props) => {
  const router = useRouter();
  return (
    <div className="">
      <h1 className="font-bold text-[1.5rem]">Let’s start with your details</h1>
      <h2 className="text-[1.13rem]">
        Lorem ipsum dolor sit amet consectetur adipisc.
      </h2>
      <div className="flex flex-wrap xl:flex-nowrap gap-x-4 mt-10">
        <CustomCalender value={props.dateProps} onChange={props.setDateProps} />
        <CustomTime
          setSelected={props.setSelected}
          selectedTime={props.selectedTime}
          serviceSelection={props.serviceSelection}
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
          // disabled={disabled}
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
