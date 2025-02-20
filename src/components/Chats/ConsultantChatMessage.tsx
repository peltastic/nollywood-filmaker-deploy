import React, { useEffect, useRef, useState } from "react";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { AspectRatio } from "@mantine/core";
import Lottie from "lottie-react";
import TypingLottie from "@/components/Lottie/typing.json";
import Linkify from "../Linkify/Linkify";
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { IReplyDataInfo } from "./ChatRoom";

type Props = {
  text: string;
  user: "admin" | "user" | "consultant";
  prevUser: "admin" | "user" | "consultant" | null;
  index: number;
  lastmessage?: boolean;
  type: "text" | "file" | "img" | "typing" | "contacts";
  filename: string;
  file: string;
  userprofilepic?: string;
  id?: string;
  setActiveId?: (id?: string) => void;
  activeId?: string | null;
  setReplyDataProps?: (data: IReplyDataInfo) => void;
  recommendations?: {
    type: "crew" | "company";
    name: string;
    userid: string;
    propic: string;
  };
  repliedText?: string;
  repliedTextId?: string;
  repliedToUser?: "admin" | "user" | "consultant" | null;
  replytochattype?: "text" | "file" | "img" | "typing" | "contacts";
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
  repliedToUser,
  recommendations,
  replytochattype,
}: Props) => {
  const [temporarySelectedHighlight, setTemporarySelectedHighlight] =
    useState<string>("transparent");

  const [dragX, setDragX] = useState(0); // Store drag position
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
  // console.log(JSON.parse(repliedText || ""))
  const contactsReplyData =
    replytochattype === "contacts" && repliedText !== "contacts" && repliedText
      ? JSON.parse(repliedText)
      : null;
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
    if (!ref.current) return () => {};
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
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 100 }}
        onDrag={(event, info) => {
          if (info.offset.x < 120) {
            setDragX(info.offset.x);
          }
        }} // Track drag position
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) {
            setReplyDataProps &&
              id &&
              setReplyDataProps({
                reply: text,
                user,
                id,

                type: type === "text" || type === "file" ? "text" : type,
              });
            // onReply(text);
          }
          setDragX(0); // Reset position after swipe
        }}
        animate={{ x: dragX }} // Smoothly animate back
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${
          user === "consultant" ? "flex-row-reverse ml-auto" : ""
        } flex items-start `}
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
              : noPfpRow && user !== "user"
              ? "mr-[3.2rem]"
              : ""
          } ${
            type === "file" && user === "user"
              ? "bg-admin-chat-bg mr-2 text-black hover:bg-gray-2 transition-all"
              : type === "file" && user !== "user"
              ? "bg-black-2 text-white hover:bg-black-9 transition-all mr-2"
              : user === "user"
              ? "bg-admin-chat-bg text-black"
              : "bg-black-3 text-white mr-2"
          } text-[0.8rem] sm:text-[0.95rem] py-3 px-3 rounded-xl max-w-[12rem] sm:max-w-[20rem] relative`}
        >
          {contextMenu.visible && activeId === id && (
            <div className="absolute bg-white text-black-3 w-[6rem] top-6 shadow-md z-10 px-1 text-[0.88rem] py-2 rounded-md">
              <ul className="">
                <li
                  onClick={() => {
                    if (id && setReplyDataProps) {
                      if (type === "contacts") {
                        setReplyDataProps({
                          reply: text,
                          user,
                          id,
                          type: "contacts",
                          contacts: {
                            name: recommendations?.name,
                            photourl: recommendations?.propic,
                            type: recommendations?.type,
                          },
                        });
                      } else {
                        setReplyDataProps({
                          reply: text,
                          user,
                          id,

                          type:
                            type === "text" || type === "file" ? "text" : type,
                        });
                      }
                    }
                  }}
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
              } px-2 rounded-md py-1 mb-1 text-[0.8rem] sm:text-[0.88rem] ${
                repliedToUser === "consultant"
                  ? "border-l-dark-red"
                  : "border-l-dark-yellow"
              } border-l-4`}
            >
              <p>{repliedToUser === "consultant" ? "You" : "Customer"}</p>
              {contactsReplyData ? (
                <div className="flex items-center mt-2">
                  <div className="h-[2.5rem] w-[2.5rem] mr-3">
                    {contactsReplyData.photourl && (
                      <AspectRatio ratio={1800 / 1800}>
                        <Image
                          src={contactsReplyData.photourl}
                          alt="propic"
                          width={100}
                          height={100}
                          className="rounded-full  h-full w-full"
                        />
                      </AspectRatio>
                    )}
                  </div>
                  <div className="">
                    {contactsReplyData.name && (
                      <p className="">{contactsReplyData.name}</p>
                    )}
                    {contactsReplyData.type && (
                      <p className="font-semibold">
                        Film {contactsReplyData.type}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p>{repliedText}</p>
              )}
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
            ) : type === "contacts" && recommendations ? (
              <div className="flex items-start ">
                <div className="">
                  <div className="h-[2.5rem] w-[2.5rem]">
                    <AspectRatio ratio={1800 / 1800}>
                      <Image
                        src={recommendations.propic}
                        alt="propic"
                        width={100}
                        height={100}
                        className="rounded-full  h-full w-full"
                      />
                    </AspectRatio>
                  </div>
                  <p className="mt-2">{recommendations.name}</p>
                  <p className="font-semibold">
                    {recommendations.type === "crew"
                      ? "Film crew"
                      : "Film company"}
                  </p>
                </div>
                <Link
                  target="_blank"
                  href={
                    recommendations.type === "crew"
                      ? `/filmmaker-database/profile/crew/${recommendations.userid}`
                      : `/filmmaker-database/profile/company/${recommendations.userid}`
                  }
                >
                  <div className="rounded-full px-3 py-3 transition-all mt-2 cursor-pointer ml-10  hover:bg-slate-500 w-fit">
                    <FaExternalLinkAlt className="text-xl  text-white" />
                  </div>
                </Link>
              </div>
            ) : (
              <>
                {text.split("\n").map((line, index) => (
                  <p className="" key={index}>
                    <Linkify>{line}</Linkify>
                    <br />
                  </p>
                ))}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultantChatMessage;
