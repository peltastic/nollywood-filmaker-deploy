"use client";
import React from "react";

import Logo from "/public/assets/logo22.png";
import Image from "next/image";
import Link from "next/link";
import UnstyledButton from "../Button/UnstyledButton";
import { usePathname } from "next/navigation";
import Advert from "./Advert";
import NavMobile from "./NavMobile";

type Props = {
  hideLogin?: boolean
};
const homeLink = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "FAQs",
    link: "/faq",
  },
  {
    name: "Testimonials",
    link: "/testimonials",
  },
  {
    name: "Contact us",
    link: "/contact-us",
  },
];

const Navbar = (props: Props) => {
  const pathname = usePathname();
  return (
    <>
      <Advert />
      <nav className="  flex items-center pt-2 pb-2 md:pb-0 text-black-1 border-b border-b-border-gray px-0 md:px-8">
        <Link href={"/"}>
          <div className=" ml-6 md:ml-auto ">
            <Image src={Logo} alt="logo" className="w-[3rem]" />
          </div>
        </Link>
        <div className="md:hidden ml-auto mr-4 md:mr-0 relative z-50">
          <NavMobile links={homeLink} />
        </div>
        <ul className="hidden md:flex mx-6 gap-2 text-[1rem]  mr-auto ">
          {homeLink.map((el) => (
            <li
              key={el.name}
              className={`${
                el.link === pathname ? "border-b-4 border-black-3" : ""
              }`}
            >
              <Link className="py-6 px-2 block" href={el.link}>
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
       {props.hideLogin ? null : <ul className="hidden md:flex items-center text-[0.9rem]">
          <li className="hover:bg-gray-bg-3 py-1 px-3 transition-all rounded-md mr-4">
            <Link href="/auth/register">
              <UnstyledButton class="">Sign up</UnstyledButton>
            </Link>
          </li>
          <li>
            <Link href={"/auth/login"}>
              <UnstyledButton class="border-stroke-1 border px-3 py-1 rounded-md">
                Login
              </UnstyledButton>
            </Link>
          </li>
        </ul>}
      </nav>
    </>
  );
};

export default Navbar;
