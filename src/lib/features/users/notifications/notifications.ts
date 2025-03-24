import { baseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface ISingleNotification {
  _id: string;
  userId: string;
  senderId: string;
  role: "user";
  type: "Files" | "Request" | "Chat" | "Reply";
  relatedId: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}
export interface IUserNotifications {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalDocuments: number;
  };
  notifications: ISingleNotification[];
}

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    fetchUserNotifications: build.query<
      IUserNotifications,
      { id: string; page?: number; limit: number }
    >({
      query: ({ id, limit, page }) => {
        let query = ``;
        if (limit) {
          query += `?limit=${limit}`;
        }
        if (page) {
          query += `&page=${page}`;
        }
        return { url: `/api/users/fetchnotifications/${id}${query}` };
      },
    }),
  }),
});

export const { useLazyFetchUserNotificationsQuery } = notificationsApi;
