import config from "@/config/config";
import { getCookie, setAdminToken, setConsultantToken, setTokenCookie } from "@/utils/storage";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setAuthStatus } from "./slices/authSlice";
import { setLogoutType } from "./slices/logoutSlice";
import { setConsultantAuthStatus } from "./slices/consultants/authSlice";
import { setAdminAuthStatus } from "./slices/admin/authSlice";
import { setAdminLogoutType } from "./slices/admin/logoutSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  prepareHeaders(headers) {
    const token = getCookie("token");
    if (!token || token === "undefined") {
      return headers;
    }
    headers.set("authorization", `Bearer ${token}`);
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const token = getCookie("token");
  const refreshToken = getCookie("refresh");

  if (!token || token === "undefined") {
    if (!refreshToken || refreshToken === "undefined") {
      api.dispatch(setLogoutType("expired"));
      api.dispatch(setAuthStatus("LOGGED_OUT"));
    }
    const refreshResult: any = await baseQuery(
      {
        url: "/api/users/user/getaccess",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions
    );
    if (refreshResult.error && refreshResult.error.status === 401) {
      api.dispatch(setLogoutType("expired"));
      api.dispatch(setAuthStatus("LOGGED_OUT"));
    }
    setTokenCookie(refreshResult.data?.accessToken);
    result = await baseQuery(args, api, extraOptions);
  }
  //   if (result.error && result.error.status === 401) {
  //     // try to get a new token
  //     const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
  //     if (refreshResult.data) {
  //       // store the new token
  //       api.dispatch(tokenReceived(refreshResult.data))
  //       // retry the initial query
  //       result = await baseQuery(args, api, extraOptions)
  //     } else {
  //       api.dispatch(loggedOut())
  //     }
  //   }
  return result;
};

export const consultantBaseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  prepareHeaders(headers) {
    const token = getCookie("con_token");
    if (!token || token === "undefined") {
      return headers;
    }
    headers.set("authorization", `Bearer ${token}`);
  },
});

export const consultantBaseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await consultantBaseQuery(args, api, extraOptions);
  const token = getCookie("con_token");
  const refreshToken = getCookie("con_refresh");
  if (!token || token === "undefined") {
    if (!refreshToken || refreshToken === "undefined" ) {
      // api.dispatch(setLogoutType("expired"));
      api.dispatch(setConsultantAuthStatus("LOGGED_OUT"));
    }
    const refreshResult: any = await consultantBaseQuery(
      {
        url: "/api/consultants/consultant/getaccess",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions
    );
    if (refreshResult.error && refreshResult.error.status === 401) {
      // api.dispatch(setLogoutType("expired"));
      api.dispatch(setConsultantAuthStatus("LOGGED_OUT"));
    }
    setConsultantToken(refreshResult.data?.accessToken);
    result = await consultantBaseQuery(args, api, extraOptions);
  }

  return result;
};

export const adminBaseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  prepareHeaders(headers) {
    const token = getCookie("ad_token")
    if (!token || token === "undefined") {
      return headers
    }
    headers.set("authorization", `Bearer ${token}`)
  }
})

export const adminBaseQueryWithReauth:  BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await adminBaseQuery(args, api, extraOptions)
  const token = getCookie("ad_token")
  const refresh_token = getCookie("ad_refresh")
  if (!token || token === "undefined") {
    if (!refresh_token || refresh_token === "undefined") {
      api.dispatch(setAdminAuthStatus("LOGGED_OUT"))
      api.dispatch(setAdminLogoutType("expired"))
    }
    const refreshResult: any = await adminBaseQuery(
      {
        url: "/api/admin/admin/getaccess",
        headers: {
          Authorization: `Bearer ${refresh_token}`
        }
      },
      api,
      extraOptions
    )
    if (refreshResult.error && refreshResult.error.status === 401) {
      api.dispatch(setAdminLogoutType("expired"));
      api.dispatch(setAdminAuthStatus("LOGGED_OUT"));
    }
    setAdminToken(refreshResult.data?.accessToken)
    result = await adminBaseQuery(args, api, extraOptions)
  }
  return result
}