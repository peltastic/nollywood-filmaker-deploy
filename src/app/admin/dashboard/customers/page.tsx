"use client";
import {
  IAdminCustomersColumnData,
  admin_customers_column,
} from "@/components/Columns/admin/CustomersColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useFetchAllCustomersQuery } from "@/lib/features/admin/customers/customers";
import moment from "moment";
import React, { useEffect, useState } from "react";

type Props = {};

const AdminCustomersPage = (props: Props) => {
  const [customerData, setCustomerData] = useState<IAdminCustomersColumnData[]>(
    []
  );
  const { isError, isFetching, isSuccess, data } = useFetchAllCustomersQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
    }
  );

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
            profilePic: el.profilepics
          };
        }
      );
      setCustomerData(customer_data);
    }
  }, [data]);

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
          />
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminCustomersPage;
