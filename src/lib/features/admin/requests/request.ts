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
import { createApi } from "@reduxjs/toolkit/query/react";

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
        order?: "desc"
        status?: string
      }
    >({
      query: ({ limit, order, page, sort, type, status }) => {
        return {
          url: `/api/admin/pullrequests?order=${order}&status=${status}`,
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
    getConsultantForTask: build.query<{
      consultants: {
        fname: string
        lname: string
        _id: string
      }[]
    } , void>({
      query: () => `/api/admin/fetch/consultants`
    })
  }),
});

export const {
  useLazyFetchCustomerRequestQuery,
  useFetchConsultantsByExpertiseQuery,
  useLazyFetchConsultantsByExpertiseQuery,
  useAppointConsultantMutation,
  useAssignServiceToConsultantMutation,
  useLazyGetCustomerRequestDetailQuery,
  useLazyGetConsultantForTaskQuery
} = adminRequestApi;
