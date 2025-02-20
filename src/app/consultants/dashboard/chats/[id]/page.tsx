"use client";
import CustomerChatRight from "@/components/Chats/CustomerChat/CustomerChatRight";
import CustomerChatMiddle from "@/components/Chats/CustomerChat/CutomerChatMiddle";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import {
  useLazyFetchSingleConversationDataQuery,
  useLazyGetConsultantChatFilesQuery,
} from "@/lib/features/consultants/dashboard/chat/chat";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const ConsultantSingleChat = (props: Props) => {
  const [getChatFiles, res] = useLazyGetConsultantChatFilesQuery();

  const ref = useRef<HTMLDivElement>(null);
  const [fetchConversationData, { isFetching, data }] =
    useLazyFetchSingleConversationDataQuery();

  const [closeRight, setCloseRight] = useState<boolean>(true);
  const [isTime, setIsTime] = useState<boolean>(false);
  const [sessionOver, setSessionOver] = useState<boolean>(false);

  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (params.id) {
      fetchConversationData(params.id);
      getChatFiles(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (!ref.current) return () => {};

    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, []);
  return (
    <ServiceLayout noNav>
      <DashboardBodyLayout>
        <div
          ref={ref}
          className={`h-screen max-h-[90rem] bg-white w-full  `}
        >
          <CustomerChatMiddle
            refetch={() => {
              if (params.id) {
                getChatFiles(params.id);
              }
            }}
            type="consultant"
            orderId={params.id}
            refreshChat={() => {
              if (params.id) {
                fetchConversationData(params.id);
              }
            }}
            opened={closeRight}
            open={() => setCloseRight(false)}
            isFetching={isFetching}
            data={data}
            isTime={isTime}
            sessionOver={sessionOver}
            setIsSessionOverProps={(val) => setSessionOver(val)}
            setIsTimeProps={(val) => setIsTime(val)}
            profilepic={data?.userinfo.profilepics}
          />
        </div>
        <section
          className={`transition-all w-full h-full  fixed chatbp1:overflow-y-scroll min-h-screen top-0 left-0 bg-white ${
            closeRight ? "translate-x-[100%]" : "translate-x-0 "
          } `}
        >
          <CustomerChatRight
            data={data}
            closeRight={closeRight}
            openRight={() => setCloseRight(false)}
            isTime={isTime}
            close={() => setCloseRight(true)}
            sessionOver={sessionOver}
            orderId={data?.orderId}
            isLoading={res.isFetching}
            res={res.data?.files}
            type="consultant"
            userProfilePic={data?.userinfo.profilepics}
          />
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ConsultantSingleChat;
