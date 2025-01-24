import { ICompanyOrCrewDataResponse } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const filmmakerDatabaseConsultantApi = createApi({
  reducerPath: "filmmakerDatabaseConsultantApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    getCompanyOrCrewData: build.query<
      ICompanyOrCrewDataResponse,
      "crew" | "company"
    >({
      query: (type) => `/api/consultants/fetch-data?type=${type}`,
    }),
  }),
});

export const { useLazyGetCompanyOrCrewDataQuery } =
  filmmakerDatabaseConsultantApi;
