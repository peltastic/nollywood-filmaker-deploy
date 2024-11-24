"use client";
import { admin_reqs_columns } from "@/components/Columns/admin/AdminRequestsColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { ICustomerRequest } from "@/interfaces/admin/requests/requests";
import { useLazyFetchCustomerRequestQuery } from "@/lib/features/admin/requests/request";
import React, { useEffect, useState } from "react";

type Props = {};

const AdminRequests = (props: Props) => {
  const [fetchCustomerRequests, { data, isFetching }] =
    useLazyFetchCustomerRequestQuery();
  const [customerReqData, setCustomerReqData] = useState<ICustomerRequest[]>(
    []
  );

  useEffect(() => {
    fetchCustomerRequests({
      order: "desc",
    });
  }, []);

  useEffect(() => {
    if (data) {
      setCustomerReqData(data.requests);
    }
  }, [data]);

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <DataTable
          isFetching={isFetching}
          loaderLength={10}
          title="Customer requests"
          columns={admin_reqs_columns}
          data={customerReqData}
        />
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminRequests;
