"use client";
import CustomerChatLeft, {
  IChatData,
} from "@/components/Chats/CustomerChat/CustomerChatLeft";
import CustomerChatRight from "@/components/Chats/CustomerChat/CustomerChatRight";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import {
  useLazyFetchSingleConversationDataQuery,
  useLazyFetchUserConversationsQuery,
} from "@/lib/features/users/dashboard/chat/chat";
import { useLazyGetChatFilesQuery } from "@/lib/features/users/services/chat/chat";
import { RootState } from "@/lib/store";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const CustomerChatMiddle = dynamic(
  () => import ("@/components/Chats/CustomerChat/CutomerChatMiddle"),
  {
    ssr: false
  }
)

const ChatsPage = (props: Props) => {
  useProtectRoute();
  const ref = useRef<HTMLDivElement>(null);
  const [isTime, setIsTime] = useState<boolean>(false);
  const [sessionOver, setSessionOver] = useState<boolean>(false);
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const [fetchConversationData, result] =
    useLazyFetchSingleConversationDataQuery();
  const [getChatFiles, res] = useLazyGetChatFilesQuery();

  const search = useSearchParams();
  const searchVal = search.get("chat");

  const [chatData, setChatData] = useState<IChatData[]>([]);

  const [fetchConversation, conversationsRes] =
    useLazyFetchUserConversationsQuery();

  useEffect(() => {
    if (userId) {
      fetchConversation(userId);
    }
  }, []);
  useEffect(() => {
    if (searchVal) {
      fetchConversationData(searchVal);
      getChatFiles(searchVal);
    }
  }, [searchVal]);

  useEffect(() => {
    if (!ref.current) return () => {};

    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [searchVal]);

  useEffect(() => {
    if (conversationsRes.data) {
      const transformed_data: IChatData[] = conversationsRes.data.requests.map(
        (el) => {
          return {
            date: el.date,
            orderId: el.orderId,
            id: el._id,
            end_time: el.endTime,
            start_time: el.startTime,
            name: el.chat_title,
            service: el.nameofservice,
            status: el.stattusof,
            booktime: el.booktime,
            time: el.time,
            type:
              el.nameofservice === "Chat With A Professional"
                ? "Chat"
                : "Service",
          };
        }
      );
      setChatData(transformed_data);
    }
  }, [conversationsRes.data]);

  const refresh = () => {
    if (searchVal) {
      fetchConversationData(searchVal);
      if (userId) {
        fetchConversation(userId);
      }
    }
  };

  const [closeRight, setCloseRight] = useState<boolean>(true);

  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <div ref={ref} className="flex h-screen chatbp1:h-[95vh]  max-h-[90rem]   bg-white">
          <section className="mx-auto w-full  h-full chatbp1:w-[30%]">
            <CustomerChatLeft
              data={chatData}
              isFetching={conversationsRes.isFetching}
              orderId={searchVal}
            />
          </section>
          <section
            className={`${
              closeRight ? "w-[70%]" : "w-[43%]"
            } transition-all h-full hidden chatbp1:block bg-white`}
          >
            <CustomerChatMiddle
              refetch={() => {
                if (searchVal) {
                  getChatFiles(searchVal);
                }
              }}
              refreshChat={refresh}
              opened={closeRight}
              open={() => setCloseRight(false)}
              orderId={searchVal}
              isFetching={result.isFetching}
              data={result.data}
              type="user"
              isTime={isTime}
              sessionOver={sessionOver}
              setIsSessionOverProps={(val) => setSessionOver(val)}
              setIsTimeProps={(val) => setIsTime(val)}
            />
          </section>
          <section
            className={`transition-all ${
              closeRight ? "w-[0%] invisible " : "w-[27%] visible ml-3  "
            }  hidden chatbp1:block `}
          >
            <CustomerChatRight
              type="user"
              data={result.data}
              closeRight={closeRight}
              close={() => setCloseRight(true)}
              openRight={() => setCloseRight(false)}
              isTime={isTime}
              sessionOver={sessionOver}
              orderId={result.data?.orderId}
              isLoading={res.isFetching}
              res={res.data?.files}
            />
          </section>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ChatsPage;
