import { ICustomerReqDetails } from "@/interfaces/consultants/dashboard/request";
import {
  IActiveRequestDataResposne,
  IResolveFiles,
  IUserRequestHistoryResponse,
} from "@/interfaces/requests/requests";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const requestsApi = createApi({
  reducerPath: "requestApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    fetchActiveRequests: build.query<IActiveRequestDataResposne, void | null>({
      query: () => `/api/users/user/pending-request`,
    }),
    fetchUserRequestHistory: build.query<
      {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
        requests: IUserRequestHistoryResponse[];
      },
      {
        userId: string;
        limit?: number;
      }
    >({
      query: ({ userId, limit }) => {
        let query = "";
        if (limit) {
          query = `?limit=${limit}`;
        }
        return { url: `/api/users/requests/completed/${userId}${query}` };
      },
    }),
    fetchResolvedFiles: build.query<IResolveFiles, string>({
      query: (id) => `/api/consultants/resolve/${id}`
    }),
    getCustomerRequestDetail: build.query<ICustomerReqDetails, string>({
      query: (id) => `/api/consultants/orderdetail/${id}`,
    }),
  }),
});

export const {
  useFetchActiveRequestsQuery,
  useLazyFetchUserRequestHistoryQuery,
  useLazyFetchResolvedFilesQuery,
  useLazyGetCustomerRequestDetailQuery
} = requestsApi;
