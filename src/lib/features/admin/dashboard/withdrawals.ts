import {
  IAdminWithdrawals,
  IAdminWithdrawalsResponse,
} from "@/interfaces/admin/dashboard/withdrawals";
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
  }),
});

export const {
  useLazyFetchTranscationStatQuery,
  useLazyFetchWithdrawalsQuery,
  useApproveWithdrawalMutation,
  useLazyFetchSingleWithdrawalQuery,
} = adminWithdrawalsApi;
