import { ISendChatMessagePayload } from "@/interfaces/chat/chat";
import {
  IGetUserConversations,
  IGetUserConversationsResponse,
} from "@/interfaces/dashboard/chat";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { formDataHandler } from "@/utils/helperFunction";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dashboardChatApi = createApi({
  reducerPath: "dashboardChatApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    fetchUserConversations: build.query<IGetUserConversationsResponse, string>({
      query: (id) => `/api/users/conversations/${id}`,
    }),
    fetchSingleConversationData: build.query<
      { request: IGetUserConversations },
      string
    >({
      query: (orderId) => `/api/users/conversation/${orderId}`,
    }),
    sendChatMessage: build.mutation<unknown, ISendChatMessagePayload>({
      query: (body) => ({
        method: "POST",
        url: "/api/chat/save",
        body,
      }),
    }),
    sendChatMessageFile: build.mutation<unknown, ISendChatMessagePayload>({
      query: (body) => {
        const payload = formDataHandler(body);
        return {
          method: "POST",
          url: "/api/chat/upload",
          body: payload,
        };
      },
    }),
    fetchChatFiles: build.query<unknown, string>({
      query: (id) => `/api/chat/files/${id}`,
    }),
    fetchChatMessages: build.query<unknown, string>({
      query: (id) => `/api/chat/fetchmessage/${id}`,
    }),
  }),
});

export const {
  useLazyFetchUserConversationsQuery,
  useLazyFetchSingleConversationDataQuery,
  useSendChatMessageMutation,
  useSendChatMessageFileMutation,
  useFetchChatFilesQuery,
  useLazyFetchChatMessagesQuery
} = dashboardChatApi;
