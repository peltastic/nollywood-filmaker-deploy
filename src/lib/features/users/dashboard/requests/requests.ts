import {
  IActiveRequestDataResposne,
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
  }),
});

export const {
  useFetchActiveRequestsQuery,
  useLazyFetchUserRequestHistoryQuery,
} = requestsApi;
