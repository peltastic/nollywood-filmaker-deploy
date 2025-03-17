import { isResolveFile } from "@/utils/helperFunction";
import React, { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import { useSendServiceChatMessagesAsConsultantMutation } from "@/lib/features/consultants/dashboard/request";
import { useReplyServiceChatMessageAsUserMutation } from "@/lib/features/users/dashboard/requests/requests";

type Props = {
  service:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget"
    | "Create A Pitch Deck"
    | "Creating A Movie Schedule";
  type: "consultant" | "user";
};

const OrderDetailsServiceChat = (props: Props) => {
  const [message, setMessage] = useState<string>("");
  const [messageAsConsultant] =
    useSendServiceChatMessagesAsConsultantMutation();
  const [messageAsUser] = useReplyServiceChatMessageAsUserMutation();
  return (
    <div className="">
      {isResolveFile(props.service) && (
        <div className="">
          <TextEditor changed={(val) => setMessage(val)} value={message} />
          <div className="flex">    </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsServiceChat;
