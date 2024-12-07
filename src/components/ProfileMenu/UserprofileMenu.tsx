import React from "react";
import SettingsIconImg from "/public/assets/dashboard/settings-icon.svg";
import ProfileIconImg from "/public/assets/dashboard/profile-icon.svg";
import IssuesIcon from "/public/assets/dashboard/issues-icon.svg";
import LoginIcon from "/public/assets/dashboard/login-icon.svg";
import TestImage from "/public/assets/test-avatar.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "@/lib/slices/authSlice";
import { notifications } from "@mantine/notifications";
import classes from "@/app/styles/SuccessNotification.module.css";
import { nprogress } from "@mantine/nprogress";
import { successColor } from "@/utils/constants/constants";
import { removeCookie } from "@/utils/storage";
import { resetUserInfo, setUserInfo } from "@/lib/slices/userSlice";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { setLogoutType } from "@/lib/slices/logoutSlice";
import { RootState } from "@/lib/store";
import { truncateStr } from "@/utils/helperFunction";

type Props = {};

const UserprofileMenu = (props: Props) => {
  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="bg-white w-[15rem]   py-3 text-gray-3">
      <div className="flex items-center px-3">
        {userData?.profilepics ? (
          <Image src={TestImage} alt="test-image" className="mr-4 w-[3rem]" />
        ) : (
          <div className="bg-black-3 font-bold text-[0.7rem] mr-4 h-[2.5rem] flex items-center justify-center w-[2.5rem] rounded-full text-white">
            {userData?.fname[0]} {userData?.lname[0]}
          </div>
        )}
        <div className="text-[0.88rem]">
          <h1 className="font-bold text-gray-3">
            {userData?.fname} {userData?.lname}
          </h1>
          <p className="text-gray-1">{truncateStr(userData?.email || "", 20)}</p>
        </div>
      </div>
      <ul className="text-[0.88rem] mt-2 py-3 border-t border-b border-profile-menu-border">
        <li className=" px-3">
          <Link
            className="flex items-center"
            href={"/user/dashboard/profile/1"}
          >
            <Image src={ProfileIconImg} alt="profile-icon" className="mr-3" />
            <p>View profile</p>
          </Link>
        </li>
        <li className=" px-3 mt-4 cursor-pointer">
          <Link className="flex items-center" href={"/user/dashboard/settings"}>
            <Image src={SettingsIconImg} alt="setting-icon" className="mr-3" />
            <p>Settings</p>
          </Link>
        </li>
        <li className=" px-3 mt-4">
          <Link className="flex items-center" href={"/user/dashboard/issues"}>
            <Image src={IssuesIcon} alt="issues-icon" className="mr-3" />
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
      <div
        onClick={() => {
          dispatch(setLogoutType("triggered"));
          nprogress.start();
          dispatch(resetUserInfo());
          notifications.show({
            title: "Logout successful",
            message: "",
            color: successColor,
            classNammes: classes,
            position: "top-right",
          });
          dispatch(setAuthStatus("LOGGED_OUT"));
          removeCookie("token");
          removeCookie("refresh");
          nprogress.complete();
          router.push("/");
        }}
        className="cursor-pointer flex items-center text-[0.88rem] px-3 mt-4"
      >
        <Image src={LoginIcon} alt="login-icon" className="mr-3" />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default UserprofileMenu;
