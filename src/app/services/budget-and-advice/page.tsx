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
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useServicePayment } from "@/hooks/useServicePayment";
import { useInitializeBudgetAndAdviceMutation } from "@/lib/features/users/services/services";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { initializeTransactionListener } from "@/lib/socket";
import { nprogress } from "@mantine/nprogress";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import { useDisclosure } from "@mantine/hooks";

type Props = {};

const page = (props: Props) => {
  useProtectRoute();
  const [budgetAndAdvice, { data, isLoading, isSuccess, isError, error }] =
    useInitializeBudgetAndAdviceMutation();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [opened, { close, open }] = useDisclosure();
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

  const { paymentStatus } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/budget-and-advice",
    close,
    data?.result.authorization_url,
    error
  );

  useEffect(() => {
    if (!scriptData.movie_title) {
      router.push("/services/budget-and-advice");
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
          info="Budget Review  can take between 3-5 days. You will be mailed with calendar dates to choose a chat"
        />
      ) : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-wrap items-start">
          <ServiceLeft
            cost="150,000"
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
              subtitle=""
              title="Let’s start with your details"
            >
              <BudgetAndAdviceForm
                isLoading={isLoading}
                proceed={() => {
                  if (userId) {
                    budgetAndAdvice({
                      concerns: scriptData.concerns,
                      files: file,
                      genre: scriptData.genre,
                      movie_title: scriptData.movie_title,
                      platform: scriptData.platform,
                      synopsis: scriptData.logline,
                      title: "Look at my Budget and advice",
                      type: "request",
                      fileName: file?.name || "" ,
                      userId,
                    });
                    initializeTransactionListener(userId);
                    nprogress.start();
                    open();
                  }
                }}
                disabled={
                  !scriptData.movie_title ||
                  !scriptData.genre ||
                  !scriptData.platform ||
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
    </>
  );
};

export default page;
