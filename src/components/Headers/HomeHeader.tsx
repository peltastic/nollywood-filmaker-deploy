import React from "react";
import Vector1 from "/public/assets/header/vector-1.svg";
import Profiles from "/public/assets/header/profiles.png";
import Image from "next/image";
import YellowArrow from "/public/assets/header/arrow-yellow.svg";
import UnstyledButton from "../Button/UnstyledButton";
import PlayButtonImage from "/public/assets/header/play.svg";
import Link from "next/link";
import classes from "@/app/styles/Header.module.css";

type Props = {};

const HomeHeader = (props: Props) => {
  return (
    <header className="md:px-[2rem] md:pt-[2rem] lg:pb-0 text-white">
      <div
        className={`${classes.Header} w-full sm:h-screen chatbp:h-[120vh] relative md:rounded-2xl flex `}
      >
        <div className="absolute top-12 -left-1">
          <Image src={Vector1} alt="vector-1" className="" />
        </div>
        <div className="w-[100%] lg:w-[70%] xl:w-[55%]  mx-auto xl:mx-0  xl:ml-auto text-[1rem] px-4 xs:px-6 sm:px-0">
          <div className="sm:ml-6 mt-[5rem] xs:mt-[8rem] sm:mt-[17rem] xl:mt-[4rem] chatbp2:mt-[8rem]">
            <div className=" xl:w-[30rem] xxl:w-[40rem] relative">
              <h2 className="tracking-wider font-thin mb-6 ">
                Nollywood Filmaker
              </h2>
              <div className="absolute right-[1rem] sm:right-[3rem] -top-[1rem]">
                <Image src={YellowArrow} alt="yellow-arrow" />
              </div>
            </div>
            <div className="w-[90%] xl:w-[25rem] xxl:w-[35rem]">
              <h1 className="text-[2.8rem] sm:text-[3.4rem] leading-[1.2] font-bold">
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
              <Link href={"/get-started"} className="w-full sm:w-auto">
                <UnstyledButton class="w-full sm:w-[12rem] sm:mr-7 text-red rounded-md hover:before:bg-redborder-red-500 relative h-[50px]  overflow-hidden border border-yellow-1 bg-yellow-1 px-3 text-black-2 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black-3 before:transition-all before:duration-500 hover:text-yellow-1 hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10">Get Started</span>
                </UnstyledButton>
              </Link>
              <Link href={"https://www.youtube.com/"} target="_blank">
                <UnstyledButton class="transition-all hover:scale-110 duration-300 hover:rotate-3 py-4 w-full sm:w-auto mx-auto xs:mx-0 flex justify-center items-center mt-5 xs:mt-0">
                  <Image src={PlayButtonImage} alt="play-button" />
                  <p className="text-white ml-2">Watch tutorial</p>
                </UnstyledButton>
              </Link>
            </div>
            <div className="mt-8 mb-32">
              <p className="mb-4">
                Do you want us to recommend your services to our clients?
              </p>
              <Link href={"/get-started/filmmaker-database"} className="w-fit">
                <UnstyledButton class="font-semibold w-full sm:w-[28rem] sm:mr-7 text-red rounded-md hover:before:bg-redborder-red-500 relative h-[50px]  overflow-hidden border border-yellow-1 bg-yellow-1 px-3 text-black-2 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black-3 before:transition-all before:duration-500 hover:text-yellow-1 hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10">
                    Join our filmmmaker database now
                  </span>
                </UnstyledButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
