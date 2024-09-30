import Image from "next/image";
import React, { useState } from "react";
import CustomCalender from "@/components/CustomCalender/CustomCalender";
import CustomTime from "../CustomTime/CustomTime";
import CancelImg from "/public/assets/cancel.svg";
import UnstyledButton from "../Button/UnstyledButton";
import SuccessTemplate from "../SuccessTemplate/SuccessTemplate";

type Props = {
  open: () => void;
  close: () => void;
};

const SetChatDate = ({ open, close }: Props) => {
  const [successful, setSuccessful] = useState<boolean>(false);

  return (
    <>
      {successful ? (
        <div className="h-[30rem]">
          <SuccessTemplate
            dartBtnFunc={close}
            darkBtnLink={`/user/dashboard`}
            darkButtonContent="Go back"
            lightBtnLink="/"
            lightButtonContent=""
            subTitle="When a killer shark unleashes chaos on a beach community off Cape Cod, it’s up to a local sheriff, a marine biologist."
            titleLight="Chat date saved successfully"
          />
        </div>
      ) : (
        <>
          <div className="flex items-center mb-6 mt-4">
            <h1 className="font-semibold text-[1.2rem] md:text-[2rem]">Choose chat date</h1>
            <div
              onClick={close}
              className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
            >
              <Image src={CancelImg} alt="cancel-img" />
            </div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-5">
            <CustomCalender value={new Date()} onChange={() => {}} />
            <CustomTime />
          </div>
          <div className="my-8 flex items-center font-medium text-[0.88rem] px-6">
            <UnstyledButton
              clicked={open}
              class="ml-auto border border-black-3 rounded-md py-2 px-2 mr-3"
            >
              Cancel
            </UnstyledButton>
            <UnstyledButton
              clicked={() => setSuccessful(true)}
              class="bg-black-3 text-white py-2 px-2 border border-black-3 rounded-md"
            >
              Save selection
            </UnstyledButton>
          </div>
        </>
      )}
    </>
  );
};

export default SetChatDate;
