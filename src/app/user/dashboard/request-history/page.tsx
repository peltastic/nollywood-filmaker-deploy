"use client"
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import React from "react";

type Props = {};

const RequestHistoryPage = (props: Props) => {
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <div className="mt-8">
          <DataTable
            title="Request History"
            subtitle="Keep track of all your past requests"
            columns={[]}
            // data={reqHistoryData}
            data={[]}
          />
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default RequestHistoryPage;
