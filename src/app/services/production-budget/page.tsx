"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductionBudgetImg from "/public/assets/services/production-budget.svg";
import Image from "next/image";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import ServiceRight from "@/components/Services/ServiceRight";
import ProductionBudgetForm from "@/components/Services/CustomForms/ProductionBudgetForms";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useInitializeCreateProductionBudgetMutation } from "@/lib/features/users/services/services";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useServicePayment } from "@/hooks/useServicePayment";
import { useDisclosure } from "@mantine/hooks";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import { initializeTransactionListener } from "@/lib/socket";
import { nprogress } from "@mantine/nprogress";

type Props = {};

export interface IProductionBudgetState {
  movie_title: string;
  platform: string;
  actors_in_mind: string;
  crew_in_mind: string;
  number_of_days: string;
  information: string;
  budget: string;
}

const ProductionBudgetPage = (props: Props) => {
  useProtectRoute();
  const [
    createProductionBudget,
    { data, isLoading, isSuccess, isError, error },
  ] = useInitializeCreateProductionBudgetMutation();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [file, setFile] = useState<File | null>(null);
  const [opened, { close, open }] = useDisclosure();
  const [scriptData, setScriptData] = useState<IProductionBudgetState>({
    movie_title: "",
    actors_in_mind: "",
    budget: "",
    crew_in_mind: "",
    information: "",
    number_of_days: "",
    platform: "",
  });
  const setScriptDataHandler = (key: string, value: string) => {
    setScriptData({
      ...scriptData,
      [key]: value,
    });
  };
  const { paymentStatus } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/production-budget",
    close,
    data?.result.authorization_url,
    error
  );
  useEffect(() => {
    if (!scriptData.movie_title) {
      router.push("/services/production-budget");
    }
  }, []);
  useEffect(() => {
    if (paymentStatus === "pending") {
      open();
    }
  }, [paymentStatus]);
  return (
    <>
      {opened ? <InitializingTransactionModal status={paymentStatus} /> : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-wrap items-start">
          <ServiceLeft
            cost="95,000"
            title="Create a production budget"
            image={<Image src={ProductionBudgetImg} alt="production-budget" />}
            body={[
              {
                title: "Movie title",
                content: scriptData.movie_title,
              },
              {
                title: "Upload your script",
                content: file?.name || "",
              },
              {
                title: "Platform for exhibition",
                content: scriptData.platform,
              },
              {
                title: "Key actors in mind",
                content: scriptData.actors_in_mind,
              },
              {
                title: "Key Crew in mind",
                content: scriptData.crew_in_mind,
              },
              {
                title: "Number of days",
                content: scriptData.number_of_days,
              },
              {
                title: "Relevant information",
                content: scriptData.information,
              },
              {
                title: "Budget Range",
                content: scriptData.budget,
              },
            ]}
          />
          {search === "payment" ? (
            <div className="w-full lg:w-[55%] text-black-2 px-[2rem] md:px-[5rem] py-[5rem]">
              <PaymentWindow successRoute="/success-page/production-budget" />
            </div>
          ) : (
            <ServiceRight
              subtitle="Lorem ipsum dolor sit amet consectetur adipisc."
              title="Let’s start with your details"
            >
              <ProductionBudgetForm
                proceed={() => {
                  if (userId) {
                    createProductionBudget({
                      budgetrange: scriptData.budget,
                      crews: scriptData.crew_in_mind,
                      days: scriptData.number_of_days,
                      files: file,
                      movie_title: scriptData.movie_title,
                      platform: scriptData.platform,
                      title: "Create a Production budget",
                      actors: scriptData.actors_in_mind,
                      info: scriptData.information,
                      userId,
                      type: "request",
                    });
                    initializeTransactionListener(userId);
                    nprogress.start();
                    open();
                  }
                }}
                disabled={
                  !scriptData.movie_title ||
                  !scriptData.platform ||
                  !scriptData.number_of_days ||
                  !scriptData.budget ||
                  !file
                }
                isLoading={isLoading}
                setFileProps={(file) => setFile(file)}
                setScriptProps={setScriptDataHandler}
                data={scriptData}
                fileName={file?.name}
              />
            </ServiceRight>
          )}
        </div>
      </ServiceLayout>
    </>
  );
};

export default ProductionBudgetPage;
