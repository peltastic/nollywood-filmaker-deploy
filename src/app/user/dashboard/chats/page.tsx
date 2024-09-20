"use client";
import CustomerChatLeft from "@/components/Chats/CustomerChat/CustomerChatLeft";
import CustomerChatRight from "@/components/Chats/CustomerChat/CustomerChatRight";
import CustomerChatMiddle from "@/components/Chats/CustomerChat/CutomerChatMiddle";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React, { useState } from "react";

type Props = {};

const ChatsPage = (props: Props) => {
  const [closeRight, setCloseRight] = useState<boolean>(false);
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <section className="flex min-h-screen bg-white">
          <section className="w-[30%]">
            <CustomerChatLeft />
          </section>
          <section
            className={`${closeRight ? "w-[70%]" : "w-[43%]"} transition-all`}
          >
            <CustomerChatMiddle opened={closeRight} open={() => setCloseRight(false)} />
          </section>
          <section
            className={`transition-all ${
              closeRight ? "w-[0%] hidden" : "w-[27%]"
            }  ml-3`}
          >
            <CustomerChatRight close={() => setCloseRight(true)} />
          </section>
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ChatsPage;
