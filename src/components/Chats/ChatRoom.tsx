import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import AttachIcon from "/public/assets/chats/attach-icon.svg";
import Image from "next/image";
import SendImg from "/public/assets/chats/send-icon.svg";
import { Textarea } from "@mantine/core";
import { MdCancel } from "react-icons/md";
import config from "@/config/config";
import {
  chat_socket,
  emitTypingEvent,
  IChatMessagePayload,
  IContactMessagePayload,
  joinChatRoom,
  sendChatMessageEvent,
  sendContactData,
  sendFileMessage,
  stopTypingEmit,
} from "@/lib/socket";
import { ChatPayload } from "./CustomerChat/CutomerChatMiddle";
import ConsultantChatMessage from "./ConsultantChatMessage";
import { IUserInfoData } from "@/interfaces/auth/auth";
import { useSearchParams } from "next/navigation";
import { MdInfoOutline } from "react-icons/md";
import FileButtonComponent from "../FileButton/FileButtonComponent";
import UnstyledButton from "../Button/UnstyledButton";
import { FaFile } from "react-icons/fa";
import { RiSendPlane2Line } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
import RateYourExperience from "./ModalComponents/RateYourExperience";
import ModalComponent from "../Modal/Modal";
import { differenceInMilliseconds, isAfter } from "date-fns";
import classes from "@/app/styles/Input.module.css";
import ReplyBox from "./ReplyBox";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import MenuComponent from "../Menu/MenuComponent";
import { IoMdContact } from "react-icons/io";
import FilmmakerDatabaseModal from "./ModalComponents/FilmmakerDatabaseModal";
import { ICrewFilmmakerDatabaseColumnData } from "../Columns/admin/CrewFilmmakerDatabaseColumn";
import { ICompanyFilmmakerDatabaseColumnData } from "../Columns/admin/CompanyFilmmakerDatabaseColumn";
import { notify } from "@/utils/notification";
import { useSocket } from "../Providers/SocketProviders";

type Props = {
  type: "user" | "consultant" | "admin";
  orderId: string;
  data: ChatPayload[];
  updateChatHandlerProps: (newEntry: ChatPayload) => void;
  userData: IUserInfoData | null;
  isTime?: boolean;
  sessionOver?: boolean;
  endTime: string;
  refetch: () => void;
  refreshChat: () => void;
  status: "ongoing" | "completed" | "pending" | "ready";
  profilepics?: string;
};

export interface IChatMessagesData {
  text: string;
  user: "admin" | "user" | "consultant";
}

const ChatRoom = (props: Props) => {
  const { socket } = useSocket();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [missedPongs, setMissedPongs] = useState(0);
  const [fileType, setFileType] = useState<"file" | "img">("file");
  const [istyping, setIsTyping] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [replyData, setReplyData] = useState<{
    user: "admin" | "user" | "consultant" | null;
    reply: string;
    id: string;
  }>({
    user: null,
    reply: "",
    id: "",
  });

  const messageQueueRef = useRef<
    {
      room: string;
      message: string;
      sender: {
        type: "text";
        userid: string;
        name: string;
        role: "user" | "consultant" | "admin";
        chatRoomId: string;
        replyto: string;
        replytoId: string;
        mid: string;
        replytousertype: "user" | "consultant" | "admin" | null;
      };
    }[]
  >([]);

  const fileQueueRef = useRef<
    {
      room: string;
      fileData: string | ArrayBuffer;
      fileName: string;
      sender: {
        type: "img" | "file";
        userid: string;
        name: string;
        role: "user" | "consultant" | "admin";
        chatRoomId: string;
        mid: string;
      };
    }[]
  >([]);
  const [fileInputValue, setFileInputValue] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | ArrayBuffer | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>("");
  const search = useSearchParams();
  const searchVal = search.get("chat");
  const [selectedRepliedToMessageId, setSelectedRepliedToMessageId] =
    useState<string>("");

  const [opened, { open, close }] = useDisclosure();
  // useEffect(() => {
  //   if (!socket) return;
  //   if (props.type === "admin") return () => {};
  //   if (props.sessionOver) return () => {};
  //   socket.on("disconnect", (data) => {
  //     console.log("i disconnected", console.log(data));
  //     socket.connect();
  //   });
  //   return () => {
  //     socket.off("disconnect");
  //   };
  // }, [props.sessionOver]);

  // useEffect

  ////////////////CUSTOM CHAT LISTENERS - CLOSE///////////////////////

  //join room

  useEffect(() => {
    if (props.type === "admin") return () => {};
    if (props.sessionOver || !props.isTime) return () => {};
    if (props.userData) {
      if (socket) {
        joinChatRoom(
          {
            room: props.orderId,
            name: `${props.userData.fname} ${props.userData.lname}`,
            role: "user",
            userId: props.userData.id,
          },
          socket
        );
      }
    }
  }, [props.isTime, props.sessionOver, props.orderId]);

  //typing listeners
  useEffect(() => {
    if (!socket) return;
    if (props.isTime) {
      socket.on("stoptyping", (data) => {
        if (data.userId !== props.userData?.id) {
          setIsTyping(false);
        }
      });
      socket.on("istyping", (data) => {
        if (data.userId !== props.userData?.id) {
          setIsTyping(true);
        }
      });

      return;
    }
  }, [props.isTime, socket]);

  //send message

  const setActiveIdHandler = (id?: string) => {
    setActiveId(id || null);
  };

  const sendCrewContactMessage = (data: ICrewFilmmakerDatabaseColumnData[]) => {
    if (props.userData) {
      const id = uuidv4();

      const payload: IContactMessagePayload = {
        message: "contacts",
        room: props.orderId,
        sender: {
          replyto: replyData.reply,
          replytoId: replyData.id,
          mid: id,
          replytousertype: replyData.user,
          chatRoomId: searchVal as string,
          role: props.type,
          type: "contacts",
          userid: props.userData.id,
          name: `${props.userData.fname} ${props.userData.lname}`,
          recommendations: data.map((el) => {
            return {
              name: el.fullname,
              propic: el.fulldata.propic,
              type: "crew",
              userid: el.fulldata.userId,
            };
          }),
        },
      };
      if (socket) {
        sendContactData(payload, socket);
      }
      for (const el of payload.sender.recommendations) {
        props.updateChatHandlerProps({
          text: "",
          user: props.type,
          id: id,
          file: "",
          filename: "",
          type: "contacts",
          replyTo: replyData.reply,
          replyToId: replyData.id,
          replytousertype: replyData.user,
          recommendations: {
            name: el.name,
            propic: el.propic,
            type: el.type,
            userid: el.userid,
          },
        });
      }
    }
  };
  const sendCompanyContactMessage = (
    data: ICompanyFilmmakerDatabaseColumnData[]
  ) => {
    if (props.userData) {
      const id = uuidv4();
      const payload: IContactMessagePayload = {
        message: "contacts",
        room: props.orderId,
        sender: {
          replyto: replyData.reply,
          replytoId: replyData.id,
          mid: id,
          replytousertype: replyData.user,
          chatRoomId: searchVal as string,
          role: props.type,
          type: "contacts",
          userid: props.userData.id,
          name: `${props.userData.fname} ${props.userData.lname}`,
          recommendations: data.map((el) => {
            return {
              name: el.name,
              propic: el.fulldata.propic,
              type: "company",
              userid: el.fulldata.userId,
            };
          }),
        },
      };
      if (socket) {
        sendContactData(payload, socket);
      }
      for (const el of payload.sender.recommendations) {
        props.updateChatHandlerProps({
          text: "",
          user: props.type,
          id: id,
          file: "",
          filename: "",
          type: "contacts",
          replyTo: replyData.reply,
          replyToId: replyData.id,
          replytousertype: replyData.user,
          recommendations: {
            name: el.name,
            propic: el.propic,
            type: el.type,
            userid: el.userid,
          },
        });
      }
    }
  };
  const sendMessageHandler = () => {
    if (socket) {
      stopTypingEmit(props.orderId, `${props.userData?.id}`, socket);
    }
    const id = uuidv4();
    if (props.userData) {
      const payload: IChatMessagePayload = {
        room: props.orderId,
        message: inputValue,
        sender: {
          type: "text",
          name: `${props.userData.fname} ${props.userData.lname}`,
          role: props.type,
          userid: props.userData.id,
          chatRoomId: props.orderId,
          replyto: replyData.reply,
          replytoId: replyData.id,
          mid: id,
          replytousertype: replyData.user,
        },
      };

      // if (socket.connected) {
      if (socket) {
        sendChatMessageEvent(payload, socket);
      }
      // } else {
      //   messageQueueRef.current.push(payload);
      // }
      props.updateChatHandlerProps({
        text: inputValue,
        user: props.type,
        id: id,
        file: "",
        filename: "",
        type: "text",
        replyTo: replyData.reply,
        replyToId: replyData.id,
        replytousertype: replyData.user,
      });
      setInputValue("");
      setReplyData({
        id: "",
        reply: "",
        user: null,
      });
    }
  };

  //custom ping interval

  useEffect(() => {
    if (props.type === "admin") return;
    let interval: NodeJS.Timeout | undefined;
    if (props.sessionOver) return;
    if (props.isTime) {
      interval = setInterval(() => {
        // console.log("i sent ping", moment(new Date()).format("h:mm a"));
        if (socket) {
          socket.emit("triggerPing", {
            room: props.orderId,
          });
        }
        setMissedPongs((prev) => prev + 1);
      }, 20000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [props.isTime, props.sessionOver]);

  useEffect(() => {
    if (!socket) return;
    if (props.type === "admin") return () => {};
    if (props.sessionOver) return () => {};
    if (props.isTime) {
      socket.on("roomPing", () => {
        setMissedPongs(0);
      });
      return () => {
        socket.off("roomPing");
      };
    }
  }, [props.isTime, props.sessionOver]);

  //socket listener for new messages

  useEffect(() => {
    if (!socket) return;
    if (props.type === "admin") return () => {};
    socket.on(
      "message",
      (data: {
        sender: {
          name: string;
          role: "user" | "consultant" | "admin";
          userid: string;
          uid: string;
          chatRoomId: string;
          replyto: string;
          replytoId: string;
          mid: string;
          type: string;
          replytousertype?: "user" | "consultant" | "admin" | null;
          recommendations: {
            type: "crew" | "company";
            name: string;
            userid: string;
            propic: string;
          }[];
        };
        message: string;
      }) => {
        if (
          props.userData?.id === data.sender.userid ||
          props.userData?.id === data.sender.userid
        ) {
        } else {
          if (props.orderId === data.sender.chatRoomId) {
            if (data.sender.type === "contacts") {
              for (const el of data.sender.recommendations) {
                props.updateChatHandlerProps({
                  text: "",
                  user: data.sender.role,
                  id: data.sender.mid,
                  file: "",
                  filename: "",
                  type: "contacts",
                  replyTo: data.sender.replyto,
                  replyToId: data.sender.replytoId,
                  replytousertype: data.sender.replytousertype,
                  recommendations: {
                    name: el.name,
                    propic: el.propic,
                    type: el.type,
                    userid: el.userid,
                  },
                });
              }
            } else {
              props.updateChatHandlerProps({
                text: data.message,
                user: data.sender.role,
                id: data.sender.mid,
                type: "text",
                file: "",
                filename: "",
                replyTo: data.sender.replyto,
                replyToId: data.sender.replytoId,
                replytousertype: data.sender.replytousertype,
              });
            }
          }
        }
      }
    );

    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    if (missedPongs > 3) {
      socket.connect();
      setMissedPongs(0);
      console.log("missed my pong, i am reconnecting..");
    }
  }, [missedPongs]);

  //socket listener for new files

  useEffect(() => {
    if (!socket) return;
    if (props.type === "admin") return () => {};
    socket.on(
      "fileMessage",
      (data: {
        fileUrl: string;
        fileName: string;
        sender: {
          chatRoomId: string;
          name: string;
          role: "user" | "consultant" | "admin";
          userid: string;
          mid: string;
          replyto: string;
          replytoId: string;
          replytousertype?: "user" | "consultant" | "admin" | null;
        };
      }) => {
        props.refetch();
        if (props.userData?.id === data.sender.userid) {
        } else {
          if (props.orderId === data.sender.chatRoomId) {
            props.updateChatHandlerProps({
              text: data.fileName,
              user: data.sender.role,
              id: data.sender.mid,
              type: "file",
              file: data.fileUrl,
              filename: data.fileName,
              replyTo: data.sender.replyto,
              replyToId: data.sender.replytoId,
              replytousertype: data.sender.replytousertype,
            });
          }
        }
      }
    );
    return () => {
      socket.off("fileMessage");
    };
  }, [socket]);

  useEffect(() => {
    if (typeof document === "undefined" || props.type === "admin") return;
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !socket?.connected) {
        notify("message", "Your connection got lost, refreshing chat");
        if (socket) {
          socket.connect();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket, props.type]);

  useEffect(() => {
    if (props.type === "admin") return;
    if (!socket) return;

    socket.on("connect", () => {
      if (props.userData) {
        joinChatRoom(
          {
            room: props.orderId,
            name: `${props.userData.fname} ${props.userData.lname}`,
            role: "user",
            userId: props.userData.id,
          },
          socket
        );
        props.refreshChat()
      }
    });
    return () => {
      socket.off("connect");
    };
  }, [socket]);

  //get base64 for chat files to be uploaded

  const getBase64 = (file: File) => {
    return new Promise((resolve) => {
      let baseUrl: string | ArrayBuffer | null = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Make a fileInfo Object
        baseUrl = reader.result;
        resolve(baseUrl);
      };
    });
  };

  //open feedback after chat session is over

  useEffect(() => {
    if (props.type === "admin") return () => {};
    let timer: NodeJS.Timeout | undefined;
    if (props.endTime && props.type === "user") {
      const now = new Date();
      const isAfterEndTime = isAfter(now, props.endTime);
      if (isAfterEndTime) return () => {};
      const delay = differenceInMilliseconds(props.endTime, now);
      timer = setTimeout(() => {
        open();
      }, delay);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [props.endTime]);

  useEffect(() => {
    if (!ref.current) return () => {};
    if (replyData.reply) {
      ref.current.focus();
    }
  }, [replyData.reply]);
  // useEffect(() => {
  //  database.open()
  // }, [])

  const [databaseOpened, database] = useDisclosure();

  return (
    <>
      <ModalComponent
        onClose={close}
        opened={opened}
        centered
        size="xl"
        withCloseButton={false}
      >
        <RateYourExperience orderId={props.orderId} close={close} />
      </ModalComponent>
      <ModalComponent
        onClose={database.close}
        fullscreen
        withCloseButton={false}
        size="xl"
        opened={databaseOpened}
      >
        <FilmmakerDatabaseModal
          sendCrewContact={sendCrewContactMessage}
          close={database.close}
          sendCompanyContact={sendCompanyContactMessage}
        />
      </ModalComponent>
      <div className=" py-6  h-full  relative bg-white">
        <div className=" overflow-y-scroll nolly-film-hide-scrollbar w-full h-[90%] pb-8">
          {props.data && (
            <>
              {props.data.map((el, index) => (
                <div key={el.id + uuidv4()}>
                  {props.type === "user" ? (
                    <ChatMessage
                      file={el.file}
                      filename={el.filename}
                      type={el.type}
                      key={el.text + index.toString()}
                      text={el.text}
                      user={el.user}
                      prevUser={index ? props.data[index - 1].user : null}
                      index={index}
                      lastmessage={
                        props.data[props.data.length - 1].id === el.id
                      }
                      setActiveId={
                        props.isTime ? setActiveIdHandler : undefined
                      }
                      // setActiveId={setActiveIdHandler}
                      id={el.id}
                      activeId={activeId}
                      setReplyDataProps={(val) => setReplyData(val)}
                      repliedText={el.replyTo}
                      repliedTextId={el.replyToId}
                      selectedRepliedToMessageId={selectedRepliedToMessageId}
                      setSelectedRepliedToMessageId={(val) =>
                        setSelectedRepliedToMessageId(val)
                      }
                      repliedToUser={el.replytousertype}
                      recommendations={el.recommendations}
                    />
                  ) : (
                    <ConsultantChatMessage
                      recommendations={el.recommendations}
                      file={el.file}
                      filename={el.filename}
                      type={el.type}
                      key={el.text + index.toString()}
                      text={el.text}
                      user={el.user}
                      prevUser={index ? props.data[index - 1].user : null}
                      lastmessage={
                        props.data[props.data.length - 1].id === el.id
                      }
                      index={index}
                      userprofilepic={props.profilepics}
                      setActiveId={
                        props.isTime ? setActiveIdHandler : undefined
                      }
                      id={el.id}
                      activeId={activeId}
                      setReplyDataProps={(val) => setReplyData(val)}
                      repliedText={el.replyTo}
                      repliedTextId={el.replyToId}
                      repliedToUser={el.replytousertype}
                      selectedRepliedToMessageId={selectedRepliedToMessageId}
                      setSelectedRepliedToMessageId={(val) =>
                        setSelectedRepliedToMessageId(val)
                      }
                    />
                  )}
                </div>
              ))}
            </>
          )}
          {istyping && (
            <>
              {props.type === "user" ? (
                <ChatMessage
                  file=""
                  filename=""
                  index={props.data.length}
                  prevUser={"user"}
                  text=""
                  type="typing"
                  user={props.type === "user" ? "consultant" : "user"}
                  lastmessage={true}
                />
              ) : (
                <ConsultantChatMessage
                  file=""
                  filename=""
                  index={props.data.length}
                  prevUser={"user"}
                  text=""
                  type="typing"
                  user={props.type === "consultant" ? "user" : "consultant"}
                  lastmessage={true}
                />
              )}
            </>
          )}
        </div>
        {replyData.reply && (
          <ReplyBox
            cancelReplyBox={() =>
              setReplyData({
                reply: "",
                user: null,
                id: "",
              })
            }
            type={props.type}
            replyData={replyData}
          />
        )}
        {props.type === "admin" ? null : (
          <div className="h-[10%] relative ">
            {props.sessionOver ? (
              <div className="absolute bottom-0 w-[90%] xs:w-[93%] sm:w-[95%]   flex items-center text-[0.88rem] bg-gray-bg-7 border mx-4 mt-8 py-2 rounded-md px-4 border-border-gray">
                <MdInfoOutline className="text-gray-4 mr-4 text-xl " />
                <p className="text-gray-4">This conversation has ended</p>
              </div>
            ) : props.isTime ? (
              <div className="h-full ">
                <div className="w-full   px-6  absolute bottom-0 mt-5">
                  {fileInputValue && (
                    <div className=" flex items-center mb-6 bg-white shadow-[rgba(0,0,10,0.1)_2px_2px_2px_4px] ml-10 w-fit py-4 px-6 rounded-md">
                      <div
                        className=""
                        onClick={() => {
                          setFileInputValue(null);
                          setBase64File(null);
                        }}
                      >
                        <MdCancel className="text-2xl text-red-1 mr-2 cursor-pointer" />
                      </div>
                      <div className="max-w-[30rem] flex items-center break-words  border w-fit py-3 px-2 text-white rounded-md bg-black-2 ">
                        <FaFile className="mr-4" />
                        <p>{fileInputValue.name}</p>
                      </div>
                      <div className="ml-2">
                        <UnstyledButton
                          clicked={() => {
                            const id = uuidv4();
                            if (base64File && props.userData) {
                              const payload = {
                                fileData: base64File,
                                fileName: fileInputValue.name,
                                room: props.orderId,
                                sender: {
                                  type: fileType,
                                  name: `${props.userData.fname} ${props.userData.lname}`,
                                  role: props.type,
                                  userid: props.userData.id,
                                  chatRoomId: props.orderId,
                                  mid: id,
                                  replyto: replyData.reply,
                                  replytoId: replyData.id,
                                  replytousertype: replyData.user,
                                },
                              };
                              // if (chat_socket.connected) {
                              if (socket) {
                                sendFileMessage(payload, socket);
                              }
                              // } else {
                              //   fileQueueRef.current.push(payload);
                              // }
                              props.updateChatHandlerProps({
                                text: fileInputValue.name,
                                user: props.type,
                                id,
                                file: base64File as string,
                                filename: fileInputValue.name,
                                type: fileType,
                                replyTo: replyData.reply,
                                replyToId: replyData.id,
                                replytousertype: replyData.user,
                              });
                              setFileInputValue(null);
                              setReplyData({
                                id: "",
                                reply: "",
                                user: null,
                              });
                            }
                          }}
                          class="flex hover:bg-blue-1 transition-all items-center bg-black-2 text-white py-2 px-4 rounded-md"
                        >
                          <p className="mr-2">Send</p>
                          <RiSendPlane2Line className=" text-xl" />
                        </UnstyledButton>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <MenuComponent
                      position="top-start"
                      target={
                        <div className="cursor-pointer">
                          <div className="mr-3 md:mr-10">
                            <Image src={AttachIcon} alt="attach-icon" />
                          </div>
                        </div>
                      }
                    >
                      <div className="">
                        <ul className=" text-black-2 py-2 px-2">
                          <li className="">
                            <UnstyledButton class="hover:bg-gray-bg-9 transition-all py-1 rounded-md px-3 w-full">
                              <FileButtonComponent
                                accept=""
                                setFile={(file) => {
                                  setFileType("file");
                                  setFileInputValue(file);
                                  if (file) {
                                    getBase64(file).then((res) => {
                                      const id = uuidv4();
                                      if (res) {
                                        if (res && props.userData) {
                                          const payload = {
                                            fileData: res as string,
                                            fileName: file.name,
                                            room: props.orderId,
                                            sender: {
                                              type: fileType,
                                              name: `${props.userData.fname} ${props.userData.lname}`,
                                              role: props.type,
                                              userid: props.userData.id,
                                              chatRoomId: searchVal as string,
                                              mid: id,
                                              replyto: replyData.reply,
                                              replytoId: replyData.id,
                                              replytousertype: replyData.user,
                                            },
                                          };
                                          if (socket) {
                                            sendFileMessage(payload, socket);
                                          }

                                          props.updateChatHandlerProps({
                                            text: file.name,
                                            user: props.type,
                                            id,
                                            file: res as string,
                                            filename: file.name,
                                            type: fileType,
                                            replyTo: replyData.reply,
                                            replyToId: replyData.id,
                                            replytousertype: replyData.user,
                                          });
                                          setFileInputValue(null);
                                          setReplyData({
                                            id: "",
                                            reply: "",
                                            user: null,
                                          });
                                        }
                                        // setBase64File(res as any);
                                      }
                                    });
                                  }
                                }}
                              >
                                <div className="flex items-center">
                                  <div className="h-[2rem] mr-2 flex items-center justify-center w-[2rem] rounded-full bg-gray-300">
                                    <FaFile className="text-md" />
                                  </div>
                                  <p>File</p>
                                </div>
                              </FileButtonComponent>
                            </UnstyledButton>
                          </li>
                          {props.type === "consultant" && (
                            <li
                              onClick={database.open}
                              className="flex items-center px-3 mt-4 hover:bg-gray-bg-9 cursor-pointer transition-all py-1 rounded-md"
                            >
                              <div className="h-[2rem] mr-2 flex items-center justify-center w-[2rem] rounded-full bg-gray-300">
                                <IoMdContact className="text-md" />
                              </div>
                              <p>Contact</p>
                            </li>
                          )}
                        </ul>
                      </div>
                    </MenuComponent>
                    <form
                      className="w-full"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="w-full relative hidden lg:block">
                        <Textarea
                          ref={ref}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              sendMessageHandler();
                            }
                          }}
                          minRows={0}
                          autosize
                          size="md"
                          radius={"md"}
                          value={inputValue}
                          onChange={(event) => {
                            if (socket) {
                              emitTypingEvent(
                                props.orderId,
                                `${props.userData?.id}`,
                                socket
                              );
                              setInputValue(event.currentTarget.value);
                              setTimeout(() => {
                                stopTypingEmit(
                                  props.orderId,
                                  `${props.userData?.id}`,
                                  socket
                                );
                              }, 3000);
                            }
                          }}
                          classNames={{
                            input: classes.input,
                          }}
                        />
                        <div className=" flex items-center absolute right-6 -translate-y-1/2 top-1/2">
                          <button
                            onClick={sendMessageHandler}
                            disabled={!inputValue}
                            className="w-fit disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                          >
                            <Image src={SendImg} alt="send-img" />
                          </button>
                        </div>
                      </div>
                      <div className="w-full relative block lg:hidden">
                        <Textarea
                          ref={ref}
                          minRows={0}
                          autosize
                          size="md"
                          radius={"md"}
                          value={inputValue}
                          onChange={(event) => {
                            setInputValue(event.currentTarget.value);
                            if (socket) {
                              emitTypingEvent(
                                props.orderId,
                                `${props.userData?.id}`,
                                socket
                              );
                              setTimeout(() => {
                                stopTypingEmit(
                                  props.orderId,
                                  `${props.userData?.id}`,
                                  socket
                                );
                              }, 3000);
                            }
                          }}
                          classNames={{
                            input: classes.input,
                          }}
                        />
                        <div className=" flex items-center absolute right-6 -translate-y-1/2 top-1/2">
                          <button
                            onClick={sendMessageHandler}
                            disabled={!inputValue}
                            className="w-fit disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                          >
                            <Image src={SendImg} alt="send-img" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className=""></div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatRoom;
