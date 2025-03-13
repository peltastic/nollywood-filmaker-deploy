"use client";
import LeftSide from "@/components/Auth/LeftSide";
import LoginAsFilmmakerForm from "@/components/Forms/Auth/LoginAsFilmmakerForm";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const LoginPage = (props: Props) => {
  const service = useSelector(
    (state: RootState) => state.persistedState.services.service
  );
  return (
    <HomeLayout>
      <div className="flex items-center py-6 px-3 sm:px-10">
        <LeftSide />
        <div className="w-full md:w-[95%] mx-auto xl:w-[55%] pl-2 md:pl-[5rem] pr-2 md:pr-[5rem]">
          <div className="flex items-center text-black-2">
            <div className="mr-auto">
              <h1 className="text-[1.75rem]  font-bold ">
                Log in to the Filmmaker Database
              </h1>
              <h2 className=" cursor-pointer">
                Login to edit and view your filmmaker database profile
              </h2>
            </div>
          </div>

          <LoginAsFilmmakerForm />
        </div>
      </div>
    </HomeLayout>
  );
};

export default LoginPage;
