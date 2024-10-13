import Image from "next/image";
import React from "react";
import CancelImg from "/public/assets/cancel.svg";

type Props = {
  close: () => void;
};

const BankDetails = (props: Props) => {
  return (
    <section className=" py-6 px-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Connected bank account
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-[1.38rem] font-semibold">Bank account details</h1>
        <div className="">
          <div className=" text-[0.88rem] mt-6 grid sm:grid-cols-2">
            <div className="">
              <h1 className="text-black-4 font-medium">Bank account country</h1>
              <p className="text-gray-1">United States</p>
            </div>
            <div className="mt-6 sm:mt-0">
              <h1 className="text-black-4 font-medium">
                Bank account currency
              </h1>
              <p className="text-gray-1">USD</p>
            </div>
          </div>
          <div className=" text-[0.88rem] mt-6 grid sm:grid-cols-2">
            <div className="">
              <h1 className="text-black-4 font-medium">Bank name</h1>
              <p className="text-gray-1">Wells Fargo Bank</p>
            </div>
            <div className="mt-6 sm:mt-0">
              <h1 className="text-black-4 font-medium">Bank account type</h1>
              <p className="text-gray-1">Personal</p>
            </div>
          </div>
          <div className=" text-[0.88rem] mt-6 grid sm:grid-cols-2">
            <div className="">
              <h1 className="text-black-4 font-medium">ABA Routing number</h1>
              <p className="text-gray-1">152635763788</p>
            </div>
            <div className="mt-6 sm:mt-0">
              <h1 className="text-black-4 font-medium">Account number</h1>
              <p className="text-gray-1">*****5678</p>
            </div>
          </div>
          <div className=" text-[0.88rem] mt-6 grid sm:grid-cols-2">
            <div className="">
              <h1 className="text-black-4 font-medium">Account holder name</h1>
              <p className="text-gray-1">Niyi Akinmolayan</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-[1.38rem] font-semibold">Address</h1>
        <div className=" text-[0.88rem] mt-6 grid sm:grid-cols-2">
          <div className="">
            <h1 className="text-black-4 font-medium">Street address</h1>
            <p className="text-gray-1">United States</p>
          </div>
          <div className="mt-6 sm:mt-0">
            <h1 className="text-black-4 font-medium">Post code</h1>
            <p className="text-gray-1">USD</p>
          </div>
        </div>
        <div className=" text-[0.88rem] mt-6 grid sm:grid-cols-2">
          <div className="">
            <h1 className="text-black-4 font-medium">City</h1>
            <p className="text-gray-1">Wells Fargo Bank</p>
          </div>
          <div className="mt-6 sm:mt-0">
            <h1 className="text-black-4 font-medium">Country</h1>
            <p className="text-gray-1">Personal</p>
          </div>
        </div>
        <div className=" text-[0.88rem] mt-6 grid sm:grid-cols-2">
          <div className="">
            <h1 className="text-black-4 font-medium">State</h1>
            <p className="text-gray-1">152635763788</p>
          </div>
      
        </div>
      </div>
    </section>
  );
};

export default BankDetails;
