import { IServiceToChatPayload } from "@/interfaces/consultants/dashboard/resolve";
import { baseQuery, consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const resolveApi = createApi({
  reducerPath: "resolveApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    uploadResolveFiles: build.mutation<
      unknown,
      {
        orderId: string;
        files: File[];
      }
    >({
      query: ({ orderId, files }) => {
        const body = new FormData();
        for (const el of files) {
          body.append("files", el);
        }
        body.append("orderId", orderId);
        return {
          url: "/api/consultants/resolve-files",
          method: "POST",
          body,
        };
      },
    }),
    changeServiceToChat: build.mutation<unknown, IServiceToChatPayload>({
      query: (body) => ({
        url: "/api/consultants/newchat",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useUploadResolveFilesMutation, useChangeServiceToChatMutation } =
  resolveApi;
