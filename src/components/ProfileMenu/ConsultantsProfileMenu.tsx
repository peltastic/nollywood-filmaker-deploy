import Image from "next/image";
import React from "react";
import TestImage from "/public/assets/test-avatar.png";
import Link from "next/link";
import SettingsIconImg from "/public/assets/dashboard/settings-icon.svg";
import ProfileIconImg from "/public/assets/dashboard/profile-icon.svg";
import LoginIcon from "/public/assets/dashboard/login-icon.svg";
import { nprogress } from "@mantine/nprogress";
import { useDispatch, useSelector } from "react-redux";
import { setConsultantAuthStatus } from "@/lib/slices/consultants/authSlice";
import { resetConsultantInfo } from "@/lib/slices/consultants/consultantSlice";
import { removeCookie } from "@/utils/storage";
import { notifications } from "@mantine/notifications";
import { successColor } from "@/utils/constants/constants";
import classes from "@/app/styles/SuccessNotification.module.css";
import { useRouter } from "next/navigation";
import { setConsultantLogoutType } from "@/lib/slices/consultants/logoutSlice";
import { RootState } from "@/lib/store";
import { truncateStr } from "@/utils/helperFunction";

type Props = {};

const ConsultantsProfileMenu = (props: Props) => {
  const consultantData = useSelector(
    (state: RootState) => state.persistedState.consultant.user
  );

  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="bg-white w-[15rem]   py-3 text-gray-3">
      <div className="flex items-center px-3">
        {consultantData?.profilepics ? (
          <Image src={TestImage} alt="test-image" className="mr-4 w-[3rem]" />
        ) : (
          <div className="bg-black-3 font-bold text-[0.7rem] mr-4 h-[2.5rem] flex items-center justify-center w-[2.5rem] rounded-full text-white">
            {consultantData?.fname[0]} {consultantData?.lname[0]}
          </div>
        )}
        <div className="text-[0.88rem]">
          <h1 className="font-bold text-gray-3">
            {consultantData?.fname} {consultantData?.lname}
          </h1>
          <p className="text-gray-1">
            {truncateStr(consultantData?.email || "", 20)}
          </p>
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
      <ul className="block md:hidden text-[0.88rem] px-3 mt-2 py-3  border-b border-profile-menu-border">
        <li className="mb-3">
          <Link href={"/consultants/dashboard"}>
            <p>Dashboard</p>
          </Link>
        </li>
        <li className="mb-3">
          <Link href={"/consultants/dashboard/chats"}>
            <p>Chats</p>
          </Link>
        </li>
        <li>
          <Link href={"/consultants/dashboard/request-history"}>
            <p>Request History</p>
          </Link>
        </li>
      </ul>
      <div
        onClick={() => {
          dispatch(setConsultantLogoutType("triggered"));
          nprogress.start();
          dispatch(setConsultantAuthStatus("LOGGED_OUT"));
          dispatch(resetConsultantInfo());
          notifications.show({
            title: "Logout successful",
            message: "",
            color: successColor,
            classNammes: classes,
            position: "top-right",
          });
          removeCookie("con_token");
          removeCookie("con_refresh");
          nprogress.complete();
          router.push("/consultants/auth/login");
        }}
        className="cursor-pointer flex items-center text-[0.88rem] px-3 mt-4"
      >
        <Image src={LoginIcon} alt="login-icon" className="mr-3" />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default ConsultantsProfileMenu;
