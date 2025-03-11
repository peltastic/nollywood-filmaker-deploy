"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import React, { useEffect, useState } from "react";
import WatchFinalCutImage from "/public/assets/services/watch-final-cut.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import ServiceRight from "@/components/Services/ServiceRight";
import WatchFinalCutForm from "@/components/Services/CustomForms/WatchFinalCutForm";
import { useInitializeWatchFinalCutMutation } from "@/lib/features/users/services/services";
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

export interface IWatchFinalCutState {
  movie_title: string;
  logline: string;
  genre: string;
  platform: string;
  link: string;
  concerns: string;
  showType: string;
  episodes: string;
  stage: string;
}

const page = (props: Props) => {
  useProtectRoute();
  const [watchFinalCut, { data, isLoading, isSuccess, isError, error }] =
    useInitializeWatchFinalCutMutation();
  const [opened, { close, open }] = useDisclosure();
  const { paymentStatus } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/watch-final-cut",
    close,
    data?.result.authorization_url,
    error
  );
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );

  const [scriptData, setScriptData] = useState<IWatchFinalCutState>({
    concerns: "",
    genre: "",
    link: "",
    logline: "",
    movie_title: "",
    platform: "",
    episodes: "",
    showType: "",
    stage: "",
  });
  const setScriptDataHandler = (key: string, value: string) => {
    setScriptData({
      ...scriptData,
      [key]: value,
    });
  };
  useEffect(() => {
    if (!scriptData.movie_title) {
      router.push("/services/watch-final-cut");
    }
  }, []);
  useEffect(() => {
    if (paymentStatus === "pending") {
      console.log("open");
      open();
    }
  }, [paymentStatus, isSuccess]);

  return (
    <>
      {opened ? (
        <InitializingTransactionModal
          close={close}
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
          info="Final Cut watch can take between 3-5 days. You will be mailed with calendar dates to choose a chat"
        />
      ) : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap items-start">
          <ServiceLeft
            cost={
              scriptData.showType === "Yes"
                ? numberWithCommas(Number(scriptData.episodes) * 50000)
                : "150,000"
            }
            title="Watch the final cut of my film"
            image={<Image src={WatchFinalCutImage} alt="watch-final-cut" />}
            body={[
              {
                title: "Working Title",
                content: scriptData.movie_title,
              },
              {
                title: "Logline / Synopsis",
                content: scriptData.logline,
              },
              {
                title: "Genre",
                content: scriptData.genre,
              },
              {
                title: "Platform from Exhibition",
                content: scriptData.platform,
              },
              {
                title: "Share a link",
                content: scriptData.link,
              },
              {
                title: "Concerns",
                content: scriptData.concerns,
              },
            ]}
          />
          {search === "payment" ? (
            <div className="w-full lg:w-[55%] text-black-2 px-[2rem] md:px-[5rem] py-[5rem]">
              <PaymentWindow successRoute="/success-page/watch-final-cut" />
            </div>
          ) : (
            <ServiceRight subtitle="" title="Let’s start with your details">
              <WatchFinalCutForm
                proceed={() => {
                  if (userId) {
                    watchFinalCut({
                      concerns: scriptData.concerns,
                      genre: scriptData.genre,
                      link: scriptData.link,
                      platform: scriptData.platform,
                      synopsis: scriptData.logline,
                      title: "Watch the Final cut of my film and advice",
                      movie_title: scriptData.movie_title,
                      type: "request",
                      showtype: scriptData.showType,
                      episodes: scriptData.episodes,
                      userId,
                      stage: scriptData.stage,
                    });
                    initializeTransactionListener(userId);
                    nprogress.start();
                    open();
                  }
                }}
                isLoading={isLoading}
                disabled={
                  !scriptData.movie_title ||
                  !scriptData.genre ||
                  !scriptData.platform ||
                  !scriptData.logline ||
                  !scriptData.link ||
                  (scriptData.showType === "Yes" &&
                    Number(scriptData.episodes) < 1)
                }
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

export default page;
