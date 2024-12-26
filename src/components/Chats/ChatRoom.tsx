import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import AttachIcon from "/public/assets/chats/attach-icon.svg";
import Image from "next/image";
import SendImg from "/public/assets/chats/send-icon.svg";
import { Textarea } from "@mantine/core";
import { MdCancel } from "react-icons/md";
import CancelImg from "/public/assets/cancel.svg";
import Lottie from "lottie-react";

import {
  chat_socket,
  emitTypingEvent,
  joinChatRoom,
  sendChatMessageEvent,
  sendFileMessage,
  stopTypingEmit,
} from "@/lib/socket";
import { ChatPayload } from "./CustomerChat/CutomerChatMiddle";
import ConsultantChatMessage from "./ConsultantChatMessage";
import { IUserInfoData } from "@/interfaces/auth/auth";
import { useParams, useSearchParams } from "next/navigation";
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
  const [missedPongs, setMissedPongs] = useState(0);
  const [fileType, setFileType] = useState<"file" | "img">("file");
  const [istyping, setIsTyping] = useState<boolean>(false);

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

  const [opened, { open, close }] = useDisclosure();

  ///////////////UPDATE TYPING CHAT

  ////////////////CUSTOM CHAT LISTENERS - OPEN///////////////////////////

  useEffect(() => {
    chat_socket.on("connect", () => {
      while (messageQueueRef.current.length > 0) {
        const queuedMessage = messageQueueRef.current.shift();
        if (queuedMessage) {
          sendChatMessageEvent(queuedMessage);
        }
      }
      while (fileQueueRef.current.length > 0) {
        const fileMessage = fileQueueRef.current.shift();
        if (fileMessage) {
          sendFileMessage(fileMessage);
        }
      }
    });

    return () => {
      chat_socket.off("connect");
    };
  }, []);

  useEffect(() => {
    if (props.sessionOver) return () => {};
    chat_socket.on("disconnect", () => {
      chat_socket.connect();
    });
    return () => {
      chat_socket.off("disconnect");
    };
  }, [props.sessionOver]);

  useEffect(() => {
    chat_socket.on("reconnect_attempt", () => {
      console.log("reconnecting...");
    });
    return () => {
      chat_socket.off("reconnect_attempt");
    };
  }, []);
  useEffect(() => {
    chat_socket.on("reconnect", () => {
      console.log("reconnected");
    });
    return () => {
      chat_socket.off("reconnect");
    };
  }, []);

  ////////////////CUSTOM CHAT LISTENERS - CLOSE///////////////////////

  //join room

  useEffect(() => {
    if (props.sessionOver || !props.isTime) return () => {};
    console.log(props.orderId);
    if (props.userData) {
      joinChatRoom({
        room: props.orderId,
        name: `${props.userData.fname} ${props.userData.lname}`,
        role: "user",
        userId: props.userData.id,
      });
    }
  }, [props.isTime, props.sessionOver, props.orderId]);

  //typing listeners
  useEffect(() => {
    if (props.isTime) {
      chat_socket.on("stoptyping", (data) => {
        if (data.userId !== props.userData?.id) {
          console.log("stoptyping");
          setIsTyping(false);
        }
      });
      chat_socket.on("istyping", (data) => {
        if (data.userId !== props.userData?.id) {
          console.log("istyping");
          setIsTyping(true);
        }
      });

      return;
    }
  }, [props.isTime]);

  //send message

  const sendMessageHandler = () => {
    stopTypingEmit(props.orderId, `${props.userData?.id}`);
    if (props.userData) {
      const payload: {
        room: string;
        message: string;
        sender: {
          type: "text";
          userid: string;
          name: string;
          role: "user" | "consultant" | "admin";
          chatRoomId: string;
        };
      } = {
        room: props.orderId,
        message: inputValue,
        sender: {
          type: "text",
          name: `${props.userData.fname} ${props.userData.lname}`,
          role: props.type,
          userid: props.userData.id,
          chatRoomId: searchVal as string,
        },
      };
      if (chat_socket.connected) {
        sendChatMessageEvent(payload);
      } else {
        messageQueueRef.current.push(payload);
      }
      props.updateChatHandlerProps({
        text: inputValue,
        user: props.type,
        id: Math.floor(Math.random() * 100000).toString(),
        file: "",
        filename: "",
        type: "text",
      });
      setInputValue("");
    }
  };

  //custom ping interval

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (props.sessionOver) return () => {};
    if (props.isTime) {
      interval = setInterval(() => {
        if (chat_socket.connected) {
          chat_socket.emit("triggerPing", {
            room: props.orderId,
          });
          setMissedPongs((prev) => prev + 1);
        }
      }, 7000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [props.isTime, props.sessionOver]);

  useEffect(() => {
    if (props.sessionOver) return () => {};
    if (props.isTime) {
      chat_socket.on("roomPing", () => {
        console.log("received");
        setMissedPongs(0);
      });
      return () => {
        chat_socket.off("roomPing");
      };
    }
  }, [props.isTime, props.sessionOver]);

  //socket listener for new messages

  useEffect(() => {
    chat_socket.on(
      "message",
      (data: {
        sender: {
          name: string;
          role: "user" | "consultant" | "admin";
          userid: string;
          chatRoomId: string;
        };
        message: string;
      }) => {
        if (props.userData?.id === data.sender.userid) {
        } else {
          if (searchVal === data.sender.chatRoomId) {
            props.updateChatHandlerProps({
              text: data.message,
              user: data.sender.role,
              id: Math.floor(Math.random() * 100000).toString(),
              type: "text",
              file: "",
              filename: "",
            });
          }
        }
      }
    );

    return () => {
      chat_socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (missedPongs > 3) {
      chat_socket.connect();
      setMissedPongs(0);
      ("reconnecting..");
    }
  }, [missedPongs]);

  //socket listener for new files

  useEffect(() => {
    chat_socket.on(
      "fileMessage",
      (data: {
        fileUrl: string;
        fileName: string;
        sender: {
          chatRoomId: string;
          name: string;
          role: "user" | "consultant" | "admin";
          userid: string;
        };
      }) => {
        props.refetch();
        if (props.userData?.id === data.sender.userid) {
        } else {
          if (searchVal === data.sender.chatRoomId) {
            props.updateChatHandlerProps({
              text: data.fileName,
              user: data.sender.role,
              id: Math.floor(Math.random() * 100000).toString(),
              type: "file",
              file: data.fileUrl,
              filename: data.fileName,
            });
          }
        }
      }
    );
    return () => {
      chat_socket.off("fileMessage");
    };
  }, []);

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
      <div className=" py-6  h-full  relative bg-white">
        {/* {message && (
          <div className="h-[3rem] absolute left-0 top-0 w-full flex items-center px-8 text-white  bg-[#d14d4deb]">
            <p className="mr-4">
              {message}{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => props.refreshChat()}
              >
                Retry
              </span>
            </p>

            <div
              onClick={() => setReconnectMessage("")}
              className="w-[1rem] cursor-pointer ml-auto"
            >
              <Image src={CancelImg} alt="cancel-img" />
            </div>
          </div>
        )} */}
        <div className="h-[45rem] overflow-scroll w-full">
          {props.data && (
            <>
              {props.data.map((el, index) => (
                <div key={el.id}>
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
                    />
                  ) : (
                    <ConsultantChatMessage
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
                />
              )}
            </>
          )}
        </div>

        {props.sessionOver ? (
          <div className="flex items-center text-[0.88rem] bg-gray-bg-7 border mx-4 mt-8 py-2 rounded-md px-4 border-border-gray">
            <MdInfoOutline className="text-gray-4 mr-4 text-xl " />
            <p className="text-gray-4">This conversation has ended</p>
          </div>
        ) : props.isTime ? (
          <div className="min-h-[5rem] relative">
            <div className="w-full px-6  absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
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
                              chatRoomId: searchVal as string,
                            },
                          };
                          if (chat_socket.connected) {
                            sendFileMessage(payload);
                          } else {
                            fileQueueRef.current.push(payload);
                          }
                          props.updateChatHandlerProps({
                            text: fileInputValue.name,
                            user: props.type,
                            id: Math.floor(Math.random() * 100000).toString(),
                            file: base64File as string,
                            filename: fileInputValue.name,
                            type: fileType,
                          });
                          setFileInputValue(null);
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
                <UnstyledButton>
                  <FileButtonComponent
                    accept=""
                    setFile={(file) => {
                      setFileType("file");
                      setFileInputValue(file);
                      if (file) {
                        getBase64(file).then((res) => {
                          if (res) {
                            setBase64File(res as any);
                          }
                        });
                      }
                    }}
                  >
                    <div className="mr-10">
                      <Image src={AttachIcon} alt="attach-icon" />
                    </div>
                  </FileButtonComponent>
                </UnstyledButton>
                <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                  <div className="w-full relative">
                    <Textarea
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
                        console.log(props.orderId);
                        emitTypingEvent(props.orderId, `${props.userData?.id}`);
                        setInputValue(event.currentTarget.value);
                        setTimeout(() => {
                          stopTypingEmit(
                            props.orderId,
                            `${props.userData?.id}`
                          );
                        }, 3000);
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
                      {/* <div className="text-2xl ml-2">
                        <FileButtonComponent
                          accept="image/*"
                          setFile={(file) => {
                            setFileType("img");
                            setFileInputValue(file);
                            if (file) {
                              getBase64(file).then((res) => {
                                if (res) {
                                  setBase64File(res as any);
                                }
                              });
                            }
                          }}
                        >
                          <MdInsertPhoto />
                        </FileButtonComponent>
                      </div> */}
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
    </>
  );
};

export default ChatRoom;
