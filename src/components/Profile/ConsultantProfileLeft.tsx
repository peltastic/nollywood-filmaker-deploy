import Image from "next/image";
import React, { useState } from "react";
import TestImageBig from "/public/assets/test-avatar-big.png";
import ProfileBackground from "/public/assets/profile-background.png";
import { Rating, Skeleton } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {
  isFetching?: boolean;
};

const ConsultantProfileLeft = ({ isFetching }: Props) => {
  const consultantData = useSelector(
    (state: RootState) => state.persistedState.consultant.user
  );
  return (
    <div className="w-full">
      {isFetching ? (
        <div className="sm:mr-[2rem] ">
          <Skeleton height={400} radius={"1rem"} />
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `linear-gradient(#181818e2, #181818e2),url(${ProfileBackground.src})`,
          }}
          className="w-[22rem] h-[29.1rem] rounded-2xl relative mx-auto chatbp:mx-0"
        >
          <div className="absolute left-1/2 text-white top-1/2 -translate-x-1/2 -translate-y-1/2 w-full ">
            {consultantData?.profilepics ? (
              <Image
                src={consultantData.profilepics}
                alt="text-image"
                className="mx-auto"
              />
            ) : (
              <div className="bg-black-3 text-center font-bold text-4xl mb-10 mx-auto h-[7rem] flex items-center justify-center w-[7rem] rounded-full text-white">
                {consultantData?.fname[0]} {consultantData?.lname[0]}
              </div>
            )}
            <div className="text-center">
              <h1 className="text-[2rem] font-bold">
                {consultantData?.fname} {consultantData?.lname}
              </h1>
              <p>Consultant</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantProfileLeft;
