import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {};

const UserProfileSkeleton = (props: Props) => {
  return (
    <div className="h-full bg-gray-bg-3 w-full rounded-md flex justify-center items-center">
      <div className="h-fit mr-10">
        <div className="w-[8.8rem]">
          <Skeleton radius={"100%"} h={140} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-6 gap-x-6">
        <div className="mr-6">
          <div className="w-[3rem]">
            <Skeleton h={15} />
          </div>
          <div className="w-[6rem] mt-2">
            <Skeleton h={15} />
          </div>
        </div>
        <div className="">
          <div className="w-[3rem]">
            <Skeleton h={15} />
          </div>
          <div className="w-[6rem] mt-2">
            <Skeleton h={15} />
          </div>
        </div>
        <div className="">
          <div className="w-[3rem]">
            <Skeleton h={15} />
          </div>
          <div className="w-[6rem] mt-2">
            <Skeleton h={15} />
          </div>
        </div>
        <div className="">
          <div className="w-[3rem]">
            <Skeleton h={15} />
          </div>
          <div className="w-[6rem] mt-2">
            <Skeleton h={15} />
          </div>
        </div>
        <div className="">
          <div className="w-[3rem]">
            <Skeleton h={15} />
          </div>
          <div className="w-[6rem] mt-2">
            <Skeleton h={15} />
          </div>
        </div>
        <div className="">
          <div className="w-[3rem]">
            <Skeleton h={15} />
          </div>
          <div className="w-[6rem] mt-2">
            <Skeleton h={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
