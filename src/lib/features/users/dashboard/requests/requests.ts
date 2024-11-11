import { baseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const requestsApi = createApi({
  reducerPath: "requestApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    fetchActiveRequests: build.query<unknown, void | null>({
      query: () => `/api/users/user/pending-request`,
    }),
  }),
});

export const { useFetchActiveRequestsQuery } = requestsApi;
