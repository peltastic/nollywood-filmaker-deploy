import React, { useEffect, useState } from "react";
import { IChatData } from "./CustomerChat/CustomerChatLeft";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import moment from "moment";
import momentTz from "moment-timezone";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { convertToAfricaLagosTz, truncateStr } from "@/utils/helperFunction";

type Props = {
  data: IChatData;
  index: number;
  selctedIndex: number;
  orderId?: string | null;
  type?: "consultant" | "admin";
};

const Chat = ({ data, index, selctedIndex, orderId, type }: Props) => {
  const [chatTimeStatus, setChatTimeStatus] = useState<string>("");

  const router = useRouter();
  const className =
    data.status === "completed"
      ? "bg-light-green text-dark-green border border-light-green"
      : "bg-light-yellow text-dark-yellow border border-light-yellow";

  useEffect(() => {
    const startTime = convertToAfricaLagosTz(data.start_time);
    const endTime = convertToAfricaLagosTz(data.end_time);
    const currTime = momentTz(new Date()).tz("Africa/Lagos").format();
    const differenceInDaysVal = differenceInDays(currTime, new Date(startTime));
    if (differenceInDaysVal > 1) {
      setChatTimeStatus(moment(data.date).format("DD/MM/YYYY"));
    } else {
      // setChatTimeStatus(
      //   differenceInMinutes( startTime, currTime) > 0 &&
      //     differenceInMinutes(currTime, endTime) < 0
      //     ? "Chat Active"
      //     :
      // );
      setChatTimeStatus(moment(endTime).fromNow());
    }
  }, [data]);

  return (
    <>
      <div
        onClick={() =>
          router.push(
            type === "consultant"
              ? `/consultants/dashboard/chats?chat=${data.id}`
              : `/user/dashboard/chats?chat=${data.id}`
          )
        }
        className={`${
          orderId === data.id ? "bg-[#615EF00F]" : ""
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
              <p>{data.status}</p>
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
              <p>{data.status}</p>
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
