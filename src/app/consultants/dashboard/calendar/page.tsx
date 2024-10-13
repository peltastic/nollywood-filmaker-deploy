"use client";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import Scheduler from "@/components/Scheduler/Scheduler";
import React, { useState } from "react";

type Props = {};

const ConsultantCalendarPage = (props: Props) => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        <DashboardPlate title="Calendar">
          <Scheduler
            setValue={(val) => setCurrentDay(val)}
            value={currentDay}
          />
        </DashboardPlate>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ConsultantCalendarPage;
