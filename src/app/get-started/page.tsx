"use client";
import HomeLayout from "@/components/Layouts/HomeLayout";
import React, { useState } from "react";
import GetStartedIcon from "/public/assets/get-started/get-started-icon.png";
import Image from "next/image";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {};

const GetStartedPage = (props: Props) => {
  const [selected, setSelected] = useState<"service" | "chat" | null>(null);
  const router = useRouter();

  return (
    <HomeLayout>
      <div className="absolute mt-[5rem] w-[80%] sm:w-[60%] md:w-auto -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div className="text-black-2">
          <h1 className="font-bold text-[1.5rem] mb-[4rem]">Welcome</h1>
          <h1 className="font-bold text-[1.5rem]">What do you want to do?</h1>
          <p className="text-[1.13rem]">
            Lorem ipsum dolor sit amet consectetur adipisc.
          </p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap mt-10 gap-8">
          <div
            onClick={() => setSelected("service")}
            className={`${
              selected === "service" ? "border-black-3" : "border-stroke-2"
            } transition-all cursor-pointer border w-full md:w-[18.6rem] flex items-center justify-center rounded-md h-[9.13rem]`}
          >
            <div className="text-center">
              <Image
                src={GetStartedIcon}
                alt="get-startedIcon"
                className="w-[3rem] mx-auto"
              />
              <p className="text-black-2 text-[1.13rem] mt-1 font-medium">
                Request a service
              </p>
            </div>
          </div>
          <div
            onClick={() => setSelected("chat")}
            className={`${
              selected === "chat" ? "border-black-3" : "border-stroke-2"
            } transition-all cursor-pointer border w-full md:w-[18.6rem] flex items-center justify-center rounded-md h-[9.13rem] `}
          >
            <div className="text-center">
              <Image
                src={GetStartedIcon}
                alt="get-startedIcon"
                className="w-[3rem] mx-auto"
              />
              <p className="text-black-2 text-[1.13rem] mt-1 font-medium">
                Chat with a professional
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-[10rem]">
          {selected ? (
            <UnstyledButton
              clicked={() => setSelected(null)}
              class="rounded-md px-4 border-stroke-2 border"
            >
              Back
            </UnstyledButton>
          ) : null}
          <UnstyledButton
            clicked={() => router.push(selected === "service" ? "/get-started/service" : "/get-started/chat")}
            disabled={!selected}
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

export default GetStartedPage;
