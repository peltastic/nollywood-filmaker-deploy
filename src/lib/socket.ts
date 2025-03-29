import { io, Socket } from "socket.io-client";

import config from "@/config/config";

export const primary_socket = io(config.API_URL);
export const chat_socket = io(config.CHAT_API_URL);

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
    replytochattype: "text" | "file" | "img" | "typing" | "contacts";
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
    replytochattype: "text" | "file" | "img" | "typing" | "contacts";
  };
}

export function joinChatRoom(
  data: {
    room: string;
    userId: string;
    name: string;
    role: "user" | "consultant";
  },
  socket: Socket
) {
  socket.emit("joinRoom", data);
}

export function sendChatMessageEvent(
  data: IChatMessagePayload,
  socket: Socket
) {
  socket.emit("chatMessage", data);
}

export function sendContactData(data: IContactMessagePayload, socket: Socket) {
  console.log("sent-chat-message")
  socket.emit("chatMessage", data);
}

export function sendFileMessage(
  data: {
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
      replytochattype: "text" | "file" | "img" | "typing" | "contacts";
    };
  },
  socket: Socket
) {
  socket.emit("sendFile", data);
}

export function sendFileAsChunk(
  data: {
    uploadId: string;
    fileName: string;
    chunkIndex: number;
    totalChunks: number;
    // fileData: { chunkIndex: number; fileData: string | Buffer }[];
    fileData: string | Buffer;
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
      replytochattype: "text" | "file" | "img" | "typing" | "contacts";
    };
  },
  socket: Socket
) {
  // setTimeout(() => {

  // }, 10000)
    chat_socket.emit(`sendFileChunk`, data);
  // console.log(data)
}

export function emitTypingEvent(room: string, userId: string, socket: Socket) {
  console.log("emit-typed")
  socket.emit("typing", {
    room,
    sender: {
      userId,
    },
  });
}

export function stopTypingEmit(room: string, userId: string, socket: Socket) {
  console.log("emit-stopped")
  socket.emit("stopped", {
    room,
    sender: {
      userId,
    },
  });
}
