"use client";
import HomeLayout from "@/components/Layouts/HomeLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SuccessTemplate from "@/components/SuccessTemplate/SuccessTemplate";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const RegisterSuccessPage = (props: Props) => {
  const service = useSelector(
    (state: RootState) => state.persistedState.services.service
  );
  return (
    <HomeLayout>
      <SuccessTemplate
        darkBtnLink={service ? `/services/${service}` : "/get-started/service"}
        darkButtonContent="Proceed to services"
        lightBtnLink="/"
        lightButtonContent="Go to dashboard"
        subTitle="Voila! You have successfully created your account. click the button below to proceed to choosing a service."
        titleLight="Account created successfully"
      />
    </HomeLayout>
  );
};

export default RegisterSuccessPage;
