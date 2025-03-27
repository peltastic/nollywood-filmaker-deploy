import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {};

const SingleNotificationSkeleton = (props: Props) => {
  return (
    <div className="flex flex-wrap items-center mb-6 pb-6 pt-8">
      <div className="w-[50px]">
        <Skeleton h={50} radius={"50%"} />
      </div>
      <div className=" my-8 sm:my-0 sm:ml-8 mr-auto w-full sm:w-auto">
        <div className="w-[7rem]">
          <Skeleton h={10} />
        </div>
        <div className="w-[13rem] mt-2">
          <Skeleton h={10} />
        </div>
        <div className="w-[3rem] mt-2">
          <Skeleton h={10} />
        </div>
      </div>
      <div className="">
        <div className="w-[3.5rem]">
          <Skeleton h={25} />
        </div>
      </div>
    </div>
  );
};

export default SingleNotificationSkeleton;
