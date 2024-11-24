import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {};

const CalendarSkeleton = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between mt-6 px-2">
        <div className="w-[5rem]">
          <Skeleton height={40} />
        </div>
        <div className="flex">
          <div className="w-[2.5rem] mr-2">
            <Skeleton height={40} />
          </div>
          <div className="w-[8rem]">
            <Skeleton height={40} />
          </div>
          <div className="w-[2.5rem] ml-2">
            <Skeleton height={40} />
          </div>
        </div>
        <div className="w-[10rem]">
          <Skeleton height={40} />
        </div>
      </div>
      <div className="">
        <div className="mt-10">
          <Skeleton height={60} />
        </div>
        <div className="mt-1">
          <Skeleton height={60} />
        </div>
        <div className="mt-1">
          <Skeleton height={60} />
        </div>
        <div className="mt-1">
          <Skeleton height={60} />
        </div>
        <div className="mt-1">
          <Skeleton height={60} />
        </div>
        <div className="mt-1">
          <Skeleton height={60} />
        </div>
        <div className="mt-1">
          <Skeleton height={60} />
        </div>
        <div className="mt-1">
          <Skeleton height={60} />
        </div>
        <div className="mt-1">
          <Skeleton height={60} />
        </div>
      </div>
    </div>
  );
};

export default CalendarSkeleton;
