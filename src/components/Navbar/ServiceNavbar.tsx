"use client";
import Image from "next/image";
import React from "react";

import Logo from "/public/assets/nf-logo-black.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBell } from "react-icons/hi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import MenuComponent from "../Menu/MenuComponent";
import Advert from "./Advert";
import UserprofileMenu from "../ProfileMenu/UserprofileMenu";
import ConsultantsProfileMenu from "../ProfileMenu/ConsultantsProfileMenu";
import AdminProfileMenu from "../ProfileMenu/AdminProfileMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import ProfileTarget from "../ProfileMenu/ProfileTarget";

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
  {
    name: "Filmmaker database",
    link: "/auth/login-filmmaker-database",
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
  {
    name: "Database",
    link: "/admin/dashboard/filmmaker-database",
  },
  {
    name: "Waitlist",
    link: "/admin/dashboard/waitlist"
  },
  {
    name: "Contact-us",
    link: "/admin/dashboard/contact-us"
  }
];

const navLinkMobile = [
  {
    name: "View Profile",
    link: "/user/dashboard/",
  },
];
const ServiceNavbar = (props: Props) => {
  const pathname = usePathname();
  const data = props.consultant
    ? consultantLink
    : props.admin
    ? adminLinks
    : navLink;

  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );

  const consultantData = useSelector(
    (state: RootState) => state.persistedState.consultant.user
  );

  const adminData = useSelector(
    (state: RootState) => state.persistedState.adminuser.user
  );

  return (
    <>
      <Advert />
      <nav
        className={`${
          props.admin ? "py-6 xl:py-0" : " py-6 lg:py-2"
        } flex items-center  text-black-1 border-b border-b-border-gray px-3 md:px-8`}
      >
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
              className={`w-[10rem] ${
                props.removeOptions ? "mb-0 md:mb-4  mt-1" : ""
              } `}
            />
          </div>
        </Link>
        {props.removeOptions ? null : (
          <>
            <ul
              className={`${
                props.admin
                  ? "text-[0.88rem] hidden xl:flex "
                  : "text-[1rem] hidden lg:flex"
              }  mx-6 gap-2   mr-auto`}
            >
              {data.map((el) => (
                <li
                  key={el.name}
                  className={`${
                    el.link === pathname ? "border-b-4 border-black-3" : ""
                  }`}
                >
                  <Link
                    className="py-6 px-2 block hover:text-blue-1 transition-all duration-200"
                    href={el.link}
                    prefetch={true}
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex text-gray-5 gap-4 text-[1.6rem] ml-auto items-center">
              <div className="gap-4 hidden lg:flex items-center">
                <HiBell />
                <Link href={"/faq"}>
                  <BsFillQuestionCircleFill className="text-[1.4rem]" />
                </Link>
                <Link
                  href={
                    props.admin
                      ? "/admin/dashboard/settings"
                      : props.consultant
                      ? "/consultants/dashboard/settings"
                      : "/user/dashboard/settings"
                  }
                >
                  <div className="cursor-pointer">
                    <IoIosSettings />
                  </div>
                </Link>
              </div>
              {/* <FaCircleUser /> */}
              <MenuComponent
                target={
                  <div className="cursor-pointer">
                    <ProfileTarget
                      fname={
                        props.consultant
                          ? consultantData?.fname || ""
                          : props.admin
                          ? adminData?.fname || ""
                          : userData?.fname || ""
                      }
                      lname={
                        props.consultant
                          ? consultantData?.lname || ""
                          : props.admin
                          ? adminData?.lname || ""
                          : userData?.lname || ""
                      }
                      ppicture={
                        props.consultant
                          ? consultantData?.profilepics || ""
                          : props.admin
                          ? adminData?.profilepics || ""
                          : userData?.profilepics || ""
                      }
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
