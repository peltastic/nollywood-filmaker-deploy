import config from "@/config/config";
import { ICustomerRequestDataResponse } from "@/interfaces/consultants/dashboard/request";
import {
  consultantBaseQueryWithReauth,
} from "@/lib/baseQuery";
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
    getCustomerRequestDetail: build.query<unknown, string>({
      query: (id) => `/api/consultants/orderdetail/${id}`,
    }),
    getActiveRequest: build.query<unknown, string>({
      query: (id) => `/api/consultants/activerequest/${id}`,
    }),
  }),
});

export const {
  useFetchCustomerRequestsQuery,
  useAcceptRequestMutation,
  useDeclineRequestMutation,
  useGetCustomerRequestDetailQuery,
  useGetActiveRequestQuery
} = consultantRequestsApi;
