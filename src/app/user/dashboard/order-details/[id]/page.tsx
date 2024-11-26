"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React, { useEffect, useState } from "react";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import OrderDetailsHeader from "@/components/OrderDetails/OrderDetailsHeader";
import OrderDetailsTop from "@/components/OrderDetails/OrderDetailsTop";
import OrderDetailsBody from "@/components/OrderDetails/OrderDetailsBody";
import { useParams, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/Tables/DataTable";
import {
  IResolveFilesColumnData,
  resolve_files_columns,
} from "@/components/Columns/ResolveFilesColumn";
import { useLazyGetCustomerRequestDetailQuery } from "@/lib/features/consultants/dashboard/request";
import OrderDetailsPageSkeleton from "@/components/Skeletons/OrderDetailsPageSkeleton";

type Props = {};

const files_data: IResolveFilesColumnData[] = [
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
  const params = useParams();

  const [getCustomerReqDetails, { isFetching, data }] =
    useLazyGetCustomerRequestDetailQuery();

  const [bodyData, setBodyData] = useState<
    { title: string; content: string }[]
  >([]);

  useEffect(() => {
    if (params.id) {
      getCustomerReqDetails(params.id as string);
    }
  }, [params]);

  useEffect(() => {
    if (data) {
      if (data.request.nameofservice === "Chat With A Professional") {
        setBodyData([
          {
            title: "Conversation title",
            content: data.request.chat_title,
          },
          {
            title: "Quick summary",
            content: data.request.summary,
          },
          {
            title: "Consultant type",
            content: data.request.consultant,
          },
        ]);
      }
    }
  }, [data]);

  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        {isFetching ? (
          <OrderDetailsPageSkeleton />
        ) : (
          <>
            <OrderDetailsHeader status="pending" statusValue="Pending" />
            <div className="w-[90%] lg:w-[82%] mx-auto">
              <OrderDetailsTop
                order_date="2024-06-29 10:21:54"
                order_no="O-NG240629806487"
                order_type="Chat With A Professional"
              />
              <OrderDetailsBody
                chat={
                  data?.request.nameofservice === "Chat With A Professional"
                }
                bodyData={bodyData}
                script="Movie script 2024.pdf"
                title="Mission Impossible"
              />
              <div className="mt-14">
                {downloadPage === "download_files" ? (
                  <DataTable
                    columns={resolve_files_columns}
                    data={files_data}
                    title="Request Resolve Files"
                    faded
                  />
                ) : null}
              </div>
            </div>
          </>
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default OrderDetailsPage;
