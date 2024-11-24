import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {};

const ConversationsSkeleton = (props: Props) => {
  return (
    <div className="flex  mt-4">
      <div className="flex items-center">
        <div className="w-[4rem]  mr-3">
          <Skeleton height={64} radius={"100%"} />
        </div>
        <div className="">
          <div className="w-[4rem]">
            <Skeleton height={10} />
          </div>
          <div className="w-[6rem] mt-2">
            <Skeleton height={10} />
          </div>
          <div className="flex mt-2">
            <div className="w-[4rem] mr-2">
              <Skeleton height={10} />
            </div>
            <div className="w-[6rem]">
              <Skeleton height={10} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[2rem] mt-2 ml-auto">
        <Skeleton height={10} />
      </div>
    </div>
  );
};

export default ConversationsSkeleton;
