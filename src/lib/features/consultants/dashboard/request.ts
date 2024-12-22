import config from "@/config/config";
import {
  IConsultantActiveReqResponse,
  ICustomerReqDetails,
  ICustomerRequestDataResponse,
  IRequestHistoryResponse,
  IServiceRequest,
} from "@/interfaces/consultants/dashboard/request";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const consultantRequestsApi = createApi({
  reducerPath: "consultantRequestApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchCustomerRequests: build.query<ICustomerRequestDataResponse, string>({
      query: (id) => `/api/consultants/fetchrequest/${id}`,
    }),
    acceptRequest: build.mutation<
      unknown,
      {
        consultant_id: string;
        order_id: string;
      }
    >({
      query: ({ consultant_id, order_id }) => ({
        url: `/api/consultants/assignments/${consultant_id}/${order_id}/accept`,
        method: "PUT",
      }),
    }),
    declineRequest: build.mutation<
      unknown,
      {
        consultant_id: string;
        order_id: string;
      }
    >({
      query: ({ consultant_id, order_id }) => ({
        url: `/api/consultants/assignments/${consultant_id}/${order_id}/decline`,
        method: "PUT",
      }),
    }),
    getCustomerRequestDetail: build.query<ICustomerReqDetails, string>({
      query: (id) => `/api/consultants/orderdetail/${id}`,
    }),
    getActiveRequest: build.query<IConsultantActiveReqResponse, string>({
      query: (id) => `/api/consultants/activerequest/${id}`,
    }),
    getServiceRequests: build.query<{ tasks: IServiceRequest[] }, string>({
      query: (id) => `/api/consultants/fetchtask/${id}`,
    }),
    setChatAsComplete: build.mutation<unknown, string>({
      query: (orderId) => ({
        url: `/api/consultants/requests/complete`,
        method: "POST",
        body: {
          orderId,
        },
      }),
    }),
    fetchReqHistory: build.query<
      {
        completedRequests: IRequestHistoryResponse[];
      },
      string
    >({
      query: (id) => `/api/consultants/assignments/${id}`,
    }),
    getSingleConsultantAvailability: build.query<
      {
        availableHoursCount: {
          time: string
          isAvailable: true
        }[]
      },
      {
        date: string;
        id: string;
      }
    >({
      query: ({ date, id }) =>
        `/api/users/consultant/${id}/availability?date=${date}`,
    }),
  }),
});

export const {
  useFetchCustomerRequestsQuery,
  useAcceptRequestMutation,
  useDeclineRequestMutation,
  useGetCustomerRequestDetailQuery,
  useGetActiveRequestQuery,
  useLazyGetCustomerRequestDetailQuery,
  useLazyGetServiceRequestsQuery,
  useSetChatAsCompleteMutation,
  useLazyFetchReqHistoryQuery,
  useLazyGetSingleConsultantAvailabilityQuery
} = consultantRequestsApi;
