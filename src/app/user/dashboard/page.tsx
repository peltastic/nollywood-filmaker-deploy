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
import { useFetchActiveRequestsQuery } from "@/lib/features/users/dashboard/requests/requests";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {};

const reqHistoryData: ReqHistoryColumnData[] = [
  {
    name: "Mikolo",
    date: "22 Jan 2022",
    progress: 100,
    rating: 5,
    service_type: "Read my script",
    status: "Completed",
  },
  {
    name: "Jagun Jagun",
    date: "22 Jan 2022",
    progress: 100,
    rating: 5,
    service_type: "Watch the Final cut of my film",
    status: "Completed",
  },
  {
    name: "Criminal",
    date: "22 Jan 2022",
    progress: 100,
    rating: 5,
    service_type: "Create a production Budget",
    status: "Completed",
  },
];

const DashboardHomePgae = (props: Props) => {
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

  useEffect(() => {
    if (data) {
      const formattedData = data.request.map((el) => {
        return {
          name: el.movie_title,
          date: moment(el.date).format("ll"),
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
          <div className="mt-14">
            <DataTable
              title="Request History"
              subtitle="Keep track of all your past requests"
              columns={request_history_columns}
              // data={reqHistoryData}
              data={[]}
            />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default DashboardHomePgae;
