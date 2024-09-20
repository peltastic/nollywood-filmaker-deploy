import React from "react";
import OrderTypeImg from "/public/assets/services/read-my-script-dark.svg";
import Image from "next/image";

type Props = {
  order_date: string;
  order_no: string;
  order_type: string;
};

const OrderDetailsTop = ({ order_date, order_no, order_type }: Props) => {
  return (
    <div className="grid grid-cols-3 bg-white mt-8 py-6 px-6 rounded-2xl border border-stroke-5 shadow-md shadow-[#1018280F]">
      <div className="flex items-center border-r border-r-stroke-6">
        <div className="mr-auto">
          <h1 className="font-bold mb-1">Order Date</h1>
          <p className="text-[0.88rem]">{order_date}</p>
        </div>
      </div>
      <div className="flex justify-center border-r border-r-stroke-6">
        <div className="">
          <h1 className="font-bold mb-1">Order No</h1>
          <p className="text-[0.88rem]">{order_no}</p>
        </div>
      </div>
      <div className="flex">
        <div className="ml-auto">
          <h1 className="font-bold mb-1">Order Type</h1>
          <div className="flex rounded-sm px-2 py-1 font-medium bg-border-gray text-black-3 text-[0.88rem]">
            <p className="mr-1">Watch the final cut of my film</p>
            <Image src={OrderTypeImg} alt="order-type-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTop;
