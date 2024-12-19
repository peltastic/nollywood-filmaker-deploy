"use client";
import {
  ReqHistoryColumnData,
  request_history_columns,
} from "@/components/Columns/RequestHistoryColumns";

import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useLazyFetchUserRequestHistoryQuery } from "@/lib/features/users/dashboard/requests/requests";
import { RootState } from "@/lib/store";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const RequestHistoryPage = (props: Props) => {
  useProtectRoute()
  const [reqHistoryData, setReqHistoryData] = useState<ReqHistoryColumnData[]>(
    []
  );
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );

  useProtectRoute();
  const [fetchRequestHistory, { data, isSuccess, isFetching }] =
    useLazyFetchUserRequestHistoryQuery();
  useEffect(() => {
    fetchRequestHistory({ userId: userId! });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const modData: ReqHistoryColumnData[] = data.requests.map((el) => {
        return {
          date: moment(el.createdAt).format("ll"),
          name: el.movie_title || el.chat_title,
          progress: 100,
          rating: 5,
          service_type: el.nameofservice,
          status: el.stattusof,
          orderId: el.orderId,
        };
      });
      setReqHistoryData(modData);
    }
  }, [isSuccess]);

  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <div className="mt-8">
          <DataTable
            title="Request History"
            subtitle="Keep track of all your past requests"
            columns={request_history_columns}
            isFetching={isFetching}
            loaderLength={10}
            data={reqHistoryData}
          />
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default RequestHistoryPage;
