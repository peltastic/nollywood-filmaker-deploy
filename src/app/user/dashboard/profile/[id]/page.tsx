"use client";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useSelector } from "react-redux";
import UnstyledButton from "@/components/Button/UnstyledButton";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import MenuComponent from "@/components/Menu/MenuComponent";
import ProfileLeft from "@/components/Profile/ProfileLeft";
import ProfileRight from "@/components/Profile/ProfileRight";
import { useRouter } from "next/navigation";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useFetchUserProfileDataQuery } from "@/lib/features/users/profile/profile";
import { RootState } from "@/lib/store";

type Props = {};

const ProfilePage = (props: Props) => {
  useProtectRoute();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const { isFetching, data } = useFetchUserProfileDataQuery(userId!);

  const router = useRouter();
  const status: any = "active";
  const statusClassname =
    status === "ready"
      ? "bg-light-blue text-dark-blue"
      : status === "active"
      ? "bg-light-green text-dark-green"
      : status === "pending"
      ? "bg-stroke-4 text-black-6"
      : "bg-light-yellow text-dark-yellow";
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <header className="flex items-center mt-10">
          <div className="flex items-center text-[1.5rem] mr-auto ">
            <div
              onClick={() => router.back()}
              className="hover:bg-gray-bg-3 w-fit mr-8 transition-all cursor-pointer px-1 py-1 rounded-md"
            >
              <IoIosArrowBack className="text-gray-4 " />
            </div>
            <h1 className="text-black-2 font-bold">Profile details</h1>
          </div>
          <div className="flex items-center">
            <p
              className={`${statusClassname} font-medium, w-fit flex text-[0.75rem] items-center font-medium py-2 px-2 rounded-md`}
            >
              <span className="block pr-1">
                <GoDotFill />
              </span>
              Active
            </p>
            <MenuComponent
              target={
                <div>
                  <UnstyledButton class="ml-6 px-4 py-2 hover:bg-blue-1 rounded-md items-center bg-black-3 text-white flex">
                    <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                    <IoIosArrowDown />
                  </UnstyledButton>
                </div>
              }
            >
              <div className="bg-white ">
                <ul className="px-1 text-gray-6 text-[0.88rem]">
                  <li className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4">
                    Delete Account
                  </li>
                </ul>
              </div>
            </MenuComponent>
          </div>
        </header>
        <div className="flex items-start mt-10">
          <div className="w-[30%]">
            <ProfileLeft
              isFetching={isFetching}
              fullname={`${data?.fname} ${data?.lname}`}
            />
          </div>
          <div className="w-[70%]">
            <ProfileRight data={data} isFetching={isFetching} />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ProfilePage;
