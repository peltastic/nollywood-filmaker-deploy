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
        pagination: {
          totalRecords: number;
          currentPage: number;
          totalPages: number;
        };
      },
      { page?: number }
    >({
      query: ({ page }) => {
        let query = "";
        if (page) {
          query += `?page=${page}`;
        }
        return {
          url: `/api/admin/email-list${query}`,
        };
      },
    }),
  }),
});

export const { useLazyFetchWaitListQuery } = waitlistApi;
