"use client";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import Scheduler from "@/components/Scheduler/Scheduler";
import CalendarSkeleton from "@/components/Skeletons/CalendarSkeleton";
import { useLazyFetchCalendarAppointmentsQuery } from "@/lib/features/consultants/calendar/calendar";
import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const ConsultantCalendarPage = (props: Props) => {
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [fetchCalendarAppointments, { isFetching, data }] =
    useLazyFetchCalendarAppointmentsQuery();

  useEffect(() => {
    if (consultantId) {
      fetchCalendarAppointments(consultantId);
    }
  }, []);
  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        <DashboardPlate title="Calendar">
          {isFetching ? (
            <CalendarSkeleton />
          ) : (
            <>
              {data && (
                <Scheduler
                  data={data?.appointments.map((el) => {
                    return {
                      date: el.date,
                      time: el.time,
                    };
                  })}
                  setValue={(val) => setCurrentDay(val)}
                  value={currentDay}
                />
              )}
            </>
          )}
        </DashboardPlate>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ConsultantCalendarPage;
