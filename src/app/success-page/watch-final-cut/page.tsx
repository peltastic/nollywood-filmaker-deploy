"use client"
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SuccessTemplate from "@/components/SuccessTemplate/SuccessTemplate";
import React from "react";

type Props = {};

const WatchFinalCutSuccessPage = (props: Props) => {
  return (
    <ServiceLayout>
      <SuccessTemplate
        darkBtnLink="/user/dashboard"
        darkButtonContent="View on Dashboard"
        lightBtnLink="/user/dashboard"
        lightButtonContent="Take me home"
        subTitle=""
        // subTitle="When a killer shark unleashes chaos on a beach community off Cape Cod, it’s up to a local sheriff, a marine biologist."
        titleLight="Order Confirmed"
        titleBold="Watch the Final cut of my film"
        width="w-[95%] sm:w-[90%] md:w-[50rem]"
      />
    </ServiceLayout>
  );
};

export default WatchFinalCutSuccessPage;
