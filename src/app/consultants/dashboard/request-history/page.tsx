"use client";
import {
  ReqHistoryColumnData,
  request_history_column,
} from "@/components/Columns/consultants/RequestHistoryColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectRouteConsultantRoute } from "@/hooks/useProtectConsultantRoute";
import { useLazyFetchReqHistoryQuery } from "@/lib/features/consultants/dashboard/request";
import { RootState } from "@/lib/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

const reqHistoryData: ReqHistoryColumnData[] = [
  {
    script: "Mikolo",
    date: "22 Jan 2022",
    customer: "Jenny Wilson",
    email: "w.lawson@example.com",
    type: "consultant",
    rating: 5,
    service_type: "Read my script",
    status: "Completed",
  },
  {
    script: "Jagun Jagun",
    date: "22 Jan 2022",
    customer: "Jenny Wilson",
    email: "w.lawson@example.com",
    type: "consultant",
    rating: 5,
    service_type: "Watch the Final cut of my film",
    status: "Completed",
  },
  {
    script: "Criminal",
    date: "22 Jan 2022",
    customer: "Jenny Wilson",
    email: "w.lawson@example.com",
    type: "consultant",
    rating: 5,
    service_type: "Create a production Budget",
    status: "Completed",
  },
  {
    script: "Mikolo",
    date: "22 Jan 2022",
    customer: "Jenny Wilson",
    email: "w.lawson@example.com",
    type: "consultant",
    rating: 5,
    service_type: "Read my script",
    status: "Completed",
  },
  {
    script: "Jagun Jagun",
    date: "22 Jan 2022",
    customer: "Jenny Wilson",
    email: "w.lawson@example.com",
    type: "consultant",
    rating: 5,
    service_type: "Watch the Final cut of my film",
    status: "Completed",
  },
  {
    script: "Criminal",
    date: "22 Jan 2022",
    customer: "Jenny Wilson",
    email: "w.lawson@example.com",
    type: "consultant",
    rating: 5,
    service_type: "Create a production Budget",
    status: "Completed",
  },
  {
    script: "Mikolo",
    date: "22 Jan 2022",
    customer: "Jenny Wilson",
    email: "w.lawson@example.com",
    type: "consultant",
    rating: 5,
    service_type: "Read my script",
    status: "Completed",
  },
  {
    script: "Jagun Jagun",
    date: "22 Jan 2022",
    customer: "Jenny Wilson",
    email: "w.lawson@example.com",
    type: "consultant",
    rating: 5,
    service_type: "Watch the Final cut of my film",
    status: "Completed",
  },
  {
    script: "Criminal",
    date: "22 Jan 2022",
    customer: "Jenny Wilson",
    email: "w.lawson@example.com",
    type: "consultant",
    rating: 5,
    service_type: "Create a production Budget",
    status: "Completed",
  },
];

const RequestHistoryPage = (props: Props) => {
  useProtectRouteConsultantRoute();
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
  const [fetchReqHistory, { isSuccess, data }] = useLazyFetchReqHistoryQuery();

  useEffect(() => {
    fetchReqHistory(consultantId!);
  }, []);


  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        <div className="px-4 chatbp:px-0 py-4 chatbp:py-0">
          <DataTable
            title="Requst History"
            subtitle="Keep track of all your past requests"
            data={[]}
            columns={request_history_column}
          />
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default RequestHistoryPage;
