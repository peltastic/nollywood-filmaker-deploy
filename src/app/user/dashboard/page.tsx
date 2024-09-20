"use client";
import Header from "@/components/Dashboard/Header";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React from "react";
import { DataTable } from "@/components/Tables/DataTable";
import {
  IActiveRequestColumnData,
  active_requests_columns,
} from "@/components/Columns/ActiveRequestsColumn";
import {
  request_history_columns,
  ReqHistoryColumnData,
} from "@/components/Columns/RequestHistoryColumns";

type Props = {};

const active_req: IActiveRequestColumnData[] = [
  {
    name: "Mikolo",
    date: "22 Jan 2022",
    progress: 100,

    service_type: "Read my script",
    status: "Ready",
  },
  {
    name: "Jagun Jagun",
    date: "22 Jan 2022",
    progress: 60,
    service_type: "Watch the Final cut of my film",
    status: "Ongoing",
  },
  {
    name: "Criminal",
    date: "22 Jan 2022",
    progress: 42,

    service_type: "Create a production Budget",
    status: "Ongoing",
  },
];

const reqHistoryData: ReqHistoryColumnData[] = [
  {
    name: "Mikolo",
    date: "22 Jan 2022",
    progress: 100,
    rating: 5,
    service_type: "Read my script",
    status: "Completed",
  },
  {
    name: "Jagun Jagun",
    date: "22 Jan 2022",
    progress: 100,
    rating: 5,
    service_type: "Watch the Final cut of my film",
    status: "Completed",
  },
  {
    name: "Criminal",
    date: "22 Jan 2022",
    progress: 100,
    rating: 5,
    service_type: "Create a production Budget",
    status: "Completed",
  },
];

const DashboardHomePgae = (props: Props) => {
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <Header />

        <div className="mt-14">
          <DataTable
            title="Active requests"
            columns={active_requests_columns}
            data={active_req}
          />
        </div>
        <div className="mt-14">
          <DataTable
            title="Request History"
            subtitle="Keep track of all your past requests"
            columns={request_history_columns}
            // data={reqHistoryData}
            data={[]}
          />
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default DashboardHomePgae;
