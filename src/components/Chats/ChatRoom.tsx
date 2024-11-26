import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import AttachIcon from "/public/assets/chats/attach-icon.svg";
import Image from "next/image";
import SendImg from "/public/assets/chats/send-icon.svg";
import { Textarea } from "@mantine/core";
import { useSendChatMessageMutation } from "@/lib/features/users/dashboard/chat/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { chat_socket, joinChatRoom, sendChatMessageEvent } from "@/lib/socket";
import { ChatPayload } from "./CustomerChat/CutomerChatMiddle";
import ConsultantChatMessage from "./ConsultantChatMessage";
import { IUserInfoData } from "@/interfaces/auth/auth";

type Props = {
  type: "user" | "consultant" | "admin";
  orderId: string;
  data: ChatPayload[];
  updateChatHandlerProps: (newEntry: ChatPayload) => void;
  userData: IUserInfoData | null;
  isTime?: boolean;
};

export interface IChatMessagesData {
  text: string;
  user: "admin" | "user" | "consultant";
}

const chat_data: IChatMessagesData[] = [
  {
    text: "omg, this is amazing",
    user: "admin",
  },
  {
    text: "perfect! ✅",
    user: "admin",
  },
  {
    text: "Wow, this is really epic",
    user: "admin",
  },
  {
    text: "How are you?",
    user: "user",
  },
  {
    text: "just ideas for next time",
    user: "admin",
  },
  {
    text: "I'll be there in 2 mins ⏰",
    user: "admin",
  },
  {
    text: "woohoooo",
    user: "user",
  },
  {
    text: "Haha oh man",
    user: "user",
  },
  {
    text: "Haha that's terrifying 😂",
    user: "user",
  },
  {
    text: "aww",
    user: "admin",
  },
  {
    text: "omg, this is amazing",
    user: "admin",
  },
  {
    text: "woohoooo 🔥",
    user: "admin",
  },
];

const ChatRoom = (props: Props) => {
  const [sendUserChatMessage, {}] = useSendChatMessageMutation();
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (props.userData) {
      joinChatRoom({
        room: props.orderId,
        name: `${props.userData.fname} ${props.userData.lname}`,
        role: "user",
        userId: props.userData.id,
      });
    }
  }, []);

  const sendMessageHandler = () => {
    if (props.userData) {
      // sendUserChatMessage({
      //   message: inputValue,
      //   name: `${props.userData.fname} ${props.userData.lname}`,
      //   role: props.type,
      //   room: props.orderId,
      //   uid: props.userData.id,
      // });
      sendChatMessageEvent({
        room: props.orderId,
        message: inputValue,
        sender: {
          name: `${props.userData.fname} ${props.userData.lname}`,
          role: props.type,
          userid: props.userData.id,
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
        };
        message: string;
      }) => {
        console.log(data)
        // props.updateChatHandlerProps({
        //   text: data.message,
        //   user: data.sender.role,
        // });
      }
    );
  }, [props.data]);

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
                  />
                ) : (
                  <ConsultantChatMessage
                    key={el.text + index.toString()}
                    text={el.text}
                    user={el.user}
                    prevUser={index ? props.data[index - 1].user : null}
                    index={index}
                  />
                )}
              </>
            ))}
          </>
        )}
      </div>
      {props.isTime && (
        <div className="h-[5rem] relative">
          <div className="w-full px-6 flex items-center absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
            <div className="mr-10">
              <Image src={AttachIcon} alt="attach-icon" />
            </div>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="w-full">
                {/* <input
                type="text"
                placeholder="Type a message"
                className="outline-none border-2 px-4 pr-10 py-3 w-full rounded-xl border-stroke-7 placeholder:text-[#0000005f] text-[0.88rem]"
              /> */}
                <Textarea
                  minRows={0}
                  autosize
                  size="md"
                  radius={"md"}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.currentTarget.value)}
                />
                <button
                  onClick={sendMessageHandler}
                  disabled={!inputValue}
                  className="w-fit disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer absolute right-10 -translate-y-1/2 top-1/2"
                >
                  <Image src={SendImg} alt="send-img" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
