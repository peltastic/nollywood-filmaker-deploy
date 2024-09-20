"use client";
import React from "react";
import Logo from "/public/assets/nav/logo.svg";
import Image from "next/image";
import Link from "next/link";
import UnstyledButton from "../Button/UnstyledButton";
import { usePathname } from "next/navigation";

type Props = {};
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
    <nav className="flex items-center pt-2 text-black-1 border-b border-b-border-gray px-8">
      <div className="">
        <Image src={Logo} alt="logo" className="w-[6rem]" />
      </div>
      <ul className="flex mx-6 gap-2 text-[1rem]  mr-auto">
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
      <ul className="flex items-center text-[0.9rem]">
        <li>
          <Link href="/auth/register">
            <UnstyledButton class="mr-4">Sign up</UnstyledButton>
          </Link>
        </li>
        <li>
          <Link href={"/auth/login"}>
            <UnstyledButton class="border-stroke-1 border px-3 py-1 rounded-md">
              Login
            </UnstyledButton>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
