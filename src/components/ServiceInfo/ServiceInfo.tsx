import React from "react";
import { MdInfo } from "react-icons/md";

type Props = {
  content?: string;
  activeColor?: boolean
};

const ServiceInfo = (props: Props) => {
  return (
    <div className="text-center flex text-white items-start mt-6 bg-[#f7f0a5] py-4 rounded-md px-4 border border-[#f7f0a5]">
      <MdInfo className={` ${props.activeColor ? "text-[#de4040]" : "text-gray-4"} text-[1.5rem] mr-2 `} />
      <div className="text-gray-6 text-[0.88rem] text-left">{props.content}</div>
    </div>
  );
};

export default ServiceInfo;
