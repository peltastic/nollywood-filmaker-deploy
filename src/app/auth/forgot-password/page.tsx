"use client"
import LeftSide from "@/components/Auth/LeftSide";
import ForgotPasswordForm from "@/components/Forms/Auth/ForgotPasswordForm";
import HomeLayout from "@/components/Layouts/HomeLayout";
import React from "react";

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  return (
    <HomeLayout>
      <div className="flex items-center py-6 px-3 sm:px-10">
        <LeftSide />
        <div className=" w-full md:w-[95%] xl:w-[55rem] mx-auto pl-2 md:pl-[5rem] pr-2 md:pr-[5rem]">
     
          <div className="text-black-2 mt-[8rem]">
            <h1 className="font-bold text-[1.5rem]">Forgot password</h1>
            <h2 className="text-[1.13rem]">
              Lorem ipsum dolor sit amet consectetur adipisc.
            </h2>
          </div>
     <ForgotPasswordForm />
        </div>
      </div>
    </HomeLayout>
  );
};

export default ForgotPasswordPage;
