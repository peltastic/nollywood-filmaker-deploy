import React from "react";
import { MdInfo } from "react-icons/md";

type Props = {
  content: string;
};

const ServiceInfo = (props: Props) => {
  return (
    <div className="text-center flex items-start mt-6 bg-gray-bg-4 py-4 rounded-md px-4 border border-stroke-2">
      <MdInfo className="text-gray-4 text-[1.5rem] mr-2 " />
      <div className="text-gray-6 text-[0.88rem] text-left">{props.content}</div>
    </div>
  );
};

export default ServiceInfo;
