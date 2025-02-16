import React, { useEffect, useRef, useState } from "react";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { AspectRatio, Menu } from "@mantine/core";
import Lottie from "lottie-react";
import TypingLottie from "@/components/Lottie/typing.json";
import Linkify from "../Linkify/Linkify";
import { motion } from "framer-motion";

type Props = {
  text: string;
  user: "admin" | "user" | "consultant";
  prevUser: "admin" | "user" | "consultant" | null;
  index: number;
  lastmessage?: boolean;
  type: "text" | "file" | "img" | "typing" | "contacts";
  filename: string;
  file: string;
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
  recommendations?: {
    type: "crew" | "company";
    name: string;
    userid: string;
    propic: string;
  };
  selectedRepliedToMessageId?: string;
  setSelectedRepliedToMessageId?: (val: string) => void;
};

const ChatMessage = ({
  user,
  text,
  prevUser,
  index,
  lastmessage,
  file,
  filename,
  type,
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
}: Props) => {
  const [temporarySelectedHighlight, setTemporarySelectedHighlight] =
    useState<string>("transparent");
  const [dragX, setDragX] = useState(0); // Store drag position
  const [isRightClicked, setIsRightClicked] = useState<boolean>(false);
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
  const userImage = useSelector(
    (state: RootState) => state.persistedState.user.user?.profilepics
  );

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
        }, 3000);
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
      className="flex  py-1 px-1 sm:px-4 w-full"
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
              });
            // onReply(text);
          }
          setDragX(0); // Reset position after swipe
        }}
        animate={{ x: dragX }} // Smoothly animate back
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${
          user === "user" ? "flex-row-reverse ml-auto" : ""
        } flex items-start`}
      >
        {prevUser === user && index + 1 !== 1 ? null : (
          <>
            {user === "admin" || user === "consultant" ? (
              <div className="w-[1.8rem] sm:w-[2.5rem] mr-2 sm:mr-3 h-[1.8rem] sm:h-[2.5rem] rounded-full bg-black flex items-center justify-center">
                {
                  <Image
                    src={AdminProfileImg}
                    alt="admin-alt-profile"
                    className="w-[60%] h-[60%]"
                  />
                }
              </div>
            ) : (
              <div className="w-[1.8rem] sm:w-[2.5rem] h-[2,5rem] sm:h-[2.5rem] mr-1 sm:mr-3">
                {userImage && (
                  <AspectRatio ratio={1800 / 1800}>
                    <Image
                      src={userImage}
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
              setIsRightClicked(true);
              setTimeout(() => setIsRightClicked(false), 1000);
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
            noPfpRow && (user === "admin" || user === "consultant")
              ? "ml-[2.8rem] sm:ml-[3.2rem]"
              : noPfpRow && user === "user"
              ? "mr-[2.8rem] sm:mr-[3.2rem]"
              : ""
          } ${
            type === "file" && user === "user"
              ? "bg-black-2 text-white hover:bg-black-9 transition-all mr-2"
              : type === "file" && user !== "user"
              ? "bg-admin-chat-bg  text-black hover:bg-gray-2 transition-al"
              : user !== "user"
              ? "bg-admin-chat-bg text-black"
              : `${
                  isRightClicked ? `bg-slate-700` : `bg-black-3`
                }  text-white mr-2`
          }  py-2 sm:py-3 px-2 sm:px-3 text-[0.8rem] sm:text-[0.95rem] rounded-xl max-w-[12rem] sm:max-w-[20rem] relative`}
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
          {repliedText && repliedTextId && repliedToUser && (
            <div
              onClick={() => {
                setSelectedRepliedToMessageId &&
                  repliedTextId &&
                  setSelectedRepliedToMessageId(repliedTextId);
              }}
              className={`cursor-pointer ${
                user === "user" ? "bg-gray-1" : "bg-gray-bg-8"
              } px-2 rounded-md py-1 mb-1 text-[0.8rem] sm:text-[0.88rem] ${
                repliedToUser === "user"
                  ? "border-l-dark-yellow"
                  : "border-l-dark-red"
              } border-l-4 `}
            >
              <p>{repliedToUser === "user" ? "You" : "Consultant"}</p>
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
                    <FaExternalLinkAlt className="text-xl  text-black" />
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

export default ChatMessage;
