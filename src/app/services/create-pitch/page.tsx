"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreatePitchImg from "/public/assets/services/create-pitch.svg";
import Image from "next/image";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import ServiceRight from "@/components/Services/ServiceRight";
import CreatePitchForm from "@/components/Services/CustomForms/CreatePitchForm";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useInitializeCreatePitchMutation } from "@/lib/features/users/services/services";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useDisclosure } from "@mantine/hooks";
import { useServicePayment } from "@/hooks/useServicePayment";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import { initializeTransactionListener } from "@/lib/socket";
import { nprogress } from "@mantine/nprogress";
import { numberWithCommas } from "@/utils/helperFunction";

type Props = {};

export interface ICreatePitchState {
  movie_title: string;
  platform: string;
  actors_in_mind: string;
  crew_in_mind: string;
  visual: string;
  information: string;
  budget: string;
  showType: string;
  episodes: string;
}

const CreatePitchPage = (props: Props) => {
  useProtectRoute();
  const [cost, setCost] = useState<number>(150000);
  const [createPitch, { data, isLoading, isSuccess, isError, error }] =
    useInitializeCreatePitchMutation();
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [file, setFile] = useState<File | null>(null);

  const [seriesPrices, setSeriesPrices] = useState<number[]>([]);
  const [seriesFiles, setSeriesFiles] = useState<File[]>([]);
  const [filesPageCount, setFilesPageCount] = useState<number[]>([]);
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const [opened, { close, open }] = useDisclosure();
  const [scriptData, setScriptData] = useState<ICreatePitchState>({
    movie_title: "",
    actors_in_mind: "",
    budget: "",
    crew_in_mind: "",
    information: "",
    visual: "",
    platform: "",
    episodes: "",
    showType: "No",
  });
  const { paymentStatus } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/create-pitch",
    close,
    data?.result.authorization_url,
    error
  );
  const setScriptDataHandler = (key: string, value: string) => {
    setScriptData({
      ...scriptData,
      [key]: value,
    });
  };
  useEffect(() => {
    if (!scriptData.movie_title) {
      router.push("/services/create-pitch");
    }
  }, []);
  useEffect(() => {
    if (paymentStatus === "pending") {
      open();
    }
  }, [paymentStatus]);

  const setSeriesFilesHandler = (files: File[]) => {
    setSeriesFiles((prev) => [...prev, ...files]);
  };
  const setFilesPageCountHandler = (counts: number[]) => {
    setFilesPageCount((prev) => [...prev, ...counts]);
  };
  const setSeriesPricesHandler = (prices: number[]) => {
    setSeriesPrices(prev => [...prev, ...prices])
  }

  const removeSeriesFileData = (index: number) => {
     const filesData = [...seriesFiles]
     const pricesData = [...seriesPrices]
     const pageCountData = [...filesPageCount]

     filesData.splice(index, 1)
     pricesData.splice(index, 1)
     pageCountData.splice(index, 1)

     setFilesPageCount(pageCountData)
     setSeriesFiles(filesData)
     setSeriesPrices(pricesData)
    }
  return (
    <>
      {opened ? (
        <InitializingTransactionModal
          info="Pitch deck Creation  can take between 1-2 weeks. You will be mailed with an editable pitch deck and a calendar to choose a chat date"
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
        />
      ) : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap items-start">
          <ServiceLeft
            title="Create a Movie Schedule"
            cost={
              seriesPrices.length > 0
                ? numberWithCommas(
                    seriesPrices.reduce((acc, num) => acc + num, 0) * 1000
                  )
                : "150,000"
            }
            image={<Image src={CreatePitchImg} alt="create-pitch" />}
            episodes={scriptData.episodes}
            files={seriesFiles}
            seriesPageCount={filesPageCount}
            series
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
                content: scriptData.visual,
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
              <PaymentWindow successRoute="/success-page/create-pitch" />
            </div>
          ) : (
            <ServiceRight subtitle="" title="Let’s start with your details">
              <CreatePitchForm
                proceed={() => {
                  if (userId) {
                    createPitch({
                      actors: scriptData.actors_in_mind,
                      budgetrange: scriptData.budget,
                      crew: scriptData.crew_in_mind,
                      files:
                        scriptData.showType === "Yes" ? seriesFiles : [file],
                      info: scriptData.information,
                      movie_title: scriptData.movie_title,
                      platform: scriptData.platform,
                      title: "Creating A Movie Schedule",
                      type: "request",
                      userId,
                      showtype: scriptData.showType,
                      episodes: scriptData.episodes,
                      visualStyle: scriptData.visual,
                      fileName: file?.name || "",
                      pageCount: filesPageCount,
                    });
                    initializeTransactionListener(userId);
                    nprogress.start();
                    open();
                  }
                }}
                disabled={
                  !scriptData.movie_title ||
                  !scriptData.platform ||
                  !scriptData.visual ||
                  (scriptData.showType === "No" ? !file : !seriesFiles.length)
                }
                isLoading={isLoading}
                setFileProps={(file) => setFile(file)}
                setScriptProps={setScriptDataHandler}
                data={scriptData}
                fileName={file?.name}
                setCost={(val) => setCost(val)}
                files={seriesFiles}
                seriesPageCount={filesPageCount}
                setSeriesPrices={setSeriesPricesHandler}
                setSeriesFilesData={setSeriesFilesHandler}
                setSeriesCount={setFilesPageCountHandler}
                removeFileData={removeSeriesFileData}
              />
            </ServiceRight>
          )}
        </div>
      </ServiceLayout>
    </>
  );
};

export default CreatePitchPage;
