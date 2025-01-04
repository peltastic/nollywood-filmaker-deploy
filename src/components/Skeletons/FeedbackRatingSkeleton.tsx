import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {};

const FeedbackRatingSkeleton = (props: Props) => {
  return (
    <div className="border border-stroke-10 py-4 px-5 rounded-lg  h-full">
      <div className="w-[6rem]">
        <Skeleton height={20} />
      </div>
      <div className="w-[6rem] mx-auto mt-10">
        <Skeleton height={96} radius={"100%"} />
      </div>
      <div className="w-[9rem] mt-6 mx-auto">
        <Skeleton height={20} />
      </div>
      <div className="w-[6rem] mt-4 mx-auto">
        <Skeleton height={20} />
      </div>

      <div className="mt-16">
        <div className="mt-6">
          <Skeleton h={10} />
        </div>
        <div className="mt-6">
          <Skeleton h={10} />
        </div>
        <div className="mt-6">
          <Skeleton h={10} />
        </div>
        <div className="mt-6">
          <Skeleton h={10} />
        </div>
        <div className="mt-6">
          <Skeleton h={10} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackRatingSkeleton;
