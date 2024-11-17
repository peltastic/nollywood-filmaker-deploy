import React from "react";
import TestImage from "/public/assets/test-avatar.png";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import { useRouter } from "next/navigation";
import MenuComponent from "../Menu/MenuComponent";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  consultant?: boolean;
  admin?: boolean;
};

const Header = (props: Props) => {
  const router = useRouter();
  return (
    <header className="pt-14 chatbp:py-0">
      <div className="flex flex-wrap items-center">
        <div className="flex items-center mr-auto w-full sm:w-auto">
          <Image src={TestImage} alt="test-image" className="mr-4" />
          <div className="text-black-2">
            <h1 className="text-[1.5rem] font-bold">Welcome, Niyi</h1>
            <h2 className="text-[1.13rem]">It's good to see you</h2>
          </div>
        </div>
        {props.consultant  || props.admin? null : (
          <UnstyledButton
            clicked={() => router.push("/get-started")}
            class="mt-8 sm:mt-0 w-full sm:w-auto hover:border-blue-1 hover:bg-blue-1 transition-all duration-500 bg-black-3 border border-black-3 font-medium text-white py-2 px-4 rounded-md"
          >
            Make a request
          </UnstyledButton>
        )}
        {props.admin ? (
          <MenuComponent
            target={
              <UnstyledButton class="mt-8 sm:mt-0 px-4 py-2 hover:bg-blue-1 rounded-md items-center bg-black-3 text-white flex">
                <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                <IoIosArrowDown />
              </UnstyledButton>
            }
          ></MenuComponent>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
