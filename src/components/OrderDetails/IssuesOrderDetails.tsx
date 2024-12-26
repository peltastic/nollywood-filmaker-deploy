import React from "react";
import TestImg from "/public/assets/test-avatar.png";
import Image from "next/image";
import TextEditor from "../TextEditor/TextEditor";
import { AspectRatio } from "@mantine/core";
import moment from "moment";

type Props = {
  admin?: boolean;
  title: string;
  complain: string;
  user: {
    profilepic: string;
    fullname: string;
  };
  consultant: {
    fname: string;
    lname: string;
  };
  orderId: string;
  createdAt: string;
};

const IssuesOrderDetails = ({
  user,
  consultant,
  createdAt,
  orderId,
  title,
  complain,
}: Props) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap items-start">
      <div className="w-full lg:w-[20%] text-black-3">
        <p className="text-[0.88rem] font-medium">Client</p>
        <div className="flex items-center w-fit py-1 px-2 rounded-md bg-border-gray">
          <div className="w-[1.2rem] h-[1.2rem] mr-1">
            <AspectRatio ratio={1800 / 1800}>
              <Image
                src={user.profilepic}
                alt="profile-image"
                width={100}
                height={100}
                className="w-full h-full rounded-full"
              />
            </AspectRatio>
          </div>
          <p className="text-[0.88rem]">{user.fullname}</p>
        </div>
        <p className="text-[0.88rem] font-medium mt-4">Order</p>
        <div className="bg-border-gray w-fit py-1 px-2  rounded-md">
          <p className="text-[0.88rem]">ORDER{orderId}</p>
        </div>
        <p className="text-[0.88rem] font-medium mt-4">Assigned to</p>
        <div className="flex items-center w-fit py-1 px-2 rounded-md bg-border-gray">
          <div className="bg-black-3 font-bold text-[0.5rem] mr-1 h-[1.2rem] flex items-center justify-center w-[1.2rem] rounded-full text-white">
            {consultant.fname[0]} {consultant.lname[0]}
          </div>
          <p className="text-[0.88rem]">
            {consultant.fname} {consultant.lname}
          </p>
        </div>
        <p className="text-[0.88rem] font-medium mt-4">Created</p>
        <p className="text-[0.88rem] ">{moment(createdAt).format("ll")}</p>
      </div>
      <div className="w-full lg:w-[80%] mt-8 lg:mt-0">
        <div className="bg-white border border-stroke-5 shadow-md py-6 px-6 shadow-[#1018280F] rounded-md">
          <div className="text-white font-bold rounded-md bg-black-3 w-full py-2 px-4 text-[1.5rem]">
            {title}
          </div>
          <div className="text-black-2">
            <p className="text-[17px] mt-6">
              {complain.split("\n").map((line, index) => (
                <div className="" key={index}>
                  {line}
                  <br />
                </div>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesOrderDetails;
