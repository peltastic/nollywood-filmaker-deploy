"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import MenuComponent from "@/components/Menu/MenuComponent";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import classes from "@/app/styles/Admin.module.css";
import DashboardInfoCard from "@/components/Dashboard/DashboardInfoCard";
import Bar from "@/components/Charts/Bar";
import { DataTable } from "@/components/Tables/DataTable";
import {
  IConsultantActiveRequestColumnData,
  consultant_active_requests_columns,
} from "@/components/Columns/consultants/ActiveRequestsColumn";
import {
  ReqHistoryColumnData,
  request_history_column,
} from "@/components/Columns/consultants/RequestHistoryColumn";
import ConsultantDeleteAndEditMenu from "@/components/Admin/ConsultantDeleteAndEditMenu";
import {
  useLazyFetchConsultantActiveRequestQuery,
  useLazyFetchConsultantOverviewQuery,
  useLazyFetchConsultantRequestHistoryQuery,
} from "@/lib/features/admin/consultants/consultants";
import UserProfileSkeleton from "@/components/Skeletons/UserProfileSkeleton";
import moment from "moment";
import { IOverviewData } from "../../page";
import { numberWithCommas } from "@/utils/helperFunction";
import DashboardStatsSkeleton from "@/components/Skeletons/DashboardStatsSkeleton";
import { Skeleton } from "@mantine/core";
import {
  ICustomerActiveReqData,
  customer_active_request_column,
} from "@/components/Columns/admin/CustomersActiveRequestColum";
import {
  IAdminRequestHistory,
  admin_customer_request_history_column,
} from "@/components/Columns/admin/RequestHistory";

type Props = {};

const active_req_table_data: IConsultantActiveRequestColumnData[] = [
  // {
  //   customer: "Jenny Wilson",
  //   date: "22 Jan 2022",
  //   email: "w.lawson@example.com",
  //   script: "Mikolo",
  //   service_type: "Read my script",
  //   status: "Ready",
  // },
  // {
  //   customer: "Devon Lane",
  //   date: "26 Jan 2022",
  //   email: "dat.roberts@example.com",
  //   script: "Jagun Jagun",
  //   service_type: "Watch the Final cut of my film",
  //   status: "Ongoing",
  // },
  // {
  //   customer: "Jane Cooper",
  //   date: "18 Jan 2022",
  //   email: "jgraham@example.com",
  //   script: "Criminal",
  //   service_type: "Create a production Budget",
  //   status: "Pending",
  // },
];

// const reqHistory: ReqHistoryColumnData[] = [
//   {
//     customer: "Jenny Wilson",
//     date: "22 Jan 2022",
//     email: "w.lawson@example.com",
//     script: "Mikolo",
//     service_type: "Read my script",
//     status: "Completed",
//     rating: 5,
//   },
//   {
//     customer: "Devon Lane",
//     date: "26 Jan 2022",
//     email: "dat.roberts@example.com",
//     script: "Jagun Jagun",
//     service_type: "Watch the Final cut of my film",
//     status: "Completed",
//     rating: 4,
//   },
//   {
//     customer: "Jane Cooper",
//     date: "18 Jan 2022",
//     email: "jgraham@example.com",
//     script: "Criminal",
//     service_type: "Create a production Budget",
//     status: "Completed",
//     rating: 3,
//   },
// ];

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
const ConsultantDetailsPage = (props: Props) => {
  const [activeReqData, setActiveReqData] = useState<ICustomerActiveReqData[]>(
    []
  );
  const [reqHistoryData, setReqHistoryData] = useState<IAdminRequestHistory[]>(
    []
  );
  const [overviewData, setOverviewData] = useState<IOverviewData[]>([
    {
      title: "all-time revenue",
      value: "0",
      percentage: 0,
      change: "increase",
      id: "1",
    },
    {
      title: "all-time pending revenue",
      value: "0",
      percentage: 0,
      change: "increase",
      id: "4",
    },
    {
      title: "all-time claimed revenue",
      value: "0",
      percentage: 0,
      change: "increase",
      id: "2",
    },
  ]);
  const router = useRouter();
  const [fetchConsultantActiveReq, activeReq] =
    useLazyFetchConsultantActiveRequestQuery();
  const [fetchConsultantReqHistory, reqHistory] =
    useLazyFetchConsultantRequestHistoryQuery();
  const [fetchConsultantOverview, { data, isFetching }] =
    useLazyFetchConsultantOverviewQuery();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      fetchConsultantActiveReq(params.id);
      fetchConsultantOverview(params.id);
      fetchConsultantReqHistory(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (data) {
      setOverviewData([
        {
          title: "all-time revenue",
          value: `₦ ${numberWithCommas(data.alltimerev)}`,
          percentage: 0,
          change: "increase",
          id: "1",
        },
        {
          title: "all-time pending revenue",
          value: `₦ ${numberWithCommas(data.alltimependingrev)}`,
          percentage: 0,
          change: "increase",
          id: "4",
        },
        {
          title: "all-time claimed revenue",
          value: `₦ ${numberWithCommas(data.alltimeclaimedrev)}`,
          percentage: 0,
          change: "increase",
          id: "2",
        },
      ]);
    }
  }, [data]);
  useEffect(() => {
    if (reqHistory.data) {
      const refined_data: IAdminRequestHistory[] =
        reqHistory.data.completedRequests.map((el) => {
          return {
            date_created: moment(el.request.createdAt).format("ll"),
            orderId: el.request.orderId,
            progress:
              el.request.stattusof === "completed"
                ? 100
                : el.request.stattusof === "ongoing"
                ? 50
                : el.request.stattusof === "pending"
                ? 25
                : el.request.stattusof === "awaiting"
                ? 40
                : 100,
            rating: 5,
            service_name: el.request.movie_title || el.request.chat_title || "",
            service_type: el.request.nameofservice,
            status: el.request.stattusof,
          };
        });
      setReqHistoryData(refined_data);
    }
  }, [reqHistory.data]);

  useEffect(() => {
    if (activeReq.data) {
      const refined_data: ICustomerActiveReqData[] =
        activeReq.data.requests.map((el) => {
          return {
            date: moment(el.request.createdAt).format("ll"),
            orderId: el.orderId,
            progress:
              el.request.stattusof === "completed"
                ? 100
                : el.request.stattusof === "ongoing"
                ? 50
                : el.request.stattusof === "pending"
                ? 25
                : el.request.stattusof === "awaiting"
                ? 40
                : 100,
            service_name: el.request.movie_title || el.request.chat_title || "",
            service_type: el.request.nameofservice,
            status: el.request.stattusof,
          };
        });
      setActiveReqData(refined_data);
    }
  }, [activeReq.data]);
  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <div className="px-8 chatbp:px-0 py-10 chatbp:py-0">
          <header className="mb-[5rem]">
            <div className="flex flex-wrap items-center w-full md:w-auto text-[1.5rem] mr-auto">
              <div className="flex items-center mr-auto w-full sm:w-auto">
                <div
                  onClick={() => router.back()}
                  className=" hover:bg-gray-bg-3 w-fit mr-3 md:mr-8 transition-all cursor-pointer px-0 sm:px-1 py-1 rounded-md"
                >
                  <IoIosArrowBack className="text-gray-4 " />
                </div>
                <h1 className="text-black-2 font-bold ">Profile Details</h1>
              </div>
              <MenuComponent
                target={
                  <div className="flex mt-6 sm:mt-0">
                    <UnstyledButton class=" ml-auto px-4 py-3 rounded-md items-center bg-black-3 text-white flex">
                      <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                      <IoIosArrowDown className="text-sm ml-2" />
                    </UnstyledButton>
                  </div>
                }
              >
                <ConsultantDeleteAndEditMenu />
              </MenuComponent>
            </div>
          </header>
          <section className="mt-8 grid xl:grid-cols-2 gap-x-6">
            {isFetching ? (
              <UserProfileSkeleton />
            ) : (
              <div
                className={`relative ${classes.InfoBg} h-fit md:h-[25rem] xl:h-auto w-full rounded-xl px-10 md:px-0 py-16 md:py-0`}
              >
                {data && (
                  <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <div className="flex items-center flex-wrap md:flex-nowrap">
                      <div className=" text-center md:mr-20 mx-auto md:mx-0 mb-20 md:mb-0">
                        <div className="w-[8.8rem] h-[8.8rem] bg-white font-bold rounded-full flex items-center justify-center text-[3.5rem]">
                          {data.consultant.fname[0]} {data.consultant.lname[0]}
                        </div>
                        <div className="text-[0.75rem] mx-auto mt-3 px-3 py-1 rounded-full w-fit bg-light-green text-dark-green flex items-center">
                          <GoDotFill className="mr-1 text-[#22C55E]" />
                          <p>Active</p>
                        </div>
                      </div>
                      <div className="grid w-full md:w-[15rem] chatbp:w-[20rem] text-white xs:grid-cols-2 text-[0.88rem]">
                        <div className="">
                          <p className="font-medium">Name</p>
                          <p>
                            {data.consultant.fname} {data.consultant.lname}
                          </p>
                        </div>
                        <div className="mt-8 xs:mt-0">
                          <p className="font-medium">Email</p>
                          <p>{data.consultant.email}</p>
                        </div>
                        <div className="mt-8">
                          <p className="font-medium">Joined</p>
                          <p>
                            {moment(data.consultant.createdAt).format("ll")}
                          </p>
                        </div>
                        <div className="mt-8">
                          <p className="font-medium">Phone</p>
                          <p>{data.consultant.phone}</p>
                        </div>
                        <div className="mt-8">
                          <p className="font-medium">Location</p>
                          <p>
                            {data.consultant.location?.state ||
                            data.consultant.location?.country
                              ? `${data.consultant.location?.state} ${data.consultant.location?.country}`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="mt-8 xl:mt-0">
              <DashboardPlate title="Overview">
                <div className="grid md:grid-cols-2 mt-6 mb-4 gap-6">
                  {isFetching ? (
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
                          percentage={el.percentage}
                          title={el.title}
                          value={el.value}
                          change={el.change}
                          key={el.id}
                        />
                      ))}
                    </>
                  )}
                </div>
              </DashboardPlate>
            </div>
          </section>
          <div
            className={`mt-14 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]`}
          >
            <div className="py-4 border-b border-b-stroke-6">
              <h1 className="font-medium text-[1.13rem]">Skills</h1>
            </div>
            <div className="grid-cols-6 grid mt-8 gap-x-6 gap-y-6">
              {isFetching ? (
                <>
                  <Skeleton height={60} />
                  <Skeleton height={60} />
                  <Skeleton height={60} />
                  <Skeleton height={60} />
                  <Skeleton height={60} />
                  <Skeleton height={60} />
                </>
              ) : (
                <>
                  {data?.consultant.expertise.map((el) => (
                    <div
                      className={
                        "border border-stroke-2 transition-all cursor-pointer text-[0.88rem] font-medium  flex items-center justify-center rounded-md  text-black-2 px-[3rem] h-[3.62rem]"
                      }
                      key={el}
                    >
                      {el}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="mt-16 ">
            <DashboardPlate
              title="Your earnings"
              link="/consultants/dashboard/commissions-withdrawals"
              showMoreBtnContent="See more"
            >
              <section className="flex flex-wrap lg:flex-nowrap mt-8 gap-x-10">
                <div className="w-full lg:w-[30%] space-y-10">
                  {overviewData.map((el) => (
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

          <div className="mt-10">
            <DataTable
              title="Active requests"
              data={activeReqData}
              isFetching={activeReq.isFetching}
              emptyHeader="No active requests"
              emptyBody="Customer has no active requests."
              columns={customer_active_request_column}
              loaderLength={10}
            />
          </div>
          <div className="mt-10">
            <DataTable
              title="Request history"
              isFetching={reqHistory.isFetching}
              loaderLength={10}
              subtitle="Keep track of customer's past requests"
              data={reqHistoryData}
              emptyHeader="No completed requests"
              emptyBody="Customer has no completed requests"
              columns={admin_customer_request_history_column}
            />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ConsultantDetailsPage;
