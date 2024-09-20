import LeftSide from "@/components/Auth/LeftSide";
import LoginForm from "@/components/Forms/Auth/LoginForm";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Link from "next/link";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <HomeLayout>
      <div className="flex items-center py-6 px-10">
        <LeftSide />
        <div className="w-[55%] pl-[5rem] pr-[5rem]">
          <div className="flex items-center text-black-2">
            <h1 className="text-[1.75rem] mr-auto font-bold">Log in</h1>
            <Link href={"/auth/register"}>
              <p className="text-[1.25rem]">Create an account</p>
            </Link>
          </div>
          <div className="text-black-2 mt-[8rem]">
            <h1 className="font-bold text-[1.5rem]">Welcome back</h1>
            <h2 className="text-[1.13rem]">
              Lorem ipsum dolor sit amet consectetur adipisc.
            </h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </HomeLayout>
  );
};

export default LoginPage;
