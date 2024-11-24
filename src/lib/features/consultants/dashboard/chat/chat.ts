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
      { request: IGetUserConversations },
      string
    >({
      query: (orderId) => `/api/users/conversation/${orderId}`,
    }),
  }),
});

export const {
  useLazyFetchConsultantsConversationsQuery,
  useLazyFetchSingleConversationDataQuery,
} = consultantDashboardChatApi;
