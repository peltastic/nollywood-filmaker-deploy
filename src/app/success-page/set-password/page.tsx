"use client"
import ServiceNavbar from "@/components/Navbar/ServiceNavbar";
import SuccessTemplate from "@/components/SuccessTemplate/SuccessTemplate";
import React from "react";

type Props = {};

const SetPasswordSuccessPage = (props: Props) => {
  return (
    <div>
      <ServiceNavbar removeOptions />
      <SuccessTemplate
        darkBtnLink={"/consultants/auth/login"}
        darkButtonContent="Go to login"
        lightBtnLink="/"
        lightButtonContent=""
        subTitle="Voila! You have successfully secured your account. click the button below to log in and access your dashboard"
        titleLight="Password created successfully"
      />
    </div>
  );
};

export default SetPasswordSuccessPage;
