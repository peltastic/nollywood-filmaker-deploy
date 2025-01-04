import { FeedbackResponse } from "@/interfaces/admin/feedbacks/feedbacks";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminFeedbackApi = createApi({
  reducerPath: "adminFeedbackApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchAllFeedback: build.query<FeedbackResponse, null>({
      query: () => `/api/chat/fetch/feedbacks`,
    }),
    fetchAverageRatings: build.query<
      { avgQuality: number; avgSpeed: number },
      null
    >({
      query: () => `/api/admin/feedback/average-ratings`,
    }),
    fetchTopConsultants: build.query<
      {
        consultants: {
          fname: string;
          lname: string;
          avgQuality: number;
          avgSpeed: number;
          appointmentCount: number;
          totalRequest: number;
        }[]
      },
      null
    >({
      query: () => `/api/admin/consultants/top`
    }),
  }),
});

export const { useFetchAllFeedbackQuery, useFetchAverageRatingsQuery, useFetchTopConsultantsQuery } =
  adminFeedbackApi;
