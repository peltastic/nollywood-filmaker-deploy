import LeftSide from "@/components/Auth/LeftSide";
import ResetPasswordForm from "@/components/Forms/Auth/ResetPasswordForm";
import HomeLayout from "@/components/Layouts/HomeLayout";
import React from "react";

type Props = {};

const ResetPassword = (props: Props) => {
  return (
    <HomeLayout>
      <div className="flex items-center py-6 px-10">
        <LeftSide />
        <div className="w-[55rem] pl-[5rem] pr-[5rem]">
          <div className="text-black-2 mt-[8rem]">
            <h1 className="font-bold text-[1.5rem]">Reset Password</h1>
            <h2 className="text-[1.13rem]">
              Lorem ipsum dolor sit amet consectetur adipisc.
            </h2>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </HomeLayout>
  );
};

export default ResetPassword;
