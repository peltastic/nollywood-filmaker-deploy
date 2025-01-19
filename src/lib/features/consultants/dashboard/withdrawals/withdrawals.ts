import { IFetchWalletbalance } from "@/interfaces/consultants/dashboard/withdrawals";
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
    createWithdrawalRequest: build.mutation<unknown, {
        orderId: string
        amount: string
        accountNumber: string
        bankName: string
    }>({
        query: (id) => {
            return {
                url: `/api/consultants/create-withdrawal`
            }
        }
    })
  }),
});
