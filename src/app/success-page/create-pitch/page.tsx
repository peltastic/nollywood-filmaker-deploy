"use client"
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SuccessTemplate from "@/components/SuccessTemplate/SuccessTemplate";
import React from "react";

type Props = {};

const CreatePitchPage = (props: Props) => {
  return (
    <ServiceLayout>
      <SuccessTemplate
        darkBtnLink="/"
        darkButtonContent="View on Dashboard"
        lightBtnLink="/"
        subTitle="When a killer shark unleashes chaos on a beach community off Cape Cod, it’s up to a local sheriff, a marine biologist."
        lightButtonContent="Take me home"
        titleLight="Order Confirmed"
        titleBold="Create a Pitch"
        width="w-[35rem]"
      />
    </ServiceLayout>
  );
};

export default CreatePitchPage;
