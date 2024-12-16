"use client";
import LeftSide from "@/components/Auth/LeftSide";
import ResetPasswordForm from "@/components/Forms/Auth/ResetPasswordForm";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { useResetPasswordMutation } from "@/lib/features/users/auth/auth";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const ResetPassword = (props: Props) => {
  const router = useRouter()
  const search = useSearchParams();
  const searchVal = search.get("token");
  const [resetPassword, { isError, isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      nprogress.complete();
      notify("success", "Password reset successful", "Please log in")
      router.push("/auth/login")
    }
  }, [isSuccess, isError]);

  const resetPasswordHandler = (password: string) => {
    console.log(searchVal)
    if (searchVal) {
      resetPassword({
        password,
        token: searchVal,
      });
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center py-6 px-3 sm:px-10">
        <LeftSide />
        <div className="w-full md:w-[95%] xl:w-[55rem] mx-auto pl-2 md:pl-[5rem] pr-2 md:pr-[5rem]">
          <div className="text-black-2 mt-[8rem]">
            <h1 className="font-bold text-[1.5rem]">Reset Password</h1>
            {/* <h2 className="text-[1.13rem]">
              Lorem ipsum dolor sit amet consectetur adipisc.
            </h2> */}
          </div>
          <ResetPasswordForm isLoading={isLoading} resetPasswordProps={resetPasswordHandler} successRoute="/auth/login" />
        </div>
      </div>
    </HomeLayout>
  );
};

export default ResetPassword;
