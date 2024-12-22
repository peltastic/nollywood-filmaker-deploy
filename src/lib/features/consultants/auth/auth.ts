import config from "@/config/config";
import { IRegisterConsultantResponse } from "@/interfaces/consultants/auth/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const consultantAuthApi = createApi({
  reducerPath: "consultantAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    loginConsultant: builder.mutation<
      IRegisterConsultantResponse,
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: `/api/consultants/login`,
        method: "POST",
        body,
      }),
    }),
    setPassword: builder.mutation<
      unknown,
      {
        token: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/api/consultants/verify-email",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginConsultantMutation, useSetPasswordMutation } = consultantAuthApi;
