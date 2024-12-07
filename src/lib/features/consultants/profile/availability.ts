import { ICreateAvailabilityPayload } from "@/interfaces/consultants/profile/availability";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const availabilityApi = createApi({
  reducerPath: "availabilityApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    editAvailability: build.mutation<
      unknown,
      { schedule: ICreateAvailabilityPayload[] }
    >({
      query: (body) => ({
        url: "/api/consultants/createavailability",
        body,
        method: "POST",
      }),
    }),
    getConsultantAvailability: build.query<{
      availability: ICreateAvailabilityPayload[]
    }, string>({
      query: (id) => `/api/consultants/availability/${id}`,
    }),
  }),
});

export const {
  useEditAvailabilityMutation,
  useGetConsultantAvailabilityQuery,
  useLazyGetConsultantAvailabilityQuery
} = availabilityApi;
