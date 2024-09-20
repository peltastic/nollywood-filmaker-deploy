import React from "react";
import ProfileBackground from "/public/assets/profile-background.png";
import TestImageBig from "/public/assets/test-avatar-big.png";
import Image from "next/image";
import { Rating } from "@mantine/core";

type Props = {};

const ProfileLeft = (props: Props) => {
  return (
    <div className="w-full">
      <div
        style={{
          backgroundImage: `linear-gradient(#181818e2, #181818e2),url(${ProfileBackground.src})`,
        }}
        className="w-[22rem] h-[29.1rem] rounded-2xl relative"
      >
        <div className="absolute left-1/2 text-white top-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <Image src={TestImageBig} alt="text-image" className="mx-auto" />
          <div className="text-center">
            <h1 className="text-[2rem] font-bold">Niyi Akinmolayan</h1>
            <p>Member</p>
          </div>
          <div className="text-center mt-8">
            <p className="font-bold">Average rating</p>
            <div className="flex items-center justify-center mt-1">
              <Rating color="#F8C51B" />
              <p className="font-bold ml-2">5.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeft;
