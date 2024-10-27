import React from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";

type Props = {
  close: () => void;
};

const WithdrawalRequestModal = (props: Props) => {
  return (
    <section className=" px-2 xs:px-6 py-6">
      <div className="flex">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Withdrawal Request
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>

      <div className="mt-8">
        <h1 className="font-semibold text-[1.38rem]">Description</h1>
        <p className="mt-6">
          You earned $51.95 USD for $259.75 USD order made by Damilola Akinosun,
          which you resolved successfully.
        </p>
      </div>
      <div className="border-t border-b border-stroke-10 py-6 mt-12">
        <div className="">
          <h3 className="font-medium text-[0.88rem] text-black-3">Amount</h3>
          <p className="text-gray-1 text-[0.88rem]">$51.95 USD</p>
        </div>
        <div className="mt-8">
          <h3 className="font-medium text-[0.88rem] text-black-3">Status</h3>
          <p className="text-gray-1 text-[0.88rem]">Pending Approval</p>
        </div>
        <div className="mt-8">
          <h3 className="font-medium text-[0.88rem] text-black-3">Created</h3>
          <p className="text-gray-1 text-[0.88rem]">Aug 02, 2024</p>
        </div>
        <div className="mt-8">
          <h3 className="font-medium text-[0.88rem] text-black-3">
            Estimated available date
          </h3>
          <p className="text-gray-1 text-[0.88rem]">Sep 13, 2024</p>
        </div>
      </div>
      <div className="mt-8">
        <div className="">
          <h3 className="font-medium text-[0.88rem] text-black-3">
            Customer name
          </h3>
          <p className="text-gray-1 text-[0.88rem]">Niyi Akinmolayan</p>
        </div>
        <div className="mt-8">
          <h3 className="font-medium text-[0.88rem] text-black-3">
            Customer ID
          </h3>
          <p className="text-gray-1 text-[0.88rem]">152635763788</p>
        </div>
        <div className="mt-8">
          <h3 className="font-medium text-[0.88rem] text-black-3">
            Order cost
          </h3>
          <p className="text-gray-1 text-[0.88rem]">$250 USD</p>
        </div>
        <div className="mt-8">
          <h3 className="font-medium text-[0.88rem] text-black-3">
            Transaction ID
          </h3>
          <p className="text-gray-1 text-[0.88rem]">267236-09-9E3W8-90PIOHJSDH</p>
        </div>
      </div>
    </section>
  );
};

export default WithdrawalRequestModal;
