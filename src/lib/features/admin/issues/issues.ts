import {
  IPostToIssueThreadPayload,
  IssuesResponse,
} from "@/interfaces/admin/issues/issues";
import { IGetSingleUserIssuesResponse } from "@/interfaces/issues/issues";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminIssuesApi = createApi({
  reducerPath: "adminIssuesApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchAllIssues: build.query<IssuesResponse, void>({
      query: () => `/api/chat/fetch/issues`,
    }),
    getSingleUserIssuesInfo: build.query<IGetSingleUserIssuesResponse, string>({
      query: (id) => `/api/chat/fetch/issue?id=${id}`,
    }),
    postToIssueThread: build.mutation<unknown, IPostToIssueThreadPayload>({
      query: (body) => ({
        method: "POST",
        body,
        url: "/api/chat/post/thread",
      }),
    }),
    closeIssueThread: build.mutation<unknown, string>({
      query: (id) => ({
        url: `/api/admin/set/issue/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useLazyFetchAllIssuesQuery,
  useLazyGetSingleUserIssuesInfoQuery,
  usePostToIssueThreadMutation,
  useCloseIssueThreadMutation
} = adminIssuesApi;
