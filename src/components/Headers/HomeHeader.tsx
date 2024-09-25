import React from "react";
import Vector1 from "/public/assets/header/vector-1.svg";
import Profiles from "/public/assets/header/profiles.png";
import Image from "next/image";
import YellowArrow from "/public/assets/header/arrow-yellow.svg";
import UnstyledButton from "../Button/UnstyledButton";
import PlayButtonImage from "/public/assets/header/play.svg";
import Link from "next/link";
import classes from "@/app/styles/Header.module.css"

type Props = {};

const HomeHeader = (props: Props) => {
  return (
    <header className="md:px-[2rem] md:pt-[2rem] text-white">
      <div
        style={{
          // backgroundImage: `url(${HeaderBackground.src})`,
          // backgroundSize: "contain",
          // backgroundPosition: "top",
          // backgroundRepeat: "no-repeat",
        }}

        className={`${classes.Header} w-full h-screen xl:h-[120vh] relative md:rounded-2xl flex `}
      >
        <div className="absolute top-12 -left-1">
          <Image src={Vector1} alt="vector-1" />
        </div>
        <div className="w-[100%] lg:w-[70%] xl:w-[55%]  mx-auto xl:mx-0  xl:ml-auto text-[1rem]">
          <div className="ml-6 mt-[10rem] sm:mt-[17rem] xl:mt-[8rem]">
            <div className=" xl:w-[30rem] xxl:w-[40rem] relative">
              <h2 className="tracking-wider font-thin mb-6 ">
                Nollywood Filmaker
              </h2>
              <div className="absolute right-[1rem] sm:right-[3rem] -top-[1rem]">
                <Image src={YellowArrow} alt="yellow-arrow" />
              </div>
            </div>
            <div className="w-[90%] xl:w-[25rem] xxl:w-[35rem]">
              <h1 className="text-[2.8rem] sm:text-[3.4rem] leading-[1.2] font-semibold">
                The one-stop spot for all the film-making help you need
              </h1>
            </div>
            <div className="mt-8 flex items-center">
              <Image src={Profiles} alt="profiles" className="w-[6rem]" />
              <div className="w-[18rem] ml-4 pr-4">
                <p className="tracking wider">
                  Join with{" "}
                  <span className="font-semibold">
                    4600+ Producers and directors
                  </span>{" "}
                  getting help right now
                </p>
              </div>
            </div>
            <div className="mt-10 text-black-2 flex flex-wrap items-center font-semibold">
              <Link href={"/get-started"} className="w-[95%] xs:w-auto">
                <UnstyledButton class="py-4 text-center w-full xs:w-[12rem] xs:mr-5 rounded-md bg-yellow-1">
                  Get Started
                </UnstyledButton>
              </Link>
              <UnstyledButton class="py-4 mx-auto xs:mx-0 flex items-center">
                <Image src={PlayButtonImage} alt="play-button" />
                <p className="text-white ml-2">Play video</p>
              </UnstyledButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
