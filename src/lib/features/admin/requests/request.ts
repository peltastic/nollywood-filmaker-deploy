import {
  IAssignServiceToConsultantPayload,
  IFetchCustomerRequestsResponse,
} from "@/interfaces/admin/requests/requests";
import {
  IAppointConsultantPayload,
  ICustomerReqDetails,
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
          url: `/api/admin/pullrequests?order=${order}&status=pending`,
        };
      },
    }),
    fetchConsultantsByExpertise: build.query<IFetchConsultantsResponse, string>(
      {
        query: (expertise) => {
          let query = "";
          if (expertise) {
            query = `?expertise=${expertise}`;
          }
          return { url: `/api/admin/consultants${query}` };
        },
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
    getCustomerRequestDetail: build.query<ICustomerReqDetails, string>({
      query: (id) => `/api/consultants/orderdetail/${id}`,
    }),
  }),
});

export const {
  useLazyFetchCustomerRequestQuery,
  useFetchConsultantsByExpertiseQuery,
  useAppointConsultantMutation,
  useAssignServiceToConsultantMutation,
  useLazyGetCustomerRequestDetailQuery,
} = adminRequestApi;
