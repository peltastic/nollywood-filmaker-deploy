import React from "react";
import HeroImg from "/public/assets/filmaker-database.png";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {};

const FilmmakerDatabaseHeader = (props: Props) => {
  const router = useRouter()
  return (
    <header className="flex items-center w-[80%] justify-between mx-auto mb-10 text-black-2">
      <div className="w-[45%]">
        <h1 className="text-[3.45rem] font-bold leading-[1.2]">
          Connect with top film opportunities: Join our database today!
        </h1>
        <p className="mt-6">
          Join our growing database of film crew and film services companies so
          we can recommend you to our clients
        </p>
        <UnstyledButton clicked={() => router.push("/get-started/filmmaker-database") } class="mt-6 hover:bg-blue-1 transition-all bg-black-2 font-medium py-2 px-6 rounded-lg text-white">
          Join now
        </UnstyledButton>
        <div className="flex items-center text-2xl gap-x-3 mt-10">
          <FaFacebook />
          <AiFillTwitterCircle className="text-[1.7rem]" />
          <RiInstagramFill className="text-[1.7rem]" />
          <FaYoutube className="text-[1.7rem]" />
        </div>
      </div>
      <div className="w-[50%]">
        <Image src={HeroImg} alt="hero-img" />
      </div>
    </header>
  );
};

export default FilmmakerDatabaseHeader;
