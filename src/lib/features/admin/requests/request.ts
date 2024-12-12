import {
  IAssignServiceToConsultantPayload,
  IFetchCustomerRequestsResponse,
} from "@/interfaces/admin/requests/requests";
import {
  IAppointConsultantPayload,
  IFetchConsultantsResponse,
} from "@/interfaces/consultants/dashboard/request";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminRequestApi = createApi({
  reducerPath: "adminRequestApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchCustomerRequest: build.query<
      IFetchCustomerRequestsResponse,
      {
        type?: "request";
        page?: number;
        limit?: number;
        sort?: string;
        order?: "desc";
      }
    >({
      query: ({ limit, order, page, sort, type }) => {
        return {
          url: `/api/admin/pullrequests?order=${order}`,
        };
      },
    }),
    fetchConsultantsByExpertise: build.query<IFetchConsultantsResponse, string>(
      {
        query: (expertise) => `/api/admin/consultants?expertise=${expertise}`,
      }
    ),
    appointConsultant: build.mutation<unknown, IAppointConsultantPayload>({
      query: (body) => ({
        url: "/api/admin/create/appointment",
        method: "POST",
        body,
      }),
    }),
    assignServiceToConsultant: build.mutation<
      unknown,
      IAssignServiceToConsultantPayload
    >({
      query: (body) => ({
        url: "/api/admin/create/task",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyFetchCustomerRequestQuery,
  useFetchConsultantsByExpertiseQuery,
  useAppointConsultantMutation,
  useAssignServiceToConsultantMutation
} = adminRequestApi;
