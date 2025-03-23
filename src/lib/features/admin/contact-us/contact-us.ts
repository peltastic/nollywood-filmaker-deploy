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

export interface ISingleContactResponse {
  submission: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    submittedAt: string;
  };
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
    fetchSingleContactResponse: build.query<ISingleContactResponse, string>({
      query: (id) => `/api/admin/contact-submissions/${id}`,
    }),
    postContactResponse: build.mutation<
      unknown,
      { subject: string; replyMessage: string; id: string }
    >({
      query: ({ id, replyMessage, subject }) => ({
        url: `/api/admin//contact-submissions/${id}/reply`,
        method: "POST",
        body: {
          replyMessage,
          subject,
        },
      }),
    }),
  }),
});

export const {
  useLazyFetchContactUsResponsesQuery,
  useLazyFetchSingleContactResponseQuery,
  usePostContactResponseMutation,
} = contactUsResponseApi;
