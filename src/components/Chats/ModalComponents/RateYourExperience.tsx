import React, { useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import SelectEmoji, { IEmojiData } from "./SelectEmoji";
import TextArea from "@/components/TextArea/TextArea";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import UnstyledButton from "@/components/Button/UnstyledButton";

type Props = {
  close: () => void;
};

const RateYourExperience = (props: Props) => {
  const quality: IEmojiData[] = [
    {
      emotion: "Terrible",
      value: "1",
    },
    {
      emotion: "Bad",
      value: "2",
    },
    {
      emotion: "Okay",
      value: "3",
    },
    {
      emotion: "Good",
      value: "4",
    },
    {
      emotion: "Amazing",
      value: "5",
    },
  ];

  return (
    <section className="px-6">
      <div className="flex">
        <h1 className="font-semibold text-[2rem]">Rate your experience</h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="mt-4">
        <SelectEmoji
          data={quality}
          title="How do you feel about the quality of our delivery?"
        />
      </div>
      <div className="mt-4">
        <SelectEmoji
          data={quality}
          title="How do you feel about the speed of our delivery?"
        />
      </div>
      <div className="">
        <h1 className="font-medium text-[0.88rem] text-black-2 my-6">
          What are the main reasons for your rating?
        </h1>
        <textarea
          className="outline-none border border-stroke-2 rounded-md w-full py-4 px-4"
          placeholder="Text"
        ></textarea>
      </div>
      <div className="my-4">
        <CheckboxComponent
          color="#181818"
          label={
            <p className="font-medium text-[0.88rem] text-black-5">
              I may be contacted about this feedback. Privacy policy
            </p>
          }
        />
      </div>
      <div className="my-8 flex">
        <UnstyledButton
          clicked={() => {}}
          class="ml-auto py-2 px-4 transition-all rounded-md items-center text-white  bg-black-3 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
        >
          <p>Submit my feedback</p>
        </UnstyledButton>
      </div>
    </section>
  );
};

export default RateYourExperience;
