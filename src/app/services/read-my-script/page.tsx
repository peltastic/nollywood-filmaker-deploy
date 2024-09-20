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
// import ServiceLeft  from "@/components/"

type Props = {};
export interface IReadMyScriptState {
  movie_title: string;
  logline: string;
  genre: string;
  platform: string;
  concerns: string;
}
const ReadMyScriptPage = (props: Props) => {
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
      router.push("/services/read-my-script");
    }
  }, []);
  return (
    <ServiceLayout>
      <div className="flex items-start">
        <ServiceLeft
          title="Read my script"
          image={<Image src={ReadMyScriptImg} alt="read-my-script" />}
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
          <div className="w-[55%] text-black-2 px-[5rem] py-[5rem]">
            <PaymentWindow successRoute="/success-page/read-my-script" />
          </div>
        ) : (
          <ServiceRight
            subtitle="Lorem ipsum dolor sit amet consectetur adipisc."
            title="Let’s start with your details"
          >
            {
              <ReadMyScriptForm
                proceed={() =>
                  router.push("/services/read-my-script?page=payment")
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
            }
          </ServiceRight>
        )}
      </div>
    </ServiceLayout>
  );
};

export default ReadMyScriptPage;
