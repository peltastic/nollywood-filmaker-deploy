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
        className={`${classes.Header} w-full md:h-[120vh] min-h-screen relative md:rounded-2xl flex  mx-auto`}
      >
        <div className="absolute top-12 -left-1">
          <Image src={Vector1} alt="vector-1" className="" />
        </div>
        <div className="w-[100%] lg:w-[70%] xl:w-[55%]  mx-auto xl:mx-0  xl:ml-auto text-[1rem] px-4 xs:px-6 sm:px-0">
          <div className="sm:ml-6 mt-[5rem] xs:mt-[8rem] sm:mt-[17rem] xl:mt-[4rem] chatbp2:mt-[8rem]">
            <div className=" xl:w-[30rem] xxl:w-[40rem] relative">
              <h2 className="tracking-wider font-thin mb-6 ">
                Nollywood Filmmaker
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
            <div className="mt-8 flex items-center ">
              <Image src={Profiles} alt="profiles" className="w-[6rem]" />
              <div className="w-[25rem] ml-4 pr-4">
                <p className="tracking wider">
                  Consult with renowned film industry experts and gain valuable
                  insights to ensure your next film achieves success
                </p>
              </div>
            </div>
            <div className="mt-10 text-black-2 flex flex-wrap items-center font-semibold w-full sm:w-[25rem] mb-[5rem] md::mb-auto">
              <Link href={"/get-started"} className="w-full sm:w-auto order-1">
                <UnstyledButton class="w-full sm:w-[12rem] sm:mr-7 text-red rounded-md hover:before:bg-redborder-red-500 relative h-[50px]  overflow-hidden border border-yellow-1 bg-yellow-1 px-3 text-black-2 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black-3 before:transition-all before:duration-500 hover:text-yellow-1 hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10">Get Started</span>
                </UnstyledButton>
              </Link>
              <Link
                href={"https://www.youtube.com/"}
                target="_blank"
                className="order-3 sm:order-2 w-full sm:w-auto mt-8 sm:mt-0"
              >
                <UnstyledButton class="transition-all hover:scale-110 duration-300 hover:rotate-3 py-4 w-full sm:w-auto mx-auto xs:mx-0 flex justify-center items-center ">
                  <Image src={PlayButtonImage} alt="play-button" />
                  <p className="text-white ml-2">Watch tutorial</p>
                </UnstyledButton>
              </Link>
              {/* <p className="mb-4">
                Do you want us to recommend your services to our clients?
                </p> */}
              <Link
                href={"/get-started/filmmaker-database"}
                className="w-full sm:w-[25rem] block  mt-8 sm:mt-2 order-2 sm:order-3"
              >
                <UnstyledButton class="font-semibold w-full  sm:mr-7 text-red rounded-md hover:before:bg-redborder-red-500 relative h-[50px]  overflow-hidden border border-yellow-1 bg-yellow-1 px-3 text-black-2 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black-3 before:transition-all before:duration-500 hover:text-yellow-1 hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10">Join crew database</span>
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
