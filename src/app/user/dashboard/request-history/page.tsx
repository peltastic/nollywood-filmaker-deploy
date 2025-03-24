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
import { Pagination } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const RequestHistoryPage = (props: Props) => {
  useProtectRoute();
  const [activePage, setActivePage] = useState<number>(1);
  const [reqHistoryData, setReqHistoryData] = useState<ReqHistoryColumnData[]>(
    []
  );
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );

  const [fetchRequestHistory, { data, isSuccess, isFetching }] =
    useLazyFetchUserRequestHistoryQuery();
  useEffect(() => {
    fetchRequestHistory({ userId: userId!, limit: 10 });
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
  }, [isSuccess, data]);

  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <div className="mt-8 px-3 lg:px-0">
          <DataTable
            title="Request History"
            subtitle="Keep track of all your past requests"
            columns={request_history_columns}
            isFetching={isFetching}
            loaderLength={10}
            data={reqHistoryData}
            emptyHeader="No completed requests"
            emptyBody="Any requests you made will show up here."
          />
        </div>
        {data && data.totalItems > 10 && (
          <Pagination
            total={
              data.totalItems % 10
                ? Math.floor(data.totalItems / 10) + 1
                : data.totalItems / 10
            }
            value={activePage}
            color="#333333"
            onChange={(val) => {
              fetchRequestHistory({ userId: userId!, limit: 10, page: val });
              setActivePage(val);
            }}
            mt={"xl"}
          />
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default RequestHistoryPage;
