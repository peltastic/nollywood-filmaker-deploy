"use client";
import {
  IAdminReqsData,
  admin_reqs_columns,
} from "@/components/Columns/admin/AdminRequestsColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import React from "react";

type Props = {};

const data: IAdminReqsData[] = [
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    customer: "Jenny Wilson",
    date: "22 Jan 2022",
    email: "w.lawson@example.com",
    rating: 5,
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
];

const AdminRequests = (props: Props) => {
  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <DataTable title="Customer requests" columns={admin_reqs_columns} data={data} />
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminRequests;
