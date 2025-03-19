import React, { useEffect, useState } from "react";
import { IChatData } from "./CustomerChat/CustomerChatLeft";
import AdminProfileImg from "/public/assets/admin/logo-black.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import moment from "moment";
import { differenceInMilliseconds, isAfter, isBefore } from "date-fns";
import { truncateStr } from "@/utils/helperFunction";
import { useSetChatAsCompleteMutation } from "@/lib/features/consultants/dashboard/request";
import { useDisclosure } from "@mantine/hooks";
import ModalComponent from "../Modal/Modal";
import SetChatDateByUser from "../ModalPages/SetChatDateByUser";
import { useContinueChatMutation } from "@/lib/features/users/dashboard/chat/chat";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { useServicePayment } from "@/hooks/useServicePayment";
import InitializingTransactionModal from "../Services/InitializingTransactionModal";
import { GoDotFill } from "react-icons/go";

type Props = {
  data: IChatData;
  index: number;
  selctedIndex: number;
  continueChat?: boolean;
  orderId?: string | null;
  type?: "consultant" | "admin";
  setIsTimeProps?: (val: boolean) => void;
  setIsSessionOverProps?: (val: boolean) => void;
};

const Chat = ({
  data,
  orderId,
  type,
  setIsSessionOverProps,
  setIsTimeProps,
  continueChat,
}: Props) => {
  const [status, setStatus] = useState<
    "ready" | "ongoing" | "completed" | "pending"
  >("pending");
  const [chatTimeStatus, setChatTimeStatus] = useState<string>("");

  const [setAsCompleted, completedRes] = useSetChatAsCompleteMutation();
  // const userData = useSelector(
  //   (state: RootState) => state.persistedState.user.user
  // );
  // const consultantData = useSelector(
  //   (state: RootState) => state.persistedState.consultant.user
  // );

  const [newMessage, setnewMessage] = useState<string>("");

  const [continueChatHandler, chat] = useContinueChatMutation();

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
    if (type === "admin") return () => {};
    let timeout: NodeJS.Timeout | undefined;
    if (data) {
      const now = new Date();
      const startTime = data.start_time;
      const endTime = new Date(data.end_time);
      const isBeforeStartTime = isBefore(now, startTime);
      const isBeforeEndtime = isBefore(now, endTime);
      const isAfterStartTime = isAfter(now, startTime);

      if (isBeforeStartTime || (isAfterStartTime && isBeforeEndtime)) {
        const delay = differenceInMilliseconds(endTime, now);
        timeout = setTimeout(() => {
          setIsTimeProps && setIsTimeProps(false);
          setIsSessionOverProps && setIsSessionOverProps(true);
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

  const [opened, { open, close }] = useDisclosure();
  const [openedPayment, openPayment] = useDisclosure();
  const { paymentStatus } = useServicePayment(
    chat.isError,
    chat.isSuccess,
    "/user/dashboard/chats",
    close,
    chat.data?.payment.authorization_url,
    chat.error
  );

  useEffect(() => {
    if (chat.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (chat.error as any).data?.message || "An Error Occcured"
      );
    }
    if (chat.isSuccess) {
      close();

      // notify("success", "Chat date updated successfully");
    }
  }, [chat.isError, chat.isSuccess]);

  useEffect(() => {
    if (paymentStatus === "pending") {
      openPayment.open();
    }
  }, [paymentStatus, chat.isSuccess]);

  useEffect(() => {
    const now = new Date();
    if (data?.end_time && type === "consultant" && orderId) {
      const isAfterEndtime = isAfter(now, data.end_time);
      if (isAfterEndtime && data.status === "ongoing") {
        setAsCompleted(orderId);
      }
    }
  }, [data?.end_time, orderId]);

  useEffect(() => {
    if (type === "admin") {
      setStatus(data.status);
      const now = new Date();
      if (isBefore(now, data.start_time)) {
        setStatus("pending");
      } else {
        setChatTimeStatus(moment(data.end_time).fromNow());
      }
      return () => {};
    }
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
      {openedPayment ? (
        <InitializingTransactionModal
          paymentUrl={chat.data?.payment.authorization_url}
          status={paymentStatus}
          close={openPayment.close}
        />
      ) : null}
      <ModalComponent
        opened={opened}
        centered
        onClose={close}
        withCloseButton={false}
        size="xl"
      >
        <SetChatDateByUser
          time={""}
          cid={data.cid.cid}
          close={close}
          date={moment().format()}
          orderId={data.orderId}
          refetch={() => {}}
          extend
          title={data.name}
          continueChat={continueChatHandler}
          isLoading={chat.isLoading}
        />
      </ModalComponent>
      <div
        onClick={() => {
          setnewMessage("");
          router.push(
            type === "consultant"
              ? `/consultants/dashboard/chats?chat=${data.orderId}`
              : type === "admin"
              ? `/admin/dashboard/chats?chat=${data.orderId}`
              : `/user/dashboard/chats?chat=${data.orderId}`
          );
        }}
        className={`${
          orderId === data.orderId ? "bg-[#615EF00F]" : ""
        } hidden chatbp1:flex rounded-md transition-all hover:bg-[#615EF00F] items-start py-4 mb-2 px-4 cursor-pointer `}
      >
        <div className="w-[3rem] mr-3 h-[3rem] rounded-full bg-white flex items-center justify-center">
          <Image src={AdminProfileImg} alt="admin-alt-profile" />
        </div>
        <div className="">
          <h1 className="font-semibold text-[0.88rem]">
            {truncateStr(data.name, 15)}
          </h1>
          <p className="text-black-3 text-[0.75rem]">{data.service}</p>

          <div className="ml-auto font-semibold text-[#00000056] text-[0.88rem] block chatbp:hidden">
            <p>{chatTimeStatus}</p>
          </div>
          {newMessage ? (
            <div className="flex font-bold text-[0.88rem] items-center">
              <p className="mr-1">{truncateStr(newMessage, 25)}</p>
              <p className="text-blue-1">•</p>
            </div>
          ) : (
            <div className="flex items-center mt-3">
              <div
                className={`${className} text-[0.75rem] font-semibold py-[0.15rem] px-2 flex items-center rounded-full mr-auto`}
              >
                <GoDotFill className="mt-[0.1rem]" />
                <p>{status}</p>
              </div>
            </div>
          )}
        </div>
        <div className="ml-auto font-semibold text-[#00000056] text-[0.88rem] hidden chatbp:block">
          <p>{chatTimeStatus}</p>
          {status === "completed" && continueChat && (
            <div
              onClick={open}
              className="cursor-pointer float-right text-center max-w-[7.5rem] mr-2 mt-6 bg-black-2 transition-all text-white  rounded-md hover:bg-blue-1 py-[0.15rem] border border-black-3 text-[0.75rem] font-medium px-3"
            >
              <p>Continue</p>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={() =>
          router.push(
            `${
              type === "consultant"
                ? `/consultants/dashboard/chats/${data.orderId}`
                : `/user/dashboard/chats/${data.orderId}`
            }`
          )
        }
        className={` flex chatbp1:hidden rounded-md items-start py-4 mb-2 px-4 active:bg-[#615EF00F] `}
      >
        <div className="w-[3rem] mr-3 h-[3rem] rounded-full bg-white flex items-center justify-center">
          <Image src={AdminProfileImg} alt="admin-alt-profile" />
        </div>
        <div className="">
          <h1 className="font-semibold text-[0.88rem]">
            {truncateStr(data.name, 15)}
          </h1>
          <p className="text-black-3 text-[0.75rem]">{data.service}</p>
          <div className="ml-auto font-semibold text-[#00000056] text-[0.88rem] block chatbp:hidden">
            <p>{chatTimeStatus}</p>
          </div>
          {newMessage ? (
            <div className="flex text-[0.88rem] items-center">
              <p className="mr-1">{truncateStr(newMessage, 25)}</p>
              <p className="text-blue-1">•</p>
            </div>
          ) : (
            <div className="flex items-center mt-3">
              {/* <div className="mr-2 text-black-3 rounded-full py-[0.15rem] border border-black-3 text-[0.75rem] font-medium px-3">
                <p>Service</p>
              </div> */}

              <div
                className={`${className} text-[0.75rem] font-semibold py-[0.15rem] px-2 flex items-center rounded-full`}
              >
                <GoDotFill className="mt-[0.1rem]" />
                <p>{status}</p>
              </div>
            </div>
          )}
        </div>
        <div className="ml-auto font-semibold text-[#00000056] text-[0.88rem] hidden xs:block">
          <p>{chatTimeStatus}</p>
          {status === "completed" && continueChat && (
            <div
              onClick={open}
              className="cursor-pointer mr-2 mt-6 hover:bg-black-2 transition-all hover:text-white text-black-3 rounded-full py-[0.15rem] border border-black-3 text-[0.75rem] font-medium px-3"
            >
              <p>Continue</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
