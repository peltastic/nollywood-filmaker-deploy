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
import { convertToAfricaLagosTz } from "@/utils/helperFunction";
import { differenceInMinutes } from "date-fns";
type Props = {
  close: () => void;
  closeRight?: boolean;
  data?: IGetUserConversations;
  openRight?: () => void;
  type?: "user" | "consultant" | "admin";
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

const CustomerChatRight = (props: Props) => {
  const [isTime, setIsTime] = useState<boolean>(false);
  const [sessionOver, setSessionOver] = useState<boolean>(false);
  useEffect(() => {
    if (props.data) {
      const startTime = convertToAfricaLagosTz(props.data.startTime);
      const endTime = convertToAfricaLagosTz(props.data.endTime);
      const diff = differenceInMinutes(
        momentTz(new Date()).tz("Africa/Lagos").format(),
        startTime
      );
      const diffEndTime = differenceInMinutes(
        endTime,
        momentTz(new Date()).tz("Africa/Lagos").format()
      );
      if (diffEndTime < 0) {
        setSessionOver(true);
      } else {
        setSessionOver(false);
      }

      if (diff >= 0) {
        setIsTime(true);
      } else {
        setIsTime(false);
      }
    }
  }, [props.data]);

  return (
    <div
      className={`border-l ${
        props.closeRight ? "hidden" : null
      }  border-l-stroke-8 h-full`}
    >
      <header className="w-full font-semibold flex items-center px-6 py-8  border-b border-b-stroke-8">
        <h1 className=" text-[1.25rem] mr-auto">Directory</h1>
        <div
          onClick={props.close}
          className=" hover:bg-stroke-4 transition-all rounded-md cursor-pointer"
        >
          <Image src={HamburgerIcon} alt="hamburger-icons" />
        </div>
      </header>
      <section>
        {props.data && (
          <ChatTimer
            timeData={{
              startTime: convertToAfricaLagosTz(props.data.startTime),
              endTime: convertToAfricaLagosTz(props.data.endTime),
            }}
            isTime={isTime}
            sessionOver={sessionOver}
            openRight={props.openRight}
            type={props.type}
          />
        )}
      </section>
      <section className="py-6 px-4 border-b border-b-stroke-8">
        <div className="flex items-center mb-2">
          <h1 className=" text-[0.88rem] font-semibold mr-2">In this chat</h1>
          <div className="rounded-full bg-gray-bg-6 h-[1.45rem] w-[1.45rem] flex items-center justify-center">
            <p className="text-[0.75rem] font-semibold">2</p>
          </div>
        </div>
        <div className="flex items-center py-4 px-2">
          <div className="w-[2.5rem] h-[2.5rem] mr-3 ">
            <Image src={TestImage} alt="test-image" className="w-full h-full" />
          </div>
          <div className="">
            <h1 className="font-semibold text-[0.88remrem]">
              Niyi Akinmolayan
            </h1>
            <p className="text-[#00000066] text-[0.75rem] font-semibold">You</p>
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
      {/* <section className="py-6 px-4 border-b border-b-stroke-8">
        <div className="flex items-center mb-2">
          <h1 className=" text-[0.88rem] font-semibold mr-2">
            Reviewed Request
          </h1>
          <div className="rounded-full bg-gray-bg-6 h-[1.45rem] w-[1.45rem] flex items-center justify-center">
            <p className="text-[0.75rem] font-semibold">3</p>
          </div>
        </div>
        <div className="py-6">
          {reviewed_request_file_data.map((el) => (
            <div className="flex items-center last:mb-0 mb-10" key={el.name}>
              <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
                <Image src={FileImg} alt="file-img" />
              </div>
              <div className="mr-auto">
                <h1 className="text-[0.88rem] font-semibold">{el.name}</h1>
                <div className="flex text-[#00000066] items-center font-semibold text-[0.75rem]">
                  <p className="mr-3">{el.file_type}</p>
                  <p>{el.size}</p>
                </div>
              </div>
              <div className="">
                <Image src={DownloadImg} alt="download" />
              </div>
            </div>
          ))}
        </div>
      </section> */}
      <section className="py-6 px-4 border-b border-b-stroke-8">
        <div className="flex items-center mb-2">
          <h1 className=" text-[0.88rem] font-semibold mr-2">In-chat files</h1>
          <div className="rounded-full bg-gray-bg-6 h-[1.45rem] w-[1.45rem] flex items-center justify-center">
            <p className="text-[0.75rem] font-semibold">3</p>
          </div>
        </div>
        <div className="py-6">
          {reviewed_request_file_data.map((el) => (
            <div className="flex items-center  mb-10" key={el.name}>
              <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
                <Image src={FileImg} alt="file-img" />
              </div>
              <div className="mr-auto">
                <h1 className="text-[0.88rem] font-semibold">{el.name}</h1>
                <div className="flex text-[#00000066] items-center font-semibold text-[0.75rem]">
                  <p
                    className="mr-3
                  "
                  >
                    {el.file_type}
                  </p>
                  <p>{el.size}</p>
                </div>
              </div>
              <div className="">
                <Image src={DownloadImg} alt="download" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerChatRight;
