import config from "@/config/config";
import { IAdminLoginResponse, ILoginData} from "@/interfaces/auth/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAuthApi = createApi({
  reducerPath: "adminAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<IAdminLoginResponse, ILoginData>({
      query: (body) => ({
        url: "/api/admin/login",
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useLoginAdminMutation } = adminAuthApi;
