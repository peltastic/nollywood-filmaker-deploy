import React, { useEffect, useState } from "react";
import TestImage from "/public/assets/test-avatar-big.png";
import HamburgerIcon from "/public/assets/chats/hamburger.svg";
import Image from "next/image";
import FileImg from "/public/assets/dashboard/file.svg";
import DownloadImg from "/public/assets/chats/download-icon.svg";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import ChatTimer from "../ChatTimer";
import momentTz from "moment-timezone";
import { IGetUserConversations } from "@/interfaces/dashboard/chat";
import { useLazyGetConsultantChatFilesQuery } from "@/lib/features/consultants/dashboard/chat/chat";
import { useLazyGetChatFilesQuery } from "@/lib/features/users/services/chat/chat";
import { IChatFiles } from "@/interfaces/chat/chat";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { AspectRatio } from "@mantine/core";
type Props = {
  close: () => void;
  opened?: string;
  closeRight?: boolean;
  data?: IGetUserConversations;
  openRight?: () => void;
  type?: "user" | "consultant" | "admin";
  isTime: boolean;
  sessionOver: boolean;
  orderId?: string;
  isLoading?: boolean;
  res?: IChatFiles[];
};

export interface IFilesData {
  name: string;
  file_type: string;
  size: string;
}

const reviewed_request_file_data: IFilesData[] = [
  {
    name: "Screenshot-3817.png",
    file_type: "PNG",
    size: "4mb",
  },
  {
    name: "sharefile.docx",
    file_type: "DOC",
    size: "555kb",
  },
  {
    name: "Jerry-2020_I-9_Form.xxl",
    file_type: "XXL",
    size: "24mb",
  },
];

const CustomerChatRight = ({
  close,
  isTime,
  sessionOver,
  closeRight,
  data,
  openRight,
  opened,
  orderId,
  type,
  isLoading,
  res,
}: Props) => {
  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );

  const [chatFiles, setChatFiles] = useState<IChatFiles[]>([]);

  useEffect(() => {
    if (res) {
      setChatFiles(res);
    }
  }, [res]);

  return (
    <div
      className={`border-l ${
        closeRight ? "hidden" : null
      }  border-l-stroke-8 h-full`}
    >
      <header className="w-full font-semibold flex items-center px-6 py-8  border-b border-b-stroke-8">
        <h1 className=" text-[1.25rem] mr-auto">Directory</h1>
        <div
          onClick={close}
          className=" hover:bg-stroke-4 transition-all rounded-md cursor-pointer"
        >
          <Image src={HamburgerIcon} alt="hamburger-icons" />
        </div>
      </header>
      <section>
        {data && isTime && (
          <ChatTimer
            timeData={{
              startTime: data.startTime,
              endTime: data.endTime,
            }}
            isTime={isTime}
            opened={!closeRight}
            sessionOver={sessionOver}
            openRight={openRight}
            type={type}
          />
        )}
      </section>
      {type === "user" && (
        <section className="py-6 px-4 border-b border-b-stroke-8">
          <div className="flex items-center mb-2">
            <h1 className=" text-[0.88rem] font-semibold mr-2">In this chat</h1>
            <div className="rounded-full bg-gray-bg-6 h-[1.45rem] w-[1.45rem] flex items-center justify-center">
              <p className="text-[0.75rem] font-semibold">2</p>
            </div>
          </div>
          <div className="flex items-center py-4 px-2">
            {userData?.profilepics && (
              <div className="w-[2.5rem] h-[2.5rem] mr-3 ">
                <AspectRatio ratio={1800 / 1800}>
                  <Image
                    src={userData.profilepics}
                    alt="test-image"
                    className="w-full h-full rounded-full"
                    width={100}
                    height={100}
                  />
                </AspectRatio>
              </div>
            )}
            <div className="">
              <h1 className="font-semibold text-[0.88remrem]">
                {userData?.fname} {userData?.lname}
              </h1>
              <p className="text-[#00000066] text-[0.75rem] font-semibold">
                You
              </p>
            </div>
          </div>
          <div className="flex items-center py-4 px-2">
            <div className="w-[2.5rem] mr-3 h-[2.5rem] rounded-full bg-black flex items-center justify-center">
              <Image src={AdminProfileImg} alt="admin-alt-profile" />
            </div>
            <div className="">
              <h1 className="font-semibold text-[0.88remrem]">
                Nollywood Filmaker
              </h1>
              <p className="text-[#00000066] text-[0.75rem] font-semibold">
                Admin
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="py-6 px-4 border-b border-b-stroke-8 max-h-[25rem] overflow-y-scroll">
        <div className="flex items-center mb-2">
          <h1 className=" text-[0.88rem] font-semibold mr-2">In-chat files</h1>
          <div className="rounded-full bg-gray-bg-6 h-[1.45rem] w-[1.45rem] flex items-center justify-center">
            <p className="text-[0.75rem] font-semibold">{chatFiles.length}</p>
          </div>
        </div>
        <div className="py-6">
          {chatFiles.map((el) => (
            <Link href={el.path} key={el.path}>
              <div className="flex items-center  mb-4 cursor-pointer hover:bg-gray-bg-1 transition-all py-3 px-4 rounded-md">
                <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
                  <Image src={FileImg} alt="file-img" />
                </div>
                <div className="mr-auto">
                  <h1 className="text-[0.88rem] font-semibold">
                    {el.filename || "unknown file"}
                  </h1>
                  <div className="flex text-[#00000066] items-center font-semibold text-[0.75rem]">
                    <p>{(Number(el.filesize) / 1000000).toFixed(3)}MB</p>
                  </div>
                </div>
                <div className="">
                  <Image src={DownloadImg} alt="download" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerChatRight;
