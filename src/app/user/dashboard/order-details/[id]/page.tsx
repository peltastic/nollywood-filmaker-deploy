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
import moment from "moment";

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
                order_date={data?.request.date}
                order_no="O-NG240629806487"
                order_type={data?.request.nameofservice}
              />
              <OrderDetailsBody
                chat={
                  data?.request.nameofservice === "Chat With A Professional"
                }
                concerns={data?.request.concerns}
                consultant_type={data?.request.consultant}
                genre={data?.request.genre}
                platform={data?.request.platform}
                synopsis={data?.request.synopsis}
                summary={data?.request.summary}
                script={
                  data?.request.nameofservice === "Read my Script and advice" ||
                  data?.request.nameofservice ===
                    "Look at my Budget and advice" ||
                  data?.request.nameofservice ===
                    "Create a Production budget" ||
                  data?.request.nameofservice ===
                    "Create a Pitch based on my Script"
                    ? data?.request.filename
                    : null
                }
                fileLink={data?.request.files && data.request.files[0]}
                title={data?.request.movie_title}
                link={data?.request.link}
                chat_title={data?.request.chat_title}
                actors={data?.request.actors}
                budget={data?.request.budgetrange}
                days={data?.request.days}
                info={data?.request.info}
                ooh={data?.request.oohTarget}
                target_social={data?.request.socialTarget}
                visual={data?.request.visualStyle}
                company={data?.request.productionCompany}
                contact_info={data?.request.contactInfo}
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
