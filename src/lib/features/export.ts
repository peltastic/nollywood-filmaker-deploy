import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exportChatApi = createApi({
  reducerPath: "exportChatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    exportChat: builder.query<any, string>({
      query: (id) => ({
     url:   `/api/chat/exportpdf/${id}`,
     responseHandler: async (response) => {
        const blob = await response.blob()
        return blob
     }

      }),
    }),
  }),
});

export const { useLazyExportChatQuery } = exportChatApi;
