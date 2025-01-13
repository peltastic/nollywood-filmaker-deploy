import React from "react";
import TestImage from "/public/assets/test-avatar.png";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import { useRouter } from "next/navigation";
import MenuComponent from "../Menu/MenuComponent";
import { IoIosArrowDown } from "react-icons/io";
import { AspectRatio } from "@mantine/core";
import Link from "next/link";

type Props = {
  consultant?: boolean;
  admin?: boolean;
  fname: string;
  lname: string;
  ppicture?: string;
};

const Header = (props: Props) => {
  const router = useRouter();
  return (
    <header className="pt-14 chatbp:py-0">
      <div className="flex flex-wrap items-center">
        <div className="flex items-center mr-auto w-full sm:w-auto">
          {props.ppicture ? (
            <div className="mr-4">
              <AspectRatio ratio={1800 / 1800}>
                <Image
                  src={props.ppicture}
                  width={100}
                  height={100}
                  alt="test-image"
                  className="h-[5rem] w-[5rem] rounded-full"
                />
              </AspectRatio>
            </div>
          ) : (
            <div className="bg-black-3 font-bold text-[1.2rem] mr-4 h-[3.9rem] flex items-center justify-center w-[3.9rem] rounded-full text-white">
              {props.fname[0]} {props.lname[0]}
            </div>
          )}
          <div className="text-black-2">
            <h1 className="text-[1.5rem] font-bold">Welcome, {props.fname}</h1>
            <h2 className="text-[1.13rem]">It's good to see you</h2>
          </div>
        </div>
        {props.consultant || props.admin ? null : (
          <UnstyledButton
            clicked={() => router.push("/get-started")}
            class="mt-8 mid:mt-0 w-full mid:w-auto hover:border-blue-1 hover:bg-blue-1 transition-all duration-500 bg-black-3 border border-black-3 font-medium text-white py-4 mid:py-2 px-4 rounded-md"
          >
            Make a request
          </UnstyledButton>
        )}
        {props.admin || props.consultant ? (
          <MenuComponent
            target={
              <div>
                <UnstyledButton class="mt-8 sm:mt-0 px-4 py-2 hover:bg-blue-1 rounded-md items-center bg-black-3 text-white flex">
                  <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                  <IoIosArrowDown />
                </UnstyledButton>
              </div>
            }
          >
            {props.consultant ? (
              <div className="bg-white">
                <ul className="px-1 text-gray-6 text-[0.88rem]">
                  <li
                    onClick={() =>
                      router.push("/consultants/dashboard/profile/1?show=ea")
                    }
                    className="py-2 mb hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                  >
                    Edit Availability
                  </li>
                </ul>
              </div>
            ) : null}
          </MenuComponent>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
