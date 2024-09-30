import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import UnstyledButton from "../Button/UnstyledButton";
import Image from "next/image";
import Logo from "/public/assets/nav/logo.svg";

type Props = {
  links: { name: string; link: string }[];
  dashboard?: boolean;
};

const NavMobile = (props: Props) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <div
        className={`transition-all ${
          opened ? "translate-x-0" : "translate-x-[100%]"
        } fixed top-0 left-0 w-full  h-screen bg-white text-center`}
      >
        <Link href={"/"} className="absolute bottom-8 left-2">
          <div className="">
            <Image src={Logo} alt="logo" className="w-[8rem] md:w-[6rem]" />
          </div>
        </Link>
        <ul className=" mx-6 gap-2 text-[1.2rem] mt-[8rem] ">
          {props.links.map((el) => (
            <li key={el.name} className={`font-semibold`}>
              <Link className="py-3 px-2 block" href={el.link}>
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
        {props.dashboard ? null : (
          <ul className="font-medium text-[1.2rem] mx-6 mt-8">
            <li className="mb-4">
              <Link href="/auth/register">
                <UnstyledButton class="">Sign up</UnstyledButton>
              </Link>
            </li>
            <li>
              <Link href={"/auth/login"}>
                <UnstyledButton class="border-stroke-1 border px-8 py-2 rounded-md">
                  Login
                </UnstyledButton>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="block md:hidden">
        <Burger lineSize={3} color="#181818" onClick={toggle} opened={opened} />
      </div>
    </>
  );
};

export default NavMobile;
