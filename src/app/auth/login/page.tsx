"use client";
import LeftSide from "@/components/Auth/LeftSide";
import LoginForm from "@/components/Forms/Auth/LoginForm";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { RootState } from "@/lib/store";
import Link from "next/link";
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
              <h1 className="text-[1.75rem]  font-bold ">Log in</h1>
              <Link href={"/auth/login-filmmaker-database"}>
                <h2 className="underline hover:text-blue-1 cursor-pointer">
                  Login to filmmaker database
                </h2>
              </Link>
            </div>

            <Link
              href={"/auth/register"}
              className="hover:opacity-80 hover:text-blue-1  transition-all hidden sm:block"
            >
              <p className="text-[1.25rem]">Create an account</p>
            </Link>
          </div>
          <div className="text-black-2 mt-[8rem]">
            <h1 className="font-bold text-[1.5rem]">Welcome back</h1>
          </div>
          <LoginForm
            login
            loginType="user"
            successRoute={
              service ? `/services/${service}` : "/get-started/service"
            }
          />
        </div>
      </div>
    </HomeLayout>
  );
};

export default LoginPage;
