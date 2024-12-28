import { IAdminCustomersResponse, IFetchActiveUserRequest, IFetchUserOverview, IFetchUserRequestHistory } from "@/interfaces/admin/customers/customers";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminCustomersApi = createApi({
  reducerPath: "adminCustomersApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchAllCustomers: build.query<IAdminCustomersResponse, null>({
      query: () => `/api/admin/fetch/users`,
    }),
    fetchUserOverview: build.query<IFetchUserOverview, string>({
      query: (id) => `/api/admin/fetch/users/${id}`,
    }),
    fetchUserActiveRequest: build.query<IFetchActiveUserRequest, string>({
      query: (id) => `/api/admin/fetch/user/pending-request/${id}`,
    }),
    fetchUserRequestHistory: build.query<IFetchUserRequestHistory, string>({
      query: (id) => `/api/admin/fetch/completed/user/${id}`,
    }),
  }),
});

export const {
  useFetchAllCustomersQuery,
  useLazyFetchUserOverviewQuery,
  useLazyFetchUserActiveRequestQuery,
  useLazyFetchUserRequestHistoryQuery
} = adminCustomersApi; 
