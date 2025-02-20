import React, { useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import { IReplyDataInfo } from "./ChatRoom";
import { AspectRatio } from "@mantine/core";

type Props = {
  replyData: IReplyDataInfo;
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
  const contactsReplyData = props.replyData.contacts;
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
          <p className=" text-[0.75rem] sm:text-sm font-semibold ">
            {userType}
          </p>
          {props.replyData.type === "img" && props.replyData.reply ? (
            <div className="w-[4rem] mt-2">
               <AspectRatio ratio={1800 / 1800}>

              <Image
                src={props.replyData.reply}
                alt="file-name"
                width={100}
                height={100}
                className="w-full rounded-md"
                />
                </AspectRatio>
            </div>
          ) : contactsReplyData ? (
            <div className="flex items-center mt-4">
              <div className="h-[2.5rem] w-[2.5rem] mr-3">
                {contactsReplyData.photourl && (
                  <AspectRatio ratio={1800 / 1800}>
                    <Image
                      src={contactsReplyData.photourl}
                      alt="propic"
                      width={100}
                      height={100}
                      className="rounded-full  h-full w-full"
                    />
                  </AspectRatio>
                )}
              </div>
              <div className="">
                {contactsReplyData.name && (
                  <p className="">{contactsReplyData.name}</p>
                )}
                {contactsReplyData.type && (
                  <p className="font-semibold">Film {contactsReplyData.type}</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-[0.88rem] sm:text-base break-words">
              {props.replyData.reply}
            </p>
          )}
        </div>
        <div
          className="cursor-pointer relative z-10"
          onClick={props.cancelReplyBox}
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
    </div>
  );
};

export default ReplyBox;
