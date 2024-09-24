"use client";
import {
  IssuesColumnData,
  issues_columns,
} from "@/components/Columns/IssuesColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import React from "react";
import Img1 from "/public/assets/dashboard/issues-img-1.png";
import Img2 from "/public/assets/dashboard/issues-img-2.png";

type Props = {};

const data: IssuesColumnData[] = [
  {
    customer: "Jenny Wilson",
    date_created: "22 Jan 2022",
    email: "w.lawson@example.com",
    image: Img1,
    service_body:
      "Hello, admin. I have dropped all the informatioon that was requested of me and have been in communication with the assigned consultant. Unfortunately, it seems this person doesn’t know what to do and instead of passing me oveert o someone who would, they’vr been draggibng their feety.",
    service_name: "My consultant is slow",
    status: "Pending",
  },
  {
    customer: "Devon Lane",
    date_created: "26 Feb 2022",
    email: "dat.roberts@example.com",
    image: Img2,
    service_body:
      "Hello, admin. I have dropped all the informatioon that was requested of me and have been in communication with the assigned consultant. Unfortunately, it seems this person doesn’t know what to do and instead of passing me oveert o someone who would, they’vr been draggibng their feety.",
    service_name: "My consultant is slow",
    status: "Pending",
  },
  {
    customer: "Jane Cooper",
    date_created: "26 Feb 2022",
    email: "jgraham@example.com",
    image: Img2,
    service_body:
      "Hello, admin. I have dropped all the informatioon that was requested of me and have been in communication with the assigned consultant. Unfortunately, it seems this person doesn’t know what to do and instead of passing me oveert o someone who would, they’vr been draggibng their feety.",
    service_name: "My consultant is slow",
    status: "Pending",
  },
];
const DashboardIssues = (props: Props) => {
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <DataTable columns={issues_columns} data={data} title="Issues" />
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default DashboardIssues;
