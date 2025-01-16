import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminChatsApi = createApi({
    reducerPath: "adminChatApi",
    baseQuery: adminBaseQueryWithReauth,
    endpoints: (build) => ({
        fetchConversations: build.query<unknown, void>({
            query: () => `/api/admin/appointments/today-requests`
        })
    })
})


export const {useLazyFetchConversationsQuery} = adminChatsApi