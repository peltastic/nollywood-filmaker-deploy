import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {};

const DashboardStatsSkeleton = (props: Props) => {
  return (
    <div className="px-10 mb-5">
      <div className="w-[50%]">
        <Skeleton height={15} />
      </div>
      <div className="flex items-center mt-6">
        <div className="w-[5rem] mr-auto">
          <Skeleton height={20} />
        </div>
        <div className="w-[2rem]">
          <Skeleton height={20} />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsSkeleton;
