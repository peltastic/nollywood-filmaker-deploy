import React from "react";
import { IChatData } from "./CustomerChat/CustomerChatLeft";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";

type Props = {
  data: IChatData;
  index: number,
  selctedIndex: number
};

const Chat = ({ data, index, selctedIndex }: Props) => {
  const className =
    data.status === "Completed"
      ? "bg-light-green text-dark-green border border-light-green"
      : "bg-light-yellow text-dark-yellow border border-light-yellow";
  return (
    <div className={`${index === selctedIndex ? "bg-[#615EF00F]" : ""} flex rounded-md items-start py-4 mb-2 px-4`}>
      <div className="w-[3rem] mr-3 h-[3rem] rounded-full bg-black flex items-center justify-center">
        <Image src={AdminProfileImg} alt="admin-alt-profile" />
      </div>
      <div className="">
        <h1 className="font-semibold text-[0.88rem]">{data.name}</h1>
        <p className="text-black-3 text-[0.75rem]">{data.service}</p>
        <div className="flex items-center mt-3">
          <div className="mr-2 text-black-3 rounded-full py-[0.15rem] border border-black-3 text-[0.75rem] font-medium px-3">
            <p>Service</p>
          </div>
          <div className={`${className} text-[0.75rem] font-semibold py-[0.15rem] px-2 rounded-full`}>
            <p>{data.status}</p>
          </div>
        </div>
      </div>
      <div className="ml-auto font-semibold text-[#00000056] text-[0.88rem]">
        <p>{data.date}</p>
      </div>
    </div>
  );
};

export default Chat;
