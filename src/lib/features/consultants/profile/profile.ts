import { IConsultantProfileResponse, IUpdateConsultantProfilePayload } from "@/interfaces/consultants/profile/profile";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const consultantProfileApi = createApi({
  reducerPath: "consultantProfileApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    getConsultantProfile: build.query<IConsultantProfileResponse, string>({
      query: (id) => `/api/consultants/consultant/${id}`,
    }),
    updateConsultantProfile: build.mutation<
      unknown,
      { body: IUpdateConsultantProfilePayload; id: string }
    >({
      query: ({ body, id }) => ({
        method: "PUT",
        url: `/api/consultants/update/${id}`,
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetConsultantProfileQuery,
  useGetConsultantProfileQuery,
  useUpdateConsultantProfileMutation,
} = consultantProfileApi;
