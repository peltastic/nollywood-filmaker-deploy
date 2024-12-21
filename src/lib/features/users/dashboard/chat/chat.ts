import {
  IChatFilesResponse,
  IChatMessages,
  IChatMessagesResponse,
  IRequestExtensionPayload,
  IRequestExtensionResponse,
  ISendChatMessagePayload,
  ISendFeedbackPayload,
} from "@/interfaces/chat/chat";
import {
  IGetUserConversations,
  IGetUserConversationsResponse,
  IReportIssuePayload,
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
    fetchSingleConversationData: build.query<IGetUserConversations, string>({
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
    fetchChatFiles: build.query<IChatFilesResponse, string>({
      query: (id) => `/api/chat/files/${id}`,
    }),
    fetchChatMessages: build.query<IChatMessagesResponse, string>({
      query: (id) => `/api/chat/fetchmessage/${id}`,
    }),
    requestExtension: build.mutation<
      { result: IRequestExtensionResponse },
      IRequestExtensionPayload
    >({
      query: (body) => ({
        body,
        method: "POST",
        url: "/api/users/extendmytime",
      }),
    }),
    extentTime: build.query<
      unknown,
      {
        length: number;
        transRef: string;
        orderId: string;
      }
    >({
      query: ({ length, orderId, transRef }) =>
        `/api/users/gettranstat/${transRef}?orderId=${orderId}&length=${length}`,
    }),
    exportUserChat: build.query<Blob, string>({
      query: (room_id) => ({
        url: `/api/chat/export/${room_id}`,
        responseHandler: (res) => res.blob(),
      }),
    }),
    sendFeedback: build.mutation<unknown, ISendFeedbackPayload>({
      query: (body) => ({
        url: "api/chat/feedback/register",
        body,
        method: "POST",
      }),
    }),
    reportAnIssueAsCustomer: build.mutation<unknown, IReportIssuePayload>({
      query: (body) => ({
        url: "/api/chat/report/issue",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyFetchUserConversationsQuery,
  useLazyFetchSingleConversationDataQuery,
  useSendChatMessageMutation,
  useSendChatMessageFileMutation,
  useFetchChatFilesQuery,
  useLazyFetchChatMessagesQuery,
  useRequestExtensionMutation,
  useLazyExtentTimeQuery,
  useLazyExportUserChatQuery,
  useSendFeedbackMutation,
  useReportAnIssueAsCustomerMutation
} = dashboardChatApi;
