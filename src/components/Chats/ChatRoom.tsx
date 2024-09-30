import React from "react";
import ChatMessage from "./ChatMessage";
import AttachIcon from "/public/assets/chats/attach-icon.svg";
import Image from "next/image";
import SendImg from "/public/assets/chats/send-icon.svg";

type Props = {};

export interface IChatMessagesData {
  text: string;
  user: "admin" | "user";
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
  return (
    <div className=" py-6 h-full ">
      <div className=" h-[90%] overflow-scroll">
        {chat_data.map((el, index) => (
          <ChatMessage
            key={el.text + index.toString()}
            text={el.text}
            user={el.user}
            prevUser={index ? chat_data[index - 1].user : null}
            index={index}
          />
        ))}
      </div>
      <div className="h-[10%] relative">
        <div className="w-full px-6 flex items-center absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
          <div className="mr-10">
            <Image src={AttachIcon} alt="attach-icon" />
          </div>
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full">
              <input
                type="text"
                placeholder="Type a message"
                className="outline-none border-2 px-4 pr-10 py-3 w-full rounded-xl border-stroke-7 placeholder:text-[#0000005f] text-[0.88rem]"
              />
              <div className="w-fit absolute right-10 -translate-y-1/2 top-1/2">
                <Image src={SendImg} alt="send-img" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
