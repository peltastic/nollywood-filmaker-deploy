"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import React, { useEffect, useState } from "react";
import ChatWithProfessionalImg from "/public/assets/services/chat-with-professional.svg";
import Image from "next/image";
import ChatRight from "@/components/Services/SelectChatTime/ChatRight";
import Stepper from "@/components/Stepper/Stepper";
import ChatTime from "@/components/Services/SelectChatTime/ChatTime";
import ChatForm from "@/components/Services/CustomForms/ChatForm";
import { useRouter, useSearchParams } from "next/navigation";
import ServiceRight from "@/components/Services/ServiceRight";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";

type Props = {};

export interface IChatState {
  date: string;
  time: string;
  title: string;
  summary: string;
  consultant: string;
}

const GetStartedChatPage = (props: Props) => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [chatData, setChatData] = useState<IChatState>({
    date: "",
    consultant: "",
    summary: "",
    time: "",
    title: "",
  });

  const searchParam = useSearchParams();

  const search = searchParam.get("page");
  const [page, setPage] = useState<string>(search === "payment" ? "3" : "1");

  const setDateHandler = (val: Date) => {
    setCurrentDate(val);
  };
  const setChatDataHandler = (key: string, value: string) => {
    setChatData({
      ...chatData,
      [key]: value,
    });
  };

  useEffect(() => {
    if (!chatData.title) {
      router.push("/get-started/chat");
    }
  }, []);

  return (
    <ServiceLayout nonDashboard>
      <div className="flex flex-wrap items-start">
        <ServiceLeft
          title="Chat with a professional"
          body={[
            {
              title: "Date",
              content: chatData.date,
            },
            {
              title: "Time",
              content: chatData.time,
            },
            {
              title: "Conversation title",
              content: "",
            },
            {
              title: "Summary",
              content: "",
            },
            {
              title: "Preferred Consultant",
              content: "",
            },
          ]}
          image={<Image src={ChatWithProfessionalImg} alt="chat-img" />}
        />
        <div className="w-full lg:w-[55%]">
          <div
            className={`${
              page === "1" || page === "3" ? "w-[90%] sm:w-[70%]" : "w-full sm:w-[85%]"
            }  mx-auto`}
          >
            <div
              className={`${
                search === "payment" ? "mt-[6rem] " : "my-[6rem]"
              } `}
            >
              <Stepper
                data={[
                  {
                    label: "Select Consultant",
                    value: "1",
                  },
                  {
                    label: "Quick summary",
                    value: "2",
                  },
                  {
                    label: "Payment",
                    value: "3",
                  },
                ]}
                values={page}
              />
            </div>
            {search === "payment" ? (
              <div className="w-full text-black-2  py-[5rem]">
                <PaymentWindow successRoute="/success-page/chat" />
              </div>
            ) : (
              <>
                {page === "1" && (
                  <ChatForm
                    setPageProps={(val) => setPage(val)}
                    data={chatData}
                    setScriptProps={setChatDataHandler}
                  />
                )}
                {page === "2" && (
                  <ChatTime
                    serviceSelection
                    dateProps={currentDate}
                    setDateProps={setDateHandler}
                    setPageProps={(val) => setPage(val)}
                  />
                )}
                {page === "3" && (
                  <ChatRight
                    dateProps={currentDate}
                    setDateProps={setDateHandler}
                    setPageProps={(val) => setPage(val)}
                    proceed={() =>
                      router.push("/get-started/chat?page=payment")
                    }
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default GetStartedChatPage;
