import UnstyledButton from "@/components/Button/UnstyledButton";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  successRoute: string;
  nextFunction?: () => void;
  noCoupon?: boolean;
  modalInfoStyle?: boolean
};

const BankPayment = (props: Props) => {
  const router = useRouter();
  const [showAccNoInput, setShowAccNoInput] = useState<boolean>(false);

  return (
    <div className="w-[95%] mt-10">
      <SelectComponent
        data={[
          {
            label: "Access Bank",
            value: "Access Bank",
          },
        ]}
        label="Choose Your Bank"
        rounded="md"
        size="md"
        placeholder="Select"
        setValueProps={() => {
          setShowAccNoInput(true);
        }}
      />
      {showAccNoInput ? (
        <div className="mt-10">
          <InputComponent
            changed={() => {}}
            label="Enter Your Bank Account Number"
            className="w-full py-2 px-4"
            placeholder=""
            type=""
          />
        </div>
      ) : null}
      <div className="">
        {props.noCoupon ? null : (
          <div className="mt-10">
            <label className="text-black-2 font-medium text-sm block mb-2">
              Apply coupon code
            </label>
            <div className="flex">
              <InputComponent
                className="rounded-se-none rounded-ee-none w-full px-4 py-2 text-input-text-color"
                changed={() => {}}
                placeholder=""
                type=""
              />
              <UnstyledButton
                type="button"
                class="font-medium border border-l-0 border-gray-2 rounded-se-md rounded-ee-md text-[0.88rem] px-4"
              >
                Apply
              </UnstyledButton>
            </div>
          </div>
        )}
        <UnstyledButton
          clicked={() => {
            if (props.successRoute) {
              return router.push(props.successRoute);
            }
            props.nextFunction && props.nextFunction();
          }}
          // disabled={!(isValid && dirty)}
          type="submit"
          class="bg-black-2 disabled:bg-gray-2 w-full py-3 text-[1.13rem] font-bold rounded-sm mt-12 text-white"
        >
          Pay ₦100,000
        </UnstyledButton>
        <p className={`${props.modalInfoStyle ? "bg-stroke-4 text-black-3 border border-black-3 py-2 px-4 rounded-md" : "text-unchecked-gray"}  text-[0.88rem] w-full mt-8`}>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </p>
        <UnstyledButton
          type="button"
          clicked={() => router.back()}
          class=" rounded-md px-4 transition-all py-2 text-[0.88rem] font-medium mt-20 hover:bg-gray-bg-1 border-stroke-2 border"
        >
          Back
        </UnstyledButton>
      </div>
    </div>
  );
};

export default BankPayment;
