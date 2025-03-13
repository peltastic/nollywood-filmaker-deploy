"use client"
import React from "react";
import Image from "next/image";
import AuthImage from "/public/assets/auth/auth.png";

type Props = {};

const LeftSide = (props: Props) => {
  return (
    <div className="hidden xl:block w-[45%] relative text-white">
      <div className="z-10 absolute left-0 top-0 bg-[#00000032] w-full h-full rounded-2xl"></div>
      <div className=" z-20 absolute bottom-10 px-[2rem]">
        <h1 className="font-bold text-[1.5rem]">Nollywood Filmmaker</h1>
        <h2 className="text-[1.13rem]">The one-stop spot for all the film-making help you need</h2>
      </div>
      <Image src={AuthImage} alt="auth-image" className="w-full rounded-2xl" />
    </div>
  );
};

export default LeftSide;
