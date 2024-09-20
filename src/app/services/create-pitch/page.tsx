"use client"
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreatePitchImg from "/public/assets/services/create-pitch.svg";
import Image from "next/image";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import ServiceRight from "@/components/Services/ServiceRight";
import CreatePitchForm from "@/components/Services/CustomForms/CreatePitchForm";

type Props = {};

export interface ICreatePitchState {
  movie_title: string;
  platform: string;
  actors_in_mind: string;
  crew_in_mind: string;
  visual: string;
  information: string;
  budget: string;
}

const CreatePitchPage = (props: Props) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [file, setFile] = useState<File | null>(null);
  const [scriptData, setScriptData] = useState<ICreatePitchState>({
    movie_title: "",
    actors_in_mind: "",
    budget: "",
    crew_in_mind: "",
    information: "",
    visual: "",
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
      router.push("/services/create-pitch");
    }
  }, []);
  return (
    <ServiceLayout>
      <div className="flex items-start">
        <ServiceLeft
          title="Create a production budget"
          image={<Image src={CreatePitchImg} alt="create-pitch" />}
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
          <div className="w-[55%] text-black-2 px-[5rem] py-[5rem]">
            <PaymentWindow successRoute="/success-page/create-pitch" />
          </div>
        ) : (
          <ServiceRight
            subtitle="Lorem ipsum dolor sit amet consectetur adipisc."
            title="Let’s start with your details"
          >
            <CreatePitchForm
              proceed={() => router.push("/services/create-pitch?page=payment")}
              disabled={
                !scriptData.movie_title ||
                !scriptData.actors_in_mind ||
                !scriptData.platform ||
                !scriptData.crew_in_mind ||
                !scriptData.budget ||
                !scriptData.visual ||
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

export default CreatePitchPage;
