"use client";
import Image from "next/image";
import React from "react";
import Logo from "/public/assets/nav/logo.svg";
import SuccessTemplate from "@/components/SuccessTemplate/SuccessTemplate";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const search = useSearchParams();
  const email = search.get("id");
  const type = search.get("type");
  return (
    <div className="">
      <nav className="py-4 px-4">
        <Link href={"/"}>
          <div className="">
            <Image src={Logo} alt="logo" className="w-[7rem]" />
          </div>
        </Link>
      </nav>
      <SuccessTemplate
        darkBtnLink={
          email && type && type === "company"
            ? `/filmmaker-database/profile/company/${email}`
            : email && type && type === "crew"
            ? `/filmmaker-database/profile/crew/${email}`
            : "/"
        }
        darkButtonContent="View public profile"
        lightBtnLink="/"
        subTitle=""
        lightButtonContent="Take me home"
        titleLight="Your information has been stored successfully"
        titleBold=""
        width="w-[95%] sm:w-[90%] md:w-[40rem]"
      />
    </div>
  );
};

export default page;
