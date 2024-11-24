import React from "react";
import { IoMdDownload } from "react-icons/io";

type Props = {
  chat?: boolean
  title?: string;
  script?: string;
  bodyData: { title: string; content: string }[];
};

const OrderDetailsBody = ({ title, script, bodyData, chat }: Props) => {
  return (
    <div className="text-black-2 bg-white px-6 py-6 mt-8 rounded-2xl border border-stroke-5 shadow-md shadow-[#1018280F]">
      {chat ? null : <div className="border-b border-b-stroke-4">
        <h1 className="font-bold mb-1">Movie Title</h1>
        <p className="text-[0.88rem]">{title}</p>
        <div className="mt-4 mb-4">
          <h1 className="font-bold mb-1">Script</h1>
          <div className="flex rounded-sm w-fit items-center px-2 py-1 font-medium bg-border-gray text-black-3 text-[0.88rem]">
            <p className="mr-1">{script}</p>
            <IoMdDownload />
          </div>
        </div>
      </div>}
      {bodyData.map((el) => (
        <div key={el.title} className="border-b last:border-0 border-b-stroke-4 py-4">
          <h1 className="font-bold mb-1">{el.title}</h1>
          <p className="text-[0.88rem]">{el.content}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsBody;
