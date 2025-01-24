import config from "@/config/config";
import {
  ILoginData,
  ILoginResponse,
  IRegisterdata,
} from "@/interfaces/auth/auth";
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
    loginAsFilmmaker: builder.mutation<
      {
        token: string
        crewCompany: {
          id: string;
        };
      },
      {
        usernameOrEmail: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/api/join/crewcompany/login",
        body,
        method: "POST",
      }),
    }),
    verifyEmail: builder.query<unknown, string>({
      query: (code) => `/api/users/verify/${code}`,
    }),
    forgotPassword: builder.mutation<unknown, string>({
      query: (email) => ({
        url: "/api/users/forgotpassword",
        method: "POST",
        body: {
          email,
        },
      }),
    }),
    resetPassword: builder.mutation<
      unknown,
      {
        token: string;
        password: string;
      }
    >({
      query: ({ password, token }) => ({
        method: "POST",
        url: `/api/users/resetpassword/${token}`,
        body: {
          newPassword: password,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyVerifyEmailQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLoginAsFilmmakerMutation,
} = authApi;
