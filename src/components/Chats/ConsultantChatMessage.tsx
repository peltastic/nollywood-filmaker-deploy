import React, { useEffect, useRef, useState } from "react";
import TestImage from "/public/assets/test-avatar-big.png";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { AspectRatio } from "@mantine/core";
import Lottie from "lottie-react";
import TypingLottie from "@/components/Lottie/typing.json";

type Props = {
  text: string;
  user: "admin" | "user" | "consultant";
  prevUser: "admin" | "user" | "consultant" | null;
  index: number;
  lastmessage?: boolean;
  type: "text" | "file" | "img" | "typing";
  filename: string;
  file: string;
  userprofilepic?: string;
  id?: string;
  setActiveId?: (id?: string) => void;
  activeId?: string | null;
  setReplyDataProps?: (data: {
    user: "admin" | "user" | "consultant" | null;
    reply: string;
    id: string;
  }) => void;
  repliedText?: string;
  repliedTextId?: string;
  repliedToUser?: "admin" | "user" | "consultant" | null;
  selectedRepliedToMessageId?: string;
  setSelectedRepliedToMessageId?: (val: string) => void;
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
  userprofilepic,
  id,
  setActiveId,
  activeId,
  setReplyDataProps,
  repliedText,
  repliedTextId,
  selectedRepliedToMessageId,
  setSelectedRepliedToMessageId,
  repliedToUser
}: Props) => {
  const [temporarySelectedHighlight, setTemporarySelectedHighlight] =
    useState<string>("transparent");
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
  });
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

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!ref.current) return () => {}
    if (selectedRepliedToMessageId === id) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end",
      });
      setTemporarySelectedHighlight("#7e9aaf15");
      if (selectedRepliedToMessageId) {
        timeout = setTimeout(() => {
          setTemporarySelectedHighlight("transparent");
          setSelectedRepliedToMessageId && setSelectedRepliedToMessageId("");
        }, 2000);
      }
    }
  }, [selectedRepliedToMessageId]);

  const handleClickOutside = () => {
    setActiveId && setActiveId();
    setContextMenu({ ...contextMenu, visible: false });
  };

  useEffect(() => {
    if (contextMenu.visible) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu.visible]);
  return (
    <div
      className="flex mb-3 px-4 w-full"
      ref={ref}
      style={{
        backgroundColor: temporarySelectedHighlight,
        transition: "all",
      }}
    >
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
          onContextMenu={(e) => {
            if (setActiveId) {
              setActiveId();
              e.preventDefault();
              setActiveId(id);
              setContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY,
              });
            }
          }}
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
          } text-[0.95rem] py-3 px-3 rounded-xl max-w-[20rem] relative`}
        >
          {contextMenu.visible && activeId === id && (
            <div className="absolute bg-white text-black-3 w-[6rem] top-6 shadow-md z-10 px-1 text-[0.88rem] py-2 rounded-md">
              <ul className="">
                <li
                  onClick={() =>
                    setReplyDataProps &&
                    id &&
                    setReplyDataProps({
                      reply: text,
                      user,
                      id,
                    })
                  }
                  className="px-3 py-1 cursor-pointer hover:bg-gray-bg-2"
                >
                  Reply
                </li>
              </ul>
            </div>
          )}
          {repliedText && repliedTextId && (
            <div
              onClick={() => {
                setSelectedRepliedToMessageId &&
                  repliedTextId &&
                  setSelectedRepliedToMessageId(repliedTextId);
              }}
              className={`cursor-pointer ${
                user === "consultant" ? "bg-gray-1" : "bg-gray-bg-8"
              } px-2 rounded-md py-1 mb-1 text-[0.88rem] ${repliedToUser === "consultant" ? "border-l-dark-red" : "border-l-dark-yellow"} border-l-4`}
            >
                 <p>{repliedToUser === "consultant" ? "You" : "Customer"}</p>
              <p>{repliedText}</p>
            </div>
          )}
          <div className="break-words">
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
            ) : type === "typing" ? (
              <div className="w-[3rem]">
                <Lottie animationData={TypingLottie} />
              </div>
            ) : (
              <>
                {text.split("\n").map((line, index) => (
                  <p className="" key={index}>
                    {line}
                    <br />
                  </p>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantChatMessage;
