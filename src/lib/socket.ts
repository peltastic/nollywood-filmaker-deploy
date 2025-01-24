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

export interface IContactMessagePayload {
  room: string;
  message: string;
  sender: {
    mid: string;
    userid: string;
    role: string;
    name: string;
    type: string;
    chatRoomId: string;
    replyto: string;
    replytoId: string;
    replytousertype: "user" | "consultant" | "admin" | null;
    recommendations: {
      type: "crew" | "company";
      name: string;
      userid: string;
      propic: string;
    }[];
  };
}

export interface IChatMessagePayload {
  room: string;
  message: string;
  sender: {
    mid: string;
    type: "text";
    userid: string;
    name: string;
    role: "user" | "consultant" | "admin";
    chatRoomId: string;
    replyto: string;
    replytoId: string;
    replytousertype: "user" | "consultant" | "admin" | null;
  };
}

export function joinChatRoom(data: {
  room: string;
  userId: string;
  name: string;
  role: "user" | "consultant";
}) {
  chat_socket.emit("joinRoom", data);
}

export function sendChatMessageEvent(data: IChatMessagePayload) {
  chat_socket.emit("chatMessage", data);
}

export function sendContactData(data: IContactMessagePayload) {
  console.log(data, "contact message sent");
  chat_socket.emit("chatMessage", data);
}

export function sendFileMessage(data: {
  room: string;
  fileData: string | ArrayBuffer;
  fileName: string;
  sender: {
    type: "img" | "file";
    userid: string;
    name: string;
    role: "user" | "consultant" | "admin";
    chatRoomId: string;
    mid: string;
    replyto: string;
    replytoId: string;
    replytousertype: "user" | "consultant" | "admin" | null;
  };
}) {
  chat_socket.emit("sendFile", data);
}

export function emitTypingEvent(room: string, userId: string) {
  chat_socket.emit("typing", {
    room,
    sender: {
      userId,
    },
  });
}

export function stopTypingEmit(room: string, userId: string) {
  chat_socket.emit("stopped", {
    room,
    sender: {
      userId,
    },
  });
}
