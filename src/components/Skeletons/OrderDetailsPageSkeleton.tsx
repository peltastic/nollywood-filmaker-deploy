import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {
  noUserInfo?: boolean
};

const OrderDetailsPageSkeleton = (props: Props) => {
  return (
    <div className=" lg:mt-6 pt-6 lg:pt-0 px-4 sm:px-10 lg:px-0">
      <div className="flex flex-wrap">
        <div className="w-[2rem] mr-2 mt-2">
          <Skeleton height={40} />
        </div>
        <div className="w-[8rem] mr-auto mt-2">
          <Skeleton height={40} />
        </div>
        <div className="w-[4rem] mr-2 mt-2">
          <Skeleton height={40} />
        </div>
        <div className="w-[8rem] mt-2">
          <Skeleton height={40} />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center items-start mt-14">
        {props.noUserInfo ? null : <div className="mb-10 lg:mb-0">
          <div className="w-[6rem] mx-auto">
            <Skeleton height={96} radius={"100%"} />
          </div>
          <div className="w-[10rem] mt-4">
            <Skeleton height={20} />
          </div>
          <div className="w-[6rem] mt-4 mx-auto">
            <Skeleton height={15} />
          </div>
        </div>}

        <div className={`w-full lg:w-[80%] ${props.noUserInfo ? "mx-auto" : "ml-auto" } `}>
            <div className="grid lg:grid-cols-3 gap-2">
                <Skeleton height={100} />
                <Skeleton height={100} />
                <Skeleton height={100} />
            </div>
            <div className="mt-4 w-full">
                <Skeleton height={300}  />
              
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPageSkeleton;
