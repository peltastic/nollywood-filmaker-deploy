"use client";
import React, { useState } from "react";
import ChatSearch from "../ChatSearch";
import Chat from "../Chat";
import { Skeleton } from "@mantine/core";
import ConversationsSkeleton from "@/components/Skeletons/ConversationsSkeleton";

type Props = {
  isFetching?: boolean;
  data: IChatData[];
  orderId?: string | null;
  type?: "consultant" | "admin";
  continueChat?: boolean;
  setIsTimeProps?: (val: boolean) => void;
  setIsSessionOverProps?: (val: boolean) => void;
  searchFunc: (value: string) => void;
};

export interface IChatData {
  name: string;
  id: string;
  service: string;
  type: "Service" | "Chat";
  status: "ongoing" | "completed" | "pending" | "ready";
  start_time: string;
  end_time: string;
  orderId: string;
  date: string;
  booktime: string;
  cid: {
    cid: string;
  };
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const CustomerChatLeft = (props: Props) => {
  const [selected, setSelected] = useState<number>(0);
  const [searchVal, setSearchval] = useState<string>("");
  return (
    <div className="bg-white h-full ">
      <header className="font-semibold flex items-center px-2 sm:px-6 py-8 border-b border-b-stroke-8 h-[13%] max-h-[8rem]">
        <h1 className=" text-[1.25rem] mr-4">Conversations</h1>
        <div className="rounded-full bg-gray-bg-6 h-[1.5rem] w-[1.5rem] flex items-center justify-center">
          <p className="text-[0.75rem]">{props.data.length}</p>
        </div>
      </header>
      <div className="bg-white px-0 xs:px-4 py-4 h-[87%]">
        <div className="px-2 h-[10%]">
          <ChatSearch
            value={searchVal}
            change={(e) => {
              setSearchval(e);
              props.searchFunc(e);
            }}
          />
        </div>
        {props.isFetching ? (
          <div className="px-4 mt-4">
            {/* <Skeleton height={40} /> */}
            <ConversationsSkeleton />
            <ConversationsSkeleton />
            <ConversationsSkeleton />
            <ConversationsSkeleton />
            <ConversationsSkeleton />
            <ConversationsSkeleton />
            <ConversationsSkeleton />
            <ConversationsSkeleton />
            <ConversationsSkeleton />
          </div>
        ) : (
          <div className="my-4 h-[90%] overflow-y-scroll nolly-film-hide-scrollbar">
            {props.data?.map((el, index) => (
              <Chat
                index={index}
                selctedIndex={selected}
                data={el}
                key={el.name + el.orderId}
                orderId={props.orderId}
                continueChat={props.continueChat}
                type={props.type}
                setIsSessionOverProps={props.setIsSessionOverProps}
                setIsTimeProps={props.setIsTimeProps}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerChatLeft;
