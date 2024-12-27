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
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const RequestHistoryPage = (props: Props) => {
  useProtectRouteConsultantRoute();
  const [reqHistoryData, setReqHistoryData] = useState<ReqHistoryColumnData[]>(
    []
  );
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
  const [fetchReqHistory, { isSuccess, data, isFetching }] =
    useLazyFetchReqHistoryQuery();

  useEffect(() => {
    if (consultantId) {
      fetchReqHistory({
        id: consultantId,
        limit: 10,
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      const transformed_data: ReqHistoryColumnData[] =
        data.completedRequests.map((el) => {
          return {
            customer: `${el.userInfo.fname} ${el.userInfo.lname}`,
            date: moment(el.request.createdAt).format("ll"),
            email: el.userInfo.email,
            rating: 5,
            script: el.request.chat_title || el.request.movie_title,
            service_type: el.request.nameofservice,
            status: el.request.stattusof,
            type: "consultant",
            profilepics: el.userInfo.profilepics,
            orderId: el.request.orderId,
          };
        });
      setReqHistoryData(transformed_data);
    } else {
      setReqHistoryData([])
    }
  }, [data]);

  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        <div className="px-4 chatbp:px-0 py-4 chatbp:py-0">
          <DataTable
            title="Request History"
            subtitle="Keep track of all your past requests"
            data={reqHistoryData}
            loaderLength={10}
            isFetching={isFetching}
            columns={request_history_column}
          />
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default RequestHistoryPage;
