"use client";
import LeftSide from "@/components/Auth/LeftSide";
import ForgotPasswordForm from "@/components/Forms/Auth/ForgotPasswordForm";
import HomeLayout from "@/components/Layouts/HomeLayout";
import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";

type Props = {};

const FilmmakerForgotPassword = (props: Props) => {
  const [isSuccessful, setIsuccessful] = useState<boolean>(false);
  return (
    <HomeLayout>
      <div className="flex items-center py-6 px-3 sm:px-10">
        <LeftSide />
        {isSuccessful ? (
          <div className="-full md:w-[95%] xl:w-[55rem] mx-auto pl-2 md:pl-[5rem] pr-2 md:pr-[5rem]">
            <IoMailOutline className="text-[10rem] mx-auto" />
            <div className="text-center text-black-1">
              <h1 className="text-2xl font-medium">Email Confirmation</h1>
              <p className="text-sm mt-5 w-[80%] mx-auto">
                An email with the link to reset your password has been sent to
                you.
              </p>
            </div>
          </div>
        ) : (
          <div className=" w-full md:w-[95%] xl:w-[55rem] mx-auto pl-2 md:pl-[5rem] pr-2 md:pr-[5rem]">
            <div className="text-black-2 mt-[8rem]">
              <h1 className="font-bold text-[1.5rem]">Forgot password</h1>
              <h2>Enter your email, a link will be sent to complete your password reset for nollywood filmmaker database</h2>
            </div>
            <ForgotPasswordForm
              database
              setIssuccessful={(val) => setIsuccessful(val)}
              successRoute="/auth/filmmaker-reset-password"
            />
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default FilmmakerForgotPassword;
