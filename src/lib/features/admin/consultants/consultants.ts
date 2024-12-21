import { IAdminConsultantResponse } from "@/interfaces/admin/consultants/consultants";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminConsultantApi = createApi({
    reducerPath: "adminConsultantApi",
    baseQuery: adminBaseQueryWithReauth,
    endpoints: (build) => ({
        fetchAllConsultant: build.query<IAdminConsultantResponse, null>({
            query: () => `/api/admin/pull/consultants`
        })
    })
})


export const {useFetchAllConsultantQuery} = adminConsultantApi