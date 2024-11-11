import { IEditAvailabilityPayload } from "@/interfaces/consultants/profile/profile";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const availabilityApi = createApi({
    reducerPath: "availabilityApi",
    baseQuery: consultantBaseQueryWithReauth,
    endpoints: (build) => ({
        editAvailability: build.mutation<unknown, IEditAvailabilityPayload[]>({
            query: (body) => ({
                url: "/api/consultants/createavailability",
                body,
                method: "POST"
            })
        })
    })
})


export const {useEditAvailabilityMutation} = availabilityApi