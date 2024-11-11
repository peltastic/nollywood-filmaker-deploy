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
  }),
});


export const {useLoginConsultantMutation} = consultantAuthApi
