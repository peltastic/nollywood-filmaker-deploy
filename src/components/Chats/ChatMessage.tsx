import React, { use, useEffect, useRef } from "react";
import TestImage from "/public/assets/test-avatar-big.png";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";

type Props = {
  text: string;
  user: "admin" | "user" | "consultant";
  prevUser: "admin" | "user" | "consultant" | null;
  index: number;
  lastmessage?: boolean;
};

const ChatMessage = ({ user, text, prevUser, index, lastmessage }: Props) => {
  const noPfpRow = prevUser === user;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return () => {};
    if (lastmessage) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end"
        
      });
    }
  }, []);

  return (
    <div className="flex mb-3 px-4 w-full" ref={ref}>
      <div
        className={`${
          user === "user" ? "flex-row-reverse ml-auto" : ""
        } flex items-center`}
      >
        {prevUser === user && index + 1 !== 1 ? null : (
          <>
            {user === "admin" || user === "consultant" ? (
              <div className="w-[2.5rem] mr-3 h-[2.5rem] rounded-full bg-black flex items-center justify-center">
                {<Image src={AdminProfileImg} alt="admin-alt-profile" />}
              </div>
            ) : (
              <div className="w-[2.5rem] h-[2.5rem] mr-3">
                <Image
                  src={TestImage}
                  alt="test-image"
                  className="w-full h-full"
                />
              </div>
            )}
          </>
        )}
        <div
          className={` ${
            noPfpRow && (user === "admin" || user === "consultant")
              ? "ml-[3.2rem]"
              : noPfpRow && user === "user"
              ? "mr-[3.2rem]"
              : ""
          } ${
            user === "admin" || user === "consultant"
              ? "bg-admin-chat-bg text-black"
              : "bg-black-3 text-white mr-2"
          } text-[0.88rem] py-2 px-2 rounded-xl max-w-[20rem]`}
        >
          <p className="break-words">
            {text.split("\n").map((line, index) => (
              <div className="" key={index}>
                {line}
                <br />
              </div>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
