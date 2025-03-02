"use client"
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SuccessTemplate from "@/components/SuccessTemplate/SuccessTemplate";
import React from "react";

type Props = {};

const ChatSuccessPage = (props: Props) => {
  return (
    <ServiceLayout>
      <SuccessTemplate
        darkBtnLink="/user/dashboard"
        darkButtonContent="View on Dashboard"
        lightBtnLink="/"
        subTitle=""
        lightButtonContent="Take me home"
        titleLight="Order Confirmed"
        titleBold="Chat with a professional"
        width="w-full sm:w-[90%] md:w-[40rem]"
      />
    </ServiceLayout>
  );
};

export default ChatSuccessPage;
