import React from "react";
import TestImage from "/public/assets/test-avatar-big.png";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import ProfileSettingForm from "./Forms/ProfileSettingForm";

type Props = {};

const ProfileSettings = (props: Props) => {
  return (
    <div className="mt-10 flex flex-wrap lg:flex-nowrap gap-6">
      <div className="w-full lg:w-[30%] ">
        <div className="w-full py-10 border border-stroke-10 bg-white rounded-xl">
          <div className="w-fit mx-auto">
            <Image src={TestImage} alt="test-image" />
          </div>
          <div className="flex items-center justify-between px-10 mt-8">
            <UnstyledButton class="text-gray-7 font-bold">
              Remove
            </UnstyledButton>
            <UnstyledButton class="text-black-3 font-bold">
              Update
            </UnstyledButton>
          </div>
        </div>
        <p className="mt-10 text-center text-[0.88rem] text-black-2">
          User since <span className="font-bold">Jan 12, 2022</span>
        </p>
      </div>
      <div className="w-full lg:w-[70%] px-4 sm:px-10 py-10 rounded-xl bg-white border border-stroke-10">
        <ProfileSettingForm />
      </div>
    </div>
  );
};

export default ProfileSettings;
