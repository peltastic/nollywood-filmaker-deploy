import { isResolveFile } from "@/utils/helperFunction";
import React, { useEffect, useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import {
  useLazyFetchServiceMessagesConsultantQuery,
  useSendServiceChatMessagesAsConsultantMutation,
} from "@/lib/features/consultants/dashboard/request";
import {
  useLazyFetchServiceMessagesUserQuery,
  useReplyServiceChatMessageAsUserMutation,
} from "@/lib/features/users/dashboard/requests/requests";
import { consultantAuthApi } from "@/lib/features/consultants/auth/auth";
import UnstyledButton from "../Button/UnstyledButton";
import Spinner from "@/app/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";
import IssuesThread from "./IssuesThread";
import { ServiceNames } from "@/interfaces/consultants/dashboard/request";

type Props = {
  service: ServiceNames
  type: "consultant" | "user";
  orderId: string;
  refecth: () => void;
};

const OrderDetailsServiceChat = (props: Props) => {
  const [messages, setMessages] = useState<
    {
      role: "consultant" | "user";
      message: string;
      _id: string;
    }[]
  >([]);
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
  const [noMessages, setNoMessages] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [messageAsConsultant, { isLoading, isError, isSuccess, error }] =
    useSendServiceChatMessagesAsConsultantMutation();
  const [messageAsUser, result] = useReplyServiceChatMessageAsUserMutation();
  const [fetchUserMessages, usermsg] = useLazyFetchServiceMessagesUserQuery();
  const [fetchConsultantMessages, consultantMsg] =
    useLazyFetchServiceMessagesConsultantQuery();
  useEffect(() => {
    if (props.type === "consultant") {
      fetchConsultantMessages(props.orderId);
    } else {
      fetchUserMessages(props.orderId);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      notify("error", (error as any).data?.message || "An Error Occured");
    }
    if (isSuccess) {
      props.refecth();
    }
  }, [isError, isSuccess]);
  useEffect(() => {
    if (result.isError) {
      notify("error", (error as any).data?.message || "An Error Occured");
    }
    if (result.isSuccess) {
      props.refecth();
    }
  }, [result.isError, result.isSuccess]);
  useEffect(() => {
    if (usermsg.isError) {
      if ((usermsg.error as any)?.data?.message === "Service Chat not found") {
        setNoMessages(true);
      }
    }
    if(usermsg.isSuccess) {
      setNoMessages(false)
    }
  }, [usermsg]);
  useEffect(() => {
    if (consultantMsg.data && props.type === "consultant") {
      setMessages(consultantMsg.data.messages);
    }
    if (usermsg.data && props.type === "user") {
      setMessages(usermsg.data.messages);
    }
  }, [
    consultantMsg.data,
    usermsg.data,
    consultantMsg.isSuccess,
    usermsg.isSuccess,
  ]);
  return (
    <div className="">
      <div className="mb-8">

      {messages.length > 0 && (
        <div className="">
          {messages.map((el) => (
            <IssuesThread reply={el.message} role={el.role} key={el._id} />
          ))}
        </div>
      )}
      </div>
      {props.type === "user" && noMessages ? null : (
        <>
          {isResolveFile(props.service) && (
            <div className="">
              <TextEditor changed={(val) => setMessage(val)} value={message} />
              <div className="flex"> </div>
              <UnstyledButton
                disabled={!message || result.isLoading || isLoading}
                clicked={() => {
                  if (props.type === "user") {
                    if (userId) {
                      messageAsUser({
                        message,
                        orderId: props.orderId,
                        uid: userId,
                      });
                    }
                  } else {
                    if (consultantId) {
                      messageAsConsultant({
                        message,
                        orderId: props.orderId,
                        consultantCid: consultantId,
                      });
                    }
                  }
                }}
                class="disabled:cursor-not-allowed mt-10 flex py-[0.6rem] w-[10rem] justify-center px-4 ml-auto transition-all rounded-md items-center text-white  bg-black-3 disabled:opacity-50 text-[0.88rem] "
              >
                {result.isLoading || isLoading ? (
                  <div className="py-1 w-[1rem]">
                    <Spinner />
                  </div>
                ) : (
                  <p>Send a message</p>
                )}
              </UnstyledButton>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetailsServiceChat;
