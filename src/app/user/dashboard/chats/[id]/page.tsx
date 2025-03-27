"use client";
import CustomerChatRight from "@/components/Chats/CustomerChat/CustomerChatRight";
import CustomerChatMiddle from "@/components/Chats/CustomerChat/CutomerChatMiddle";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useLazyFetchSingleConversationDataQuery } from "@/lib/features/users/dashboard/chat/chat";
import { useLazyGetChatFilesQuery } from "@/lib/features/users/services/chat/chat";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const SingleChatPage = (props: Props) => {
  useProtectRoute();

  const ref = useRef<HTMLDivElement>(null);
  const [getChatFiles, res] = useLazyGetChatFilesQuery();
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
      <DashboardBodyLayout allWhite>
        <div
          ref={ref}
          className={`h-full max-h-[90rem] bg-white w-full `}
        >
          <CustomerChatMiddle
            refetch={() => {
              if (params.id) {
                getChatFiles(params.id);
              }
            }}
            type="user"
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
          />
        </div>
        <section
          className={`transition-all w-full h-full z-20 chatbp1:z-0 fixed overflow-y-scroll min-h-screen top-0 left-0 bg-white ${
            closeRight ? "translate-x-[100%]" : "translate-x-0 "
          } `}
        >
          <CustomerChatRight
            refreshChat={() => {
              if (params.id) {
                fetchConversationData(params.id);
              }
            }}
            data={data}
            closeRight={closeRight}
            openRight={() => setCloseRight(false)}
            isTime={isTime}
            close={() => setCloseRight(true)}
            sessionOver={sessionOver}
            orderId={data?.orderId}
            isLoading={res.isFetching}
            res={res.data?.files}
            type="user"
          />
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default SingleChatPage;
