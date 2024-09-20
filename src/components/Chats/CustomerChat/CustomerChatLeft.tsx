import React, { useState } from "react";
import ChatSearch from "../ChatSearch";
import Chat from "../Chat";

type Props = {};

export interface IChatData {
  name: string;
  service: string;
  type: "Service" | "Chat";
  status: "Ongoing" | "Completed";
  date: string;
}

const data: IChatData[] = [
  {
    name: "Mikolo",
    service: "Read my script",
    type: "Service",
    status: "Ongoing",
    date: "24m",
  },
  {
    name: "Jagun Jagun",
    service: "Watch the Final cut of my film",
    type: "Service",
    status: "Completed",
    date: "02/08/2024",
  },
  {
    name: "Criminal",
    service: "Create a production Budget",
    type: "Service",
    status: "Completed",
    date: "02/08/2024",
  },
  {
    name: "Miracle in cell no. 7",
    service: "Create a marketing budget",
    type: "Chat",
    status: "Completed",
    date: "02/08/2024",
  },
  {
    name: "Train to Busan",
    service: "Create a Pitch",
    type: "Service",
    status: "Completed",
    date: "02/08/2024",
  },
  {
    name: "Mission Impossible",
    service: "Draft Legal Documents",
    type: "Chat",
    status: "Completed",
    date: "02/08/2024",
  },
];

const CustomerChatLeft = (props: Props) => {
    const [selected, setSelected] = useState<number>(0)
  return (
    <div className="bg-white">
      <header className="font-semibold flex items-center px-6 py-8 border-b border-b-stroke-8">
        <h1 className=" text-[1.25rem] mr-4">Conversations</h1>
        <div className="rounded-full bg-gray-bg-6 h-[1.5rem] w-[1.5rem] flex items-center justify-center">
          <p className="text-[0.75rem]">6</p>
        </div>
      </header>
      <div className="bg-white px-4 py-4">
        <div className="px-2">
          <ChatSearch />
        </div>
        <div className="my-4">
          {data.map((el, index) => (
            <Chat index={index} selctedIndex={selected} data={el} key={el.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerChatLeft;
