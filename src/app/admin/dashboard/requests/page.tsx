"use client";
import { admin_reqs_columns } from "@/components/Columns/admin/AdminRequestsColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectAdmin } from "@/hooks/useProtectAdminRoute";
import { ICustomerRequest } from "@/interfaces/admin/requests/requests";
import { useLazyFetchCustomerRequestQuery } from "@/lib/features/admin/requests/request";
import { chat_socket, primary_socket } from "@/lib/socket";
import React, { useEffect, useState } from "react";

type Props = {};
const dropdowndata = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Ongoing",
    value: "ongoing",
  },
  {
    label: "Ready",
    value: "ready",
  },
  {
    label: "Completed",
    value: "completed",
  },
];

const AdminRequests = (props: Props) => {
  useProtectAdmin();
  const [status, setStatus] = useState<string>("pending");
  const [fetchCustomerRequests, { data, isFetching }] =
    useLazyFetchCustomerRequestQuery();
  const [customerReqData, setCustomerReqData] = useState<ICustomerRequest[]>(
    []
  );

  useEffect(() => {
    fetchCustomerRequests({
      order: "desc",
      status,
    });
  }, []);

  useEffect(() => {
    if (data) {
      setCustomerReqData(data.requests);
    }
  }, [data]);

  useEffect(() => {
    chat_socket.on("adminNotification", () => {
      fetchCustomerRequests({
        order: "desc",
        status,
      });
    });
    return () => {
      chat_socket.off("adminNotification");
    };
  }, []);

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <DataTable
          isFetching={isFetching}
          loaderLength={10}
          title="Customer requests"
          columns={admin_reqs_columns}
          dropdownDefaultVal={status}
          dropdownValue={status}
          dropdownFilter
          updateDropdownData={(val) => {
            setStatus(val);
            fetchCustomerRequests({
              order: "desc",
              status: val,
            });
          }}
          dropdowndata={dropdowndata}
          data={customerReqData}
          emptyHeader="No requests"
        />
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminRequests;
