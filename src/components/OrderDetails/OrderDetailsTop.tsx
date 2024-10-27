import React from "react";
import OrderTypeImg from "/public/assets/services/read-my-script-dark.svg";
import Image from "next/image";
import { Rating } from "@mantine/core";

type Props = {
  order_date: string;
  order_no: string;
  order_type: string;
  rating?: string;
};

const OrderDetailsTop = ({
  order_date,
  order_no,
  order_type,
  rating,
}: Props) => {
  return (
    <div
      className={`grid ${
        rating ? "lg:grid-cols-4 " : "lg:grid-cols-3 "
      } bg-white mt-8 py-6 px-6 rounded-2xl border border-stroke-5 shadow-md shadow-[#1018280F]`}
    >
      <div className="flex items-center lg:border-r border-r-stroke-6 mb-6 lg:mb-0">
        <div className="mr-auto">
          <h1 className="font-bold mb-1">Order Date</h1>
          <p className="text-[0.88rem]">{order_date}</p>
        </div>
      </div>
      <div className="flex lg:justify-center lg:border-r border-r-stroke-6 mb-6 lg:mb-0">
        <div className="">
          <h1 className="font-bold mb-1">Order No</h1>
          <p className="text-[0.88rem]">{order_no}</p>
        </div>
      </div>
      <div
        className={`flex ${
          rating ? "lg:border-r border-r-stroke-6 chatbp:justify-center" : ""
        }`}
      >
        <div className={`${rating ? null : "lg:ml-auto"} `}>
          <h1 className="font-bold mb-1">Order Type</h1>
          <div
            className={`flex  rounded-sm px-2 py-1 font-medium bg-border-gray text-black-3 text-[0.88rem]`}
          >
            <p className="mr-1">Watch the final cut of my film</p>
            <Image src={OrderTypeImg} alt="order-type-img" />
          </div>
        </div>
      </div>

      {rating && <div className="flex lg:justify-center mb-6 lg:mb-0 mt-8 lg:mt-0">
        <div className="">
          <p className="font-bold">Average Rating</p>
          <div className="flex items-center">
            <Rating color="#F8C51B" value={Number(rating)} />
            <p className="font-bold ml-3">5.0</p>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default OrderDetailsTop;
