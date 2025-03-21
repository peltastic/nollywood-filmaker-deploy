"use client";
import HomeLayout from "@/components/Layouts/HomeLayout";
import React, { useState } from "react";
import Image from "next/image";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setFallbackRoute } from "@/lib/slices/routeSlice";
import { notify } from "@/utils/notification";
import FilmmakerDatabaseHeader from "@/components/FilmakerDatabase/FilmmakerDatabase";
import ChatWithProfessional from "/public/assets/services/chat-with-professional-yellow.svg";
import ReadMyScriptDark from "/public/assets/services/read-my-script-yellow.svg";

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
      <div className="mx-auto mt-[2rem] sm:mt-[5rem] w-auto">
        <div className="text-black-2 w-[90%] sm:w-[80%] lg:w-[55.6rem] mx-auto">
          <h1 className="font-bold text-[1.8rem] xs:text-[2.1rem] sm:text-[2.2rem] mid:text-[2.7rem] mb-[2rem] sm:mb-[4rem]">
            Welcome to Nollywood Filmmaker
          </h1>
          <h1 className="font-bold text-[1.2rem] mid:text-[1.5rem]">
            Let us help you make successful films
          </h1>
          <p className="text-[0.9rem] mid:text-[1.13rem]">
            You can choose one out of our many film-related services, set a chat
            date with one of our top-rated industry consultants and access the
            largest film crew and company database in Nigeria.
          </p>
        </div>
        <div className="flex flex-wrap  mt-10 gap-8 justify-center">
          <button
            onClick={() => {
              if (authStatus === "LOGGED_OUT") {
                dispatch(setFallbackRoute("/get-started"));
                notify(
                  "message",
                  "Login Required",
                  "You need to log in to use a service"
                );
                router.push("/auth/login");
              } else {
                router.push("/get-started/service");
              }
            }}
            className=" hover:text-yellow-1 hover:border-2 hover:border-yellow-1  hover:px-3  hover:shadow-2xl  hover:before:absolute hover:before:bottom-0  hover:before:top-0 hover:before:z-[-1] hover:before:h-full  hover:before:bg-black-9 hover:before:transition-all hover:before:duration-400  hover:before:left-0 hover:before:w-full border-stroke-2 before:w-0 before:left-0 text-black-2 rounded-md relative overflow-hiddentransition-all transition-all cursor-pointer border w-[90%] sm:w-[80%] lg:w-[26.6rem] flex items-center justify-center  h-[13.13rem]"
          >
            <div className="text-center">
              {selected === "service" ? (
                <div className="h-[3rem]"></div>
              ) : (
                <div className="h-[3.5rem] w-[3.5rem] mx-auto rounded-full flex justify-center bg-[#686513]">
                  <Image
                    src={ReadMyScriptDark}
                    alt="get-startedIcon"
                    className="w-[2rem] mx-auto"
                  />
                </div>
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
            onClick={() => {
              if (authStatus === "LOGGED_OUT") {
                dispatch(setFallbackRoute(`/get-started/`));
                notify(
                  "message",
                  "Login Required",
                  "You need to log in to use a service"
                );
                router.push("/auth/login");
              } else {
                router.push("/get-started/chat");
              }
            }}
            className={
              " hover:text-yellow-1 hover:border-2 hover:border-yellow-1  hover:px-3  hover:shadow-2xl  hover:before:absolute hover:before:bottom-0  hover:before:top-0 hover:before:z-[-1] hover:before:h-full  hover:before:bg-black-9 hover:before:transition-all hover:before:duration-400  hover:before:left-0 hover:before:w-full border-stroke-2 before:w-0 before:left-0 text-black-2 rounded-md relative overflow-hiddentransition-all transition-all cursor-pointer border w-[90%] sm:w-[80%] lg:w-[26.6rem] flex items-center justify-center h-[13.13rem]"
            }
          >
            <div className="text-center">
              {selected === "chat" ? (
                <div className="h-[3rem]"></div>
              ) : (
                <div className="h-[3.5rem] w-[3.5rem] mx-auto rounded-full flex justify-center bg-[#686513]">
                  <Image
                    src={ChatWithProfessional}
                    alt="get-startedIcon"
                    className="w-[2rem] mx-auto"
                  />
                </div>
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
        {selected ? (
          <div className="w-full flex mt-[10rem] mb-9 md:mb-0">
            <UnstyledButton
              clicked={() => setSelected(null)}
              class="rounded-md px-4 border-stroke-2 border hover:border-black-3 duration-500"
            >
              Back
            </UnstyledButton>
          </div>
        ) : null}
      </div>
      <div className="mt-16">
        <FilmmakerDatabaseHeader />
      </div>
    </HomeLayout>
  );
};

export default GetStartedPage;
