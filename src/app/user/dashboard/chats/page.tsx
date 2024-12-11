"use client";
import CustomerChatLeft, {
  IChatData,
} from "@/components/Chats/CustomerChat/CustomerChatLeft";
import CustomerChatRight from "@/components/Chats/CustomerChat/CustomerChatRight";
import CustomerChatMiddle from "@/components/Chats/CustomerChat/CutomerChatMiddle";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import {
  useLazyFetchSingleConversationDataQuery,
  useLazyFetchUserConversationsQuery,
} from "@/lib/features/users/dashboard/chat/chat";
import { RootState } from "@/lib/store";
import { convertToAfricaLagosTz } from "@/utils/helperFunction";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const ChatsPage = (props: Props) => {
  const [isTime, setIsTime] = useState<boolean>(false);
  const [sessionOver, setSessionOver] = useState<boolean>(false);
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const [fetchConversationData, result] =
    useLazyFetchSingleConversationDataQuery();

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
    }
  }, [searchVal]);

  console.log(convertToAfricaLagosTz("2024-11-26T24:00:00.000Z"));

  useEffect(() => {
    if (conversationsRes.data) {
      console.log(conversationsRes.data)
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

  const [closeRight, setCloseRight] = useState<boolean>(true);

  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <section className="flex h-[60rem]  max-h-[120rem]   bg-white">
          <section className="mx-auto w-full  h-full chatbp:w-[30%]">
            <CustomerChatLeft
              data={chatData}
              isFetching={conversationsRes.isFetching}
              orderId={searchVal}
            />
          </section>
          <section
            className={`${
              closeRight ? "w-[70%]" : "w-[43%]"
            } transition-all h-full hidden chatbp:block bg-white`}
          >
            <CustomerChatMiddle
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
            }  hidden chatbp:block `}
          >
            <CustomerChatRight
              type="user"
              data={result.data}
              closeRight={closeRight}
              close={() => setCloseRight(true)}
              openRight={() => setCloseRight(false)}
              isTime={isTime}
              sessionOver={sessionOver}
            />
          </section>
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ChatsPage;
