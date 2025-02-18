import React from "react";
import UnstyledButton from "../Button/UnstyledButton";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import Image from "next/image";
import CustomerFeed from "../CustomerFeed/CustomerFeed";
import { useRouter } from "next/navigation";
type Props = {
  data: {
    name: string;
    email: string;
    date: string;
    time: string;
    id: string;
  }[];
};

// const data: any = [
// //   {
// //     name: "Jenny Wilson",
// //     email: "w.lawson@example.com",
// //     date: "Today",
// //     time: "12:00pm",
// //     id: "1",
// //   },
// //   {
// //     name: "Jenny Wilson",
// //     email: "w.lawson@example.com",
// //     date: "Tomorrow",
// //     time: "12:00pm",
// //     id: "2",
// //   },
// ];

const UpcomingConversations = ({ data }: Props) => {
  const router = useRouter()
  return (
    <div className="border border-stroke-10 w-full px-4 sm:px-10 py-6 rounded-lg">
      <div className="flex flex-wrap items-center">
        <h1 className="w-full mid:w-auto mr-auto font-bold text-black-8">
          Upcoming Conversations
        </h1>
        <UnstyledButton clicked={() => router.push("/consultants/dashboard/calendar")} class="mb-8 sm:mb-0 mt-4 mid:mt-0 border border-black-3 text-[0.88rem] font-medium rounded-lg py-2 px-4">
          Go to Calendar
        </UnstyledButton>
      </div>
      {data.length === 0 ? (
        <div className="text-center my-11">
          <h3 className="text-[1.13rem] font-medium">
            You have no upcoming conversations
          </h3>
          <p className="text-gray-1 text-[0.88rem]">
            Any requests you have made will show up here.
          </p>
        </div>
      ) : (
        <div className="mt-2">
          {/* {data.map((el) => (
            <CustomerFeed
              date={el.date}
              email={el.email}
              name={el.name}
              time={el.time}
              key={el.id}
            />
          ))} */}
        </div>
      )}
    </div>
  );
};

export default UpcomingConversations;
