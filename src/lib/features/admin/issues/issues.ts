import { IssuesResponse } from "@/interfaces/admin/issues/issues";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminIssuesApi = createApi({
  reducerPath: "adminIssuesApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchAllIssues: build.query<IssuesResponse, void>({
      query: () => `/api/chat/fetch/issues`,
    }),
  }),
});

export const { useLazyFetchAllIssuesQuery } = adminIssuesApi;
