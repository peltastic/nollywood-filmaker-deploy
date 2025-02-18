"use client";
import CustomerChatLeft, {
  IChatData,
} from "@/components/Chats/CustomerChat/CustomerChatLeft";
import CustomerChatRight from "@/components/Chats/CustomerChat/CustomerChatRight";
// import CustomerChatMiddle from "@/components/Chats/CustomerChat/CutomerChatMiddle";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { useProtectAdmin } from "@/hooks/useProtectAdminRoute";
import {
  useLazyFetchConversationsQuery,
  useLazyFetchSingleConversationByAdminQuery,
  useLazyGetChatFilesByAdminQuery,
} from "@/lib/features/admin/chats/chats";
import { Pagination } from "@mantine/core";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

type Props = {};
const CustomerChatMiddle = dynamic(
  () => import ("@/components/Chats/CustomerChat/CutomerChatMiddle"),
  {
    ssr: false
  }
)


const AdminChats = (props: Props) => {
  useProtectAdmin()
  const router = useRouter()
  const [activePage, setActivePage] = useState<number>(1);
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
          className="flex h-screen chatbp1:h-[95vh]  max-h-[90rem] bg-white"
        >
          <section className="mx-auto w-full  chatbp1:w-[30%]">
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
            } transition-all hidden chatbp1:block`}
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
            }  hidden chatbp1:block `}
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
        {data && (
          <Pagination
            total={data.pagination.totalPages}
            value={activePage}
            color="#333333"
            onChange={(val) => {
              fetchConversations({
                limit: 10,
                page: val,
              });
              setActivePage(val);
              setCloseRight(true)
              router.push("/admin/dashboard/chats")
            }}
            mt={"xl"}
          />
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminChats;
