"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React from "react";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import OrderDetailsHeader from "@/components/OrderDetails/OrderDetailsHeader";
import OrderDetailsTop from "@/components/OrderDetails/OrderDetailsTop";
import OrderDetailsBody from "@/components/OrderDetails/OrderDetailsBody";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/Tables/DataTable";
import {
  IResolveFilesColumnData,
  resolve_files_columns,
} from "@/components/Columns/ResolveFilesColumn";

type Props = {};

const data: IResolveFilesColumnData[] = [
  {
    date: "Today",
    last_updated: "Today",
    name: "Production Budget 1.pdf",
    size: "200 KB",
    uploaded_by: "Admin",
  },
  {
    date: "Today",
    last_updated: "Today",
    name: "Production Budget 2.pdf",
    size: "720 KB",
    uploaded_by: "Admin",
  },
  {
    date: "Today",
    last_updated: "Today",
    name: "Budget Guidelines.docx",
    size: "400 KB",
    uploaded_by: "Admin",
  },
];

const OrderDetailsPage = (props: Props) => {
  const search = useSearchParams();
  const downloadPage = search.get("page_type");
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <OrderDetailsHeader status="pending" statusValue="Pending" />
        <div className="w-[82%] mx-auto">
          <OrderDetailsTop
            order_date="2024-06-29 10:21:54"
            order_no="O-NG240629806487"
            order_type="Watch the final cut of my film"
          />
          <OrderDetailsBody
            bodyData={[
              {
                title: "Platform for exhibition",
                content: "Cinema",
              },
              {
                title: "Key actors in mind",
                content: "I’ll defer to your expertise on this",
              },
              {
                title: "Key Crew in mind",
                content: "I’ll defer to your expertise on this",
              },
              {
                title: "Number of days",
                content: "125",
              },
              {
                title: "Relevant information",
                content: "I’ll defer to your expertise on this",
              },
              {
                title: "Budget Range",
                content: "20,000,000 - 80,000,000",
              },
            ]}
            script="Movie script 2024.pdf"
            title="Mission Impossible"
          />
          <div className="mt-14">
            {downloadPage === "download_files" ? (
              <DataTable
                columns={resolve_files_columns}
                data={data}
                title="Request Resolve Files"
                faded
              />
            ) : null}
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default OrderDetailsPage;
