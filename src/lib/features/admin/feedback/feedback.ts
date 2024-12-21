import { FeedbackResponse } from "@/interfaces/admin/feedbacks/feedbacks";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminFeedbackApi = createApi({
  reducerPath: "adminFeedbackApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchAllFeedback: build.query< FeedbackResponse, null>({
      query: () => `/api/chat/fetch/feedbacks`,
    }),
  }),
});

export const { useFetchAllFeedbackQuery } = adminFeedbackApi;
