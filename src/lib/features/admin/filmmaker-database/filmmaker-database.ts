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
        fee?: string;
        limit?: number;
        name?: string;
        page?: number;
        verified: boolean;
      }
    >({
      query: ({
        type,
        location,
        roles,
        companyType,
        department,
        verified,
        fee,
        limit,
        page,
        name,
      }) => {
        let query = ``;
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
          query += `&fee=${fee === "5m+" ? "5m%2B" : fee}`;
        }
        if (type) {
          query += `&type=${type}`;
        }

        if (name) {
          query += `&name=${name}`;
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
          url: `/api/admin/join/fetchdata?verified=${verified}${query}`,
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
    documentVerificationCrew: build.mutation<
      unknown,
      { id: string; apiVetting: boolean }
    >({
      query: ({ id, apiVetting }) => {
        return {
          url: `/api/admin/crew/apiVetting/${id}`,
          method: "PATCH",
          body: {
            apiVetting,
          },
        };
      },
    }),
    finalCrewVerificationCrew: build.mutation<
      unknown,
      {
        id: string;
        verified: boolean;
      }
    >({
      query: ({ id, verified }) => {
        return {
          url: `/api/admin/crew/verify/${id}`,
          method: "PATCH",
          body: {
            verified,
          },
        };
      },
    }),
    documentVerificationCompany: build.mutation<
      unknown,
      { id: string; apiVetting: boolean }
    >({
      query: ({ id, apiVetting }) => {
        return {
          url: `/api/admin/company/apiVetting/${id}`,
          method: "PATCH",
          body: {
            apiVetting,
          },
        };
      },
    }),
    finalCrewVerificationCompany: build.mutation<
      unknown,
      {
        id: string;
        verified: boolean;
      }
    >({
      query: ({ id, verified }) => {
        return {
          url: `/api/admin/company/verify/${id}`,
          method: "PATCH",
          body: {
            verified,
          },
        };
      },
    }),
  }),
});

export const {
  useLazyFetchCompanyorCrewQuery,
  useDeleteCrewCompanyMutation,
  useDocumentVerificationCompanyMutation,
  useDocumentVerificationCrewMutation,
  useFinalCrewVerificationCompanyMutation,
  useFinalCrewVerificationCrewMutation,
} = adminFilmakerDatabaseApi;
