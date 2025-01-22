import { IConsultantActiveReqResponse } from "@/interfaces/consultants/dashboard/request";
import {
  IConsultantRevenue,
  IConsultantRevenueResponse,
  IConsultantWithdrawalResponse,
  IFetchWalletbalance,
} from "@/interfaces/consultants/dashboard/withdrawals";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const withdrawalsApi = createApi({
  reducerPath: "withdrawalsApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchWalletBalance: build.query<IFetchWalletbalance, string>({
      query: (id) => `/api/consultants/wallet/${id}`,
    }),
    fetchWalletHistory: build.query<unknown, string>({
      query: (id) => `/api/consultants/wallet/${id}`,
    }),
    createWithdrawalRequest: build.mutation<
      unknown,
      {
        amount: string;
        accountNumber: string;
        bankName: string;
      }
    >({
      query: (body) => {
        return {
          url: `/api/consultants/create-withdrawal`,
          method: "POST",
          body,
        };
      },
    }),
    saveBankDetails: build.mutation<
      unknown,
      {
        cid: string;
        bankname: string;
        accountnumber: string;
      }
    >({
      query: (body) => ({
        url: `/api/consultants/banks`,
        method: "POST",
        body,
      }),
    }),
    fetchBankDetails: build.query<
      {
        banks?: {
          bankname: string;
          accountnumber: string;
        }[];
      },
      string
    >({
      query: (id) => `/api/consultants/banks/${id}`,
    }),
    fetchWithdrawals: build.query<IConsultantWithdrawalResponse, string>({
      query: (id) => `/api/consultants/wallet/withdrawals/${id}`,
    }),
    fetchConsultantRevenue: build.query<IConsultantRevenueResponse, string>({
      query: (id) => `/api/consultants/wallet/revenues/${id}`,
    }),
    fetchSingleWithdrawalData: build.query<unknown, string>({
      query: (id) => `/api/consultants/withdrawal/${id}`,
    }),
    fetchSingleRevenueData: build.query<
      { deposit: IConsultantRevenue },
      string
    >({
      query: (id) => `/api/consultants/deposit/${id}`,
    }),
  }),
});

export const {
  useLazyFetchWalletBalanceQuery,
  useSaveBankDetailsMutation,
  useLazyFetchBankDetailsQuery,
  useCreateWithdrawalRequestMutation,
  useLazyFetchWithdrawalsQuery,
  useLazyFetchWalletHistoryQuery,
  useLazyFetchConsultantRevenueQuery,
  useLazyFetchSingleRevenueDataQuery,
  useLazyFetchSingleWithdrawalDataQuery,
} = withdrawalsApi;
