import React, { useState } from "react";
import RadioGroupComponent from "../Radio/RadioGroup";
import { paymentOptions } from "@/utils/constants/constants";
import CardPayment from "./PaymentTypes/CardPayment";
import BankPayment from "./PaymentTypes/BankPayment";
import TransferPayment from "./PaymentTypes/TransferPayment";

type Props = {
  successRoute: string;
};

const PaymentWindow = (props: Props) => {
  const [paymentType, setPaymentType] = useState<string>("card");
  return (
    <div className="w-full">
      <h1 className="font-bold text-[1.5rem]">Payment</h1>
      <h2 className="text-[1.13rem]">
        Lorem ipsum dolor sit amet consectetur adipisc.
      </h2>
      <div className="mt-14">
        <h3 className="text-black-2 text-[1.13rem] font-semibold mb-4">
          Pay With:
        </h3>
        <RadioGroupComponent
          changed={(val) => setPaymentType(val)}
          data={paymentOptions}
          value={paymentType}
        />
      </div>
      <div className="mt-10">
        {paymentType === "card" && (
          <CardPayment successRoute={props.successRoute} />
        )}
        {paymentType === "bank" && (
          <BankPayment successRoute={props.successRoute} />
        )}
        {paymentType === "transfer" && (
          <TransferPayment successRoute={props.successRoute} />
        )}
      </div>
    </div>
  );
};

export default PaymentWindow;
