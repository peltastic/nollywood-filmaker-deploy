"use client";
import CustomerChatLeft, {
  IChatData,
} from "@/components/Chats/CustomerChat/CustomerChatLeft";
import CustomerChatRight from "@/components/Chats/CustomerChat/CustomerChatRight";
import CustomerChatMiddle from "@/components/Chats/CustomerChat/CutomerChatMiddle";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import {
  useLazyFetchConversationsQuery,
  useLazyFetchSingleConversationByAdminQuery,
  useLazyGetChatFilesByAdminQuery,
} from "@/lib/features/admin/chats/chats";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

type Props = {};

const AdminChats = (props: Props) => {
  const [fetchSingleConversationDataByAdmin, result] =
    useLazyFetchSingleConversationByAdminQuery();

  const search = useSearchParams();
  const searchVal = search.get("chat");
  const ref = useRef<HTMLDivElement>(null);

  const [conversationsData, setConversationsData] = useState<IChatData[]>([]);
  const [fetchConversations, { data, isFetching }] =
    useLazyFetchConversationsQuery();
  const [closeRight, setCloseRight] = useState<boolean>(false);
  const [getChatFiles, res] = useLazyGetChatFilesByAdminQuery();

  useEffect(() => {
    fetchConversations({ limit: 10, page: 1 });
  }, []);

  useEffect(() => {
    if (searchVal) {
      fetchSingleConversationDataByAdmin(searchVal);
      getChatFiles(searchVal);
    }
  }, [searchVal]);

  useEffect(() => {
    if (data) {
      const transformed_data: IChatData[] = data.data.map((el) => {
        return {
          booktime: el.request.booktime,
          date: el.request.date,
          end_time: el.request.endTime,
          id: el.request._id,
          name: el.request.chat_title,
          orderId: el.request.orderId,
          service: el.request.nameofservice,
          start_time: el.request.booktime,
          status: el.request.stattusof,
          time: el.request.time,
          type: "Chat",
        };
      });
      setConversationsData(transformed_data);
    }
  }, [data]);

  useEffect(() => {
    if (!ref.current) return () => {};
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [searchVal]);

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <div
          ref={ref}
          className="flex h-screen chatbp:h-[95vh]  max-h-[90rem] bg-white"
        >
          <section className="mx-auto w-full  chatbp:w-[30%]">
            <CustomerChatLeft
              data={conversationsData}
              isFetching={isFetching}
              orderId={searchVal}
              type="admin"
            />
          </section>
          <section
            className={`${
              closeRight ? "w-[70%]" : "w-[43%]"
            } transition-all hidden chatbp:block`}
          >
            <CustomerChatMiddle
              type="admin"
              opened={closeRight}
              open={() => setCloseRight(false)}
              orderId={searchVal}
              data={result.data}
              isTime={true}
              isFetching={result.isFetching}
              refetch={() => {}}
              refreshChat={() => {}}
              sessionOver={false}
              setIsSessionOverProps={() => {}}
              setIsTimeProps={() => {}}
              admin
            />
          </section>
          <section
            className={`transition-all ${
              closeRight ? "w-[0%] invisible " : "w-[27%] visible ml-3  "
            }  hidden chatbp:block `}
          >
            <CustomerChatRight
              type="admin"
              data={result.data}
              closeRight={closeRight}
              close={() => setCloseRight(true)}
              isTime={false}
              sessionOver={false}
              orderId={result.data?.orderId}
              isLoading={res.isFetching}
              res={res.data?.files}
              userProfilePic={result.data?.userinfo.profilepics}
            />
          </section>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminChats;
