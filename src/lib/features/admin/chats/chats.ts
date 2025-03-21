import { IAdminUserConversationsResponse } from "@/interfaces/admin/dashboard/chats/chats";
import {
  IChatFilesResponse,
  IChatMessagesResponse,
} from "@/interfaces/chat/chat";
import { ICustomerReqDetails } from "@/interfaces/consultants/dashboard/request";
import { IGetUserConversations } from "@/interfaces/dashboard/chat";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminChatsApi = createApi({
  reducerPath: "adminChatApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchConversations: build.query<
      IAdminUserConversationsResponse,
      {
        limit?: number;
        page?: number;
        search?: string;
      }
    >({
      query: ({ limit, page, search }) => {
        let query = "";
        if (limit) {
          query += `?limit=${limit}`;
        }
        if (page) {
          query += `&page=${page}`;
        }
        if (search) {
          query += `&search=${search}`;
        }
        return { url: `/api/admin/appointments/conversations${query}` };
      },
    }),
    fetchSingleConversationByAdmin: build.query<IGetUserConversations, string>({
      query: (orderId) => `/api/users/conversation/${orderId}`,
    }),
    fetchChatMessagesByAdmin: build.query<IChatMessagesResponse, string>({
      query: (id) => `/api/chat/fetchmessage/${id}`,
    }),
    getChatFilesByAdmin: build.query<IChatFilesResponse, string>({
      query: (room_id) => `/api/chat/files/${room_id}`,
    }),
    getCustomerRequestDetailByAdmin: build.query<ICustomerReqDetails, string>({
      query: (id) => `/api/consultants/orderdetail/${id}`,
    }),
  }),
});

export const {
  useLazyFetchConversationsQuery,
  useLazyFetchChatMessagesByAdminQuery,
  useLazyFetchSingleConversationByAdminQuery,
  useLazyGetChatFilesByAdminQuery,
  useLazyGetCustomerRequestDetailByAdminQuery,
} = adminChatsApi;
