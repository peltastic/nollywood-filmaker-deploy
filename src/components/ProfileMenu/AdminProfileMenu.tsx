import React from "react";
import TestImage from "/public/assets/test-avatar.png";
import SettingsIconImg from "/public/assets/dashboard/settings-icon.svg";
import Image from "next/image";
import Link from "next/link";
import ProfileIconImg from "/public/assets/dashboard/profile-icon.svg";
import { useRouter } from "next/navigation";
import { adminLinks } from "../Navbar/ServiceNavbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { truncateStr } from "@/utils/helperFunction";
import LoginIcon from "/public/assets/dashboard/login-icon.svg";
import { setAdminLogoutType } from "@/lib/slices/admin/logoutSlice";
import { nprogress } from "@mantine/nprogress";
import { setAdminAuthStatus } from "@/lib/slices/admin/authSlice";
import { resetAdminInfo } from "@/lib/slices/admin/adminSlice";
import { notifications } from "@mantine/notifications";
import { successColor } from "@/utils/constants/constants";
import classes from "@/app/styles/SuccessNotification.module.css";
import { removeCookie } from "@/utils/storage";

type Props = {};

const AdminProfileMenu = (props: Props) => {
  const adminData = useSelector(
    (state: RootState) => state.persistedState.adminuser.user
  );
  const router = useRouter();
  const dispatch = useDispatch()

  return (
    <div className="bg-white w-[15rem]   py-3 text-gray-3">
      <div className="flex items-center px-3">
        {adminData.profilepics ? (
          <Image src={TestImage} alt="test-image" className="mr-4 w-[3rem]" />
        ) : (
          <div className="bg-black-3 font-bold text-[0.7rem] mr-4 h-[2.5rem] flex items-center justify-center w-[2.5rem] rounded-full text-white">
            {adminData.fname[0]} {adminData.lname[0]}
          </div>
        )}
        <div className="text-[0.88rem]">
          <h1 className="font-bold text-gray-3">
            {adminData.fname} {adminData.lname}
          </h1>
          <p className="text-gray-1">{truncateStr(adminData.email, 20)}</p>
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
      <div onClick={() => {
        dispatch(setAdminLogoutType("triggered"))
        nprogress.start()
        dispatch(setAdminAuthStatus("LOGGED_OUT"))
        dispatch(resetAdminInfo())
        notifications.show({
          message: "",
          title: "Logout successful",
          color: successColor,
          classNames:classes,
          position: "top-right"
        })

        removeCookie("ad_token")
        removeCookie("ad_refresh")
        nprogress.complete()
        router.push("/admin/auth/login")


      }} className="cursor-pointer flex items-center text-[0.88rem] px-3 mt-4">
          <Image src={LoginIcon} alt="login-icon" className="mr-3" />
          <p>Log out</p>
        </div>
    </div>
  );
};

export default AdminProfileMenu;
