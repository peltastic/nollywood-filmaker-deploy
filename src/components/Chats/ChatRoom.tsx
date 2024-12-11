import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import AttachIcon from "/public/assets/chats/attach-icon.svg";
import Image from "next/image";
import SendImg from "/public/assets/chats/send-icon.svg";
import { Textarea } from "@mantine/core";
import { useSendChatMessageMutation } from "@/lib/features/users/dashboard/chat/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  chat_socket,
  joinChatRoom,
  leaveRoom,
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

type Props = {
  type: "user" | "consultant" | "admin";
  orderId: string;
  data: ChatPayload[];
  updateChatHandlerProps: (newEntry: ChatPayload) => void;
  userData: IUserInfoData | null;
  isTime?: boolean;
  sessionOver?: boolean;
};

export interface IChatMessagesData {
  text: string;
  user: "admin" | "user" | "consultant";
}

const ChatRoom = (props: Props) => {
  const [sendUserChatMessage, {}] = useSendChatMessageMutation();
  const [fileInputValue, setFileInputValue] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | ArrayBuffer | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>("");
  const search = useSearchParams();
  const searchVal = search.get("chat");

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
    }
  };

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
        if (searchVal === data.sender.chatRoomId) {
          props.updateChatHandlerProps({
            text: data.message,
            user: data.sender.role,
            id: Math.floor(Math.random() * 100000).toString(),
          });
          setInputValue("");
        }
      }
    );

    chat_socket.on("fileMessage", (data) => {
      console.log(data);
    });

    return () => {
      leaveRoom()
      chat_socket.off("message");
      chat_socket.off("fileMessage");
    };
  }, []);

  const getBase64 = (file: File) => {
    return new Promise((resolve) => {
      let fileInfo;
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

  return (
    <div className=" py-6  h-full  relative bg-white">
      <div className="h-[45rem] overflow-scroll w-full">
        {props.data && (
          <>
            {props.data.map((el, index) => (
              <>
                {props.type === "user" ? (
                  <ChatMessage
                    key={el.text + index.toString()}
                    text={el.text}
                    user={el.user}
                    prevUser={index ? props.data[index - 1].user : null}
                    index={index}
                    lastmessage={props.data[props.data.length - 1].id === el.id}
                  />
                ) : (
                  <ConsultantChatMessage
                    key={el.text + index.toString()}
                    text={el.text}
                    user={el.user}
                    prevUser={index ? props.data[index - 1].user : null}
                    lastmessage={props.data[props.data.length - 1].id === el.id}
                    index={index}
                  />
                )}
              </>
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
              <div className=" flex items-center mb-6 ">
                <div className="max-w-[30rem] flex items-center break-words ml-10 border w-fit py-3 px-3 text-white rounded-md bg-gray-1 ">
                  <FaFile className="mr-4" />
                  <p>{fileInputValue.name}</p>
                </div>
                <div className="ml-2">
                  <UnstyledButton
                    clicked={() => {
                      if (base64File && props.userData) {
                        console.log({
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
  );
};

export default ChatRoom;
