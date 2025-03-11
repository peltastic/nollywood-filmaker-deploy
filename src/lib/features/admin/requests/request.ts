import {
  IAssignServiceToConsultantPayload,
  IFetchCustomerRequestsResponse,
} from "@/interfaces/admin/requests/requests";
import {
  IAdminResolvedFiles,
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
        order?: "desc";
        status?: string;
      }
    >({
      query: ({ limit, order, page, sort, type, status }) => {
        let query = "";
        if (limit) {
          query += `&limit=${limit}`;
        }
        if (page) {
          query += `&page=${page}`;
        }

        return {
          url: `/api/admin/pullrequests?order=${order}&status=${status}${query}`,
        };
      },
    }),
    fetchConsultantsByExpertise: build.query<IFetchConsultantsResponse, {expertise: string, date: string}>(
      {
        query: ({expertise, date}) => {
          let query = "";
          if (expertise) {
            query = `?expertise=${expertise}`;
          }

          if (date) {
            query += `&date=${date}`
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
    getConsultantForTask: build.query<
      {
        consultants: {
          fname: string;
          lname: string;
          _id: string;
        }[];
      },
      void
    >({
      query: () => `/api/admin/fetch/consultants`,
    }),
    getResolvedFiles: build.query<IAdminResolvedFiles, string>({
      query: (id) => `/api/admin/resolves/${id}`,
    }),
    setAdminTaskAsCompleted: build.mutation<unknown, string>({
      query: (id) => ({
        url: `/api/admin/request/status/completed/${id}`,
        method: "PATCH"
      }),
    }),
  }),
});

export const {
  useLazyFetchCustomerRequestQuery,
  useFetchCustomerRequestQuery,
  useFetchConsultantsByExpertiseQuery,
  useLazyFetchConsultantsByExpertiseQuery,
  useAppointConsultantMutation,
  useAssignServiceToConsultantMutation,
  useLazyGetCustomerRequestDetailQuery,
  useLazyGetConsultantForTaskQuery,
  useLazyGetResolvedFilesQuery,
  useSetAdminTaskAsCompletedMutation
} = adminRequestApi;
