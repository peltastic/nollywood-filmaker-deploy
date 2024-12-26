import { IPostToIssueThreadPayload } from "@/interfaces/admin/issues/issues";
import {
  IGetSingleUserIssuesResponse,
  IGetUserIssuesResponse,
} from "@/interfaces/issues/issues";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const issuesApi = createApi({
  reducerPath: "issuesApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUsersIssues: build.query<IGetUserIssuesResponse, string>({
      query: (id) => `/api/users/issues/${id}`,
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
  }),
});

export const {
  useGetUsersIssuesQuery,
  useLazyGetSingleUserIssuesInfoQuery,
  usePostToIssueThreadMutation,
} = issuesApi;
