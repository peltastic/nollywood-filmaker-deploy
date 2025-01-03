import config from "@/config/config";
import { appendToFormData } from "@/utils/helperFunction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IJoinCrew {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  dob?: string;
  bio?: string;
  file?: File | null;
  department?: string;
  role?: string[];
  works?: {
    title: string;
    role: string;
    link: string;
    year: string;
  }[];
  fee?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  verificationDocType?: string;
  doc?: File | null;
  idNumber?: string;
}

export interface IJoinCompany {
  name?: string;
  email?: string;
  mobile?: string;
  website?: string;
  bio?: string;
  type?: string;
  clientele?: { title: string; link: string; year: string }[];

  useRateCard?: boolean | null;
  rateCard?: File | null;
  fee?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  verificationDocType?: string;
  idNumber?: string;
  cacNumber?: string;
  file?: File | null;
  doc?: File | null;
}

export const filmmakerDatabaseApi = createApi({
  reducerPath: "filmmaker-database",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (build) => ({
    joinCrew: build.mutation<unknown, IJoinCrew>({
      query: (data) => {
        const formData = new FormData();
        const body = appendToFormData(formData, data);
        return {
          url: "/api/join/crew",
          method: "POST",
          body,
        };
      },
    }),
    joinCompany: build.mutation<unknown, IJoinCompany>({
      query: (data) => {
        const formData = new FormData();
        const body = appendToFormData(formData, data);
        return {
          url: "/api/join/company",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useJoinCrewMutation, useJoinCompanyMutation } = filmmakerDatabaseApi;
