import config from "@/config/config";
import { IGetCalendarAppointmentResponse } from "@/interfaces/consultants/calendar/calendar";
import { consultantBaseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
export const calendarApi = createApi({
  reducerPath: "calendarApi",
  baseQuery: consultantBaseQueryWithReauth,
  endpoints: (build) => ({
    fetchCalendarAppointments: build.query<
      { appointments: IGetCalendarAppointmentResponse[] },
      string
    >({
      query: (id) => `/api/consultants/appointments/${id}`,
    }),
  }),
});


export const {useLazyFetchCalendarAppointmentsQuery} = calendarApi