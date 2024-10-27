import Image from "next/image";
import React from "react";
import Logo from "/public/assets/nav/logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiBell } from "react-icons/hi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import TestImage from "/public/assets/test-avatar.png";
import MenuComponent from "../Menu/MenuComponent";
import Advert from "./Advert";
import UserprofileMenu from "../ProfileMenu/UserprofileMenu";
import ConsultantsProfileMenu from "../ProfileMenu/ConsultantsProfileMenu";
import AdminProfileMenu from "../ProfileMenu/AdminProfileMenu";

type Props = {
  removeOptions?: boolean;
  consultant?: boolean;
  admin?: boolean;
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

export const adminLinks = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    name: "Requests",
    link: "/admin/dashboard/requests",
  },
  {
    name: "Chats",
    link: "/admin/dashboard/chats",
  },
  {
    name: "Customers",
    link: "/admin/dashboard/customers",
  },
  {
    name: "Consultants",
    link: "/admin/dashboard/consultants",
  },
  {
    name: "Revenue & withdrawals",
    link: "/admin/dashboard/revenue-and-withdrawals",
  },
  {
    name: "Issues",
    link: "/admin/dashboard/issues",
  },
  {
    name: "Feedback",
    link: "/admin/dashboard/feedbacks",
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
  const data = props.consultant
    ? consultantLink
    : props.admin
    ? adminLinks
    : navLink;

  return (
    <>
      <Advert />
      <nav className={`${props.admin ? "py-8 xl:py-0" : "pt-4 md:pt-2 pb-6 md:pb-0"} flex items-center  text-black-1 border-b border-b-border-gray px-3 md:px-8`}>
        <Link
          href={
            props.admin
              ? "/admin/dashboard"
              : props.consultant
              ? "/consultants/dashboard"
              : "/user/dashboard"
          }
        >
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
            <ul
              className={`${
                props.admin ? "text-[0.88rem] hidden xl:flex " : "text-[1rem] hidden md:flex"
              }  mx-6 gap-2   mr-auto`}
            >
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
                <Link href={"/admin/dashboard/settings"}>
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
                {props.admin ? (
                  <AdminProfileMenu />
                ) : props.consultant ? (
                  <ConsultantsProfileMenu />
                ) : (
                  <UserprofileMenu />
                )}
              </MenuComponent>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default ServiceNavbar;
