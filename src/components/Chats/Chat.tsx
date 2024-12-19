import React, { useEffect, useState } from "react";
import { IChatData } from "./CustomerChat/CustomerChatLeft";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import moment from "moment";
import { differenceInMilliseconds, isBefore } from "date-fns";
import { truncateStr } from "@/utils/helperFunction";

type Props = {
  data: IChatData;
  index: number;
  selctedIndex: number;
  orderId?: string | null;
  type?: "consultant" | "admin";
};

const Chat = ({ data, index, selctedIndex, orderId, type }: Props) => {
  const [status, setStatus] = useState<
    "ready" | "ongoing" | "completed" | "pending"
  >("pending");
  const [chatTimeStatus, setChatTimeStatus] = useState<string>("");

  const router = useRouter();
  const className =
    status === "ready"
      ? "bg-light-blue text-dark-blue"
      : status === "completed"
      ? "bg-light-green text-dark-green"
      : status === "pending"
      ? "bg-stroke-4 text-black-6"
      : "bg-light-yellow text-dark-yellow";

  useEffect(() => {
    let beforeTimeTimeout: NodeJS.Timeout | undefined;
    let timeout: NodeJS.Timeout | undefined;
    if (data) {
      const now = new Date();
      const isBeforeStartTime = isBefore(now, data.start_time);
      if (isBeforeStartTime) {
        setStatus("pending");
        setChatTimeStatus(moment(data.start_time).fromNow());
        const delay = differenceInMilliseconds(data.start_time, now);
        beforeTimeTimeout = setTimeout(() => {
          setStatus("ongoing");
          setChatTimeStatus("Chat active");
        }, delay);
      } else {
        const isBeforeEndtime = isBefore(now, data.end_time);
        if (isBeforeEndtime) {
          setChatTimeStatus("Chat active");
          setStatus("ongoing");
          const delay = differenceInMilliseconds(data.end_time, now);
          timeout = setTimeout(() => {
            setStatus("completed");
            setChatTimeStatus(moment(data.end_time).fromNow());
          }, delay);
          return clearTimeout(timeout);
        } else {
          setChatTimeStatus(moment(data.end_time).fromNow());
          setStatus("completed");
        }
      }
    }
    return () => {
      if (beforeTimeTimeout) clearTimeout(beforeTimeTimeout);
      if (timeout) clearTimeout(timeout);
    };
  }, [data, status]);

  return (
    <>
      <div
        onClick={() =>
          router.push(
            type === "consultant"
              ? `/consultants/dashboard/chats?chat=${data.orderId}`
              : `/user/dashboard/chats?chat=${data.orderId}`
          )
        }
        className={`${
          orderId === data.orderId ? "bg-[#615EF00F]" : ""
        } hidden chatbp:flex rounded-md transition-all hover:bg-[#615EF00F] items-start py-4 mb-2 px-4 cursor-pointer `}
      >
        <div className="w-[3rem] mr-3 h-[3rem] rounded-full bg-black flex items-center justify-center">
          <Image src={AdminProfileImg} alt="admin-alt-profile" />
        </div>
        <div className="">
          <h1 className="font-semibold text-[0.88rem]">
            {truncateStr(data.name, 15)}
          </h1>
          <p className="text-black-3 text-[0.75rem]">{data.service}</p>
          <div className="flex items-center mt-3">
            <div className="mr-2 text-black-3 rounded-full py-[0.15rem] border border-black-3 text-[0.75rem] font-medium px-3">
              <p>Service</p>
            </div>
            <div
              className={`${className} text-[0.75rem] font-semibold py-[0.15rem] px-2 rounded-full`}
            >
              <p>{status}</p>
            </div>
          </div>
        </div>
        <div className="ml-auto font-semibold text-[#00000056] text-[0.88rem]">
          <p>{chatTimeStatus}</p>
        </div>
      </div>
      <div
        onClick={() => router.push("/user/dashboard/chats/1")}
        className={`${
          index === selctedIndex ? "bg-[#615EF00F]" : ""
        } flex chatbp:hidden rounded-md items-start py-4 mb-2 px-4  `}
      >
        <div className="w-[3rem] mr-3 h-[3rem] rounded-full bg-black flex items-center justify-center">
          <Image src={AdminProfileImg} alt="admin-alt-profile" />
        </div>
        <div className="">
          <h1 className="font-semibold text-[0.88rem]">{data.name}</h1>
          <p className="text-black-3 text-[0.75rem]">{data.service}</p>
          <div className="flex items-center mt-3">
            <div className="mr-2 text-black-3 rounded-full py-[0.15rem] border border-black-3 text-[0.75rem] font-medium px-3">
              <p>Service</p>
            </div>
            <div
              className={`${className} text-[0.75rem] font-semibold py-[0.15rem] px-2 rounded-full`}
            >
              <p>{status}</p>
            </div>
          </div>
        </div>
        <div className="ml-auto font-semibold text-[#00000056] text-[0.88rem]">
          <p>{data.date}</p>
        </div>
      </div>
    </>
  );
};

export default Chat;
