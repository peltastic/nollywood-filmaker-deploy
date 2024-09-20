"use client"
import UnstyledButton from "@/components/Button/UnstyledButton";
import HomeLayout from "@/components/Layouts/HomeLayout";
import RadixSelect from "@/components/Select/RadixSelect";
import { updateService } from "@/lib/slices/servicesSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

type Props = {};

const ServicePage = (props: Props) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string | null>(null)
  const router = useRouter()
  const serviceData = [
    {
      value: "read-my-script",
      label: "Read my Script and advice",
      caption: "Requires chat after upload",
    },
    {
      value: "watch-final-cut",
      label: "Watch the Final cut of my film and advice",
      caption: "Requires chat after upload",
    },
    {
      value: "budget-and-advice",
      label: "Look at my Budget and advice",
      caption: "Requires chat after upload",
    },
    {
      value: "production-budget",
      label: "Create a Production budget",
      caption: "Sent via email as download link",
    },
    {
      value: "marketing-budget",
      label: "Create a Marketing budget",
      caption: "sent via email as download link"
    },
    {
      value: "create-pitch",
      label: "Create a Pitch based on my Script",
      caption: "sent via email as download link"
    },
    {
      value: "draft-legal-documents",
      label: "Draft Legal documents",
      caption: "sent via email as download link"
    },
  ];
  const setValueHandler = (value: string) => {
    setValue(value)
    dispatch(updateService(value))
  }
  return (
    <HomeLayout>
      <div className="text-black-2 w-[50%] mx-auto mt-[10rem] mb-[10rem]">
        <h1 className=" text-[1.5rem] font-bold">What service do you need?</h1>
        <h2 className="text-[1.13rem]">
          Lorem ipsum dolor sit amet consectetur adipisc.
        </h2>
        <h3 className="font-medium text-[0.88rem] mt-10 mb-2">Choose your service</h3>
        <RadixSelect changed={setValueHandler} data={serviceData} />
        <div className="w-full flex mt-[10rem]">
         
            <UnstyledButton
              clicked={() => router.back() }
              class="rounded-md px-4 border-stroke-2 border"
            >
              Back
            </UnstyledButton>
          <UnstyledButton
            clicked={() => router.push("/")}
            disabled={!value}
            class="flex py-2 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
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
