import React, { useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";

type Props = {
  replyData: {
    user: "admin" | "user" | "consultant" | null;
    reply: string;
    id: string
  };
  type: "admin" | "user" | "consultant";
  cancelReplyBox: () => void;
};

const ReplyBox = (props: Props) => {
  const userType: "You" | "Customer" | "Consultant" =
    props.replyData.user === props.type
      ? "You"
      : props.replyData.user === "consultant"
      ? "Consultant"
      : "Customer";

  return (
    <div
      className={` text-black pl-12 pr-7 absolute bottom-20 right-0 w-[98%]  `}
    >
      <div
        className={`flex items-center border-l-4 ${
          userType === "You" ? "border-l-dark-green" : "border-l-black-3"
        } bg-gray-bg-1 py-4 shadow-sm px-4 rounded-md`}
      >
        <div className="mr-auto">
          <p className="text-sm font-semibold ">{userType}</p>
          <p>{props.replyData.reply}</p>
        </div>
        <div className="cursor-pointer relative z-10" onClick={props.cancelReplyBox}>
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
    </div>
  );
};

export default ReplyBox;
