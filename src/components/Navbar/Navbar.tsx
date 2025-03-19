"use client";
import React from "react";

import Logo from "/public/assets/nf-logo-black.png";
import Image from "next/image";
import Link from "next/link";
import UnstyledButton from "../Button/UnstyledButton";
import { usePathname } from "next/navigation";
import Advert from "./Advert";
import NavMobile from "./NavMobile";

type Props = {
  hideLogin?: boolean;
  rmCountdown?: boolean;
};
const homeLink = [
  {
    name: "Home",
    link: "/",
  },
  // {
  //   name: "FAQs",
  //   link: "/faq",
  // },
  // {
  //   name: "Testimonials",
  //   link: "/testimonials",
  // },
  // {
  //   name: "Contact us",
  //   link: "/contact-us",
  // },
  {
    name: "Filmmaker database",
    link: "/auth/login-filmmaker-database",
  },
];

const fullHomeLink = [
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
  {
    name: "Filmmaker database",
    link: "/auth/login-filmmaker-database",
  },
];

const Navbar = (props: Props) => {
  const pathname = usePathname();
  const links = props.rmCountdown ? fullHomeLink : homeLink;
  return (
    <>
      <Advert />
      <nav className="  py-8 lg:py-2 flex items-center  text-black-1 border-b border-b-border-gray px-0 md:px-8">
        <Link href={"/"}>
          <div className=" ml-6 md:ml-auto ">
            <Image src={Logo} alt="logo" className="w-[10rem]" />
          </div>
        </Link>
        <div className="lg:hidden ml-auto mr-4 md:mr-0 relative z-50">
          <NavMobile links={homeLink} />
        </div>
        <ul className="hidden lg:flex mx-6 gap-2 text-[1rem]  mr-auto ">
          {links.map((el) => (
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
        {props.hideLogin ? null : (
          <ul className="hidden lg:flex items-center text-[0.9rem]">
            {props.rmCountdown ? (
              <>
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
              </>
            ) : null}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
