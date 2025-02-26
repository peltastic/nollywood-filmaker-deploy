import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const joinApi = createApi({
  reducerPath: "joinApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    joinWaitRoom: builder.mutation<
      unknown,
      {
        email: string;
        name: string;
      }
    >({
      query: (body) => ({ url: `/api/join/email-list`, body, method: "POST" }),
    }),
  }),
});

export const { useJoinWaitRoomMutation } = joinApi;
