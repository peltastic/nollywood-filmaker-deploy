import React from "react";
import DirectDeposit from "/public/assets/dashboard/direct-deposit.png";
import Image from "next/image";
import SelectComponent from "@/components/Select/SelectComponent";

type Props = {};

const PaymentMethodDetails = (props: Props) => {
  return (
    <div>
      <div
        className={`flex items-center border border-black rounded-md cursor-pointerborder transition-all py-4 px-4 mb-5`}
      >
        <Image src={DirectDeposit} alt="direct-deposit-img" className=" mr-8" />
        <div className="">
          <h4 className="text-black-4 font-medium text-[0.88rem]">
            Direct Deposit
          </h4>
          <p className="text-gray-1 text-[0.88rem]">United States</p>
        </div>
      </div>
      <h1 className="text-[1.38rem] font-semibold mt-14">Bank Details</h1>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="Bank account country"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="Vabk account currency"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="Bank account type"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <h1 className="text-[1.38rem] font-semibold mt-14">Account Details</h1>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="Account holder business name"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="Account number"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="Bank name"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="ABA (Routing code)"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <h1 className="text-[1.38rem] font-semibold mt-14">Your business address</h1>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="Country"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="Postal Code"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="Street address"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="City"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
      <div className="mt-6">
        <SelectComponent
          data={[]}
          size="md"
          label="State"
          placeholder="Select"
          setValueProps={() => {}}
        />
      </div>
    </div>
  );
};

export default PaymentMethodDetails;
