"use client";
import ConsultantLeftSide from "@/components/Auth/ConsultantLeftSide";
import LoginForm from "@/components/Forms/Auth/LoginForm";
import ServiceNavbar from "@/components/Navbar/ServiceNavbar";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="">
      <ServiceNavbar removeOptions />
      <section className="flex xl:items-center h-[90vh] max-w-[1680px] mx-auto  mt-8 mb-8">
        <ConsultantLeftSide />
        <div className=" px-[2rem] md:px-[5rem] xl:px-[2rem] chatbp:px-[5rem] text-black-2 w-full xl:w-[50%]">
          <h1 className="text-[1.75rem] font-bold">Consultant Portal</h1>
          <div className="text-black-2 mt-[6rem] sm:mt-[8rem]">
            <h1 className="font-bold text-[1.75rem]">Welcome Back</h1>
            <h2 className="text-[1.13rem]">
              Lorem ipsum dolor sit amet consectetur adipisc.
            </h2>
            <LoginForm forgotPasswordLink="/consultants/auth/forgot-password" successRoute="/consultants/dashboard" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
