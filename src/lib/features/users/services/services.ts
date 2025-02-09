import { baseQueryWithReauth } from "@/lib/baseQuery";
import { appendToFormData, formDataHandler } from "@/utils/helperFunction";
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
        const formData = new FormData();
        for (const key in body) {
          if (key === "files") {
            for (const el of body[key as keyof typeof body] as File[]) {
              formData.append(key, el);
            }
          } else if (key === "pageCount") {
            formData.append(
              key,
              JSON.stringify(body[key as keyof typeof body] as number[])
            );
          } else {
            formData.append(key, body[key as keyof typeof body] as string);
          }
        }


        return {
          url: "/api/users/transaction/read",
          method: "POST",
          body: formData,
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
        const formData = new FormData();
        for (const key in body) {
          if (key === "files") {
            for (const el of body[key as keyof typeof body] as File[]) {
              formData.append(key, el);
            }
          } else if (key === "pageCount") {
            formData.append(
              key,
              JSON.stringify(body[key as keyof typeof body] as number[])
            );
          } else {
            formData.append(key, body[key as keyof typeof body] as string);
          }
        }

        return {
          url: "/api/users/transaction/pitch",
          method: "POST",
          body: formData,
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
  useInitializeDraftLegalDocumentMutation,
} = servicesApi;
