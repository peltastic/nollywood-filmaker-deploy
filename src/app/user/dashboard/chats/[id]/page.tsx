"use client";
import CustomerChatRight from "@/components/Chats/CustomerChat/CustomerChatRight";
import CustomerChatMiddle from "@/components/Chats/CustomerChat/CutomerChatMiddle";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React, { useState } from "react";

type Props = {};

const SingleChatPage = (props: Props) => {
  const [closeRight, setCloseRight] = useState<boolean>(true);
  return (
    <ServiceLayout noNav>
      <DashboardBodyLayout>
        <section className={`w-full transition-all h-[calc(100dvh)] `}>
          {/* <CustomerChatMiddle
          type="user"
            opened={closeRight}
            open={() => setCloseRight(false)}
          /> */}
        </section>
        <section
          className={`transition-all w-full h-full  fixed overflow-y-scroll min-h-screen top-0 left-0 bg-white ${
            closeRight ? "translate-x-[100%]" : "translate-x-0 "
          } `}
        >
          {/* <CustomerChatRight close={() => setCloseRight(true)} /> */}
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default SingleChatPage;
