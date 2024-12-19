import { io } from "socket.io-client";

import config from "@/config/config";

export const primary_socket = io(config.API_URL);
export const chat_socket = io(config.CHAT_API_URL, {
  reconnectionAttempts: Infinity,
  reconnectionDelay: 2000,
});

export function initializeTransactionListener(userId: string) {
  primary_socket.emit("register", userId);
}

export function joinChatRoom(data: {
  room: string;
  userId: string;
  name: string;
  role: "user" | "consultant";
}) {
  chat_socket.emit("joinRoom", data);
}

export function sendChatMessageEvent(data: {
  room: string;
  message: string;
  type: "text"
  sender: {
    userid: string;
    name: string;
    role: "user" | "consultant" | "admin";
    chatRoomId: string;
  };
}) {
  chat_socket.emit("chatMessage", data);
}

export function sendFileMessage(data: {
  room: string;
  fileData: string | ArrayBuffer;
  fileName: string;
  type: "img" | "file";
  sender: {
    userid: string;
    name: string;
    role: "user" | "consultant" | "admin";
    chatRoomId: string;
  };
}) {
  chat_socket.emit("sendFile", data);
}
