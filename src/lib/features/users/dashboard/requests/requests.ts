import { IActiveRequestDataResposne } from "@/interfaces/requests/requests";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const requestsApi = createApi({
  reducerPath: "requestApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    fetchActiveRequests: build.query<IActiveRequestDataResposne, void | null>({
      query: () => `/api/users/user/pending-request`,
    }),
  }),
});

export const { useFetchActiveRequestsQuery } = requestsApi;
