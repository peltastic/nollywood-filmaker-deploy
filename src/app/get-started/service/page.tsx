"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import HomeLayout from "@/components/Layouts/HomeLayout";
import RadixSelect from "@/components/Select/RadixSelect";
import SelectComponent from "@/components/Select/SelectComponent";
import ServiceInfo from "@/components/ServiceInfo/ServiceInfo";
import { setFallbackRoute } from "@/lib/slices/routeSlice";
import { updateService } from "@/lib/slices/servicesSlice";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const ServicePage = (props: Props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string | null>(null);
  const [moreInfo, setMoreInfo] = useState<string>("");
  const service = useSelector(
    (state: RootState) => state.persistedState.services.service
  );
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.status
  );
  const router = useRouter();
  const serviceData = [
    {
      value: "read-my-script",
      label: "Read my Script and Advise",
      caption:
        "A chat session will be sent to discuss your script after review",
    },
    {
      value: "watch-final-cut",
      label: "Watch a cut of my Film and Advice",
      caption: "A chat session will be sent to discuss your film after review",
    },
    {
      value: "create-pitch-deck",
      label: "Create my Pitch Deck",
      caption:
        "You will receive an email when your document is ready for review",
    },
    {
      value: "production-budget",
      label: "Create my Production Budget",
      caption:
        "You will receive an email when your document is ready for review",
    },
    // {
    //   value: "marketing-budget",
    //   label: "Create my Marketing plan and budget",
    //   caption: "You will receive an email when your document is ready for review",
    // },
    {
      value: "create-teaser",
      label: "Create my Film's Teaser/Trailer",
      caption:
        "You will receive an email when your document is ready for review",
    },
    {
      value: "create-movie-schedule",
      label: "Create my Movie Schedule",
      caption:
        "You will receive an email when your document is ready for review",
    },
    {
      value: "draft-legal-documents",
      label: "Draft Legal documents",
      caption:
        "You will receive an email when your document is ready for review",
    },
  ];
  const setValueHandler = (value: string) => {
    setValue(value);
    dispatch(updateService(value));
  };
  return (
    <HomeLayout>
      <div className="text-black-2 w-[90%] md:w-[50%]   mx-auto mt-[10rem] mb-[10rem]  max-w-[45rem]">
        <h1 className=" text-[1.5rem] font-bold">
          What film related service do you need?
        </h1>
        <h3 className="font-medium text-[0.88rem] mt-10 mb-2">
          Choose your service
        </h3>
        <div className="block sm:hidden">
          <SelectComponent
            label=""
            placeholder="Select"
            size="md"
            setValueProps={(value) => {
              if (value) {
                const info = serviceData.filter((el) => el.value === value);
                setMoreInfo(`${info[0].caption.toLowerCase()}`);
                setValueHandler(value);
              } else {
                setMoreInfo("");
              }
            }}
            data={serviceData.map((el) => {
              return {
                label: el.label,
                value: el.value,
              };
            })}
          />
        </div>
        <div className="hidden sm:block">
          <RadixSelect changed={setValueHandler} data={serviceData} />
        </div>
        {moreInfo && (
          <div className="">
            <ServiceInfo content={moreInfo} activeColor />
          </div>
        )}
        <div className="w-full flex mt-[10rem]">
          <UnstyledButton
            clicked={() => router.back()}
            class="rounded-md px-4 border-stroke-2 border hover:border-black-3 duration-500"
          >
            Back
          </UnstyledButton>
          <UnstyledButton
            clicked={() => {
              if (authStatus === "LOGGED_OUT") {
                dispatch(setFallbackRoute(`/services/${service}`));
                notify(
                  "message",
                  "Login Required",
                  "You need to log in to use a service"
                );
                router.push("/auth/login");
              } else {
                router.push(`/services/${service}`);
              }
            }}
            disabled={!value}
            class="flex py-2 px-4 hover:bg-blue-1 duration-500 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
          >
            <p className="mr-2">Next</p>
            <FaArrowRight className="text-[0.7rem]" />
          </UnstyledButton>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ServicePage;
