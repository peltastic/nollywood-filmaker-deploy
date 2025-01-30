"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MarketingBudgetImg from "/public/assets/services/marketing-budget.svg";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import ServiceRight from "@/components/Services/ServiceRight";
import MarketingBudgetForm from "@/components/Services/CustomForms/MarketingBudgetForm";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useServicePayment } from "@/hooks/useServicePayment";
import { useInitializeCreateMarketingBudgetMutation } from "@/lib/features/users/services/services";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { initializeTransactionListener } from "@/lib/socket";
import { nprogress } from "@mantine/nprogress";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";

type Props = {};

export interface IMarketingBudgetState {
  movie_title: string;
  film_link: string;
  platform: string;
  target_social: string;
  target_ooh: string;
  budget: string;
  showType: string;
  episodes: string;
}

const MarketingBudget = (props: Props) => {
  useProtectRoute();
  const [
    createMarketingBudget,
    { data, isLoading, isSuccess, isError, error },
  ] = useInitializeCreateMarketingBudgetMutation();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [opened, { close, open }] = useDisclosure();
  const [scriptData, setScriptData] = useState<IMarketingBudgetState>({
    movie_title: "",
    film_link: "",
    budget: "",
    platform: "",
    target_ooh: "",
    target_social: "",
    episodes: "",
    showType: ""
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
    "/success-page/marketing-budget",
    close,
    data?.result.authorization_url,
    error
  );
  useEffect(() => {
    if (!scriptData.movie_title) {
      router.push("/services/marketing-budget");
    }
  }, []);
  useEffect(() => {
    if (paymentStatus === "pending") {
      open();
    }
  }, [paymentStatus]);
  return (
    <>
      {opened ? (
        <InitializingTransactionModal
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
          info="Budget Creation  can take between 1-2 weeks. You will be mailed a link to a detailed, editable budget and a calendar to choose a chat date"
        />
      ) : null}

      <ServiceLayout nonDashboard>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap items-start">
          <ServiceLeft
            cost="250,000"
            title="Create a marketing budget"
            image={<Image src={MarketingBudgetImg} alt="production-budget" />}
            body={[
              {
                title: "Movie title",
                content: scriptData.movie_title,
              },

              {
                title: "Film link",
                content: scriptData.film_link,
              },
              {
                title: "Platform for exhibition",
                content: scriptData.platform,
              },
              {
                title: "Target Social media platforms",
                content: scriptData.target_social,
              },
              {
                title: "Target OOH platforms",
                content: scriptData.target_ooh,
              },

              {
                title: "Budget Range",
                content: scriptData.budget,
              },
            ]}
          />
          {search === "payment" ? (
            <div className="w-[55%] text-black-2 px-[5rem] py-[5rem]">
              <PaymentWindow successRoute="/success-page/marketing-budget" />
            </div>
          ) : (
            <ServiceRight
              subtitle=""
              title="Let’s start with your details"
            >
              <MarketingBudgetForm
                proceed={() => {
                  if (userId) {
                    createMarketingBudget({
                      budgetrange: scriptData.budget,
                      link: scriptData.film_link,
                      movie_title: scriptData.movie_title,
                      ooh: scriptData.target_ooh,
                      platform: scriptData.platform,
                      social: scriptData.target_social,
                      title: "Create a Marketing budget",
                      showtype: scriptData.showType,
                      episodes: scriptData.episodes,
                      type: "request",
                      userId,
                    });
                    initializeTransactionListener(userId);
                    nprogress.start();
                    open();
                  }
                }}
                disabled={
                  !scriptData.movie_title ||
                  !scriptData.film_link ||
                  !scriptData.platform ||
                  !scriptData.budget
                }
                isLoading={isLoading}
                setScriptProps={setScriptDataHandler}
                data={scriptData}
              />
            </ServiceRight>
          )}
        </div>
      </ServiceLayout>
    </>
  );
};

export default MarketingBudget;
