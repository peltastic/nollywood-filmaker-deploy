import Image from "next/image";
import React from "react";
import Logo from "/public/assets/nav/logo.svg";
import SuccessTemplate from "@/components/SuccessTemplate/SuccessTemplate";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
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
        darkBtnLink="/"
        darkButtonContent="Take me home"
        lightBtnLink="/"
        subTitle=""
        lightButtonContent=""
        titleLight="Your information has been stored successfully"
        titleBold=""
        width="w-[95%] sm:w-[90%] md:w-[40rem]"
      />
    </div>
  );
};

export default page;
