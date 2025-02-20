"use client"
import React, { useEffect, useState } from "react";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import MenuComponent from "@/components/Menu/MenuComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ChatRoom from "../ChatRoom";
import HamburgerIcon from "/public/assets/chats/hamburger.svg";

import { useRouter } from "next/navigation";
import UserChatMenu from "../Menu/UserChatMenu";
import {
  useLazyExtentTimeQuery,
  useLazyFetchChatMessagesQuery,
} from "@/lib/features/users/dashboard/chat/chat";
import Logo from "/public/assets/nav/logo.svg";
import Spinner from "@/app/Spinner/Spinner";
import { IGetUserConversations } from "@/interfaces/dashboard/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { truncateStr } from "@/utils/helperFunction";
import { differenceInMilliseconds, isAfter, isBefore } from "date-fns";
import { notify } from "@/utils/notification";
import { useLazyFetchConsultantChatMessagesQuery } from "@/lib/features/consultants/dashboard/chat/chat";
import ModalComponent from "@/components/Modal/Modal";
import RequestExtension from "../ModalComponents/RequestExtension";
import ReportAnIssue from "../ModalComponents/ReportAnIssue";
import { useDisclosure } from "@mantine/hooks";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import { nprogress } from "@mantine/nprogress";
import { useSetChatAsCompleteMutation } from "@/lib/features/consultants/dashboard/request";
import { useLazyFetchChatMessagesByAdminQuery } from "@/lib/features/admin/chats/chats";
import { useSocket } from "@/components/Providers/SocketProviders";
import { chat_socket, primary_socket } from "@/lib/socket";
import AdminChatMenu from "../Menu/AdminChatMenu";

export interface ChatPayload {
  text: string;
  user: "user" | "consultant" | "admin";
  id: string;
  file: string;
  filename: string;
  type: "text" | "file" | "img" | "typing" | "contacts";
  replyTo?: string;
  replyToId?: string;
  replytousertype?: "user" | "consultant" | "admin" | null;
  replytochattype?: "text" | "file" | "img" | "typing" | "contacts";
  recommendations?: {
    type: "crew" | "company";
    name: string;
    userid: string;
    propic: string;
  };
}

type Props = {
  open: () => void;
  opened: boolean;
  admin?: boolean;
  orderId?: string | null;
  isFetching?: boolean;
  profilepic?: string;
  data?: IGetUserConversations;
  type: "user" | "consultant" | "admin";
  isTime: boolean;
  sessionOver: boolean;
  refreshChat: () => void;
  setIsTimeProps: (val: boolean) => void;
  setIsSessionOverProps: (val: boolean) => void;
  refetch: () => void;
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
  orderId,
  refreshChat,
  refetch,
  profilepic,
}: Props) => {
  const { socket } = useSocket();

  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );
  const consultantData = useSelector(
    (state: RootState) => state.persistedState.consultant.user
  );
  const router = useRouter();
  const [extendTime, res] = useLazyExtentTimeQuery();

  const [fetchUserChatMessages, result] = useLazyFetchChatMessagesQuery();
  const [extensionAuthUrl, setExtensionAuthUrl] = useState("");
  const [extentionValue, setExtensionValue] = useState<string>("");
  const [transref, setTransRef] = useState<string>("");
  const [setAsCompleted, completedRes] = useSetChatAsCompleteMutation();

  const [paymentStatus, setPaymentStatus] = useState<
    "initialized" | "pending" | "completed"
  >("initialized");
  const [fetchConsultantChatMessages, consultantRes] =
    useLazyFetchConsultantChatMessagesQuery();
  const [fetchChatMessagesByAdmin, byAdminRes] =
    useLazyFetchChatMessagesByAdminQuery();

  useEffect(() => {
    if (data) {
      if (type === "user") {
        fetchUserChatMessages(data.orderId);
      } else if (type === "consultant") {
        fetchConsultantChatMessages(data.orderId);
      } else {
        fetchChatMessagesByAdmin(data.orderId);
      }
    }
  }, [data]);

  useEffect(() => {
    if (type === "admin") return () => {};
    let timeout: NodeJS.Timeout | undefined;
    if (data) {
      const now = new Date();
      const startTime = new Date(data.startTime);
      const endTime = data.endTime;
      const isBeforeStartTime = isBefore(now, startTime);
      const isBeforeEndtime = isBefore(now, endTime);
      const isAfterStartTime = isAfter(now, startTime);

      if (isBeforeStartTime) {
        setIsTimeProps(false);
        setIsSessionOverProps(false);

        const delay = differenceInMilliseconds(startTime, now);
        timeout = setTimeout(() => {
          notify("message", "Chat session has started");
          setIsTimeProps(true);
          setIsSessionOverProps(false);
        }, delay);
      } else if (isAfterStartTime && isBeforeEndtime) {
        setIsSessionOverProps(false);
        setIsTimeProps(true);
      } else {
        setIsSessionOverProps(true);
        setIsTimeProps(false);
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [data]);

  useEffect(() => {
    if (type === "admin") return () => {};
    let timeout: NodeJS.Timeout | undefined;
    if (data) {
      const now = new Date();
      const startTime = data.startTime;
      const endTime = new Date(data.endTime);
      const isBeforeStartTime = isBefore(now, startTime);
      const isBeforeEndtime = isBefore(now, endTime);
      const isAfterStartTime = isAfter(now, startTime);

      if (isBeforeStartTime || (isAfterStartTime && isBeforeEndtime)) {
        const delay = differenceInMilliseconds(endTime, now);
        timeout = setTimeout(() => {
          setIsTimeProps(false);
          setIsSessionOverProps(true);
          if (orderId && type === "consultant") {
            setAsCompleted(orderId);
          }
        }, delay);
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [data]);

  const [chatData, setChatData] = useState<ChatPayload[]>([]);

  useEffect(() => {
    setChatData([]);
  }, [orderId]);

  useEffect(() => {
    if (result.data) {
      const chat_data: ChatPayload[] = [];
      for (const el of result.data.messages) {
        if (el.recommendations.length > 0) {
          for (const val of el.recommendations) {
            chat_data.push({
              text: el.message,
              user: el.role,
              id: el._id,
              file: el.type === "file" ? el.message : "",
              filename: el.type === "file" ? el.filename : "",
              type: el.type,
              replyTo: el.replyto,
              replyToId: el.replytoId,
              replytousertype: el.replytousertype,
              recommendations: val,
              replytochattype: el.replytochattype
            });
          }
        } else {
          chat_data.push({
            text: el.message,
            user: el.role,
            id: el._id,
            file: el.type === "file" ? el.message : "",
            filename: el.type === "file" ? el.filename : "",
            type: el.type,
            replyTo: el.replyto,
            replyToId: el.replytoId,
            replytousertype: el.replytousertype,
            replytochattype: el.replytochattype
            // recommendations: [],
          });
        }
      }

      setChatData([
        {
          text: `Welcome to Nollywood Filmmaker!  🎥\nHow can we make your experience amazing today?\n\nQuick Tips for an Easy Chat:\n\n✨ Replying Made Simple: Just right-click on any message and hit “Reply.”\n\n✨ Keep the Conversation Flowing: You can export chats or flag any issues for review.\n\n✨ File Access: Need to check out shared files? You’ll find them conveniently on the right-hand side.\n\n⏳ Time Reminder: We’ll remind you when you’re 10 minutes away from the end of your session, and a timer will pop up to help ...`,
          user: "consultant",
          id: "nollywood-filmaker",
          type: "text",
          file: "",
          filename: "",
          replyTo: "",
          replyToId: "",
        },
        ...chat_data,
      ]);
    }
  }, [result.data]);

  useEffect(() => {
    if (consultantRes.data) {
      const chat_data: ChatPayload[] = [];
      for (const el of consultantRes.data.messages) {
        if (el.recommendations.length > 0) {
          for (const val of el.recommendations) {
            chat_data.push({
              text: el.message,
              user: el.role,
              id: el._id,
              file: el.type === "file" ? el.message : "",
              filename: el.type === "file" ? el.filename : "",
              type: el.type,
              replyTo: el.replyto,
              replyToId: el.replytoId,
              replytousertype: el.replytousertype,
              replytochattype: el.replytochattype,
              recommendations: val,
            });
          }
        } else {
          chat_data.push({
            text: el.message,
            user: el.role,
            id: el._id,
            file: el.type === "file" ? el.message : "",
            filename: el.type === "file" ? el.filename : "",
            type: el.type,
            replyTo: el.replyto,
            replyToId: el.replytoId,
            replytousertype: el.replytousertype,
            replytochattype: el.replytochattype
            // recommendations: [],
          });
        }
      }
      setChatData([
        {
          text: `Welcome to Nollywood Filmmaker!  🎥\nHow can we make your experience amazing today?\n\nQuick Tips for an Easy Chat:\n\n✨ Replying Made Simple: Just right-click on any message and hit “Reply.”\n\n✨ Keep the Conversation Flowing: You can export chats or flag any issues for review.\n\n✨ File Access: Need to check out shared files? You’ll find them conveniently on the right-hand side.\n\n⏳ Time Reminder: We’ll remind you when you’re 10 minutes away from the end of your session, and a timer will pop up to help ...`,
          user: "consultant",
          id: "nollywood-filmaker",
          type: "text",
          file: "",
          filename: "",
          replyTo: "",
          replyToId: "",
        },
        ...chat_data,
      ]);
    }
  }, [consultantRes.data]);

  useEffect(() => {
    if (byAdminRes.data) {
      const chat_data: ChatPayload[] = [];
      for (const el of byAdminRes.data.messages) {
        if (el.recommendations.length > 0) {
          for (const val of el.recommendations) {
            chat_data.push({
              text: el.message,
              user: el.role,
              id: el._id,
              file: el.type === "file" ? el.message : "",
              filename: el.type === "file" ? el.filename : "",
              type: el.type,
              replyTo: el.replyto,
              replyToId: el.replytoId,
              replytousertype: el.replytousertype,
              replytochattype: el.replytochattype,
              recommendations: val,
            });
          }
        } else {
          chat_data.push({
            text: el.message,
            user: el.role,
            id: el._id,
            file: el.type === "file" ? el.message : "",
            filename: el.type === "file" ? el.filename : "",
            type: el.type,
            replyTo: el.replyto,
            replyToId: el.replytoId,
            replytousertype: el.replytousertype,
            replytochattype: el.replytochattype
            // recommendations: [],
          });
        }
      }
      setChatData([
        {
          text: `Welcome to Nollywood Filmmaker!  🎥\nHow can we make your experience amazing today?\n\nQuick Tips for an Easy Chat:\n\n✨ Replying Made Simple: Just right-click on any message and hit “Reply.”\n\n✨ Keep the Conversation Flowing: You can export chats or flag any issues for review.\n\n✨ File Access: Need to check out shared files? You’ll find them conveniently on the right-hand side.\n\n⏳ Time Reminder: We’ll remind you when you’re 10 minutes away from the end of your session, and a timer will pop up to help ...`,
          user: "consultant",
          id: "nollywood-filmaker",
          type: "text",
          file: "",
          filename: "",
          replyTo: "",
          replyToId: "",
        },
        ...chat_data,
      ]);
    }
  }, [byAdminRes.data]);

  const updateChatDataHandler = (newEntry: ChatPayload) => {
    setChatData((prev) => [...prev, newEntry]);
  };

  const [extensionOpened, extensionOpenedFuncs] = useDisclosure();
  const [reportModOpened, funcs] = useDisclosure();
  const [transOpened, transFunc] = useDisclosure();

  useEffect(() => {
    if (res.isError) {
      notify("error", "could not extend time, something went wrong");
    }
    if (res.isSuccess) {
      nprogress.complete();
      if (orderId) {
        if (socket) {
          socket.emit("triggerRefresh", {
            room: orderId,
          });
        }
        transFunc.close();
        refreshChat();
      }
    }
  }, [res.isSuccess, res.isError]);

  useEffect(() => {
    if (paymentStatus === "pending") {
      transFunc.open();
      primary_socket.on(
        "completed",
        (data: {
          transaction: {
            status: "completed";
          };
        }) => {
          if (data.transaction.status === "completed") {
            setPaymentStatus("completed");
            if (orderId) {
              extendTime({
                orderId: orderId,
                length: Number(extentionValue),
                transRef: transref,
              });
            }
          }
        }
      );
    }
    return () => {
      primary_socket.off("completed");
    };
  }, [paymentStatus]);

  useEffect(() => {
    if (!socket) return;
    if (type === "admin") return () => {};
    let timeout: NodeJS.Timeout | undefined;
    if (type === "consultant" && socket) {
      socket.on("refresh", () => {
        notify(
          "message",
          "Customer extended session, chat will refresh to update time"
        );
        timeout = setTimeout(() => {
          refreshChat();
        }, 3000);
      });
    }
    return () => {
      socket.off("refresh");
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [type, socket]);

  useEffect(() => {
    const now = new Date();
    if (data?.endTime && type === "consultant" && orderId) {
      const isAfterEndtime = isAfter(now, data.endTime);
      if (isAfterEndtime && data.stattusof === "ongoing") {
        setAsCompleted(orderId);
      }
    }
  }, [data?.endTime, orderId]);

  return (
    <>
      {transOpened ? (
        <InitializingTransactionModal
          paymentUrl={extensionAuthUrl}
          status={paymentStatus}
        />
      ) : null}

      <ModalComponent
        onClose={extensionOpenedFuncs.close}
        opened={extensionOpened}
        centered
        withCloseButton={false}
        size="xl"
      >
        {orderId && (
          <RequestExtension
            setExtensionValue={(val) => setExtensionValue(val)}
            setTransRef={(val) => setTransRef(val)}
            close={extensionOpenedFuncs.close}
            orderId={orderId}
            setAuthUrl={(val) => setExtensionAuthUrl(val)}
            setPaymentStatus={(val) => setPaymentStatus(val)}
          />
        )}
      </ModalComponent>
      <ModalComponent
        onClose={funcs.close}
        opened={reportModOpened}
        centered
        withCloseButton={false}
        size="xl"
      >
        {data && (
          <ReportAnIssue
            cid={data.consultantId}
            orderId={data.orderId}
            userId={data.userId}
            close={funcs.close}
          />
        )}
      </ModalComponent>
      <div className=" bg-white border-r relative  border-r-stroke-8 border-l border-l-stroke-8  h-full">
        {!orderId ? (
          <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
            <Image
              src={Logo}
              alt="logo image"
              className="w-[10rem] opacity-50"
            />
            <p className="text-center font-semibold text-gray-4">
              Please select a conversation
            </p>
          </div>
        ) : (
          <>
            {isFetching ? (
              <div className="w-[2rem] sm:w-[5rem] absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
                <Spinner dark />
              </div>
            ) : (
              <>
                <header className="flex items-center py-[1.4rem] px-2 sm:px-6 border-b border-b-stroke-8 h-[13%] max-h-[8rem]  bg-white">
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
                      {data?.chat_title && truncateStr(data?.chat_title, 45)}
                    </h1>
                    <p className="text-[#00000082] text-[0.75rem] font-semibold">
                      {data?.nameofservice}
                    </p>
                  </div>
                  <div className="flex items-center ml-auto">
                    {(isTime || sessionOver) && (
                      <MenuComponent
                        target={
                          <div className="hidden  md:block">
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
                          <AdminChatMenu orderId={orderId} chat_name={data?.chat_title} />
                        ) : (
                          <UserChatMenu
                            isTime={isTime}
                            openExtension={extensionOpenedFuncs.open}
                            openReportIssue={funcs.open}
                            type={type}
                            chat_title={data?.chat_title}
                            orderId={orderId}
                          />
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

                <div className="h-[87%] bg-white">
                  {data && (isTime || sessionOver) ? (
                    <ChatRoom
                      refreshChat={() => {
                        if (type === "user") {
                          fetchUserChatMessages(data.orderId);
                        } else {
                          fetchConsultantChatMessages(data.orderId);
                        }
                      }}
                      refetch={refetch}
                      userData={type === "user" ? userData : consultantData}
                      orderId={data.orderId}
                      updateChatHandlerProps={updateChatDataHandler}
                      type={type}
                      data={chatData}
                      isTime={isTime}
                      endTime={data.endTime}
                      sessionOver={sessionOver}
                      status={data.stattusof}
                      profilepics={profilepic}
                    />
                  ) : (
                    <div className="h-[90vh] max-h-[120rem] w-full">
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
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CustomerChatMiddle;
