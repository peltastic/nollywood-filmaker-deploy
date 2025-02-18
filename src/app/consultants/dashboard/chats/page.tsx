"use client";
import CustomerChatLeft, {
  IChatData,
} from "@/components/Chats/CustomerChat/CustomerChatLeft";
import CustomerChatRight from "@/components/Chats/CustomerChat/CustomerChatRight";
// import CustomerChatMiddle from "@/components/Chats/CustomerChat/CutomerChatMiddle";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { useProtectRouteConsultantRoute } from "@/hooks/useProtectConsultantRoute";
import {
  useLazyFetchConsultantsConversationsQuery,
  useLazyFetchSingleConversationDataQuery,
  useLazyGetConsultantChatFilesQuery,
} from "@/lib/features/consultants/dashboard/chat/chat";
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


const ConsultantChastPage = (props: Props) => {
  useProtectRouteConsultantRoute();
  const ref = useRef<HTMLDivElement>(null);
  const [isTime, setIsTime] = useState<boolean>(false);
  const [sessionOver, setSessionOver] = useState<boolean>(false);
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
  const [fetchConversations, conversationsRes] =
    useLazyFetchConsultantsConversationsQuery();
  const [fetchConversationData, result] =
    useLazyFetchSingleConversationDataQuery();
  const search = useSearchParams();
  const searchVal = search.get("chat");
  const [chatData, setChatData] = useState<IChatData[]>([]);
  const [getChatFiles, res] = useLazyGetConsultantChatFilesQuery();

  useEffect(() => {
    if (consultantId) {
      fetchConversations(consultantId);
    }
  }, [consultantId]);
  useEffect(() => {
    if (searchVal) {
      fetchConversationData(searchVal);
      getChatFiles(searchVal);
    }
  }, [searchVal]);
  useEffect(() => {
    if (isTime) {
      setCloseRight(false);
    }
  }, [isTime]);

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
            time: el.time,
            booktime: el.booktime,
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
      if (consultantId) {
        fetchConversations(consultantId);
      }
    }
  };

  const [closeRight, setCloseRight] = useState<boolean>(true);
  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        <div ref={ref} className="flex h-screen chatbp1:h-[95vh] max-h-[90rem] bg-white">
          <section className="mx-auto w-full h-full  chatbp1:w-[30%]">
            <CustomerChatLeft
              type="consultant"
              data={chatData}
              isFetching={conversationsRes.isFetching}
              orderId={searchVal}
            />
          </section>
          <section
            className={`${
              closeRight ? "w-[70%]" : "w-[43%]"
            } transition-all h-full hidden chatbp1:block`}
          >
            <CustomerChatMiddle
              refetch={() => {
                if (searchVal) {
                  getChatFiles(searchVal);
                }
              }}
              refreshChat={refresh}
              type="consultant"
              opened={closeRight}
              open={() => setCloseRight(false)}
              orderId={searchVal}
              isFetching={result.isFetching}
              data={result.data}
              isTime={isTime}
              profilepic={result.data?.userinfo.profilepics}
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
              type="consultant"
              data={result.data}
              closeRight={closeRight}
              close={() => setCloseRight(true)}
              isTime={isTime}
              sessionOver={sessionOver}
              res={res.data?.files}
              isLoading={res.isFetching}
              orderId={result.data?.orderId}
              userProfilePic={result.data?.userinfo.profilepics}
            />
          </section>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ConsultantChastPage;
