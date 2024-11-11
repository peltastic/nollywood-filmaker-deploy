import React, { useEffect, useState } from "react";
import TestImage from "/public/assets/test-avatar-big.png";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import ProfileSettingForm from "./Forms/ProfileSettingForm";
import {
  useFetchUserProfileDataQuery,
  useFetchUserProfilePicQuery,
  useUpdateProfilePicMutation,
} from "@/lib/features/users/profile/profile";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Spinner from "@/app/Spinner/Spinner";
import { FaUser } from "react-icons/fa";
import FileButtonComponent from "../FileButton/FileButtonComponent";
import { AspectRatio } from "@mantine/core";
import { notify } from "@/utils/notification";

type Props = {};

const ProfileSettings = (props: Props) => {
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const { isFetching, data } = useFetchUserProfileDataQuery(userId!, {
    refetchOnMountOrArgChange: true,
  });
  const profilepicQuery = useFetchUserProfilePicQuery(userId!, {
    refetchOnMountOrArgChange: true,
  });

  const [updateProfilePic, result] = useUpdateProfilePicMutation();

  useEffect(() => {
    if (result.isError) {
      notify(
        "error",
        (result.error as any).data?.message || "An Error Occured"
      );
    }
    if (result.isSuccess) {
      notify("success", "Successful", "Profile image updated successfully!");
    }
  }, [result.isSuccess, result.isError]);

  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [tempImgUrl, setTempImgUrl] = useState<string>("");
  return (
    <div className="mt-10 flex flex-wrap lg:flex-nowrap gap-6">
      {isFetching ? (
        <div className="w-[5rem] mx-auto">
          <Spinner dark />
        </div>
      ) : (
        <>
          <div className="w-full lg:w-[30%] ">
            <div className="w-full py-10 border border-stroke-10 bg-white rounded-xl">
              <div className="w-fit mx-auto">
                <FileButtonComponent
                  accept="image/*"
                  setFile={(file) => {
                    setProfilePicFile(file);
                    if (file) {
                      const objectUrl = URL.createObjectURL(file);
                      setTempImgUrl(objectUrl);
                    }
                  }}
                >
                  {tempImgUrl ? (
                    <div className="h-[10rem] w-[10rem] rounded-full overflow-hidden">
                      <AspectRatio ratio={1800 / 1800}>
                        <Image
                          src={tempImgUrl}
                          alt="profile-img"
                          className="w-full h-full"
                          width={100}
                          height={100}
                        />
                      </AspectRatio>
                    </div>
                  ) : (
                    <div className="border rounded-full h-[10rem] w-[10rem] flex items-center justify-center">
                      <FaUser className="text-[5rem]" />
                    </div>
                  )}
                </FileButtonComponent>
              </div>
              <div className="flex items-center justify-between px-10 mt-8">
                <UnstyledButton
                  clicked={() => {
                    setProfilePicFile(null);
                    setTempImgUrl("");
                  }}
                  disabled={!profilePicFile}
                  class="text-black-3  disabled:text-gray-7 font-bold"
                >
                  Remove
                </UnstyledButton>
                <UnstyledButton
                  disabled={!profilePicFile || result.isLoading}
                  clicked={() =>
                    updateProfilePic({
                      file: profilePicFile,
                      id: userId!,
                    })
                  }
                  class="disabled:text-gray-7 w-[6rem] flex justify-center text-black-3 font-bold"
                >
                  {result.isLoading ? (
                    <div className="py-1 w-[1rem]">
                      <Spinner dark />
                    </div>
                  ) : (
                    "Update"
                  )}
                </UnstyledButton>
              </div>
            </div>
            <p className="mt-10 text-center text-[0.88rem] text-black-2">
              User since <span className="font-bold">Jan 12, 2022</span>
            </p>
          </div>
          <div className="w-full lg:w-[70%] px-4 sm:px-10 py-10 rounded-xl bg-white border border-stroke-10">
            {data && <ProfileSettingForm data={data} />}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSettings;
