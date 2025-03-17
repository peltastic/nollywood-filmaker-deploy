import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface IContactUsResponses {
  currentPage: number;
  totalPages: number;
  totalSubmissions: number;
  submissions: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    submittedAt: string;
  }[];
}

export const contactUsResponseApi = createApi({
  reducerPath: "contactUsResponseApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchContactUsResponses: build.query<
      IContactUsResponses,
      { page?: number }
    >({
      query: ({ page }) => {
        let query = `?limit=${10}`;
        if (page) {
          query += `&page=${page}`;
        }
        return {
          url: `/api/admin/contact-submissions${query}`,
        };
      },
    }),
  }),
});

export const { useLazyFetchContactUsResponsesQuery } = contactUsResponseApi;
