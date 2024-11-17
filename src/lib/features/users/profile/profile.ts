import {
  IGetUserProfileResponse,
  IUpdateUserPreference,
  IUpdateUserProfilePayload,
  IUserPreferencesDataResponse,
} from "@/interfaces/profile/profile";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { formDataHandler } from "@/utils/helperFunction";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    fetchUserProfileData: build.query<IGetUserProfileResponse, string>({
      query: (id) => `/api/users/profile-user/${id}`,
    }),
    updateUserProfile: build.mutation<
      unknown,
      {
        body: IUpdateUserProfilePayload;
        id: string;
      }
    >({
      query: ({ id, body }) => ({
        url: `/api/users/updateuser/${id}`,
        method: "POST",
        body,
      }),
    }),
    updatePassword: build.mutation<
      unknown,
      { currentPassword: string; newPassword: string; id: string }
    >({
      query: ({ currentPassword, id, newPassword }) => ({
        url: `/api/users/updatepassword/${id}`,
        method: "POST",
        body: {
          currentPassword,
          newPassword,
        },
      }),
    }),
    updateProfilePic: build.mutation<
      unknown,
      {
        id: string;
        file: File | null;
      }
    >({
      query: ({ id, file }) => {
        const formData = new FormData();
        if (file) {
          formData.append("file", file);
        }
        return {
          url: `/api/users/updatepic/${id}`,
          method: "POST",
          body: formData,
        };
      },
    }),
    fetchUserProfilePic: build.query<unknown, string>({
      query: (id) => `/api/users/propic/${id}`,
    }),
    updateUserPreferences: build.mutation<
      unknown,
      { body: IUpdateUserPreference; id: string }
    >({
      query: ({ body, id }) => ({
        url: `/api/users/update-pref/${id}`,
        method: "POST",
        body,
      }),
    }),
    fetchUserPreferences: build.query<IUserPreferencesDataResponse, string>({
      query: (id) => `/api/users/user-pref/${id}`,
    }),
  }),
});

export const {
  useFetchUserProfileDataQuery,
  useLazyFetchUserProfileDataQuery,
  useUpdateUserProfileMutation,
  useUpdatePasswordMutation,
  useUpdateProfilePicMutation,
  useFetchUserProfilePicQuery,
  useUpdateUserPreferencesMutation,
  useFetchUserPreferencesQuery
} = profileApi;
