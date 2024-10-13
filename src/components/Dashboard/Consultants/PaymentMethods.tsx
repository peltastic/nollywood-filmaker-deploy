import Image from "next/image";
import React, { useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import DirectDeposit from "/public/assets/dashboard/direct-deposit.png";
import PayPalImg from "/public/assets/dashboard/paypal.png";
import StripeImg from "/public/assets/dashboard/stripe.png";
import UnstyledButton from "@/components/Button/UnstyledButton";
import PaymentMethodDetails from "./PaymentMethodDetails";

type Props = {
  close: () => void;
};

const paymentMethods: {
  image: StaticImport;
  name: string;
  other: string;
  value: string;
}[] = [
  {
    image: DirectDeposit,
    name: "Direct Deposit",
    other: "United States",
    value: "1",
  },
  {
    image: PayPalImg,
    name: "Paypal",
    other: "Wells Fargo Bank",
    value: "2",
  },
  {
    image: StripeImg,
    name: "Stripe",
    other: "152635763788",
    value: "3",
  },
];

const PaymentMethods = (props: Props) => {
  const [paymentDetails, setPaymentDetails] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  return (
    <section className="py-6 px-2 sm:px-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Payment Methods
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="">
        <h1 className="text-[1.38rem] font-semibold mt-8 mb-5">
          Set up a new payout method
        </h1>
        {paymentDetails ? (
          <PaymentMethodDetails />
        ) : (
          <div className="">
            {paymentMethods.map((el) => (
              <div
                onClick={() => setSelected(el.value)}
                className={`flex items-center rounded-md cursor-pointer ${
                  el.value === selected ? "border-black" : "border-border-gray"
                } border transition-all py-4 px-4 mb-5`}
                key={el.value}
              >
                <Image src={el.image} alt={el.name} className=" mr-8" />
                <div className="">
                  <h4 className="text-black-4 font-medium text-[0.88rem]">
                    {el.name}
                  </h4>
                  <p className="text-gray-1 text-[0.88rem]">{el.other}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="w-full flex font-medium text-[0.88rem]  flex-wrap mt-[3rem]">
          <UnstyledButton
            clicked={() => {
              if (paymentDetails) {
                return setPaymentDetails(false)
              }
              props.close();
            }}
            class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
          >
            Cancel
          </UnstyledButton>
          <UnstyledButton
            clicked={() => setPaymentDetails(true)}
            class="flex py-2 px-4 transition-all rounded-md w-full xs:w-auto justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
          >
            <p>{paymentDetails ? "Connect" : "Proceed"}</p>
          </UnstyledButton>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
