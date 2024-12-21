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


const DashboardIssues = (props: Props) => {
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <DataTable columns={issues_columns} data={[]} title="Issues" />
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default DashboardIssues;
