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
          } else if (key === "characterbible") {
            formData.append(key, body[key as keyof typeof body] as File);
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
        const formData = new FormData();
        for (const key in body) {
          if (key === "files") {
            for (const el of body[key as keyof typeof body] as File[]) {
              formData.append(key, el);
            }
          } else {
            formData.append(key, body[key as keyof typeof body] as string);
          }
        }

        return {
          url: "/api/users/transaction/createbudget",
          method: "POST",
          body: formData,
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
    initializeMovieSchedule: build.mutation<
      IServiceResponse,
      InitializeMovieSchedule
    >({
      query: (body) => {
        const formData = new FormData();
        for (const key in body) {
          if (key === "files") {
            for (const el of body[key as keyof typeof body] as File[]) {
              formData.append(key, el);
            }
          } else if (
            key === "characterlockdate" ||
            key === "locationlockeddate"
          ) {
            formData.append(key, JSON.stringify(body[key]));
          } else if (key === "startpop") {
            formData.append(key, JSON.stringify(body[key]));
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
    initializeCreateTeaser: build.mutation<IServiceResponse, InitializeCreateTeasers>({
      query: (body) => ({
        url: "/api/users/film-trailer",
        method: "POST",
        body
      })
    }),
    initializeCreateAPitchDeck: build.mutation<
      IServiceResponse,
      InitializeCreateAPitchDeck
    >({
      query: (data) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value)) {
            if (key === "files") {
              // Append files under the same key "file" without stringifying
              value.forEach((file: File) => {
                formData.append("files", file);
              });
            } else if (key === "keyart") {
              value.forEach((file: File) => {
                formData.append("keyart", file);
              });
              
            } else {
              // Stringify other arrays (keycharacters, keycrew, teamMenber)
              formData.append(key, JSON.stringify(value));
            }
          } else {
            // Handle simple fields (strings or boolean)
            formData.append(key, String(value)); // Convert boolean or string to string
          }
        }
        return {
          url: "/api/users/transaction/deck",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useInitializeReadMyScriptMutation,
  useInitializeWatchFinalCutMutation,
  useInitializeBudgetAndAdviceMutation,
  useInitializeCreateProductionBudgetMutation,
  useInitializeCreateMarketingBudgetMutation,
  useInitializeMovieScheduleMutation,
  useInitializeDraftLegalDocumentMutation,
  useInitializeCreateAPitchDeckMutation,
  useInitializeCreateTeaserMutation
} = servicesApi;
