import { IAdminCustomersResponse } from "@/interfaces/admin/customers/customers";
import { adminBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminCustomersApi = createApi({
    reducerPath: "adminCustomersApi",
    baseQuery: adminBaseQueryWithReauth,
    endpoints: (build) => ({
        fetchAllCustomers: build.query<IAdminCustomersResponse, null>({
            query: () =>  `/api/admin/fetch/users`
        })
    })
})

export const {useFetchAllCustomersQuery} = adminCustomersApi