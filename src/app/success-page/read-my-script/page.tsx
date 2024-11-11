"use client"
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SuccessTemplate from "@/components/SuccessTemplate/SuccessTemplate";
import React from "react";

type Props = {};

const ReadMyScriptSuccesspage = (props: Props) => {
  return (
    <ServiceLayout>
      <SuccessTemplate
        darkBtnLink="/user/dashboard"
        darkButtonContent='View on Dashboard'
        lightBtnLink="/user/dashboard"
        subTitle="When a killer shark unleashes chaos on a beach community off Cape Cod, it’s up to a local sheriff, a marine biologist."
        lightButtonContent="Take me home"
        titleLight="Order Confirmed"
        titleBold="Read my script"
      />
    </ServiceLayout>
  );
};

export default ReadMyScriptSuccesspage;
