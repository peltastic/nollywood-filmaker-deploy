"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BudgetAndAdviceImg from "/public/assets/services/budget-and-advice.svg";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import Image from "next/image";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import ServiceRight from "@/components/Services/ServiceRight";
import BudgetAndAdviceForm from "@/components/Services/CustomForms/BudgetAndAdviceForm";
import { IReadMyScriptState } from "../read-my-script/page";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [file, setFile] = useState<File | null>(null);
  const [scriptData, setScriptData] = useState<IReadMyScriptState>({
    movie_title: "",
    concerns: "",
    genre: "",
    logline: "",
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
      router.push("/services/budget-and-advice");
    }
  }, []);
  return (
    <ServiceLayout>
      <div className="flex items-start">
        <ServiceLeft
          title="Look at my budget"
          image={<Image src={BudgetAndAdviceImg} alt="budget-and-advice" />}
          body={[
            { title: "Movie title", content: scriptData.movie_title },
            {
              title: "Logline / Synopsis",
              content: scriptData.logline,
            },
            {
              title: "Genre",
              content: scriptData.genre,
            },
            {
              title: "Platform for Exhibition",
              content: scriptData.platform,
            },
            {
              title: "Upload your budget",
              content: file?.name || "",
            },
            {
              title: "Concerns",
              content: scriptData.concerns,
            },
          ]}
        />
        {search === "payment" ? (
          <div className="w-[55%] text-black-2 px-[5rem] py-[5rem]">
            <PaymentWindow successRoute="/success-page/budget-and-advice" />
          </div>
        ) : (
          <ServiceRight
            subtitle="Lorem ipsum dolor sit amet consectetur adipisc."
            title="Let’s start with your details"
          >
            <BudgetAndAdviceForm
              proceed={() =>
                router.push("/services/budget-and-advice?page=payment")
              }
              disabled={
                !scriptData.movie_title ||
                !scriptData.genre ||
                !scriptData.platform ||
                !scriptData.concerns ||
                !scriptData.logline ||
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

export default page;
