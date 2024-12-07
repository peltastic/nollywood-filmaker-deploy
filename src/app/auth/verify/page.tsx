"use client";
import LeftSide from "@/components/Auth/LeftSide";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import LoadingLottie from "@/components/Lottie/loading.json";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { useLazyVerifyEmailQuery } from "@/lib/features/users/auth/auth";

type Props = {};

const VerifyEmail = (props: Props) => {
    const router =  useRouter()
  const [verifyEmail, { isLoading, isSuccess, isError }] =
    useLazyVerifyEmailQuery();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState<string>("Hold on a few seconds...");
  const search = useSearchParams();

  const searchVal = search.get("vtoken");

  useEffect(() => {
    if (searchVal) {
      verifyEmail(searchVal);
    }
  }, [searchVal]);
  useEffect(() => {
    if (isSuccess) {
      setStatus("success");
      setMessage("Email verified successfully!");
    } else if (isError) {
      setStatus("error");
      setMessage("Email verification failed! ")
    }
  }, [isSuccess, isError]);

  return (
    <HomeLayout>
      <div className="flex items-center py-6 px-3 sm:px-10">
        <LeftSide />
        <div className="w-full  md:w-[95%] mx-auto xl:w-[55%] pl-2 md:pl-[5rem] pr-2 md:pr-[3rem]">
          {status === "loading" ? (
            <div className="w-[5rem] mx-auto">
              <Lottie animationData={LoadingLottie} loop />
            </div>
          ) : status === "success" ? (
            <FaCircleCheck className="mx-auto text-[5rem] text-green-600" />
          ) : (
            <MdCancel className="mx-auto text-[5rem] text-red-500" />
          )}
          <p className="text-center mt-6">{message}</p>
          {status === "success" && (
            <div className="flex justify-center">
              <UnstyledButton clicked={() => router.push("/auth/login")} class="w-[15rem] mx-auto rounded-md text-center bg-black-3 text-white py-2 mt-6">
                Log in
              </UnstyledButton>
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default VerifyEmail;
