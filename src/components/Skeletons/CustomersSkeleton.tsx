import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {};

const CustomerSkeleton = (props: Props) => {
  return (
    <div className="flex items-center  mt-4">
      <div className="flex items-center">
        <div className="w-[3rem]  mr-3">
          <Skeleton height={48} radius={"100%"} />
        </div>
        <div className="">
          <div className="w-[4rem]">
            <Skeleton height={10} />
          </div>
          <div className="w-[6rem] mt-2">
            <Skeleton height={10} />
          </div>
        </div>
      </div>
      <div className="w-[2rem]  ml-auto">
        <Skeleton height={10} />
        <div className="mt-1">
          <Skeleton height={10} />
        </div>
      </div>
    </div>
  );
};

export default CustomerSkeleton;
