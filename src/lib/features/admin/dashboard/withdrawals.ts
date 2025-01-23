import {
  IAdminRevenueHistoryResponse,
  IAdminWithdrawals,
  IAdminWithdrawalsResponse,
} from "@/interfaces/admin/dashboard/withdrawals";
import { IConsultantRevenue } from "@/interfaces/consultants/dashboard/withdrawals";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminWithdrawalsApi = createApi({
  reducerPath: "adminWithdrawalsApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchTranscationStat: build.query<
      {
        totals: {
          withdrawals: number;
          deposits: number;
        };
      },
      void
    >({
      query: () => `/api/admin/total-transactions`,
    }),
    fetchWithdrawals: build.query<IAdminWithdrawalsResponse, void>({
      query: (id) => "/api/admin/withdrawals",
    }),
    fetchSingleWithdrawal: build.query<
      {
        withdrawal: IAdminWithdrawals;
        consultant: {
          fname: string;
          lname: string;
          email: string;
        };
      },
      string
    >({
      query: (id) => `/api/admin/withdrawal/${id}`,
    }),
    approveWithdrawal: build.mutation<
      unknown,
      {
        orderId: string;
      }
    >({
      query: (body) => ({
        url: "/api/admin/debit",
        method: "POST",
        body,
      }),
    }),
    fetchRevenueHistory: build.query<IAdminRevenueHistoryResponse, void>({
      query: () => `/api/admin/deposits`,
    }),

    fetchSingleRevenueDataAdmin: build.query<
      { deposit: IConsultantRevenue },
      string
    >({
      query: (id) => `/api/admin/deposit/${id}`,
    }),
  }),
});

export const {
  useLazyFetchTranscationStatQuery,
  useLazyFetchWithdrawalsQuery,
  useApproveWithdrawalMutation,
  useLazyFetchSingleWithdrawalQuery,
  useLazyFetchRevenueHistoryQuery,
  useLazyFetchSingleRevenueDataAdminQuery
} = adminWithdrawalsApi;
