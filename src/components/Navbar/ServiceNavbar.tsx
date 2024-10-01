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

type Props = {};

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

const navLinkMobile = [
  {
    name: "View Profile",
    link: "/user/dashboard/",
  },
];
const ServiceNavbar = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <Advert />
      <nav className="flex items-center pt-4 md:pt-2 pb-6 md:pb-0 text-black-1 border-b border-b-border-gray px-3 md:px-8">
        <Link href={"/user/dashboard"}>
          <div className="">
            <Image src={Logo} alt="logo" className="w-[5rem] md:w-[6rem]" />
          </div>
        </Link>
        {/* <div className="md:hidden ml-auto relative z-50">
          <NavMobile dashboard links={navLink} />
        </div> */}
        <ul className="hidden md:flex mx-6 gap-2 text-[1rem]  mr-auto">
          {navLink.map((el) => (
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
            <div className="bg-white w-[15rem]   py-3 text-gray-3">
              <div className="flex items-center px-3">
                <Image
                  src={TestImage}
                  alt="test-image"
                  className="mr-4 w-[3rem]"
                />
                <div className="text-[0.88rem]">
                  <h1 className="font-bold text-gray-3">Niyi Akinmolayan</h1>
                  <p className="text-gray-1">niyi@gmail.com</p>
                </div>
              </div>
              <ul className="text-[0.88rem] mt-2 py-3 border-t border-b border-profile-menu-border">
                <li className=" px-3">
                  <Link
                    className="flex items-center"
                    href={"/user/dashboard/profile/1"}
                  >
                    <Image
                      src={ProfileIconImg}
                      alt="profile-icon"
                      className="mr-3"
                    />
                    <p>View profile</p>
                  </Link>
                </li>
                <li className=" px-3 mt-4 cursor-pointer">
                  <Link
                    className="flex items-center"
                    href={"/user/dashboard/settings"}
                  >
                    <Image
                      src={SettingsIconImg}
                      alt="setting-icon"
                      className="mr-3"
                    />
                    <p>Settings</p>
                  </Link>
                </li>
                <li className=" px-3 mt-4">
                  <Link
                    className="flex items-center"
                    href={"/user/dashboard/issues"}
                  >
                    <Image
                      src={IssuesIcon}
                      alt="issues-icon"
                      className="mr-3"
                    />
                    <p>Issues</p>
                  </Link>
                </li>
              </ul>
              <ul className="block md:hidden text-[0.88rem] px-3 mt-2 py-3  border-b border-profile-menu-border">
                <li className="mb-3">
                  <Link href={"/user/dashboard"}>
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link href={"/user/dashboard/chats"}>
                    <p>Chats</p>
                  </Link>
                </li>
                <li>
                  <Link href={"/user/dashboard/request-history"}>
                    <p>Request History</p>
                  </Link>
                </li>
              </ul>
              <div onClick={() => router.push("/")} className="cursor-pointer flex items-center text-[0.88rem] px-3 mt-4">
                <Image src={LoginIcon} alt="login-icon" className="mr-3" />
                <p>Log out</p>
              </div>
            </div>
          </MenuComponent>
        </div>
      </nav>
    </>
  );
};

export default ServiceNavbar;
