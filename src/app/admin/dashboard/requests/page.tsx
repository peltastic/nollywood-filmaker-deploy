"use client";
import { admin_reqs_columns } from "@/components/Columns/admin/AdminRequestsColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectAdmin } from "@/hooks/useProtectAdminRoute";
import { ICustomerRequest } from "@/interfaces/admin/requests/requests";
import { useLazyFetchCustomerRequestQuery } from "@/lib/features/admin/requests/request";
import { primary_socket } from "@/lib/socket";
import { Pagination } from "@mantine/core";
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
  const [activePage, setActivePage] = useState<number>(1);
  const [fetchCustomerRequests, { data, isFetching }] =
    useLazyFetchCustomerRequestQuery();
  const [customerReqData, setCustomerReqData] = useState<ICustomerRequest[]>(
    []
  );

  useEffect(() => {
    setActivePage(1);
    fetchCustomerRequests({
      order: "desc",
      status,
      limit: 10,
      page: 1,
    });
  }, []);

  useEffect(() => {
    if (data) {
      setCustomerReqData(data.requests);
    }
  }, [data]);

  useEffect(() => {
    primary_socket.on("adminNotification", (data) => {
      if (data.title === "New Service Order") {
        setActivePage(1);
        fetchCustomerRequests({
          order: "desc",
          status,
          limit: 10,
          page: 1,
        });
      }
    });
    return () => {
      primary_socket.off("adminNotification");
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
        {data && data.pagination.totalPages > 1 && (
          <Pagination
            total={data.pagination.totalPages}
            value={activePage}
            color="#333333"
            onChange={(val) => {
              fetchCustomerRequests({
                order: "desc",
                status,
                limit: 10,
                page: val,
              });
              setActivePage(val);
            }}
            mt={"xl"}
          />
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminRequests;
