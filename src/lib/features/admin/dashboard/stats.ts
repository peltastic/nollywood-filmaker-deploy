import {
  IGetNewestUsers,
  IGetTotalCustomersAndConsultantsResponse,
  IGetTransactionStatsResponse,
} from "@/interfaces/admin/dashboard/stats";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminStatsApi = createApi({
  reducerPath: "adminStatsApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchTransactionStats: build.query<IGetTransactionStatsResponse, void>({
      query: () => `/api/admin/transactions/stats`,
    }),
    fetchTotalCustomersAndConsultants: build.query<
      IGetTotalCustomersAndConsultantsResponse,
      void
    >({
      query: () => `/api/admin/stats/user-consultants`,
    }),
    fetchNewestCustomers: build.query<{ data: IGetNewestUsers[] }, void>({
      query: () => `/api/admin/stats/newest-users`,
    }),
  }),
});

export const { useFetchTransactionStatsQuery, useFetchTotalCustomersAndConsultantsQuery } = adminStatsApi;
