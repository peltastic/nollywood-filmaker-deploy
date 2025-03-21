import {
  IChatFilesResponse,
  IChatMessagesResponse,
} from "@/interfaces/chat/chat";
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
      { id: string; search?: string }
    >({
      query: ({ id, search }) => {
        let query = "";
        if (search) {
          query += `?search=${search}`;
        }
        return { url: `/api/consultants/conversations/${id}${query}` };
      },
    }),
    fetchSingleConversationData: build.query<IGetUserConversations, string>({
      query: (orderId) => `/api/users/conversation/${orderId}`,
    }),
    fetchConsultantChatMessages: build.query<IChatMessagesResponse, string>({
      query: (id) => `/api/chat/fetchmessage/${id}`,
    }),
    getConsultantChatFiles: build.query<IChatFilesResponse, string>({
      query: (room_id) => `/api/chat/files/${room_id}`,
    }),
    exportConsultantChat: build.query<Blob, string>({
      query: (room_id) => ({
        url: `/api/chat/export/${room_id}`,
        responseHandler: (res) => res.blob(),
      }),
    }),
  }),
});

export const {
  useLazyFetchConsultantsConversationsQuery,
  useLazyFetchSingleConversationDataQuery,
  useLazyFetchConsultantChatMessagesQuery,
  useLazyGetConsultantChatFilesQuery,
  useLazyExportConsultantChatQuery,
} = consultantDashboardChatApi;
