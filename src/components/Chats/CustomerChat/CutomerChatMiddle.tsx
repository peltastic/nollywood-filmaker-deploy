import React, { useEffect, useState } from "react";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import MenuComponent from "@/components/Menu/MenuComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import ChatRoom from "../ChatRoom";
import HamburgerIcon from "/public/assets/chats/hamburger.svg";
import momentTz from "moment-timezone";
import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure, useInterval } from "@mantine/hooks";
import RequestExtension from "../ModalComponents/RequestExtension";
import ReportAnIssue from "../ModalComponents/ReportAnIssue";
import { useRouter } from "next/navigation";
import UserChatMenu from "../Menu/UserChatMenu";
import {
  useLazyFetchChatMessagesQuery,
  useLazyFetchSingleConversationDataQuery,
} from "@/lib/features/users/dashboard/chat/chat";
import Logo from "/public/assets/nav/logo.svg";
import Spinner from "@/app/Spinner/Spinner";
import { IGetUserConversations } from "@/interfaces/dashboard/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { chat_socket } from "@/lib/socket";
import { convertToAfricaLagosTz, truncateStr } from "@/utils/helperFunction";
import {
  addHours,
  differenceInDays,
  differenceInMilliseconds,
  differenceInMinutes,
  getHours,
  isAfter,
  isBefore,
} from "date-fns";
import { notify } from "@/utils/notification";

export interface ChatPayload {
  text: string;
  user: "user" | "consultant" | "admin";
  id: string
  // fileUrl: string
  // fileName: string
  // type: "text" | "file"
}

type Props = {
  open: () => void;
  opened: boolean;
  admin?: boolean;
  orderId?: string | null;
  isFetching?: boolean;
  data?: IGetUserConversations;
  type: "user" | "consultant" | "admin";
  isTime: boolean;
  sessionOver: boolean;
  setIsTimeProps: (val: boolean) => void;
  setIsSessionOverProps: (val: boolean) => void;
};

const CustomerChatMiddle = ({
  isTime,
  sessionOver,
  setIsSessionOverProps,
  setIsTimeProps,
  open,
  opened,
  type, 
  admin, 
  data, 
  isFetching,
  orderId
}: Props) => {
  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );
  const consultantData = useSelector(
    (state: RootState) => state.persistedState.consultant.user
  );
  const router = useRouter();

  const [fetchUserChatMessages, result] = useLazyFetchChatMessagesQuery();

  useEffect(() => {
    if (data) {
      fetchUserChatMessages(data.orderId);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const now = new Date();
      const startTime = new Date(data.startTime);
      const endTime = data.endTime;
      const isBeforeStartTime = isBefore(now, startTime);
      const isBeforeEndtime = isBefore(now, endTime);
      const isAfterStartTime = isAfter(now, startTime);

      const differenceInDaysStartTime = differenceInDays(startTime, now);

      const hours = getHours(startTime);
      if (isBeforeStartTime) {
        console.log("1");
        setIsTimeProps(false);
        setIsSessionOverProps(false);
        if (differenceInDaysStartTime >= 0) {
          startTime.setDate(now.getDate() + differenceInDaysStartTime);
          startTime.setHours(hours, 0, 0, 0);
          const delay = differenceInMilliseconds(startTime, now);
          const timer = setTimeout(() => {
            notify("message", "Chat session has started");
            setIsTimeProps(true);
            setIsSessionOverProps(false);
          }, delay);

          return () => {
            console.log("timeout cleared - starttime");
            clearTimeout(timer);
          };
        }
      } else if (isAfterStartTime && isBeforeEndtime) {
        console.log("2");
        setIsSessionOverProps(false);
        setIsTimeProps(true);
      } else {
        console.log("3");
        setIsSessionOverProps(true);
        setIsTimeProps(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const now = new Date();
      const startTime = data.startTime;
      const endTime = new Date(data.endTime);
      const isBeforeStartTime = isBefore(now, startTime);
      const isBeforeEndtime = isBefore(now, endTime);
      const isAfterStartTime = isAfter(now, startTime);

      const differenceInDaysEndTime = differenceInDays(endTime, now);

      const hours = getHours(endTime);
      if (isBeforeStartTime || (isAfterStartTime && isBeforeEndtime)) {
        if (isAfterStartTime && isBeforeEndtime) {
          setIsTimeProps(true);
        } else {
          setIsTimeProps(false);
        }
        console.log("4");
        setIsSessionOverProps(false);
        if (differenceInDaysEndTime >= 0) {
          endTime.setDate(now.getDate() + differenceInDaysEndTime);
          endTime.setHours(hours, 0, 0, 0);
          const delay = differenceInMilliseconds(endTime, now);
          const timer = setTimeout(() => {
            setIsTimeProps(false);
            setIsSessionOverProps(true);
          }, delay);
          return () => {
            console.log("timeout cleared - endtime");
            clearTimeout(timer);
          };
        }
      } else {
        console.log("5");
        setIsTimeProps(false);
        setIsSessionOverProps(true);
      }
    }
  }, [data]);

  const [chatData, setChatData] = useState<ChatPayload[]>([]);

  useEffect(() => {
    if (result.data) {
      const chat_data:ChatPayload[] = result.data.messages.map((el) => {
        return {
          text: el.message,
          user: el.role,
          id: el._id
        };
      });
      setChatData(chat_data);
    }
  }, [result.data]);

  useEffect(() => {
    if (isFetching) {
      setChatData([]);
    }
  }, [isFetching]);

  const updateChatDataHandler = (newEntry: ChatPayload) => {
    setChatData((prev) => [...prev, newEntry]);
  };

  return (
    <div className=" bg-white border-r relative border-r-stroke-8 border-l border-l-stroke-8  h-full">
      {!orderId ? (
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
          <Image src={Logo} alt="logo image" className="w-[10rem] opacity-50" />
          <p className="text-center font-semibold text-gray-4">
            Please select a conversation
          </p>
        </div>
      ) : (
        <div className="">
          {isFetching ? (
            <div className="w-[5rem] absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
              <Spinner dark />
            </div>
          ) : (
            <>
              <header className="flex items-center py-[1.4rem] px-2 sm:px-6 border-b border-b-stroke-8">
                <div
                  className="block chatbp:hidden"
                  onClick={() => router.back()}
                >
                  <IoIosArrowBack className="text-2xl mr-2" />
                </div>
                <div className="w-[2.5rem] mr-3 h-[2.5rem] rounded-full bg-black flex items-center justify-center">
                  <Image src={AdminProfileImg} alt="admin-alt-profile" />
                </div>
                <div className="">
                  <h1 className="font-semibold text-[1.25rem]">
                    {data?.chat_title &&
                      truncateStr(data.chat_title, 25)}
                  </h1>
                  <p className="text-[#00000082] text-[0.75rem] font-semibold">
                    {data?.nameofservice}
                  </p>
                </div>
                <div className="flex items-center ml-auto">
                  {(isTime || sessionOver) && (
                    <MenuComponent
                      target={
                        <div className="">
                          <UnstyledButton class="px-4 py-2 rounded-md items-center bg-black-3 hover:bg-blue-1  text-white flex">
                            <p className="mr-1 font-medium text-[0.88rem]">
                              Actions
                            </p>
                            <IoIosArrowDown />
                          </UnstyledButton>
                        </div>
                      }
                    >
                      {admin ? (
                        <div className="">
                          <ul className="px-1 text-gray-6 text-[0.88rem]">
                            <li className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                              Re-open chat
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <UserChatMenu />
                      )}
                    </MenuComponent>
                  )}
                  {isTime || sessionOver ? (
                    <div className="hidden lg:block">
                      {opened ? (
                        <div
                          onClick={open}
                          className=" hover:bg-stroke-4 transition-all ml-6 rounded-md cursor-pointer"
                        >
                          <Image src={HamburgerIcon} alt="hamburger-icons" />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {(isTime || sessionOver) && (
                    <div
                      onClick={open}
                      className="block lg:hidden hover:bg-stroke-4 transition-all ml-6 rounded-md cursor-pointer"
                    >
                      <Image src={HamburgerIcon} alt="hamburger-icons" />
                    </div>
                  )}
                </div>
              </header>

              <div className="h-full bg-white relative">
                {sessionOver || isTime ? null : (
                  <div className="absolute left-[50%] top-[50%]  -translate-x-1/2 z-10 -translate-y-1/2">
                    <Image
                      src={Logo}
                      alt="logo image"
                      className="w-[10rem] opacity-50 mx-auto"
                    />
                    <p className="text-center font-semibold text-gray-4">
                      Session with consultant hasn't started yet
                    </p>
                  </div>
                )}
                {data && (
                  <ChatRoom
                    userData={type === "user" ? userData : consultantData}
                    orderId={data.orderId}
                    updateChatHandlerProps={updateChatDataHandler}
                    type={type}
                    data={chatData}
                    isTime={isTime}
                    sessionOver={sessionOver}
                  />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerChatMiddle;
