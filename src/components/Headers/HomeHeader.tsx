import React from "react";
import HeaderBackground from "/public/assets/header/header-background.png";
import Vector1 from "/public/assets/header/vector-1.svg";
import Profiles from "/public/assets/header/profiles.png";
import Image from "next/image";
import YellowArrow from "/public/assets/header/arrow-yellow.svg";
import UnstyledButton from "../Button/UnstyledButton";
import PlayButtonImage from "/public/assets/header/play.svg";
import Link from "next/link";

type Props = {};

const HomeHeader = (props: Props) => {
  return (
    <header className="px-[2rem] pt-[2rem] text-white">
      <div
        style={{
          backgroundImage: `url(${HeaderBackground.src})`,
          backgroundSize: "contain",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full h-[120vh] relative rounded-2xl flex "
      >
        <div className="absolute top-12 -left-1">
          <Image src={Vector1} alt="vector-1" />
        </div>
        <div className="w-[55%]  ml-auto text-[1rem]">
          <div className="ml-6 mt-[8rem]">
            <div className=" w-[30rem] relative">
              <h2 className="tracking-wider font-thin mb-6 ">
                Nollywood Filmaker
              </h2>
              <div className="absolute right-[3rem] -top-[1rem]">
                <Image src={YellowArrow} alt="yellow-arrow" />
              </div>
            </div>
            <div className="w-[25rem]">
              <h1 className="text-[3.4rem] leading-[1.2] font-semibold">
                The one-stop spot for all the film-making help you need
              </h1>
            </div>
            <div className="mt-8 flex items-center">
              <Image src={Profiles} alt="profiles" className="w-[6rem]" />
              <div className="w-[18rem] ml-4">
                <p className="tracking wider">
                  Join with{" "}
                  <span className="font-semibold">
                    4600+ Producers and directors
                  </span>{" "}
                  getting help right now
                </p>
              </div>
            </div>
            <div className="mt-10 text-black-2 flex items-center  font-semibold">
              <Link href={"/get-started"}>
                <UnstyledButton class="py-4 text-center w-[12rem] mr-5 rounded-md bg-yellow-1">
                  Get Started
                </UnstyledButton>
              </Link>
              <UnstyledButton class="py-4 flex items-center">
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
