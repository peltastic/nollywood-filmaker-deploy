import {
  IAdminCustomersResponse,
  IFetchActiveUserRequest,
  IFetchUserOverview,
  IFetchUserRequestHistory,
} from "@/interfaces/admin/customers/customers";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminCustomersApi = createApi({
  reducerPath: "adminCustomersApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchAllCustomers: build.query<IAdminCustomersResponse, {
      limit?: number
      page?: number
    }>({
      query: ({limit, page}) => {
        let query = "";
        if (limit) {
          query += `?limit=${limit}`;
        }
        if (page) {
          query += `&page=${page}`;
        }
        return { url: `/api/admin/fetch/users${query}` };
      },
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
  useLazyFetchAllCustomersQuery,
  useLazyFetchUserOverviewQuery,
  useLazyFetchUserActiveRequestQuery,
  useLazyFetchUserRequestHistoryQuery,
} = adminCustomersApi;
