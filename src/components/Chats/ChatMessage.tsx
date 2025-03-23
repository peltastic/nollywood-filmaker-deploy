import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import AdminProfileImg from "/public/assets/admin/logo-black.png";
import Image from "next/image";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { AspectRatio, Menu, RingProgress } from "@mantine/core";
import Lottie from "lottie-react";
import TypingLottie from "@/components/Lottie/typing.json";
import Linkify from "../Linkify/Linkify";
import { motion } from "framer-motion";
import { IReplyDataInfo } from "./ChatRoom";
import ModalComponent from "../Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import Spinner from "@/app/Spinner/Spinner";
import { Socket } from "socket.io-client";

type Props = {
  socket?: Socket | null;
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
  setReplyDataProps?: (data: IReplyDataInfo) => void;
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
  replytochattype?: "text" | "file" | "img" | "typing" | "contacts";
  uploadProgress: number;
  userId?: string;
  handleImgUpload: () => void;
};

const ChatMessage = React.memo(
  ({
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
    replytochattype,
    socket,
    userId,
    uploadProgress,
    handleImgUpload,
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
    const [progress, setProgress] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const contactsReplyData =
      replytochattype === "contacts" &&
      repliedText &&
      repliedText !== "contacts"
        ? JSON.parse(repliedText)
        : null;
    const userImage = useSelector(
      (state: RootState) => state.persistedState.user.user?.profilepics
    );

    // useEffect(() => {
    //   if (!ref.current || selectedRepliedToMessageId) return;

    //   if (lastmessage) {
    //     ref.current.scrollIntoView({
    //       behavior: "smooth",
    //       block: "nearest",
    //       inline: "end",
    //     });
    //   }
    // }, [lastmessage, ref]);
    // useEffect(() => {
    //   if (!imgRef.current || selectedRepliedToMessageId) return;

    //   if (lastmessage && type === "img") {
    //     imgRef.current.scrollIntoView({
    //       behavior: "smooth",
    //       block: "nearest",
    //       inline: "end",
    //     });
    //   }
    // }, [lastmessage, type]);
    useEffect(() => {
      if (lastmessage && (type === "file" || type === "img") && socket) {
        socket.on("progress", (data) => {
          if (userId && data.sender.userid === userId) {
            setProgress(data.progress);
          }
        });
      }
    }, [lastmessage, type, socket, userId]);

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

    const [imgUrl, setImgUrl] = useState<string>("");
    const [opened, { close, open }] = useDisclosure();

    return (
      <>
        <ModalComponent opened={opened} size="xl" centered onClose={close}>
          <div className="relative py-10 h-[20rem] w-[20rem] mx-auto">
            <div className="w-[6rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <Spinner dark />
            </div>
            {imgUrl && (
              <Image
                src={imgUrl}
                alt="file-name"
                width={100}
                height={100}
                className="mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] xs:w-[20rem] rounded-md"
              />
            )}
          </div>
          <div className="flex ">
            {imgUrl && (
              <Link
                href={imgUrl}
                target="_blank"
                className="text-white bg-black-2 ml-auto text-[0.88rem] py-2 px-4 rounded-md"
              >
                <p>Download image</p>
              </Link>
            )}
          </div>
        </ModalComponent>
        <div
          className="flex  py-1 px-1 sm:px-4 w-full"
          ref={ref}
          style={{
            backgroundColor: temporarySelectedHighlight,
            transition: "all",
          }}
        >
          <motion.div
            // drag="x"
            // dragConstraints={{ left: 0, right: 100 }}
            // onDrag={(event, info) => {
            //   if (info.offset.x < 120) {
            //     setDragX(info.offset.x);
            //   }
            // }} // Track drag position
            // onDragEnd={(event, info) => {
            //   if (info.offset.x > 100) {
            //     setReplyDataProps &&
            //       id &&
            //       setReplyDataProps({
            //         reply: type === "img" ? file : text,
            //         user,
            //         id,
            //         type: type === "text" || type === "file" ? "text" : type,
            //       });
            //     // onReply(text);
            //   }
            //   setDragX(0); // Reset position after swipe
            // }}
            // animate={{ x: dragX }} // Smoothly animate back
            // transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`${
              user === "user" ? "flex-row-reverse ml-auto" : ""
            } flex items-start`}
          >
            {prevUser === user && index + 1 !== 1 ? null : (
              <>
                {user === "admin" || user === "consultant" ? (
                  <div className="w-[1.8rem] sm:w-[2.5rem] mr-2 sm:mr-3 h-[1.8rem] sm:h-[2.5rem] rounded-full bg-white flex items-center justify-center">
                    {
                      <Image
                        src={AdminProfileImg}
                        alt="admin-alt-profile"
                        className="w-full h-full"
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
                if (window.getSelection()?.toString()) {
                  // If text is selected, do not prevent the default action
                  return;
                }
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
                      onClick={() => {
                        if (id && setReplyDataProps) {
                          if (type === "contacts" || type === "img") {
                            setReplyDataProps({
                              reply: type === "img" ? file : text,
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
                                type === "text" || type === "file"
                                  ? "text"
                                  : type,
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
                  {replytochattype === "img" ? (
                    <div className="">
                      <AspectRatio ratio={1800 / 1080}>
                        <Image
                          src={repliedText}
                          alt="file-name"
                          width={100}
                          height={100}
                          className="w-full rounded-md"
                        />
                      </AspectRatio>
                    </div>
                  ) : contactsReplyData ? (
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
                    <div
                      className={`cursor-pointer py-2 px-2 relative ${
                        lastmessage && progress < 99 ? "pr-10" : null
                      } `}
                    >
                      {lastmessage && progress < 99 && progress > 0 && (
                        <div className="absolute h-[.5rem] w-[.5rem] bottom-6 right-6">
                          <RingProgress
                            size={30}
                            className="w-[1rem]! h-[1rem]!"
                            sections={[{ value: progress, color: "green" }]}
                            thickness={2}
                            label={
                              <p className="text-[0.6rem] text-center">
                                {progress}
                              </p>
                            }
                          />
                        </div>
                      )}
                      <p>{filename || "file message"}</p>
                      <div className=" flex mt-2 items-center">
                        <p>file download</p>
                        <FaDownload className="ml-2" />
                      </div>
                    </div>
                  </Link>
                ) : type === "img" ? (
                  <div
                    // ref={imgRef}
                    className="cursor-pointer relative"
                    onClick={() => {
                      if (file) {
                        setImgUrl(file);
                        open();
                      }
                    }}
                  >
                    {lastmessage && progress < 99 && progress > 0 && (
                      <div className="absolute h-[.5rem] w-[.5rem] bottom-6 right-6">
                        <RingProgress
                          size={30}
                          className="w-[1rem]! h-[1rem]!"
                          sections={[{ value: progress, color: "green" }]}
                          thickness={2}
                          label={
                            <p className="text-[0.6rem] text-center">
                              {progress}
                            </p>
                          }
                        />
                      </div>
                    )}
                    <Image
                      src={file}
                      alt="file-name"
                      width={200}
                      height={200}
                      onLoad={handleImgUpload}
                      className="w-full"
                    />
                  </div>
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
      </>
    );
  }
);

export default ChatMessage;
