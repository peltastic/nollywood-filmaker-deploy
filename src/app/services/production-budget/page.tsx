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
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [file, setFile] = useState<File | null>(null);
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
  useEffect(() => {
    if (!scriptData.movie_title) {
      router.push("/services/production-budget");
    }
  }, []);
  return (
    <ServiceLayout>
      <div className="flex items-start">
        <ServiceLeft
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
          <div className="w-[55%] text-black-2 px-[5rem] py-[5rem]">
            <PaymentWindow successRoute="/success-page/production-budget" />
          </div>
        ) : (
          <ServiceRight
            subtitle="Lorem ipsum dolor sit amet consectetur adipisc."
            title="Let’s start with your details"
          >
            <ProductionBudgetForm
              proceed={() =>
                router.push("/services/production-budget?page=payment")
              }
              disabled={
                !scriptData.movie_title ||
                !scriptData.actors_in_mind ||
                !scriptData.platform ||
                !scriptData.crew_in_mind ||
                !scriptData.budget ||
                !scriptData.number_of_days ||
                !scriptData.information ||
                !file
              }
              setFileProps={(file) => setFile(file)}
              setScriptProps={setScriptDataHandler}
              data={scriptData}
              fileName={file?.name}
            />
          </ServiceRight>
        )}
      </div>
    </ServiceLayout>
  );
};

export default ProductionBudgetPage;
