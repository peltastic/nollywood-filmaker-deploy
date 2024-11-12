"use client";
import HomeLayout from "@/components/Layouts/HomeLayout";
import React, { useState } from "react";
import GetStartedIcon from "/public/assets/get-started/get-started-icon.png";
import Image from "next/image";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setFallbackRoute } from "@/lib/slices/routeSlice";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";

type Props = {};

const GetStartedPage = (props: Props) => {
  const [selected, setSelected] = useState<"service" | "chat" | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.status
  );

  return (
    <HomeLayout>
      <div className="mx-auto md:absolute mt-[5rem] w-[80%] sm:w-[60%] md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:left-1/2 md:top-1/2">
        <div className="text-black-2">
          <h1 className="font-bold text-[1.5rem] mb-[4rem]">Welcome</h1>
          <h1 className="font-bold text-[1.5rem]">What do you want to do?</h1>
          <p className="text-[1.13rem]">
            Lorem ipsum dolor sit amet consectetur adipisc.
          </p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap mt-10 gap-8">
          <button
            onClick={() => setSelected("service")}
            className={`${
              selected === "service"
                ? " text-yellow-1  rounded-md  relative overflow-hidden border-2 border-yellow-1  px-3  shadow-2xl transition-all before:absolute before:bottom-0  before:top-0 before:z-[-1] before:h-full  before:bg-black-9 before:transition-all before:duration-400  before:left-0 before:w-full"
                : "border-stroke-2 before:w-0 before:left-0 text-black-2"
            } transition-all cursor-pointer border w-full md:w-[18.6rem] flex items-center justify-center rounded-md h-[9.13rem]`}
          >
            <div className="text-center">
              {selected === "service" ? (
                <div className="h-[3rem]"></div>
              ) : (
                <Image
                  src={GetStartedIcon}
                  alt="get-startedIcon"
                  className="w-[3rem] mx-auto"
                />
              )}
              <p
                className={`transition-all ${
                  selected === "service" ? "-translate-y-[18px]" : null
                } text-[1.13rem] mt-1 font-medium`}
              >
                Request a service
              </p>
            </div>
          </button>
          <button
            onClick={() => setSelected("chat")}
            className={`${
              selected === "chat"
                ? " text-yellow-1  rounded-md  relative overflow-hidden border-2 border-yellow-1  px-3  shadow-2xl transition-all before:absolute before:bottom-0  before:top-0 before:z-[-1] before:h-full  before:bg-black-9 before:transition-all before:duration-400  before:left-0 before:w-full"
                : "border-stroke-2 before:w-0 before:left-0 text-black-2"
            } transition-all cursor-pointer border w-full md:w-[18.6rem] flex items-center justify-center rounded-md h-[9.13rem]`}
          >
            <div className="text-center">
              {selected === "chat" ? (
                <div className="h-[3rem]"></div>
              ) : (
                <Image
                  src={GetStartedIcon}
                  alt="get-startedIcon"
                  className="w-[3rem] mx-auto"
                />
              )}
              <p
                className={`transition-all ${
                  selected === "chat" ? "-translate-y-[18px]" : null
                } text-[1.13rem] mt-1 font-medium`}
              >
                Chat with a professional
              </p>
            </div>
          </button>
        </div>
        <div className="w-full flex mt-[10rem] mb-9 md:mb-0">
          {selected ? (
            <UnstyledButton
              clicked={() => setSelected(null)}
              class="rounded-md px-4 border-stroke-2 border hover:border-black-3 duration-500"
            >
              Back
            </UnstyledButton>
          ) : null}
          <UnstyledButton
            clicked={() => {
              nprogress.start();
              if (selected === "service") {
                nprogress.complete();
                router.push("/get-started/service");
              } else {
                if (authStatus === "LOGGED_OUT") {
                  dispatch(setFallbackRoute(`/get-started/chat`));
                  notify(
                    "message",
                    "Login Required",
                    "You need to log in to use a service"
                  );
                  nprogress.complete();
                  router.push("/auth/login");
                } else {
                  nprogress.complete();
                  router.push("/get-started/chat");
                }
              }
            }}
            disabled={!selected}
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

export default GetStartedPage;
