"use client";
import LeftSide from "@/components/Auth/LeftSide";
import SecureAccount from "@/components/Auth/Register/SecureAccount";
import SelectExpertise from "@/components/Auth/Register/SelectExpertise";
import UserDetails from "@/components/Auth/Register/UserDetails";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Stepper from "@/components/Stepper/Stepper";
import { IRegisterdata } from "@/interfaces/auth/auth";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  const [page, setPage] = useState<string>("1");
  const [registerData, setRegisterData] = useState<IRegisterdata>({
    email: "",
    expertise: [],
    fname: "",
    lname: "",
    phone: "",
  });
  const setExpertiseHandler = (value: string, type: "add" | "remove") => {
    const data = [...registerData.expertise];
    if (type === "add") {
      data.push(value);
    } else {
      const index = registerData.expertise.indexOf(value);
      data.splice(index, 1);
    }
    setRegisterData({
      ...registerData,
      expertise: data,
    });
  };

  const setRegisterDataHandler = (key: string, value: string) => {
    setRegisterData({
      ...registerData,
      [key]: value,
    });
  };

  const setUserDetailsHandler = (data: {
    email: string;
    lname: string;
    fname: string;
    phone: string;
  }) => {
    setRegisterData({
      ...registerData,
      ...data,
    });
  };

  return (
    <HomeLayout>
      <div className="flex items-center py-6 px-3 sm:px-10">
        <LeftSide />
        <div className="w-full md:w-[95%] mx-auto xl:w-[55%] pl-2 md:pl-[5rem] pr-2 md:pr-[3rem]">
          <div className="flex items-center flex-wrap text-black-1">
            <h1 className="w-full sm:w-auto text-[1.75rem] mr-auto font-bold">
              Create an account
            </h1>
            <Link href={"/auth/login"} className="hover:text-blue-1 transition-all">
              <p className="text-[1.25rem]">Log in</p>
            </Link>
          </div>
          <div className="mt-[6rem]">
            <Stepper
              data={[
                {
                  label: "Your expertise",
                  value: "1",
                },
                {
                  label: "Your details",
                  value: "2",
                },
                {
                  label: "Secure your account",
                  value: "3",
                },
              ]}
              values={page}
            />
            {page === "1" ? (
              <SelectExpertise
                page={page}
                data={registerData.expertise}
                setExpertise={setExpertiseHandler}
                setPageProps={(val) => setPage(val)}
              />
            ) : page === "2" ? (
              <UserDetails
                setDataProps={setUserDetailsHandler}
                setPageProps={(val) => setPage(val)}
                data={registerData}
              />
            ) : (
              <SecureAccount
                data={registerData}
                setPageProps={(val) => setPage(val)}
              />
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default RegisterPage;
