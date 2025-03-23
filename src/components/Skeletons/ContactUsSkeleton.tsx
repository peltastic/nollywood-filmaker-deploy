import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {};

const ContactUsSkeleton = (props: Props) => {
  return (
    <div className="mt-8">
      <div className="w-[20rem]">
        <Skeleton h={25} />
      </div>
      <div className="w-[15rem] mt-6">
        <Skeleton h={25} />
      </div>
      <div className="w-[10rem] mt-6">
        <Skeleton h={25} />
      </div>
      <div className="mt-20">
        <div className="w-[70%] mt-2">
          <Skeleton h={15} />
        </div>
        <div className="w-[50%] mt-2">
          <Skeleton h={15} />
        </div>
        <div className="w-[70%] mt-2">
          <Skeleton h={15} />
        </div>
        <div className="w-[70%] mt-2">
          <Skeleton h={15} />
          <div className="w-[90%] mt-2">
            <Skeleton h={15} />
          </div>
        </div>
        <div className="w-[70%] mt-2">
          <Skeleton h={15} />
        </div>
        <div className="w-[30%] mt-2">
          <Skeleton h={15} />
        </div>
        <div className="w-[70%] mt-2">
          <Skeleton h={15} />
          <div className="w-[50%] mt-2">
            <Skeleton h={15} />
          </div>
        </div>
        <div className="w-[70%] mt-2">
          <Skeleton h={15} />
        </div>
      </div>
    </div>
  );
};

export default ContactUsSkeleton;
