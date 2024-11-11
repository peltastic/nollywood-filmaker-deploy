import { IChatWithProPayload } from "@/interfaces/chat/chat";
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
  }),
});

export const { useInitializeChatWithAProTransactionMutation } = chatApi;
