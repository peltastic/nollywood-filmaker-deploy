import { ICompanyOrCrewDataResponse } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const filmmakerDatabaseConsultantApi = createApi({
  reducerPath: "filmmakerDatabaseConsultantApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    getCompanyOrCrewData: build.query<
      ICompanyOrCrewDataResponse,
      {
        type: "crew" | "company";
        roles?: string;
        location?: string;
        companyType?: string;
        department?: string;
      }
    >({
      query: ({ type, location, roles, companyType, department }) => {
        let query = "";
        if (roles) {
          query += `&roles=${roles}`;
        }
        if (department) {
          query += `&department=${department}`;
        }
        if (location) {
          query += `&location=${location}`;
        }
        if (companyType) {
          query += `&typeFilter=${companyType}`;
        }

        return { url: `/api/consultants/fetch-data?type=${type}${query}` };
      },
    }),
  }),
});

export const { useLazyGetCompanyOrCrewDataQuery } =
  filmmakerDatabaseConsultantApi;
