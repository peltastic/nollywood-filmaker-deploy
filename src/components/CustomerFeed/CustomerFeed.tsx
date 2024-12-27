import Image from "next/image";
import React from "react";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import { AspectRatio } from "@mantine/core";

type Props = {
  name: string;
  email: string;
  date: string;
  time: string;
  profilepic: string;
};

const CustomerFeed = (props: Props) => {
  return (
    <div className="mt-8 flex items-center">
      <div className="flex items-center mr-auto">
        <div className="mr-4 hidden sm:block w-[2.5rem]  h-[2.5rem]">
          <AspectRatio ratio={1800 / 1800}>
            <Image
              src={props.profilepic}
              width={100}
              height={100}
              alt="test-img"
              className="w-full h-full rounded-full"
            />
          </AspectRatio>
        </div>
        <div className="text-[0.88rem]">
          <h3 className="font-medium ">{props.name}</h3>
          <p className="text-gray-1">{props.email}</p>
        </div>
      </div>
      <div className="text-[0.82rem] text-right">
        <p className="text-black-8  font-medium ">{props.date}</p>
        <p className="text-gray-8">{props.time}</p>
      </div>
    </div>
  );
};

export default CustomerFeed;
