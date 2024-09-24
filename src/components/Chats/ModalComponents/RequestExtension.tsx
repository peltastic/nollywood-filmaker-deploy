import React, { useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import { MdInfoOutline } from "react-icons/md";
import UnstyledButton from "@/components/Button/UnstyledButton";
import CaptionSelect from "@/components/Select/CaptionSelect";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";

type Props = {
  close: () => void;
};

const extension_data = [
  {
    value: "1",
    label: "40 minutes",
    caption: "₦25,000",
  },
  {
    value: "2",
    label: "45 minutes",
    caption: "₦35,000",
  },
  {
    value: "3",
    label: "1 hour",
    caption: "₦50,000",
  },
];

const RequestExtension = (props: Props) => {
  const [showPaymentWindow, setShowPaymentWindow] = useState<boolean>(false);
  return (
    <section className="px-6">
      <div className="flex">
        <h1 className="font-semibold text-[2rem]">
          {showPaymentWindow ? "Payment" :"Request an extension" }
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      {showPaymentWindow ? (
        <PaymentWindow successRoute="" modalInfoStyle  noCoupon modal nextFunction={props.close} />
      ) : (
        <section>
          <div className="flex mt-6 items-start bg-gray-bg-7 border py-4 rounded-md px-4 border-border-gray">
            <MdInfoOutline className="text-[#14213D] mr-4 text-xl mt-1" />
            <div className="text-black-7 text-[0.88rem]">
              <p>• Choose your preferred extension length</p>
              <p>• Proceed to payment</p>
              <p>• Resume your conversation</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-black-3 text-[0.88rem]">
              Choose extension length
            </h2>
            <div className="w-full relative mt-3">
              <CaptionSelect changed={(e) => {}} data={extension_data} />
            </div>
            {/* <RadixSelect changed={() => {}} data={extension_data} /> */}
            <div className="w-full flex mt-[10rem]">
              <UnstyledButton
                clicked={props.close}
                class="rounded-md px-4 border-stroke-2 border ml-auto mr-4"
              >
                Cancel
              </UnstyledButton>
              <UnstyledButton
                clicked={() => setShowPaymentWindow(true)}
                class="flex py-2 px-4 transition-all rounded-md items-center text-white  bg-black-3 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
              >
                <p>Proceed to payment</p>
              </UnstyledButton>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default RequestExtension;
