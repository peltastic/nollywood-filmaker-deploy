import React from "react";
import ProfileBackground from "/public/assets/profile-background.png";
import TestImageBig from "/public/assets/test-avatar-big.png";
import Image from "next/image";
import { AspectRatio, Rating, Skeleton } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {
  isFetching?: boolean;
  fullname?: string;
};

const ProfileLeft = ({ isFetching, fullname }: Props) => {
  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
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
            backgroundSize: "cover"
          }}
          className="w-full lg:w-[22rem] h-[22rem] lg:h-[29.1rem] rounded-2xl relative"
        >
          <div className="absolute left-1/2 text-white top-1/2 -translate-x-1/2 -translate-y-1/2 w-full ">
            {userData?.profilepics ? (
              <div className="w-[10rem] h-[10rem] mx-auto">
                <AspectRatio ratio={1800 / 1800}>
                  <Image
                    src={userData.profilepics}
                    alt="text-image"
                    className="mx-auto w-full h-full   rounded-full"
                    height={100}
                    width={100}
                  />
                </AspectRatio>
              </div>
            ) : (
              <div className="bg-black-3 text-center font-bold text-4xl mb-10 mx-auto h-[7rem] flex items-center justify-center w-[7rem] rounded-full text-white">
                {userData?.fname[0]} {userData?.lname[0]}
              </div>
            )}
            <div className="text-center">
              <h1 className="text-[2rem] font-bold">
                {userData?.fname} {userData?.lname}
              </h1>
              <p>Member</p>
            </div>
            {/* <div className="text-center mt-8">
              <p className="font-bold">Average rating</p>
              <div className="flex items-center justify-center mt-1">
                <Rating defaultValue={5} color="#F8C51B" />
                <p className="font-bold ml-2">5.0</p>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLeft;
