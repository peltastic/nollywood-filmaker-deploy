import React from "react";
import HeroImg from "/public/assets/filmaker-database.png";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const FilmmakerDatabaseHeader = (props: Props) => {
  const router = useRouter();
  return (
    <header className="flex flex-wrap lg:flex-nowrap items-center w-[90%] sm:w-[80%] lg:w-[55.6rem] gap-x-7 justify-between mx-auto mb-10 text-black-2">
      <div className="w-full lg:w-[50%] mx-auto mb-10 lg:mb-0">
        <h1 className="text-[1.45rem] font-bold leading-[1.2]">
          Connect with top film opportunities: Join our database today!
        </h1>
        <p className="mt-6 text-[0.88rem]">
          Join our growing database of film crew and film services companies so
          we can recommend you to our clients
        </p>
        <UnstyledButton
          clicked={() => router.push("/get-started/filmmaker-database")}
          class="mt-6 hover:bg-blue-1 text-[0.88rem] transition-all bg-black-2 font-medium py-2 px-6 rounded-lg text-white"
        >
          Join now
        </UnstyledButton>
        <div className="flex items-center text-2xl gap-x-3 mt-10">
          <Link href={"https://x.com/nollyfilmmaker?s=21"}>
          <FaXTwitter className="text-[1.6rem]" />
          </Link>
          <Link
            href={
              "https://www.instagram.com/nollywood_filmmaker?igsh=MXU5bmN4bmxzcmJnbQ%3D%3D&utm_source=qr"
            }
            className="w-fit"
          >
            <div className="w-fit">
              <RiInstagramFill className="text-[1.7rem]" />
            </div>
          </Link>
          <Link
            href={
              "https://youtube.com/@nollywoodfilmmakersupport?si=OyyVtZEiXZPNjkdY"
            }
          >
            <FaYoutube className="text-[1.7rem]" />
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-[50%] mx-auto">
        <Image src={HeroImg} alt="hero-img" className="rounded-lg" />
      </div>
    </header>
  );
};

export default FilmmakerDatabaseHeader;
