import {
  IAdminConsultantResponse,
  ICreateConsultantPayload,
  IFetchActiveConsultantRequest,
  IFetchConsultantOverview,
  IFetchConsultantRequestHistory,
} from "@/interfaces/admin/consultants/consultants";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminConsultantApi = createApi({
  reducerPath: "adminConsultantApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchAllConsultant: build.query<IAdminConsultantResponse, null>({
      query: () => `/api/admin/pull/consultants`,
    }),
    createConsultant: build.mutation<unknown, ICreateConsultantPayload>({
      query: (body) => ({
        url: "/api/admin/create/consultants",
        method: "POST",
        body,
      }),
    }),
    fetchConsultantOverview: build.query<IFetchConsultantOverview, string>({
      query: (id) => `/api/admin/fetch/consultants/${id}`,
    }),
    fetchConsultantActiveRequest: build.query<
      IFetchActiveConsultantRequest,
      string
    >({
      query: (id) => `/api/admin/consultant/active/${id}`,
    }),
    fetchConsultantRequestHistory: build.query<
      IFetchConsultantRequestHistory,
      string
    >({
      query: (id) => `/api/admin/consultant/history/${id}`,
    }),
    deleteConsultant: build.mutation<unknown, string>({
      query: (id) => ({
        url: `/api/admin/consultants/${id}`,
        method: "DELETE"
      }),
    }),
  }),
});

export const {
  useFetchAllConsultantQuery,
  useCreateConsultantMutation,
  useLazyFetchConsultantOverviewQuery,
  useLazyFetchConsultantActiveRequestQuery,
  useLazyFetchConsultantRequestHistoryQuery,
  useDeleteConsultantMutation
} = adminConsultantApi;
