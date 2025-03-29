import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { io, Socket } from "socket.io-client";
import config from "@/config/config";
import { string } from "yup";
let primarySocket: Socket | null = null;
let chatSocket: Socket | null = null;
let fileChatSocket: Socket | null = null;
// let chatFileMessageInstances: Map<string, Socket> = new Map();

interface SocketInstance {
  id: string;
  socket: Socket;
}

export const socketApi = createApi({
  reducerPath: "socketApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getPrimarySocket: builder.query<Socket, void>({
      queryFn: () => {
        if (!primarySocket) {
          primarySocket = io(config.API_URL);
        }
        return { data: primarySocket };
      },
    }),
    getChatSocket: builder.query<Socket, void>({
      queryFn: () => {
        if (!chatSocket) {
          chatSocket = io(config.CHAT_API_URL);
        }
        return { data: chatSocket };
      },
    }),
    getChatFileSocket: builder.query<Socket, void>({
      queryFn: () => {
        if (!fileChatSocket) {
          fileChatSocket = io(config.CHAT_API_URL);
        }
        return { data: fileChatSocket };
      },
    }),
  }),
});

export const {
  useLazyGetChatSocketQuery,
  useLazyGetPrimarySocketQuery,
  useLazyGetChatFileSocketQuery,
  endpoints,
} = socketApi;
