import React, { useEffect, useRef } from "react";
import TestImage from "/public/assets/test-avatar-big.png";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { AspectRatio } from "@mantine/core";

type Props = {
  text: string;
  user: "admin" | "user" | "consultant";
  prevUser: "admin" | "user" | "consultant" | null;
  index: number;
  lastmessage?: boolean;
  type: "text" | "file" | "img";
  filename: string;
  file: string;
  userprofilepic?: string
};

const ConsultantChatMessage = ({
  lastmessage,
  user,
  text,
  prevUser,
  index,
  file,
  filename,
  type,
  userprofilepic
}: Props) => {
  const noPfpRow = prevUser === user;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return () => {};
    if (lastmessage) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end",
      });
    }
  }, []);
  return (
    <div className="flex mb-3 px-4 w-full" ref={ref}>
      <div
        className={`${
          user === "consultant" ? "flex-row-reverse ml-auto" : ""
        } flex items-center `}
      >
        {prevUser === user && index + 1 !== 1 ? null : (
          <>
            {user === "admin" || user === "consultant" ? (
              <div className="w-[2.5rem]  h-[2.5rem] rounded-full bg-black flex items-center justify-center">
                {<Image src={AdminProfileImg} alt="admin-alt-profile" />}
              </div>
            ) : (
              <div className="w-[2.5rem] h-[2.5rem] mr-3">
                {userprofilepic && (
                  <AspectRatio ratio={1800 / 1800}>
                    <Image
                      src={userprofilepic}
                      alt="test-image"
                      className="w-full h-full rounded-full"
                      width={100}
                      height={100}
                    />
                  </AspectRatio>
                )}
              </div>
            )}
          </>
        )}
        <div
          className={` ${
            noPfpRow && user === "user"
              ? "ml-[3.2rem]"
              : noPfpRow && user === "user"
              ? "mr-[3.2rem]"
              : ""
          } ${
            type === "file" && user === "user"
              ? "bg-admin-chat-bg mr-2 text-black hover:bg-gray-2 transition-all"
              : type === "file" && user !== "user"
              ? "bg-black-2 text-white hover:bg-black-9 transition-all"
              : user === "user"
              ? "bg-admin-chat-bg text-black"
              : "bg-black-3 text-white mr-2"
          } text-[0.88rem] py-2 px-2 rounded-xl max-w-[20rem]`}
        >
          <p className="break-words">
            {type === "file" ? (
              <Link href={file}>
                <div className="cursor-pointer py-2 px-2">
                  <p>{filename || "file message"}</p>
                  <div className=" flex mt-2 items-center">
                    <p>file download</p>
                    <FaDownload className="ml-2" />
                  </div>
                </div>
              </Link>
            ) : type === "img" ? (
              <div className="">Image</div> 
            ) : (
              <>
                {text.split("\n").map((line, index) => (
                  <div className="" key={index}>
                    {line}
                    <br />
                  </div>
                ))}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsultantChatMessage;
