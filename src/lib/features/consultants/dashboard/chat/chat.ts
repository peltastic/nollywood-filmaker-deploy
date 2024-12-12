import { IChatFilesResponse, IChatMessagesResponse } from "@/interfaces/chat/chat";
import {
  IGetUserConversations,
  IGetUserConversationsResponse,
} from "@/interfaces/dashboard/chat";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const consultantDashboardChatApi = createApi({
  reducerPath: "consultantDashboardChatApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchConsultantsConversations: build.query<
      IGetUserConversationsResponse,
      string
    >({
      query: (id) => `/api/consultants/conversations/${id}`,
    }),
    fetchSingleConversationData: build.query<
      IGetUserConversations ,
      string
    >({
      query: (orderId) => `/api/users/conversation/${orderId}`,
    }),
    fetchConsultantChatMessages: build.query<IChatMessagesResponse, string>({
      query: (id) => `/api/chat/fetchmessage/${id}`,
    }),
    getConsultantChatFiles: build.query<IChatFilesResponse, string>({
      query: (room_id) =>  `/api/chat/files/${room_id}`
    })
  }),
});

export const {
  useLazyFetchConsultantsConversationsQuery,
  useLazyFetchSingleConversationDataQuery,
  useLazyFetchConsultantChatMessagesQuery,
  useLazyGetConsultantChatFilesQuery
} = consultantDashboardChatApi;
