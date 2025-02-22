import React from "react";
import SuccessGif from "/public/assets/gif/success.gif";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import Link from "next/link";

type Props = {
  titleLight: string;
  subTitle: string;
  darkButtonContent: string;
  lightButtonContent: string;
  darkBtnLink: string;
  lightBtnLink: string;
  titleBold?: string;
  width?: string;
  dartBtnFunc?: () => void;
};

const SuccessTemplate = ({
  titleLight,
  subTitle,
  darkButtonContent,
  lightButtonContent,
  darkBtnLink,
  lightBtnLink,
  titleBold,
  width,
  dartBtnFunc,
}: Props) => {
  return (
    <div className="mb-20 md:mb-0 px-[1.2rem] sm:px-0">
      <div
        className={` ${
          width || "w-[95%] sm:w-[90%] md:w-[30rem]"
        } md:absolute md:-translate-x-1/2 md:-translate-y-1/2 md:left-1/2 md:top-1/2 mt-[3rem] md:mt-0 mx-auto`}
      >
        <div className="w-[15rem] mx-auto">
          <Image src={SuccessGif} alt="success-gif" />
        </div>
        <div className="text-center">
          <h1 className="text-black-3 text-[1.5rem] sm:text-[1.88rem] font-medium">
            <span className="font-bold">{titleBold} </span>
            {titleLight}
          </h1>
          <p className="text-[0.88rem] mt-4 w-[90%] md:w-[30rem] block mx-auto">
            {subTitle}
          </p>
        </div>
        <Link href={darkBtnLink}>
          <UnstyledButton
            clicked={dartBtnFunc && dartBtnFunc}
            class="w-[90%] md:w-[30rem] block hover:bg-blue-1 transition-all duration-500  mt-10 text-[1.13rem] font-bold py-4 rounded-md  text-center mx-auto bg-black-2 text-white "
          >
            {darkButtonContent}
          </UnstyledButton>
        </Link>
        <Link href={lightBtnLink}>
          <UnstyledButton class=" block hover:bg-gray-bg-1 text-center py-2 w-[10rem] mx-auto text-[0.88rem] font-medium mt-6 rounded-md transition-all">
            {lightButtonContent}
          </UnstyledButton>
        </Link>
      </div>
    </div>
  );
};

export default SuccessTemplate;
