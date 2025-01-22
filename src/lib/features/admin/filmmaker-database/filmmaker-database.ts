import { ICompanyOrCrewDataResponse } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import build from "next/dist/build";

export const adminFilmakerDatabaseApi = createApi({
  reducerPath: "adminFilmakerDatabaseApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchCompanyorCrew: build.query<
      ICompanyOrCrewDataResponse,
      "crew" | "company"
    >({
      query: (type) => `/api/admin/join/fetchdata?type=${type}`,
    }),
  }),
});

export const { useLazyFetchCompanyorCrewQuery } = adminFilmakerDatabaseApi;
