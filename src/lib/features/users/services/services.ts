import { baseQueryWithReauth } from "@/lib/baseQuery";
import { formDataHandler } from "@/utils/helperFunction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    initializeReadMyScript: build.mutation<
      IServiceResponse,
      InitializeReadMyScriptPayload
    >({
      query: (body) => {
        const payload = formDataHandler(body);
        return {
          url: "/api/users/transaction/read",
          method: "POST",
          body: payload,
        };
      },
    }),
    initializeWatchFinalCut: build.mutation<
      IServiceResponse,
      InitialWatchFinalCutPayload
    >({
      query: (body) => {
        return {
          url: "/api/users/transaction/watch",
          method: "POST",
          body,
        };
      },
    }),
    initializeBudgetAndAdvice: build.mutation<
      IServiceResponse,
      InitializeBudgetAndAdvicePayload
    >({
      query: (body) => {
        const payload = formDataHandler(body);
        return {
          url: "/api/users/transaction/budget",
          method: "POST",
          body: payload,
        };
      },
    }),
    initializeCreateProductionBudget: build.mutation<
      IServiceResponse,
      InitializeCreateProductionBudgetPayload
    >({
      query: (body) => {
        const payload = formDataHandler(body);
        return {
          url: "/api/users/transaction/createbudget",
          method: "POST",
          body: payload,
        };
      },
    }),
    initializeCreateMarketingBudget: build.mutation<
      IServiceResponse,
      InitializeCreateMartketingBudgetPayload
    >({
      query: (body) => ({
        url: "/api/users/transaction/marketbudget",
        method: "POST",
        body,
      }),
    }),
    initializeCreatePitch: build.mutation<
      IServiceResponse,
      InitializeCreatePitchPayload
    >({
      query: (body) => {
        const payload = formDataHandler(body);
        return {
          url: "/api/users/transaction/pitch",
          method: "POST",
          body: payload,
        };
      },
    }),
    initializeDraftLegalDocument: build.mutation<
      IServiceResponse,
      InitializaeDraftLegalDocument
    >({
      query: (body) => ({
        url: "/api/users/transaction/legal",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useInitializeReadMyScriptMutation,
  useInitializeWatchFinalCutMutation,
  useInitializeBudgetAndAdviceMutation,
  useInitializeCreateProductionBudgetMutation,
  useInitializeCreateMarketingBudgetMutation,
  useInitializeCreatePitchMutation,
  useInitializeDraftLegalDocumentMutation
} = servicesApi;
