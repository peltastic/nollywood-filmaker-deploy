"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import ReadMyScriptForm from "@/components/Services/CustomForms/ReadMyScriptForm";
import ServiceLeft from "@/components/Services/ServiceLeft";
import ServiceRight from "@/components/Services/ServiceRight";
import ReadMyScriptImg from "/public/assets/services/read-my-script.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useInitializeReadMyScriptMutation } from "@/lib/features/users/services/services";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import { useDisclosure } from "@mantine/hooks";
import { nprogress } from "@mantine/nprogress";
import { initializeTransactionListener } from "@/lib/socket";
import { useServicePayment } from "@/hooks/useServicePayment";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { numberWithCommas } from "@/utils/helperFunction";

type Props = {};
export interface IReadMyScriptState {
  movie_title: string;
  logline: string;
  genre: string;
  platform: string;
  concerns: string;
  showType: string;
  episodes: string;
}
const ReadMyScriptPage = (props: Props) => {
  useProtectRoute();
  const [readMyScript, { data, isLoading, isSuccess, isError, error }] =
    useInitializeReadMyScriptMutation();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const [seriesPrices, setSeriesPrices] = useState<number[]>([]);
  const [seriesFiles, setSeriesFiles] = useState<File[]>([]);
  const [filesPageCount, setFilesPageCount] = useState<number[]>([]);
  const [opened, { close, open }] = useDisclosure();

  const { paymentStatus } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/read-my-script",
    close,
    data?.result.authorization_url,
    error
  );
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
    showType: "No",
    episodes: "",
  });
  const setScriptDataHandler = (key: string, value: string) => {
    setScriptData({
      ...scriptData,
      [key]: value,
    });
  };
  useEffect(() => {
    if (!scriptData.movie_title) {
      router.push("/services/read-my-script");
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
    setSeriesPrices((prev) => [...prev, ...prices]);
  };

  const removeSeriesFileData = (index: number) => {
    const filesData = [...seriesFiles];
    const pricesData = [...seriesPrices];
    const pageCountData = [...filesPageCount];

    filesData.splice(index, 1);
    pricesData.splice(index, 1);
    pageCountData.splice(index, 1);

    setFilesPageCount(pageCountData);
    setSeriesFiles(filesData);
    setSeriesPrices(pricesData);
  };

  return (
    <>
      {opened ? (
        <InitializingTransactionModal
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
          info="Script reading can take between 1-2 weeks. You will be mailed with
          calendar dates to choose a chat"
        />
      ) : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap items-start">
          <ServiceLeft
            cost={
              seriesPrices.length > 0
                ? numberWithCommas(
                    seriesPrices.reduce((acc, num) => acc + num, 0) * 1000
                  )
                : "150,000"
            }
            title="Read my script"
            image={<Image src={ReadMyScriptImg} alt="read-my-script" />}
            episodes={scriptData.episodes}
            files={seriesFiles}
            seriesPageCount={filesPageCount}
            series
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
                title: "Script",
                content: file?.name || "",
              },
              {
                title: "Concerns",
                content: scriptData.concerns,
              },
            ]}
          />
          {search === "payment" ? (
            <div className="w-full lg:w-[55%] text-black-2 px-[2rem] md:px-[5rem] py-[5rem]">
              <PaymentWindow successRoute="/success-page/read-my-script" />
            </div>
          ) : (
            <ServiceRight subtitle="" title="Let’s start with your details">
              {
                <ReadMyScriptForm
                  proceed={() => {
                    if (userId) {
                      readMyScript({
                        genre: scriptData.genre,
                        movie_title: scriptData.movie_title,
                        synopsis: scriptData.logline,
                        platforms: scriptData.platform,
                        userId: userId,
                        title: "Read my Script and advice",
                        concerns: scriptData.concerns,
                        type: "request",
                        files:
                          scriptData.showType === "Yes" ? seriesFiles : [file],
                        fileName: file?.name || "Series",
                        episodes: scriptData.episodes,
                        showtype: scriptData.showType,
                        pageCount: filesPageCount,
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
                    (scriptData.showType === "No" ? !file : !seriesFiles.length)
                    
                  }
                  setFileProps={(file) => setFile(file)}
                  setScriptProps={setScriptDataHandler}
                  data={scriptData}
                  fileName={file?.name}
                  files={seriesFiles}
                  isLoading={isLoading}
                  seriesPageCount={filesPageCount}
                  setSeriesPrices={setSeriesPricesHandler}
                  setSeriesFilesData={setSeriesFilesHandler}
                  setSeriesCount={setFilesPageCountHandler}
                  removeFileData={removeSeriesFileData}
                />
              }
            </ServiceRight>
          )}
        </div>
      </ServiceLayout>
    </>
  );
};

export default ReadMyScriptPage;
