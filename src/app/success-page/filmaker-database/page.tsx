"use client";
import Image from "next/image";
import React from "react";

import Logo from "/public/assets/nf-logo-black.png";
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
            <Image src={Logo} alt="logo" className="w-[10rem]" />
          </div>
        </Link>
      </nav>
      <SuccessTemplate
        darkBtnLink={"/"}
        // darkBtnLink={
        //   email && type && type === "company"
        //     ? `/filmmaker-database/profile/company/${email}`
        //     : email && type && type === "crew"
        //     ? `/filmmaker-database/profile/crew/${email}`
        //     : "/"
        // }
        darkButtonContent="Take me home"
        lightBtnLink="/"
        subTitle="An email will be sent to you as soon as your profile has been verified"
        lightButtonContent=""
        titleLight=""
        titleBold="Your profile saved successfully"
        width="w-[95%] sm:w-[90%] md:w-[40rem]"
      />
    </div>
  );
};

export default page;
