import { baseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface ISingleNotification {
  _id: string;
  userId: string;
  senderId: string;
  role: "user";
  type: "Files" | "Request" | "Chat";
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
    fetchUserNotifications: build.query<IUserNotifications, string>({
      query: (id) => `/api/users/fetchnotifications/${id}`,
    }),
  }),
});

export const { useLazyFetchUserNotificationsQuery } = notificationsApi;
