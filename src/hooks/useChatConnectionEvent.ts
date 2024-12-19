import { chat_socket } from "@/lib/socket";
import React, { useEffect, useState } from "react";

type Props = {
  callback: () => void;
};

export const useChatConnectionEvent = (
  callback: () => void,
  sessionOver?: boolean,
  isTime?: boolean
) => {
  const [reconnectionMessage, setReconnectMessage] = useState<string>("");
  useEffect(() => {
    if (sessionOver) return () => {};
    chat_socket.on("disconnect", () => {
      chat_socket.connect();
      setReconnectMessage("Network error, Disconnected.");
    });
    return () => {
      chat_socket.off("disconnect");
    };
  }, [sessionOver, isTime]);

  return {
    message: reconnectionMessage,

    setReconnectMessage: (val: string) => setReconnectMessage(val),
  };
};
