import React, { use } from "react";
import TestImage from "/public/assets/test-avatar-big.png";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";

type Props = {
  text: string;
  user: "admin" | "user";
  prevUser: "admin" | "user" | null;
  index: number;
};

const ChatMessage = ({ user, text, prevUser, index }: Props) => {
  const noPfpRow = prevUser === user 
  return (
    <div className="flex mb-3 px-4">
      <div
        className={`${
          user === "user" ? "flex-row-reverse ml-auto" : ""
        } flex items-center`}
      >
        {prevUser === user && index + 1 !== 1 ? null : (
          <>
            {user === "admin" ? (
              <div className="w-[2.5rem] mr-3 h-[2.5rem] rounded-full bg-black flex items-center justify-center">
                {<Image src={AdminProfileImg} alt="admin-alt-profile" />}
              </div>
            ) : (
              <div className="w-[2.5rem] h-[2.5rem]">
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
          className={` ${ noPfpRow && user === "admin" ? "ml-[3.2rem]" : noPfpRow && user === "user" ? "mr-[3.2rem]" : ""} ${
            user === "admin"
              ? "bg-admin-chat-bg text-black"
              : "bg-black-3 text-white mr-2"
          } text-[0.88rem] py-2 px-2 rounded-xl`}
        >
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
