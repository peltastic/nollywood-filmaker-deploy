import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import AttachIcon from "/public/assets/chats/attach-icon.svg";
import Image from "next/image";
import SendImg from "/public/assets/chats/send-icon.svg";
import { Textarea } from "@mantine/core";
import { MdCancel } from "react-icons/md";
import CancelImg from "/public/assets/cancel.svg";

import {
  chat_socket,
  joinChatRoom,
  sendChatMessageEvent,
  sendFileMessage,
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
import Spinner from "@/app/Spinner/Spinner";
import { useChatConnectionEvent } from "@/hooks/useChatConnectionEvent";
import { notify } from "@/utils/notification";

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
};

export interface IChatMessagesData {
  text: string;
  user: "admin" | "user" | "consultant";
}

const ChatRoom = (props: Props) => {
  const { message, setReconnectMessage } = useChatConnectionEvent(
    props.refreshChat,
    props.sessionOver,
    props.isTime
  );
  const [messageQueue, setMessageQueue] = useState<ChatPayload[]>([]);
  const [fileInputValue, setFileInputValue] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | ArrayBuffer | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>("");
  const search = useSearchParams();
  const searchVal = search.get("chat");

  const [opened, { open, close }] = useDisclosure();
  useEffect(() => {
    if (props.sessionOver) return () => {};
    if (props.userData) {
      joinChatRoom({
        room: props.orderId,
        name: `${props.userData.fname} ${props.userData.lname}`,
        role: "user",
        userId: props.userData.id,
      });
    }
  }, [props.isTime, props.sessionOver]);

  const sendMessageHandler = () => {
    if (props.userData) {
      sendChatMessageEvent({
        room: props.orderId,
        message: inputValue,
        sender: {
          name: `${props.userData.fname} ${props.userData.lname}`,
          role: props.type,
          userid: props.userData.id,
          chatRoomId: searchVal as string,
        },
      });
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

  useEffect(() => {
    if (props.sessionOver) return () => {};
    if (props.isTime) {
      const interval = setInterval(() => {
        chat_socket.emit("triggerPing", {
          room: props.orderId,
        });
      }, 30000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [props.isTime, props.sessionOver]);
  useEffect(() => {
    if (props.sessionOver) return () => {};
    if (props.isTime) {
      const interval = setInterval(() => {
        chat_socket.emit("ping", {
          room: props.orderId,
        });
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [props.isTime, props.sessionOver]);

  useEffect(() => {
    if (props.sessionOver) return () => {};
    if (props.isTime) {
      chat_socket.on("roomPing", () => {
        console.log("received");
      });
      return () => {
        chat_socket.off("roomPing");
      };
    }
  }, [props.isTime, props.sessionOver]);

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
      console.log("disconnected - message");
      chat_socket.off("message");
    };
  }, []);

  useEffect(() => {
    console.log("file - connected");
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
      console.log("disconnected - filemessage");
      chat_socket.off("fileMessage");
    };
  }, []);

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

  useEffect(() => {
    if (props.endTime && props.type === "user") {
      const now = new Date();
      const isAfterEndTime = isAfter(now, props.endTime);
      if (isAfterEndTime) return () => {};
      const delay = differenceInMilliseconds(props.endTime, now);
      const timer = setTimeout(() => {
        open();
      }, delay);
      return () => {
        clearTimeout(timer);
      };
    }
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
        {message && (
          <div className="h-[3rem] absolute left-0 top-0 w-full flex items-center px-8 text-white  bg-[#d14d4deb]">
            <p className="mr-4">
              {message}{" "}
              <span
                className="underlin cursor-pointere"
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
        )}
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
                    />
                  )}
                </div>
              ))}
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
                          sendFileMessage({
                            fileData: base64File,
                            fileName: fileInputValue.name,
                            room: props.orderId,
                            sender: {
                              name: `${props.userData.fname} ${props.userData.lname}`,
                              role: props.type,
                              userid: props.userData.id,
                              chatRoomId: searchVal as string,
                            },
                          });
                          props.updateChatHandlerProps({
                            text: fileInputValue.name,
                            user: props.type,
                            id: Math.floor(Math.random() * 100000).toString(),
                            file: base64File as string,
                            filename: fileInputValue.name,
                            type: "file",
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
                    accept="application/pdf, .docx"
                    setFile={(file) => {
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
                      onChange={(event) =>
                        setInputValue(event.currentTarget.value)
                      }
                    />
                    <button
                      onClick={sendMessageHandler}
                      disabled={!inputValue}
                      className="w-fit disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer absolute right-3 -translate-y-1/2 top-1/2"
                    >
                      <Image src={SendImg} alt="send-img" />
                    </button>
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
