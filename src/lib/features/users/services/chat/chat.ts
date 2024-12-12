import { IChatFilesResponse, IChatWithProPayload, ITimeSlotsResponse } from "@/interfaces/chat/chat";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    initializeChatWithAProTransaction: build.mutation<
      {
        result: {
          authorization_url: string;
        };
      },
      IChatWithProPayload
    >({
      query: (body) => ({
        url: "/api/users/transaction/chat",
        method: "POST",
        body,
      }),
    }),
    getAvailabilityHours: build.query<
      ITimeSlotsResponse,
      {
        expertise: string;
        date: string;
      }
    >({
      query: ({ date, expertise }) =>
        `/api/users/gethours?expertise=${expertise}&date=${date}`,
    }),
    getChatFiles: build.query<IChatFilesResponse, string>({
      query: (room_id) =>  `/api/chat/files/${room_id}`
    })
  }),
});

export const { useInitializeChatWithAProTransactionMutation, useLazyGetAvailabilityHoursQuery, useLazyGetChatFilesQuery  } = chatApi;
