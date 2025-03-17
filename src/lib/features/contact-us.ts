import config from "@/config/config";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IContactUs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  agreedToPrivacyPolicy: true;
}

export const contactUsApi = createApi({
  reducerPath: "createApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    contactUs: builder.mutation<any, IContactUs>({
      query: (body) => ({ url: `/api/users/contacted`, method: "POST", body }),
    }),
  }),
});

export const { useContactUsMutation } = contactUsApi;
