import config from "@/config/config";
import { ILoginData, ILoginResponse, IRegisterdata } from "@/interfaces/auth/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<unknown, IRegisterdata>({
      query: (body) => ({
        url: "/api/users/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginData>({
      query: (body) => ({
        url: "/api/users/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
