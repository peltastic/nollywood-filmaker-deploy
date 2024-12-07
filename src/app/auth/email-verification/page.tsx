"use client";
import LeftSide from "@/components/Auth/LeftSide";
import HomeLayout from "@/components/Layouts/HomeLayout";
import React from "react";
import { IoMailOutline } from "react-icons/io5";

type Props = {};

const EmailVerification = (props: Props) => {
  return (
    <HomeLayout>
      <div className="flex items-center py-6 px-3 sm:px-10">
        <LeftSide />
        <div className="w-full  md:w-[95%] mx-auto xl:w-[55%] pl-2 md:pl-[5rem] pr-2 md:pr-[3rem]">
          <IoMailOutline className="text-[10rem] mx-auto" />
          <div className="text-center text-black-1">
            <h1 className="text-2xl font-medium">Email Confirmation</h1>
            <p className="text-sm mt-5 w-[80%] mx-auto">
              We have sent an email to you to confirm the validity of your email
              address. After receiving the email, please click on the link
              provided to complete the verification process.
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default EmailVerification;
