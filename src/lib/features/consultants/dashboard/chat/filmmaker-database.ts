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
        fee?: string;
        limit?: number;
        page?: number;
      }
    >({
      query: ({
        type,
        location,
        roles,
        companyType,
        department,
        fee,
        limit,
        page,
      }) => {
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
        if (fee) {
          query += `&fee=${fee}`;
        }

        if (limit) {
          query += `&limit=${limit}`;
        }
        if (page) {
          query += `&page=${page}`;
        }

        if (companyType) {
          query += `&typeFilter=${companyType}`;
        }

        return {
          url: `/api/consultants/fetch-data?type=${type}${query}&verified=true`,
        };
      },
    }),
  }),
});

export const { useLazyGetCompanyOrCrewDataQuery } =
  filmmakerDatabaseConsultantApi;
