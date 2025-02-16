"use client";
import {
  IAdminCustomersColumnData,
  admin_customers_column,
} from "@/components/Columns/admin/CustomersColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectAdmin } from "@/hooks/useProtectAdminRoute";
import {
  useFetchAllCustomersQuery,
  useLazyFetchAllCustomersQuery,
} from "@/lib/features/admin/customers/customers";
import { Pagination } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useState } from "react";

type Props = {};

const AdminCustomersPage = (props: Props) => {
  useProtectAdmin();
  const [activePage, setActivePage] = useState<number>(1);
  const [customerData, setCustomerData] = useState<IAdminCustomersColumnData[]>(
    []
  );
  const [getAllCustomers, { isFetching, data }] =
    useLazyFetchAllCustomersQuery();

  useEffect(() => {
    if (data) {
      const customer_data: IAdminCustomersColumnData[] = data.users.map(
        (el) => {
          return {
            customer: `${el.fname} ${el.lname}`,
            date: moment(el.createdAt).format("ll"),
            email: el.email,
            expertise: el.expertise,
            location: "N/A",
            number: el.phone,
            profilePic: el.profilepics,
            id: el._id,
          };
        }
      );
      setCustomerData(customer_data);
    }
  }, [data]);
  useEffect(() => {
    getAllCustomers({
      limit: 10,
    });
  }, []);

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <div className="py-10 chatbp:py-0 px-2 chatbp:px-0">
          <DataTable
            title="Customers"
            columns={admin_customers_column}
            data={customerData}
            isFetching={isFetching}
            loaderLength={14}
            emptyHeader="No customers"
          />
        </div>
        {data && data.pagination.totalPages > 1 && (
          <Pagination
            total={data.pagination.totalPages}
            value={activePage}
            color="#333333"
            onChange={(val) => {
              getAllCustomers({
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

export default AdminCustomersPage;
