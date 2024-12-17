import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import SelectEmoji, { IEmojiData } from "./SelectEmoji";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { useSendFeedbackMutation } from "@/lib/features/users/dashboard/chat/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";

type Props = {
  close: () => void;
  orderId: string;
};

const RateYourExperience = (props: Props) => {
  const [sendFeedback, { isError, isSuccess, data, error, isLoading }] =
    useSendFeedbackMutation();
  const [checked, setChecked] = useState<boolean>(false);
  const [ratingData, setRatingData] = useState<{
    quality: string;
    speed: string;
  }>({
    quality: "",
    speed: "",
  });
  const [reason, setReason] = useState<string>("");
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      notify("success", "You feedback has been saved");
      nprogress.complete();
      props.close();
    }
  }, [isError, isSuccess]);

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

  const updateRatingHandler = (key: string, val: string) => {
    setRatingData((prev) => {
      return {
        ...prev,
        [key]: val,
      };
    });
  };

  const sendFeedbackHandler = () => {
    if (userId) {
      nprogress.start();
      sendFeedback({
        orderId: props.orderId,
        quality: Number(ratingData.quality),
        reason,
        speed: Number(ratingData.speed),
        userId,
      });
    }
  };

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
          setEmojiProps={(val) => updateRatingHandler("quality", val)}
          data={quality}
          title="How do you feel about the quality of our delivery?"
        />
      </div>
      <div className="mt-4">
        <SelectEmoji
          setEmojiProps={(val) => updateRatingHandler("speed", val)}
          data={quality}
          title="How do you feel about the speed of our delivery?"
        />
      </div>
      <div className="">
        <h1 className="font-medium text-[0.88rem] text-black-2 my-6">
          What are the main reasons for your rating?
        </h1>
        <textarea
          onChange={(e) => setReason(e.target.value)}
          value={reason}
          className="outline-none border border-stroke-2 rounded-md w-full py-4 px-4"
          placeholder="Text"
        ></textarea>
      </div>
      <div className="my-4">
        <CheckboxComponent
          checked={checked}
          setCheckedProps={(val) => setChecked(val)}
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
          disabled={
            !ratingData.quality || !ratingData.speed || !checked || isLoading
          }
          clicked={sendFeedbackHandler}
          class="w-[13rem] flex justify-center ml-auto py-2 px-4 transition-all rounded-md items-center text-white  bg-black-3 disabled:opacity-50 text-[0.88rem] "
        >
          {isLoading ? (
            <div className="py-1 w-[1rem]">
              <Spinner />
            </div>
          ) : (
            <p>Submit my feedback</p>
          )}
        </UnstyledButton>
      </div>
    </section>
  );
};

export default RateYourExperience;
