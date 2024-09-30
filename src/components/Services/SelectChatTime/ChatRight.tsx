import React, { useState } from "react";
import CustomCalender from "@/components/CustomCalender/CustomCalender";
import UnstyledButton from "../../Button/UnstyledButton";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  setDateProps: (val: Date) => void;
  dateProps: Date;
  setPageProps: (val: string) => void;
  proceed: () => void
};

const ChatRight = (props: Props) => {
  const router = useRouter();

  return (
    <div className="">
      <h1 className="font-bold text-[1.5rem]">Let’s start with your details</h1>
      <h2 className="text-[1.13rem]">
        Lorem ipsum dolor sit amet consectetur adipisc.
      </h2>
      <div className="  mt-10">
        <CustomCalender value={props.dateProps} onChange={props.setDateProps} />
      </div>
      <div className="w-full flex mt-14 mb-14">
        <UnstyledButton
          type="button"
          clicked={() => props.setPageProps("2")}
          class="rounded-md px-4 transition-all hover:bg-gray-bg-1 border-stroke-2 border"
        >
          Back
        </UnstyledButton>
        <UnstyledButton
          clicked={() => props.proceed() }
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

export default ChatRight;
