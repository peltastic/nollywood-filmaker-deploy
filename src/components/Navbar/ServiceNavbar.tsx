import Image from "next/image";
import React from "react";
import Logo from "/public/assets/nav/logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiBell } from "react-icons/hi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import TestImage from "/public/assets/test-avatar.png";
import MenuComponent from "../Menu/MenuComponent";
import SettingsIconImg from "/public/assets/dashboard/settings-icon.svg";
import ProfileIconImg from "/public/assets/dashboard/profile-icon.svg";
import IssuesIcon from "/public/assets/dashboard/issues-icon.svg";
import LoginIcon from "/public/assets/dashboard/login-icon.svg";
import Advert from "./Advert";
import NavMobile from "./NavMobile";
import UserprofileMenu from "../ProfileMenu/UserprofileMenu";
import ConsultantsProfileMenu from "../ProfileMenu/ConsultantsProfileMenu";

type Props = {
  removeOptions?: boolean;
  consultant?: boolean;
};

const navLink = [
  {
    name: "Dashboard",
    link: "/user/dashboard",
  },
  {
    name: "Request history",
    link: "/user/dashboard/request-history",
  },
  {
    name: "Chats",
    link: "/user/dashboard/chats",
  },
];

const consultantLink = [
  {
    name: "Dashboard",
    link: "/consultants/dashboard",
  },
  {
    name: "Request history",
    link: "/consultants/dashboard/request-history",
  },
  {
    name: "Chats",
    link: "/consultants/dashboard/chats",
  },
  {
    name: "Calendar",
    link: "/consultants/dashboard/calendar",
  },
];

const navLinkMobile = [
  {
    name: "View Profile",
    link: "/user/dashboard/",
  },
];
const ServiceNavbar = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const data = props.consultant ? consultantLink : navLink;

  return (
    <>
      <Advert />
      <nav className="flex items-center pt-4 md:pt-2 pb-6 md:pb-0 text-black-1 border-b border-b-border-gray px-3 md:px-8">
        <Link href={"/user/dashboard"}>
          <div className="">
            <Image
              src={Logo}
              alt="logo"
              className={`w-[7rem] ${
                props.removeOptions ? "mb-0 md:mb-4  mt-1" : ""
              } `}
            />
          </div>
        </Link>
        {/* <div className="md:hidden ml-auto relative z-50">
          <NavMobile dashboard links={navLink} />
        </div> */}
        {props.removeOptions ? null : (
          <>
            <ul className="hidden md:flex mx-6 gap-2 text-[1rem]  mr-auto">
              {data.map((el) => (
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
            <div className="flex text-gray-5 gap-4 text-[1.6rem] ml-auto items-center">
              <div className="gap-4 hidden md:flex items-center">
                <HiBell />
                <BsFillQuestionCircleFill className="text-[1.4rem]" />
                <Link href={"/user/dashboard/settings"}>
                  <div className="cursor-pointer">
                    <IoIosSettings />
                  </div>
                </Link>
              </div>
              {/* <FaCircleUser /> */}
              <MenuComponent
                target={
                  <div>
                    <Image
                      src={TestImage}
                      alt="test-image"
                      className="md:mr-4 w-[2.8rem]  md:w-[2rem]"
                    />
                  </div>
                }
              >
               {props.consultant ? <ConsultantsProfileMenu /> : <UserprofileMenu />}
              </MenuComponent>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default ServiceNavbar;
