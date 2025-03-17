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
  department?: string[];
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
  password?: string;
  confirmPassword?: string;
  username?: string;

  // userId?: string;
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
  // cacNumber?: string;
  file?: File | null;
  doc?: File | null;
  password?: string;
  confirmPassword?: string;
  username?: string;
  // userId?: string;
  cacdoc?: File | null;
}

export interface ICompanyDataResponse {
  company: {
    location: {
      address: string;
      city: string;
      state: string;
      country: string;
    };
    _id: string;
    name: string;
    email: string;
    mobile: string;
    website: string;
    bio: string;
    propic: string;
    type: string;
    clientele: {
      title: string;
      link: string;
      year: string;
      _id: string;
    }[];
    useRateCard: boolean;
    rateCard: string;
    fee: string;
    verificationDocType: string;
    document: string;
    idNumber: string;
    cacNumber: string;
    badgelink: string;
  };
}

export interface ICrewDataResponse {
  crew: {
    location: {
      address: string;
      city: string;
      state: string;
      country: string;
    };
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    dob: string;
    bio: string;
    propic: string;
    department: string[];
    role: string[];
    badgelink: string;
    works: {
      title: string;
      role: string;
      link: string;
      year: string;
      _id: string;
    }[];

    fee: string;
  };
}

export interface IEditCrewPayload {
  userId: string;
  // firstName?: string;
  // lastName?: string;
  // mobile?: string;
  bio?: string;
  role?: string[];
  department?: string[];
  works?: {
    title: string;
    role: string;
    link: string;
    year: string;
  }[];
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
}

export interface IEditCompanyPayload {
  userId?: string;
  mobile?: string;
  website?: string;
  bio?: string;
  clientele?: {
    title: string;
    link: string;
    year: string;
  }[];
  type?: string;
  useRateCard?: string;
  rateCard?: File | null;
  fee?: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
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
    createCrewOrCompany: build.mutation<
      {
        crewCompany: {
          id: string;
        };
      },
      { username: string; email: string; password: string }
    >({
      query: (body) => ({
        url: `/api/join/crewcompany`,
        method: "POST",
        body,
      }),
    }),
    fetchCompanyData: build.query<ICompanyDataResponse, string>({
      query: (id) => `/api/join/company/${id}`,
    }),
    fetchCrewData: build.query<ICrewDataResponse, string>({
      query: (id) => `/api/join/crew/${id}`,
    }),
    editCrew: build.mutation<unknown, IEditCrewPayload>({
      query: (body) => {
        const token = sessionStorage.getItem("filmmaker_token");
        return {
          url: "/api/join/update-crew",
          body,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    editCompany: build.mutation<unknown, IEditCompanyPayload>({
      query: (data) => {
        const formData = new FormData();
        const body = appendToFormData(formData, data);
        const token = sessionStorage.getItem("filmmaker_token");
        return {
          url: "/api/join/company/update",
          body,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    forgotDatabasePassword: build.mutation<unknown, string>({
      query: (email) => ({
        url: "/api/join/forgotpassword",
        method: "POST",
        body: {
          email,
        },
      }),
    }),
    resetDatabasePassword: build.mutation<
      unknown,
      { token: string; newPassword: string }
    >({
      query: ({ token, newPassword }) => ({
        url: `/api/join/resetpassword/${token}`,
        method: "POST",
        body: {
          newPassword,
        },
      }),
    }),
  }),
});

export const {
  useJoinCrewMutation,
  useJoinCompanyMutation,
  useCreateCrewOrCompanyMutation,
  useLazyFetchCompanyDataQuery,
  useLazyFetchCrewDataQuery,
  useEditCrewMutation,
  useEditCompanyMutation,
  useResetDatabasePasswordMutation,
  useForgotDatabasePasswordMutation,
} = filmmakerDatabaseApi;
