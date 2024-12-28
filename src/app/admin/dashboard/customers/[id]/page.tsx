"use client";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import classes from "@/app/styles/Admin.module.css";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import DashboardInfoCard from "@/components/Dashboard/DashboardInfoCard";
import { GoDotFill } from "react-icons/go";
import { DataTable } from "@/components/Tables/DataTable";
import {
  ICustomerActiveReqData,
  customer_active_request_column,
} from "@/components/Columns/admin/CustomersActiveRequestColum";
import {
  IAdminRequestHistory,
  admin_customer_request_history_column,
} from "@/components/Columns/admin/RequestHistory";
import {
  useLazyFetchUserActiveRequestQuery,
  useLazyFetchUserOverviewQuery,
  useLazyFetchUserRequestHistoryQuery,
} from "@/lib/features/admin/customers/customers";
import UserProfileSkeleton from "@/components/Skeletons/UserProfileSkeleton";
import Image from "next/image";
import { AspectRatio, Skeleton } from "@mantine/core";
import moment from "moment";
import { IOverviewData } from "../../page";
import { numberWithCommas } from "@/utils/helperFunction";
import DashboardStatsSkeleton from "@/components/Skeletons/DashboardStatsSkeleton";

type Props = {};

const CustomerDetailsPage = (props: Props) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [activeReqData, setActiveReqData] = useState<ICustomerActiveReqData[]>(
    []
  );
  const [reqHistoryData, setReqHistoryData] = useState<IAdminRequestHistory[]>(
    []
  );

  const [overviewData, setOverviewData] = useState<IOverviewData[]>([
    {
      title: "Requests created",
      value: "0",
      percentage: 36,
      change: "increase",
      id: "1",
    },
    {
      title: "Chats created",
      value: "0",
      percentage: 36,
      change: "increase",
      id: "4",
    },
    {
      title: "Total spent",
      value: "0",
      percentage: 14,
      change: "increase",
      id: "2",
    },
    {
      title: "Average rating",
      value: "0",
      percentage: 36,
      change: "increase",
      id: "3",
    },
  ]);

  const [fetchUserActiveReq, activeReq] = useLazyFetchUserActiveRequestQuery();
  const [fetchUserReqHistory, reqHistory] =
    useLazyFetchUserRequestHistoryQuery();
  const [fetchOverview, { data, isFetching }] = useLazyFetchUserOverviewQuery();

  useEffect(() => {
    if (activeReq.data) {
      const refined_data: ICustomerActiveReqData[] =
        activeReq.data.requests.map((el) => {
          return {
            date: moment(el.createdAt).format("ll"),
            orderId: el.orderId,
            progress:
              el.stattusof === "completed"
                ? 100
                : el.stattusof === "ongoing"
                ? 50
                : el.stattusof === "pending"
                ? 25
                : el.stattusof === "awaiting"
                ? 40
                : 100,
            service_name: el.movie_title || el.chat_title || "",
            service_type: el.nameofservice,
            status: el.stattusof,
          };
        });
      setActiveReqData(refined_data);
    }
  }, [activeReq.data]);
  useEffect(() => {
    if (reqHistory.data) {
      const refined_data: IAdminRequestHistory[] = reqHistory.data.requests.map(
        (el) => {
          return {
            date_created: moment(el.createdAt).format("ll"),
            orderId: el.orderId,
            progress:
              el.stattusof === "completed"
                ? 100
                : el.stattusof === "ongoing"
                ? 50
                : el.stattusof === "pending"
                ? 25
                : el.stattusof === "awaiting"
                ? 40
                : 100,
            rating: 5,
            service_name: el.movie_title || el.chat_title || "",
            service_type: el.nameofservice,
            status: el.stattusof,
          };
        }
      );
      setReqHistoryData(refined_data);
    }
  }, [reqHistory.data]);
  useEffect(() => {
    if (params.id) {
      fetchUserActiveReq(params.id);
      fetchUserReqHistory(params.id);
      fetchOverview(params.id);
    }
  }, [params.id]);
  useEffect(() => {
    if (data) {
      setOverviewData([
        {
          title: "Requests created",
          value: `₦ ${numberWithCommas(data.metrics.totalTransactions)}`,
          percentage: 0,
          change: "increase",
          id: "1",
        },
        {
          title: "Chats created",
          value: `₦ ${numberWithCommas(data.metrics.totalChats)}`,
          percentage: 0,
          change: "increase",
          id: "4",
        },
        {
          title: "Total spent",
          value: `₦ ${numberWithCommas(data.metrics.totalPrice)}`,
          percentage: 0,
          change: "increase",
          id: "2",
        },
        {
          title: "Average rating",
          value: `₦ ${numberWithCommas(
            (data.metrics.averageRatings.quality +
              data.metrics.averageRatings.speed) /
              2
          )}`,
          percentage: 0,
          change: "increase",
          id: "3",
        },
      ]);
    }
  }, [data]);
  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <div className="py-6 chatbp:py-0 px-8 chatbp:px-0">
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
            </div>
          </header>
          <section className="mt-8 grid xl:grid-cols-2 gap-x-6">
            {isFetching ? (
              <UserProfileSkeleton />
            ) : (
              <div
                className={`relative ${classes.InfoBg} w-full h-fit md:h-[25rem] xl:h-auto rounded-xl px-10 md:px-0 py-16 md:py-0 `}
              >
                {data && (
                  <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <div className="flex items-center flex-wrap md:flex-nowrap">
                      <div className=" text-center md:mr-20 mx-auto md:mx-0 mb-20 md:mb-0">
                        <div className="w-[8.8rem] h-[8.8rem]">
                          <AspectRatio ratio={1800 / 1800}>
                            <Image
                              src={data.user.profilepics}
                              alt="profile-pic"
                              width={100}
                              height={100}
                              className="w-full h-full rounded-full"
                            />
                          </AspectRatio>
                        </div>
                        {/* <div className="w-[8.8rem] h-[8.8rem] bg-white font-bold rounded-full flex items-center justify-center text-[3.5rem]">
                        NA
                      </div> */}
                        <div className="text-[0.75rem] mx-auto mt-3 px-3 py-1 rounded-full w-fit bg-light-green text-dark-green flex items-center">
                          <GoDotFill className="mr-1 text-[#22C55E]" />
                          <p>Active</p>
                        </div>
                      </div>
                      <div className="grid w-full md:w-[15rem] chatbp:w-[20rem] text-white xs:grid-cols-2 text-[0.88rem]">
                        <div className="">
                          <p className="font-medium">Name</p>
                          <p>
                            {data.user.fname} {data.user.lname}
                          </p>
                        </div>
                        <div className="mt-8 xs:mt-0">
                          <p className="font-medium">Email</p>
                          <p>{data.user.email}</p>
                        </div>
                        <div className="mt-8">
                          <p className="font-medium">Joined</p>
                          <p>{moment(data.user.createdAt).format("ll")}</p>
                        </div>
                        <div className="mt-8">
                          <p className="font-medium">Phone</p>
                          <p>{data.user.phone}</p>
                        </div>
                        <div className="mt-8">
                          <p className="font-medium">Location</p>
                          <p>
                            {data.user.location?.state ||
                            data.user.location?.country
                              ? `${data.user.location?.state} ${data.user.location?.country}`
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
                  {data?.user.expertise.map((el) => (
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

export default CustomerDetailsPage;
