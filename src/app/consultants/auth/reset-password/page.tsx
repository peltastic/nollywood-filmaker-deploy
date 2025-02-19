"use client";
import ConsultantLeftSide from "@/components/Auth/ConsultantLeftSide";
import ResetPasswordForm from "@/components/Forms/Auth/ResetPasswordForm";
import ServiceNavbar from "@/components/Navbar/ServiceNavbar";
import { useResetConsultantPasswordMutation } from "@/lib/features/users/auth/auth";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const ResetPasswordPage = (props: Props) => {
  const router = useRouter();
  const search = useSearchParams();
  const searchVal = search.get("token");

  const [resetPassword, { isError, isLoading, error, isSuccess }] =
    useResetConsultantPasswordMutation();

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      nprogress.complete();
      notify("success", "Password reset successful", "Please log in");
      router.push("/consultants/auth/login");
    }
  }, [isSuccess, isError]);

  const resetPasswordHandler = (password: string) => {
    console.log(searchVal);
    if (searchVal) {
      resetPassword({
        newPassword: password,
        token: searchVal,
      });
    }
  };

  return (
    <div className="">
      <ServiceNavbar removeOptions />
      <section className="flex xl:items-center h-[90vh] max-w-[1680px] mx-auto mt-8 mb-8">
        <ConsultantLeftSide />
        <div className=" px-7 md:px-[5rem] xl:px-[2rem] chatbp:px-[5rem] text-black-2 w-full xl:w-[50%]">
          <h1 className="text-[1.75rem] font-bold">Consultant Portal</h1>
          <div className="text-black-2 mt-[6rem] sm:mt-[8rem]">
            <h1 className="font-bold text-[1.75rem]">Reset Password</h1>
            {/* <h2 className="text-[1.13rem]">
              Lorem ipsum dolor sit amet consectetur adipisc.
            </h2> */}
            <ResetPasswordForm
              isLoading={isLoading}
              resetPasswordProps={resetPasswordHandler}
              successRoute="/consultants/auth/login"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordPage;
