"use client";
import {
  IAdminCustomersColumnData,
  admin_customers_column,
} from "@/components/Columns/admin/CustomersColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import React from "react";

type Props = {};

const AdminCustomersPage = (props: Props) => {
  const customers: IAdminCustomersColumnData[] = [
    {
      customer: "Jenny Wilson",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Davon Lane",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Jane Cooper",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Jenny Wilson",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Davon Lane",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Jane Cooper",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Jenny Wilson",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Davon Lane",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Jane Cooper",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Jenny Wilson",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Davon Lane",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      customer: "Jane Cooper",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
  ];
  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <div className="py-10 chatbp:py-0 px-2 chatbp:px-0">
          <DataTable
            title="Customers"
            columns={admin_customers_column}
            data={customers}
          />
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminCustomersPage;
