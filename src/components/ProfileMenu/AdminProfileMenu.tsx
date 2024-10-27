import React from "react";
import TestImage from "/public/assets/test-avatar.png";
import SettingsIconImg from "/public/assets/dashboard/settings-icon.svg";
import Image from "next/image";
import Link from "next/link";
import LoginIcon from "/public/assets/dashboard/login-icon.svg";
import ProfileIconImg from "/public/assets/dashboard/profile-icon.svg";
import { useRouter } from "next/navigation";
import { adminLinks } from "../Navbar/ServiceNavbar";

type Props = {};

const AdminProfileMenu = (props: Props) => {
  const router = useRouter();
  return (
    <div className="bg-white w-[15rem]   py-3 text-gray-3">
      <div className="flex items-center px-3">
        <Image src={TestImage} alt="test-image" className="mr-4 w-[3rem]" />
        <div className="text-[0.88rem]">
          <h1 className="font-bold text-gray-3">Niyi Akinmolayan</h1>
          <p className="text-gray-1">niyi@gmail.com</p>
        </div>
      </div>
      <ul className="text-[0.88rem] mt-2 py-3 border-t border-b border-profile-menu-border">
        <li className=" px-3">
          <Link
            className="flex items-center"
            href={"/consultants/dashboard/profile/1"}
          >
            <Image src={ProfileIconImg} alt="profile-icon" className="mr-3" />
            <p>View profile</p>
          </Link>
        </li>
        <li className=" px-3 mt-4 cursor-pointer">
          <Link
            className="flex items-center"
            href={"/consultants/dashboard/settings"}
          >
            <Image src={SettingsIconImg} alt="setting-icon" className="mr-3" />
            <p>Settings</p>
          </Link>
        </li>
      </ul>
      <ul className="block xl:hidden text-[0.88rem] px-3 mt-2 py-3  border-b border-profile-menu-border">
        {adminLinks.map((el) => (
          <li key={el.link} className="mb-4">
            <Link href={el.link}>
              <p>{el.name}</p>
            </Link>
          </li>
        ))}
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer flex items-center border-t border-profile-menu-border pt-4 text-[0.88rem] px-3 mt-4"
      >
        <Image src={LoginIcon} alt="login-icon" className="mr-3" />
        <p>Log out</p>
      </div>
        {/* <li className="mb-3">
          <Link href={"/consultants/dashboard/chats"}>
            <p>Chats</p>
          </Link>
        </li>
        <li>
          <Link href={"/consultants/dashboard/request-history"}>
            <p>Request History</p>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default AdminProfileMenu;
