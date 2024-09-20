import React, { useState } from "react";
import CardPaymentForm from "./Forms/CardPaymentForm";
import InputComponent from "@/components/Input/Input";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { useRouter } from "next/navigation";

type Props = {
  successRoute: string;
};

const CardPayment = (props: Props) => {
  const router = useRouter();
  const [isPinForm, setIsPinForm] = useState<boolean>(false);

  return (
    <div>
      {isPinForm ? (
        <div className="pr-10">
          <p className="text-black-3 text-[1.13rem] mt-10">
            Enter your 4-digit card pin to confirm this payment
          </p>
          <div className="grid grid-cols-4 gap-5 mt-8">
            <InputComponent
              changed={() => {}}
              className="h-[4.7rem] text-center text-[1.5rem] border-unchecked-gray w-full"
              placeholder=""
              type=""
            />
            <InputComponent
              changed={() => {}}
              className="h-[4.7rem] text-center text-[1.5rem] border-unchecked-gray w-full"
              placeholder=""
              type=""
            />
            <InputComponent
              changed={() => {}}
              className="h-[4.7rem] text-center text-[1.5rem] border-unchecked-gray w-full"
              placeholder=""
              type=""
            />
            <InputComponent
              changed={() => {}}
              className="h-[4.7rem] text-center text-[1.5rem] border-unchecked-gray w-full"
              placeholder=""
              type=""
            />
          </div>
          <UnstyledButton
            clicked={() => router.push(props.successRoute)}
            type="submit"
            class="bg-black-2 disabled:bg-gray-2 bg- w-full py-3 text-[1.13rem] font-bold rounded-sm mt-12 text-white"
          >
            Confirm Payment
          </UnstyledButton>
          <p className="text-unchecked-gray text-[0.88rem]  mt-8">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </p>
          <UnstyledButton
            type="button"
            clicked={() => setIsPinForm(false)}
            class="rounded-md px-4 transition-all py-2 text-[0.88rem] font-medium mt-16 hover:bg-gray-bg-1 border-stroke-2 border"
          >
            Back
          </UnstyledButton>
        </div>
      ) : (
        <CardPaymentForm showPinForm={() => setIsPinForm(true)} />
      )}
    </div>
  );
};

export default CardPayment;
