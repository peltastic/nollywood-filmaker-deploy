"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import React, { useEffect, useState } from "react";
import ChatWithProfessionalImg from "/public/assets/services/chat-with-professional.svg";
import Image from "next/image";
import Stepper from "@/components/Stepper/Stepper";
import ChatTime from "@/components/Services/SelectChatTime/ChatTime";
import ChatForm from "@/components/Services/CustomForms/ChatForm";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import moment from "moment";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { useInitializeChatWithAProTransactionMutation } from "@/lib/features/users/services/chat/chat";
import { useServicePayment } from "@/hooks/useServicePayment";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { initializeTransactionListener } from "@/lib/socket";
import { nprogress } from "@mantine/nprogress";
import Spinner from "@/app/Spinner/Spinner";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import Link from "next/link";

type Props = {};

export interface IChatState {
  date: string;
  time: string;
  title: string;
  summary: string;
  consultant: string;
}

const GetStartedChatPage = (props: Props) => {
  useProtectRoute();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [chatData, setChatData] = useState<IChatState>({
    date: "",
    consultant: "",
    summary: "",
    time: "",
    title: "",
  });

  const [chatWithPro, { data, isError, isLoading, error, isSuccess }] =
    useInitializeChatWithAProTransactionMutation();

  const searchParam = useSearchParams();
  const [terms, setTerms] = useState<boolean>(false)
  const [opened, { open, close }] = useDisclosure();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );

  const search = searchParam.get("page");
  const [page, setPage] = useState<string>(search === "payment" ? "3" : "1");

  const setDateHandler = (val: Date) => {
    setCurrentDate(val);
  };

  const { paymentStatus } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/chat",
    close,
    data?.result.authorization_url,
    error
  );

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
  useEffect(() => {
    if (paymentStatus === "pending") {
      open();
    }
  }, [paymentStatus]);

  return (
    <>
      {opened ? (
        <InitializingTransactionModal
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
          close={close}
        />
      ) : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap items-start ">
          <ServiceLeft
            title="Chat with a professional"
            cost="50,000"
            body={[
              {
                title: "Date",
                content: moment(currentDate).format("YYYY-MM-DD"),
              },
              {
                title: "Time",
                content: chatData.time,
              },
              {
                title: "Conversation title",
                content: chatData.title,
              },
              {
                title: "Summary",
                content: chatData.summary,
              },
              {
                title: "Preferred Consultant",
                content: chatData.consultant,
              },
            ]}
            image={<Image src={ChatWithProfessionalImg} alt="chat-img" />}
          />
          <div className="w-full lg:w-[55%] px-6 sm:px-0">
            <div
              className={`${
                page === "1" || page === "3"
                  ? "w-[90%] md:w-[70%]"
                  : "w-full sm:w-[85%]"
              }  mx-auto`}
            >
              <div
                className={`${
                  search === "payment" ? "mt-[6rem] " : "my-[4rem]"
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
                      selectedTime={chatData.time}
                      consultantType={chatData.consultant}
                      setSelected={(val) =>
                        setChatData({
                          ...chatData,
                          time: val,
                        })
                      }
                    />
                  )}
                  {page === "3" && (
                    <div className="hidden lg:block">
                      <div className="mt-4 w-full mb-8">
                        <CheckboxComponent
                          setCheckedProps={(val) => setTerms(val)}
                          checked={terms}
                          label={
                            <p className="max-w-[40rem] text-gray-3">
                              By proceeding, I confirm that I
                              have read, understood, and agree to the{" "}
                              <span className="font-semibold underline">
                                <Link href={"/terms-and-conditions"} target="_blank">
                                  terms and conditions
                                </Link>
                              </span>{" "}
                              and{" "}
                              <span className="font-semibold underline">
                                <Link href={"/privacy-policy"} target="_blank">
                                  privacy policy
                                </Link>
                              </span>{" "}
                              of the service.
                            </p>
                          }
                        />
                      </div>

                      <UnstyledButton
                        disabled={isLoading || !terms}
                        clicked={() => {
                          if (userId) {
                            chatWithPro({
                              chat_title: chatData.title,
                              consultant: chatData.consultant,
                              date: moment(currentDate).format("YYYY-MM-DD"),
                              summary: chatData.summary,
                              time: `${moment(currentDate).format(
                                "YYYY-MM-DD"
                              )}T${moment(chatData.time, ["h:mm A"]).format(
                                "HH:mm"
                              )}:00+01:00`,
                              title: "Chat With A Professional",
                              type: "Chat",
                              userId,
                            });
                            initializeTransactionListener(userId);
                            nprogress.start();
                            open();
                          }
                        }}
                        class="bg-black-2 flex disabled:opacity-50 justify-center hover:bg-blue-1 transition-all text-white w-full py-4 rounded-md"
                      >
                        {isLoading ? (
                          <div className="w-[1rem] py-1">
                            <Spinner />
                          </div>
                        ) : (
                          <>
                            <p className="mr-2">Proceed to payment</p>
                            {/* <FaArrowRight className="text-[0.7rem]" /> */}
                          </>
                        )}
                      </UnstyledButton>
                      <UnstyledButton
                        type="button"
                        clicked={() => setPage("2")}
                        class="rounded-md py-1  mt-8 px-4 transition-all hover:bg-gray-bg-1 border-stroke-2 border"
                      >
                        Back
                      </UnstyledButton>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {page === "3" && (
          <div className="block lg:hidden w-[90%] md:w-[80%] mx-auto mt-10">
            <UnstyledButton
              disabled={isLoading}
              clicked={() => {
                if (userId) {
                  chatWithPro({
                    chat_title: chatData.title,
                    consultant: chatData.consultant,
                    date: moment(currentDate).format("YYYY-MM-DD"),
                    summary: chatData.summary,
                    time: `${moment(currentDate).format("YYYY-MM-DD")}T${moment(
                      chatData.time,
                      ["h:mm A"]
                    ).format("HH:mm")}:00+01:00`,
                    title: "Chat With A Professional",
                    type: "Chat",
                    userId,
                  });
                  initializeTransactionListener(userId);
                  nprogress.start();
                  open();
                }
              }}
              class="bg-black-2 flex disabled:opacity-50 justify-center hover:bg-blue-1 transition-all text-white w-full py-4 rounded-md"
            >
              {isLoading ? (
                <div className="w-[1rem] py-1">
                  <Spinner />
                </div>
              ) : (
                <>
                  <p className="mr-2">Proceed to payment</p>
                  {/* <FaArrowRight className="text-[0.7rem]" /> */}
                </>
              )}
            </UnstyledButton>
            <UnstyledButton
              type="button"
              clicked={() => setPage("2")}
              class="w-full rounded-md py-3 mb-10  mt-8 px-4 transition-all hover:bg-gray-bg-1 border-stroke-2 border"
            >
              Back
            </UnstyledButton>
          </div>
        )}
      </ServiceLayout>
    </>
  );
};

export default GetStartedChatPage;
