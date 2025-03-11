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
import { numberWithCommas } from "@/utils/helperFunction";

type Props = {};

export interface IProductionBudgetState {
  movie_title: string;
  platform: string;
  actors_in_mind: string;
  // crew_in_mind: string;
  number_of_days: string;
  information: string;
  budget: string;
  showType: string;
  episodes: string;
}

const ProductionBudgetPage = (props: Props) => {
  const [cost, setCost] = useState<number>(250000);
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
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [opened, { close, open }] = useDisclosure();
  const [scriptData, setScriptData] = useState<IProductionBudgetState>({
    movie_title: "",
    actors_in_mind: "",
    budget: "",
    // crew_in_mind: "",
    information: "",
    number_of_days: "",
    platform: "",
    episodes: "",
    showType: "",
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
  }, [paymentStatus, isSuccess]);

  const setFilesHandler = (
    file: File[],
    index: number,
    type: "update" | "delete" | "add"
  ) => {
    if (files) {
      if (type === "update") {
        const copiedVal = [...files];
        copiedVal.splice(index, 1, file[0]);
        setFiles(copiedVal);
      } else if (type === "delete") {
        const copiedVal = [...files];
        copiedVal.splice(index, 1);
        setFiles(copiedVal);
      } else {
        setFiles((prev) => [...prev, ...file]);
      }
    }
  };
  return (
    <>
      {opened ? (
        <InitializingTransactionModal
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
          close={close}
          info="Budget Creation can take between 1-2 weeks. you will contacted via email if more info is needed during the course of the budget creation and a final editable budget will be sent to your dashboard"
        />
      ) : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap items-start">
          <ServiceLeft
            cost={
              scriptData.showType === "Yes"
                ? numberWithCommas(
                    Number(
                      Number(scriptData.episodes) <= 5
                        ? "250000"
                        : Number(scriptData.episodes) > 5 &&
                          Number(scriptData.episodes) <= 10
                        ? "350000"
                        : Number(scriptData.episodes) > 10 &&
                          Number(scriptData.episodes) <= 15
                        ? "450000"
                        : Number(scriptData.episodes) > 15 &&
                          Number(scriptData.episodes) <= 20
                        ? "500000"
                        : Number(scriptData.episodes) > 20 &&
                          Number(scriptData.episodes) <= 25
                        ? "550000"
                        : "600000"
                    )
                  )
                : numberWithCommas(cost)
            }
            title="Create a production budget"
            image={<Image src={ProductionBudgetImg} alt="production-budget" />}
            body={[
              {
                title: "Working title",
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
              // {
              //   title: "Key Crew in mind",
              //   content: scriptData.crew_in_mind,
              // },
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
            <ServiceRight subtitle="" title="Let’s start with your details">
              <ProductionBudgetForm
                proceed={() => {
                  if (userId) {
                    createProductionBudget({
                      budgetrange: scriptData.budget,
                      // crews: scriptData.crew_in_mind,
                      shootdays: scriptData.number_of_days,
                      files:
                        scriptData.showType === "Yes"
                          ? files
                          : file
                          ? [file]
                          : [],
                      movie_title: scriptData.movie_title,
                      platform: scriptData.platform,
                      title: "Create a Production budget",
                      actors: scriptData.actors_in_mind,
                      info: scriptData.information,
                      userId,
                      type: "request",
                      fileName: file?.name || "",
                      showtype: scriptData.showType,
                      episodes: scriptData.episodes,
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
                  (scriptData.showType === "Yes" && files.length < 1) ||
                  (scriptData.showType === "No" && !file) ||
                  (scriptData.showType === "Yes" &&
                    Number(scriptData.episodes) < 1)
                }
                files={files}
                setFilesProps={setFilesHandler}
                isLoading={isLoading}
                setFileProps={(file) => setFile(file)}
                setScriptProps={setScriptDataHandler}
                updateCost={(value) => setCost(value)}
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
