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
    <ServiceLayout >
      <DashboardBodyLayout>
        <section className="flex min-h-screen bg-white">
          <section className="mx-auto w-full  chatbp:w-[30%]">
            <CustomerChatLeft />
          </section>
          <section
            className={`${
              closeRight ? "w-[70%]" : "w-[43%]"
            } transition-all hidden chatbp:block`}
          >
            <CustomerChatMiddle
              opened={closeRight}
              open={() => setCloseRight(false)}
            />
          </section>
          <section
            className={`transition-all ${
              closeRight ? "w-[0%] invisible " : "w-[27%] visible ml-3  "
            }  hidden chatbp:block `}
          >
            <CustomerChatRight close={() => setCloseRight(true)} />
          </section>
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ChatsPage;
