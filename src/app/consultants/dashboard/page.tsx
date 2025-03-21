"use client";
import Bar from "@/components/Charts/Bar";
import {
  IConsultantActiveRequestColumnData,
  consultant_active_requests_columns,
} from "@/components/Columns/consultants/ActiveRequestsColumn";
import {
  ReqHistoryColumnData,
  request_history_column,
} from "@/components/Columns/consultants/RequestHistoryColumn";
import DashboardInfoCard from "@/components/Dashboard/DashboardInfoCard";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import Header from "@/components/Dashboard/Header";
import UpcomingConversations from "@/components/Dashboard/UpcomingConversations";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import DashboardStatsSkeleton from "@/components/Skeletons/DashboardStatsSkeleton";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectRouteConsultantRoute } from "@/hooks/useProtectConsultantRoute";
import {
  useGetActiveRequestQuery,
  useLazyFetchDashboardStatsQuery,
  useLazyFetchReqHistoryQuery,
  useLazyGetServiceRequestsQuery,
} from "@/lib/features/consultants/dashboard/request";
import { RootState } from "@/lib/store";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

export interface IOverviewData {
  change?: "increase" | "decrease";
  title: string;
  value: string;
  percentage: number;
  id: string;
}

const dashboard_data: {
  change?: "increase" | "decrease";
  title: string;
  value: string;
  percentage: number;
  id: string;
}[] = [
  {
    change: "increase",
    percentage: 36,
    title: "Accepted Requests",
    value: "0",
    id: "1",
  },
  {
    change: "decrease",
    percentage: 14,
    title: "Rejected Requests",
    value: "0",
    id: "2",
  },
  {
    change: "increase",
    percentage: 36,
    title: "Completed Requests",
    value: "0",
    id: "3",
  },
  {
    change: "increase",
    percentage: 36,
    title: "Conversations held",
    value: "0",
    id: "4",
  },
];

const plate_data: {
  change?: "increase" | "decrease";
  title: string;
  value: string;
  percentage: number;
  id: string;
}[] = [
  {
    title: "all-time revenue",
    value: "0",
    percentage: 36,
    change: "increase",
    id: "1",
  },
  {
    title: "all-time pending revenue",
    value: "0",
    percentage: 14,
    change: "decrease",
    id: "2",
  },
  {
    title: "all-time claimed revenue",
    value: "0",
    percentage: 36,
    change: "increase",
    id: "3",
  },
];

const bar_chart_data = [
  { month: "Jan", value: 25000 },
  { month: "Feb", value: 7000 },
  { month: "Mar", value: 17000 },
  { month: "Apr", value: 8000 },
  { month: "May", value: 11000 },
  { month: "Jun", value: 2000 },
  { month: "Jul", value: 8000 },
  { month: "Aug", value: 22000 },
  { month: "Sep", value: 12000 },
  { month: "Oct", value: 12000 },
  { month: "Nov", value: 12000 },
  { month: "Dec", value: 11000 },
];

const DashboardPage = (props: Props) => {
  useProtectRouteConsultantRoute();
  const [overviewData, setOverviewData] = useState<IOverviewData[]>([
    {
      change: "increase",
      percentage: 0,
      title: "Assigned Requests",
      value: "0",
      id: "1",
    },
    {
      change: "increase",
      percentage: 0,
      title: "Completed Requests",
      value: "0",
      id: "3",
    },
    {
      change: "increase",
      percentage: 0,
      title: "Conversations held",
      value: "0",
      id: "4",
    },
  ]);
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );

  const userData = useSelector(
    (state: RootState) => state.persistedState.consultant.user
  );
  const [activeReqData, setActiveReqData] = useState<
    IConsultantActiveRequestColumnData[]
  >([]);
  const [serviceReqData, setServiceReqData] = useState<
    IConsultantActiveRequestColumnData[]
  >([]);

  const result = useGetActiveRequestQuery(consultantId!, {
    refetchOnMountOrArgChange: true,
  });
  const [reqHistoryData, setReqHistoryData] = useState<ReqHistoryColumnData[]>(
    []
  );

  const [fetchDashboardStat, res] = useLazyFetchDashboardStatsQuery();

  const [getReqHistory, req_history] = useLazyFetchReqHistoryQuery();

  const [fetchServiceReq, serviceReq] = useLazyGetServiceRequestsQuery();

  useEffect(() => {
    fetchServiceReq(consultantId!);
  }, []);

  useEffect(() => {
    if (consultantId) {
      fetchDashboardStat(consultantId);
    }
  }, []);

  useEffect(() => {
 if (res.data) {
  setOverviewData([
    {
      change: "increase",
      percentage: 0,
      title: "Assigned Requests",
      value: res.data.assigned.toString(),
      id: "1",
    },
    {
      change: "increase",
      percentage: 0,
      title: "Completed Requests",
      value: res.data.completed.toString(),
      id: "3",
    },
    {
      change: "increase",
      percentage: 0,
      title: "Conversations held",
      value: res.data.conversations.toString(),
      id: "4",
    },
  ])
 }
  }, [res])

  useEffect(() => {
    if (consultantId) {
      getReqHistory({
        id: consultantId,
        limit: 5,
      });
    }
  }, []);

  useEffect(() => {
    if (req_history.data) {
      const transformed_data: ReqHistoryColumnData[] =
        req_history.data.completedRequests.map((el) => {
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
      setReqHistoryData([]);
    }
  }, [req_history.data]);

  useEffect(() => {
    if (result.isSuccess) {
      if (result.data.appointments) {
        const resData: IConsultantActiveRequestColumnData[] =
          result.data.appointments.map((el) => {
            return {
              customer: `${el.user.fname} ${el.user.lname}`,
              date: moment(el.date).format("LL"),
              email: el.user.email,
              script: el.request.chat_title || el.request.movie_title,
              service_type: el.request.nameofservice,
              status: el.request.stattusof,
              profilepic: el.user.profilepics,
              orderId: el.orderId,
              type: "Chat",
              creation_date: el.creationDate,
              booktime: el.request.booktime,
              endTime: el.request.endTime
            };
          });
        setActiveReqData(resData);
      } else {
        setActiveReqData([]);
      }
    }
  }, [result.isSuccess]);

  useEffect(() => {
    if (serviceReq.isSuccess) {
      if (serviceReq.data.tasks) {
        const resData: IConsultantActiveRequestColumnData[] =
          serviceReq.data.tasks.map((el) => {
            return {
              customer: `${el.user_info.fname} ${el.user_info.lname}`,
              date: moment(el.date).format("LL"),
              email: `${el.user_info.email}`,
              profilepic: `${el.user_info.profilepics}`,
              script: el.movie_title,
              service_type: el.nameofservice,
              status: el.status,
              orderId: el.orderId,
              type: "service",
              creation_date: el.creationDate,
            };
          });
        setServiceReqData(resData);
      }
    }
  }, [serviceReq.isSuccess]);
  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        <div className="px-4 xs:px-6 chatbp:px-0">
          <Header
            fname={userData?.fname || ""}
            lname={userData?.lname || ""}
            ppicture={userData?.profilepics}
            consultant
          />
          <div className="mt-16">
            <DashboardPlate title="Overview">
              <section className="flex flex-wrap lg:flex-nowrap gap-x-6 py-8">
                <div className="w-full lg:w-[50%] mid:grid-cols-2 grid gap-6">
                {res.isFetching ? (
                  <>
                    <DashboardStatsSkeleton />
                    <DashboardStatsSkeleton />
                    <DashboardStatsSkeleton />
                    <DashboardStatsSkeleton />
                  </>
                ) : (
                  <>
                    {overviewData.map((el) => (
                      <DashboardInfoCard
                        key={el.id}
                        percentage={el.percentage}
                        title={el.title}
                        value={el.value}
                        change={el.change}
                      />
                    ))}
                  </>
                )}
                </div>
                <div className="mt-10 lg:mt-0 w-full lg:w-[50%]">
                  <UpcomingConversations
                    data={
                      [
                        // {
                        //   name: "Jenny Wilson",
                        //   email: "w.lawson@example.com",
                        //   date: "Today",
                        //   time: "12:00pm",
                        //   id: "1",
                        // },
                        // {
                        //   name: "Jenny Wilson",
                        //   email: "w.lawson@example.com",
                        //   date: "Tomorrow",
                        //   time: "12:00pm",
                        //   id: "2",
                        // },
                      ]
                    }
                  />
                </div>
              </section>
            </DashboardPlate>
          </div>
          <div className="mt-16">
            <DataTable
              title="Active Chat Requests"
              columns={consultant_active_requests_columns}
              data={activeReqData}
              isFetching={result.isFetching}
              loaderLength={5}
              emptyHeader="You have no active chat requests"
              emptyBody="Any requests you have made will show up here."
            />
          </div>
          <div className="mt-16">
            <DataTable
              title="Active Service Requests"
              columns={consultant_active_requests_columns}
              data={serviceReqData}
              isFetching={serviceReq.isFetching}
              loaderLength={5}
              emptyHeader="You have no active service requests"
              emptyBody="Any requests you have made will show up here."
            />
          </div>
          <div className="mt-16">
            <DataTable
              title="Request History"
              isFetching={req_history.isFetching}
              columns={request_history_column}
              data={reqHistoryData}
              loaderLength={5}
              showMoreBtnContent="See All"
              link="/consultants/dashboard/request-history"
              emptyHeader="No completed requests"
              emptyBody="Any requests you made will show up here."
            />
          </div>
        </div>
        <div className="mt-16 px-6 chatbp:px-0">
          <DashboardPlate
            title="Your earnings"
            link="/consultants/dashboard/commissions-withdrawals"
            showMoreBtnContent="See more"
          >
            <section className="flex flex-wrap lg:flex-nowrap mt-8 gap-x-10">
              <div className="w-full lg:w-[30%] space-y-10">
                {plate_data.map((el) => (
                  <DashboardInfoCard
                    key={el.id}
                    percentage={el.percentage}
                    title={el.title}
                    value={el.value}
                    change={el.change}
                  />
                ))}
              </div>
              <div className="w-full mt-8 lg:mt-0 lg:w-[70%] border border-stroke-10 px-6 py-10 flex items-center rounded-lg">
                <Bar
                  chart_data={bar_chart_data}
                  chart_series={[
                    {
                      name: "value",
                      color: "#22C55E",
                    },
                  ]}
                />
              </div>
            </section>
          </DashboardPlate>
        </div>
        {/* <div className="mt-16 px-6 chatbp:px-0">
          <DataTable
            showMoreBtnContent="See all"
            link="/consultants/dashboard/request-history"
            title="Request History"
            subtitle="Keep track of all your past requests"
            columns={request_history_column}
            data={reqHistory}
          />
        </div> */}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default DashboardPage;
