"use client";
import ConsultantLeftSide from "@/components/Auth/ConsultantLeftSide";
import ForgotPasswordForm from "@/components/Forms/Auth/ForgotPasswordForm";
import ServiceNavbar from "@/components/Navbar/ServiceNavbar";
import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  const [isSuccessful, setIssuccessful] = useState<boolean>(false);
  return (
    <div className="">
      <ServiceNavbar removeOptions />
      <section className="flex xl:items-center h-[90vh] max-w-[1680px] mx-auto mt-8 mb-8">
        <ConsultantLeftSide />
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
          <div className=" px-7 md:px-[5rem] xl:px-[2rem] chatbp:px-[5rem] text-black-2 w-full xl:w-[50%]">
            <h1 className="text-[1.75rem] font-bold">Consultant Portal</h1>
            <div className="text-black-2 mt-[6rem] sm:mt-[8rem]">
              <h1 className="font-bold text-[1.75rem]">Forgot Password</h1>
              <h2 className="text-[1.13rem]">
                Enter your email and a link will be sent to reset your password
              </h2>
              <ForgotPasswordForm consultant setIssuccessful={(val) => setIssuccessful(val)} successRoute="/consultants/auth/reset-password" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ForgotPasswordPage;
