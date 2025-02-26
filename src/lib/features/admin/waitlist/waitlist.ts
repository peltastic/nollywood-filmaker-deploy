import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const waitlistApi = createApi({
  reducerPath: "waitlistApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchWaitList: build.query<
      {
        data: {
          email: string;
          name: string;
          createAt: string;
        }[];
      },
      null
    >({
      query: () => ({
        url: "/api/admin/email-list",
      }),
    }),
  }),
});

export const { useFetchWaitListQuery } = waitlistApi;
