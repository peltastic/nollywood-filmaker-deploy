"use client";
import LeftSide from "@/components/Auth/LeftSide";
import ResetPasswordForm from "@/components/Forms/Auth/ResetPasswordForm";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { useResetDatabasePasswordMutation } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const FmdResetPassword = (props: Props) => {
  const router = useRouter();
  const search = useSearchParams();
  const searchVal = search.get("token");
  const [resetPassword, { isError, isLoading, error, isSuccess }] =
    useResetDatabasePasswordMutation();

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      nprogress.complete();
      notify("success", "Password reset successful", "Please log in");
      router.push("/auth/login-filmmaker-database");
    }
  }, [isSuccess, isError]);

  const resetPasswordHandler = (password: string) => {
    if (searchVal) {
      resetPassword({
        newPassword: password,
        token: searchVal,
      });
    }
  };

  return (
    <ServiceLayout>
      <div className="flex items-center py-6 px-3 sm:px-10">
        <LeftSide />
        <div className="w-full md:w-[95%] xl:w-[55rem] mx-auto pl-2 md:pl-[5rem] pr-2 md:pr-[5rem]">
          <div className="text-black-2 mt-[8rem]">
            <h1 className="font-bold text-[1.5rem]">Reset Password</h1>
            <h2 className="text-[1.13rem]">
              Reset your nollywood filmmaker database password
            </h2>
          </div>
          <ResetPasswordForm
            isLoading={isLoading}
            resetPasswordProps={resetPasswordHandler}
            successRoute="/auth/login-filmmaker-database"
          />
        </div>
      </div>
    </ServiceLayout>
  );
};

export default FmdResetPassword;
