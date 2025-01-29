import { ICompanyOrCrewDataResponse } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminFilmakerDatabaseApi = createApi({
  reducerPath: "adminFilmakerDatabaseApi",
  baseQuery: adminBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchCompanyorCrew: build.query<
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
        return {
          url: `/api/admin/join/fetchdata?type=${type}${query}`,
        };
      },
    }),
    deleteCrewCompany: build.mutation<unknown, string>({
      query: (id) => {
        return {
          url: `/api/admin/crew-company/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useLazyFetchCompanyorCrewQuery, useDeleteCrewCompanyMutation } =
  adminFilmakerDatabaseApi;
