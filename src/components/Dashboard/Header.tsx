import React from "react";
import TestImage from "/public/assets/test-avatar.png";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <div className="flex items-center">
        <div className="flex items-center mr-auto">
          <Image src={TestImage} alt="test-image" className="mr-4" />
          <div className="text-black-2">
            <h1 className="text-[1.5rem] font-bold">Welcome, Niyi</h1>
            <h2 className="text-[1.13rem]">It's good to see you</h2>
          </div>
        </div>
        <UnstyledButton class="bg-black-3 border border-black-3 font-medium text-white py-2 px-4 rounded-md">
            Make a request
        </UnstyledButton>
      </div>
    </header>
  );
};

export default Header;
