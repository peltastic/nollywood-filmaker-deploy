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

type Props = {};

export interface IWatchFinalCutState {
  movie_title: string;
  logline: string;
  genre: string;
  platform: string;
  link: string;
  concerns: string;
}

const page = (props: Props) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [scriptData, setScriptData] = useState<IWatchFinalCutState>({
    concerns: "",
    genre: "",
    link: "",
    logline: "",
    movie_title: "",
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
      router.push("/services/watch-final-cut");
    }
  }, []);
  return (
    <ServiceLayout nonDashboard>
      <div className="flex items-start">
        <ServiceLeft
          title="Watch the final cut of my film"
          image={<Image src={WatchFinalCutImage} alt="watch-final-cut" />}
          body={[
            {
              title: "Movie Title",
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
          <div className="w-[55%] text-black-2 px-[5rem] py-[5rem]">
            <PaymentWindow successRoute="/success-page/watch-final-cut" />
          </div>
        ) : (
          <ServiceRight
            subtitle="Lorem ipsum dolor sit amet consectetur adipisc."
            title="Let’s start with your details"
          >
            <WatchFinalCutForm
              proceed={() =>
                router.push("/services/watch-final-cut?page=payment")
              }
              disabled={
                !scriptData.movie_title ||
                !scriptData.genre ||
                !scriptData.platform ||
                !scriptData.concerns ||
                !scriptData.logline ||
                !scriptData.link
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

export default page;
