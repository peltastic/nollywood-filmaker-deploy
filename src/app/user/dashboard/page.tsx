"use client";
import Header from "@/components/Dashboard/Header";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/Tables/DataTable";
import {
  IActiveRequestColumnData,
  active_requests_columns,
} from "@/components/Columns/ActiveRequestsColumn";
import {
  request_history_columns,
  ReqHistoryColumnData,
} from "@/components/Columns/RequestHistoryColumns";
import moment from "moment";
import {
  useFetchActiveRequestsQuery,
  useLazyFetchUserRequestHistoryQuery,
} from "@/lib/features/users/dashboard/requests/requests";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useSearchParams } from "next/navigation";

type Props = {};

const DashboardHomePgae = (props: Props) => {
  useProtectRoute()
  const [reqHistoryData, setReqHistoryData] = useState<ReqHistoryColumnData[]>(
    []
  );
  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );

  useProtectRoute();
  const [activeReqData, setActiveReqData] = useState<
    IActiveRequestColumnData[]
  >([]);
  const { data, isFetching } = useFetchActiveRequestsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );


  const [fetchRequestHistory, result] = useLazyFetchUserRequestHistoryQuery();




  useEffect(() => {
    if (data) {
      const formattedData = data.requests.map((el) => {
        return {
          name: el.movie_title,
          date: moment(el.createdAt).format("ll"),
          status: el.stattusof,
          service_type: el.nameofservice,
          chat_title: el.chat_title,
          orderId: el.orderId,
          progress:
            el.stattusof === "completed"
              ? 100
              : el.stattusof === "ongoing"
              ? 50
              : el.stattusof === "pending"
              ? 25
              : 100,
        };
      });
      setActiveReqData(formattedData);
    }
  }, [data]);

  useEffect(() => {
    fetchRequestHistory({ userId: userId!, limit: 5 });
  }, []);

  useEffect(() => {
    if (result.isSuccess) {
      const modData: ReqHistoryColumnData[] = result.data.requests.map((el) => {
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
  }, [result.isSuccess]);
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <div className="px-4 xs:px-8 chatbp:px-0">
          <Header
            fname={userData?.fname || ""}
            lname={userData?.lname || ""}
            ppicture={userData?.profilepics}
          />

          <div className="mt-14">
            <DataTable
              title="Active requests"
              columns={active_requests_columns}
              data={activeReqData}
              loaderLength={4}
              isFetching={isFetching}
            />
          </div>
          <div className="mt-14" >
            <DataTable
              link="/user/dashboard/request-history"
              showMoreBtnContent="See All"
              title="Request History"
              subtitle="Keep track of all your past requests"
              columns={request_history_columns}
              isFetching={result.isFetching}
              loaderLength={5}
              data={reqHistoryData}
            />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default DashboardHomePgae;
