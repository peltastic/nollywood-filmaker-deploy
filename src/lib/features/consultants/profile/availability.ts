import { ICreateAvailabilityPayload, ICreateAvailabilityPayloadV2 } from "@/interfaces/consultants/profile/availability";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const availabilityApi = createApi({
  reducerPath: "availabilityApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    editAvailability: build.mutation<
      unknown,
      { schedule: ICreateAvailabilityPayloadV2[] }
    >({
      query: (body) => ({
        url: "/api/consultants/createavailability",
        body,
        method: "POST",
      }),
    }),
    getConsultantAvailability: build.query<{
      availability: ICreateAvailabilityPayloadV2[]
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
