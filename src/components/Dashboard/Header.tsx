import React from "react";
import TestImage from "/public/assets/test-avatar.png";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import { useRouter } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter()
  return (
    <header className="pt-14 chatbp:py-0">
      <div className="flex flex-wrap items-center">
        <div className="flex items-center mr-auto">
          <Image src={TestImage} alt="test-image" className="mr-4" />
          <div className="text-black-2">
            <h1 className="text-[1.5rem] font-bold">Welcome, Niyi</h1>
            <h2 className="text-[1.13rem]">It's good to see you</h2>
          </div>
        </div>
        <UnstyledButton clicked={() => router.push("/get-started")} class="mt-8 sm:mt-0 w-full sm:w-auto bg-black-3 border border-black-3 font-medium text-white py-2 px-4 rounded-md">
            Make a request
        </UnstyledButton>
      </div>
    </header>
  );
};

export default Header;
