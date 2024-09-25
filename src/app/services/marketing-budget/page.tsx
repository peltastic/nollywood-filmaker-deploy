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

type Props = {};

export interface IMarketingBudgetState {
  movie_title: string;
  film_link: string;
  platform: string;
  target_social: string;
  target_ooh: string;
  budget: string;
}

const MarketingBudget = (props: Props) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [scriptData, setScriptData] = useState<IMarketingBudgetState>({
    movie_title: "",
    film_link: "",
    budget: "",
    platform: "",
    target_ooh: "",
    target_social: "",
  });
  const setScriptDataHandler = (key: string, value: string) => {
    setScriptData({
      ...scriptData,
      [key]: value,
    });
  };
  useEffect(() => {
    if (!scriptData.movie_title) {
      router.push("/services/marketing-budget");
    }
  }, []);
  return (
    <ServiceLayout nonDashboard>
      <div className="flex items-start">
        <ServiceLeft
          title="Create a production budget"
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
            subtitle="Lorem ipsum dolor sit amet consectetur adipisc."
            title="Let’s start with your details"
          >
            <MarketingBudgetForm
              proceed={() =>
                router.push("/services/marketing-budget?page=payment")
              }
              disabled={
                !scriptData.movie_title ||
                !scriptData.film_link ||
                !scriptData.platform ||
                !scriptData.target_ooh ||
                !scriptData.budget ||
                !scriptData.target_social
              }
              setScriptProps={setScriptDataHandler}
              data={scriptData}
            />
          </ServiceRight>
        )}
      </div>
    </ServiceLayout>
  );
};

export default MarketingBudget;
