"use client";
import Area from "@/components/Charts/Area";
import {
  ICustomerReqData,
  customer_req_columns,
} from "@/components/Columns/admin/CustomerRequestsColumn";
import CustomerFeed from "@/components/CustomerFeed/CustomerFeed";
import DashboardInfoCard from "@/components/Dashboard/DashboardInfoCard";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import Header from "@/components/Dashboard/Header";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { LineChart } from "@mantine/charts";
import { Progress, Rating } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useProtectAdmin } from "@/hooks/useProtectAdminRoute";
import {
  useFetchNewestCustomersQuery,
  useFetchSalesReportDataQuery,
  useFetchTotalCustomersAndConsultantsQuery,
  useFetchTransactionStatsQuery,
} from "@/lib/features/admin/dashboard/stats";
import DashboardStatsSkeleton from "@/components/Skeletons/DashboardStatsSkeleton";
import { numberWithCommas } from "@/utils/helperFunction";
import { IGetNewestUsers } from "@/interfaces/admin/dashboard/stats";
import CustomerSkeleton from "@/components/Skeletons/CustomersSkeleton";
import moment from "moment";
import { useFetchCustomerRequestQuery } from "@/lib/features/admin/requests/request";

type Props = {};

export interface IOverviewData {
  change?: "increase" | "decrease";
  title: string;
  value: string;
  percentage: number;
  id: string;
}

const line_series = [
  {
    name: "Sales_Price",
    color: "#181818",
  },
  {
    name: "Transactions",
    color: "#999999",
  },
];

const top_requests: {
  script: string;
  type: string;
}[] = [
  {
    script: "Read my script",
    type: "Service request",
  },
  {
    script: "Watch the Final cut of my film",
    type: "Service request",
  },
  {
    script: "Create a production  Budget",
    type: "Service request",
  },
];

const top_consultants: {
  name: string;
  email: string;
  rating: string;
}[] = [
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    rating: "125",
  },
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    rating: "98",
  },
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    rating: "97",
  },
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    rating: "94",
  },
];

const top_countries: {
  country: string;
  value: number;
  percentage: number;
}[] = [
  {
    country: "Nigeria",
    value: 143382,
    percentage: 100,
  },
  {
    country: "USA",
    value: 87974,
    percentage: 65,
  },
  {
    country: "South Africa",
    value: 45211,
    percentage: 45,
  },
  {
    country: "Romania",
    value: 21893,
    percentage: 20,
  },
];

const AdminDashboardPage = (props: Props) => {
  useProtectAdmin();
  const [overviewData, setOverviewData] = useState<IOverviewData[]>([
    {
      change: "increase",
      percentage: 0,
      title: "Accepted Requests",
      value: "0",
      id: "1",
    },
    {
      change: "increase",
      percentage: 0,
      title: "Rejected Requests",
      value: "0",
      id: "2",
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
    {
      change: "increase",
      percentage: 0,
      title: "Total Customers",
      value: "0",
      id: "5",
    },
    {
      change: "increase",
      percentage: 0,
      title: "Total Consultants",
      value: "0",
      id: "6",
    },
    {
      change: "increase",
      percentage: 0,
      title: "Total Revenue",
      value: "0",
      id: "7",
    },
    {
      change: "increase",
      percentage: 0,
      title: "Average Rating",
      value: "0",
      id: "8",
    },
  ]);
  const [newCustomersData, setNewCustomersData] = useState<IGetNewestUsers[]>(
    []
  );
  const [customerReqData, setCustomerReqData] = useState<ICustomerReqData[]>(
    []
  );
  const [linesChartData, setLinesChartData] = useState<
    {
      Sales_Price: number;
      Transactions: number;
      month: string;
    }[]
  >([]);

  const adminUserData = useSelector(
    (state: RootState) => state.persistedState.adminuser.user
  );
  const { data, isFetching } = useFetchTotalCustomersAndConsultantsQuery();
  const result = useFetchTransactionStatsQuery();
  const sales = useFetchSalesReportDataQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const customer_req = useFetchCustomerRequestQuery(
    {
      limit: 10,
      page: 1,
      order: "desc",
      status: "pending",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const new_users = useFetchNewestCustomersQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (sales.data) {
      const refined_data: {
        Sales_Price: number;
        Transactions: number;
        month: string;
      }[] = sales.data.data.map((el) => {
        return {
          month: el.month,
          Sales_Price: el.totalPrice,
          Transactions: el.totalTransactions,
        };
      });
      setLinesChartData(refined_data);
    }
  }, [sales.data]);

  useEffect(() => {
    if (customer_req.data) {
      const refined_data: ICustomerReqData[] = customer_req.data.requests.map(
        (el) => {
          return {
            customer: `${el.user.fname} ${el.user.lname}`,
            date: moment(el.createdAt).format("ll"),
            email: el.user.email,
            profilepic: el.user.profilepics,
            script: el.chat_title || el.movie_title || "",
            service_type: el.nameofservice,
            status: el.stattusof,
            orderId: el.orderId
          };
        }
      );
      setCustomerReqData(refined_data);
    }
  }, [customer_req.data]);

  useEffect(() => {
    if (new_users.data) {
      setNewCustomersData(new_users.data.data);
    }
  }, [new_users.data]);

  useEffect(() => {
    if (data && result.data) {
      setOverviewData([
        {
          change: "increase",
          percentage: 0,
          title: "Accepted Requests",
          value: "0",
          id: "1",
        },
        {
          change: "increase",
          percentage: 0,
          title: "Rejected Requests",
          value: "0",
          id: "2",
        },
        {
          change: "increase",
          percentage: 0,
          title: "Completed Requests",
          value: numberWithCommas(result.data.completedCount),
          id: "3",
        },
        {
          change: "increase",
          percentage: 0,
          title: "Conversations held",
          value: "0",
          id: "4",
        },
        {
          change: "increase",
          percentage: 0,
          title: "Total Customers",
          value: data.totalUsers.toString(),
          id: "5",
        },
        {
          change: "increase",
          percentage: 0,
          title: "Total Consultants",
          value: data.totalConsultants.toString(),
          id: "6",
        },
        {
          change: "increase",
          percentage: 0,
          title: "Total Revenue",
          value: `₦ ${numberWithCommas(result.data.totalCompletedPrice)}`,

          id: "7",
        },
        {
          change: "increase",
          percentage: 0,
          title: "Average Rating",
          value: "0",
          id: "8",
        },
      ]);
    }
  }, [data, result.data]);

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <div className="px-4 xs:px-8 chatbp:px-0 mb-10 xl:mb-0">
          <Header
            fname={adminUserData.fname}
            lname={adminUserData.lname}
            ppicture={adminUserData.profilepics}
            admin
          />
          <div className="mt-16">
            <DashboardPlate title="Overview">
              <div className="w-full my-8  md:grid-cols-2 xl:grid-cols-4 grid gap-6">
                {isFetching || result.isFetching ? (
                  <>
                    <DashboardStatsSkeleton />
                    <DashboardStatsSkeleton />
                    <DashboardStatsSkeleton />
                    <DashboardStatsSkeleton />
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
            </DashboardPlate>
          </div>
          <div className="mt-16 flex flex-wrap xl:flex-nowrap gap-x-8">
            <div className="w-full xl:w-[65%]">
              <DashboardPlate title="Sales Report">
                <div className="pb-8">
                  <Area line_data={linesChartData} line_series={line_series} />
                </div>
              </DashboardPlate>
            </div>
            <div className=" mt-10 xl:mt-0 w-full xl:w-[35%]">
              <DashboardPlate title="Latest customers">
                <div className="pb-7">
                  {new_users.isFetching ? (
                    <div className="mt-8">
                      <div className="mt-2">
                        <CustomerSkeleton />
                      </div>
                      <div className="mt-2">
                        <CustomerSkeleton />
                      </div>
                      <div className="mt-2">
                        <CustomerSkeleton />
                      </div>
                      <div className="mt-2">
                        <CustomerSkeleton />
                      </div>
                    </div>
                  ) : (
                    <>
                      {newCustomersData.map((el) => (
                        <CustomerFeed
                          date={moment(el.createdAt).format("MMM Do YY")}
                          email={el.email}
                          name={`${el.fname} ${el.lname}`}
                          time={moment(el.createdAt).format("h:mm a")}
                          key={el._id}
                          profilepic={el.profilepics}
                        />
                      ))}
                    </>
                  )}
                </div>
              </DashboardPlate>
            </div>
          </div>
          <div className="mt-16">
            <DataTable
              showMoreBtnContent="See All"
              link="/admin/dashboard/requests"
              loaderLength={10}
              isFetching={customer_req.isFetching}
              data={customerReqData}
              title="Customer Requests"
              columns={customer_req_columns}
            />
          </div>
          <div className="mt-16 flex flex-wrap xl:flex-nowrap sm:gap-x-4 ">
            <div className="w-full xl:w-[40%]">
              <DashboardPlate title="Top Consultants" noborder>
                <div className="">
                  {top_consultants.map((el) => (
                    <div className="mt-8 flex flex-wrap sm:flex-nowrap items-center">
                      <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto items-center mr-auto">
                        <div className="mr-4 ">
                          <Image src={TestImage} alt="test-img" />
                        </div>
                        <div className="text-[0.88rem] w-full sm:w-auto mt-5 sm:mt-0">
                          <h3 className="font-medium ">{el.name}</h3>
                          <p className="text-gray-1">{el.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 sm:mt-0">
                        <Rating color="#F8C51B" defaultValue={4} />
                        <p className="text-gray-5 text-sm ml-3">{el.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardPlate>
            </div>
            <div className="mt-10 xl:mt-0 w-full lg:w-[49%] xl:w-[30%] md:mr-auto xl:mr-0">
              <DashboardPlate
                noborder
                title="Top Requests"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipis."
              >
                <div className="py-2">
                  {top_requests.map((el) => (
                    <div className="border mt-4 border-stroke-10 px-4 chatbp:px-10 rounded-lg">
                      <div className="flex flex-wrap items-center w-full sm:w-[20rem] xl:w-auto py-4">
                        <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
                          <Image src={ReadMyScriptDarkImg} alt="name-img" />
                        </div>
                        <div className="text-[0.88rem] w-full sm:w-auto mt-4 sm:mt-0">
                          <p className="text-black-4 font-medium">
                            {el.script}
                          </p>
                          <p className="text-gray-1">{el.type}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardPlate>
            </div>
            <div className="mt-10 xl:mt-0 w-full lg:w-[49%] xl:w-[30%]">
              <DashboardPlate noborder title="Top Countries">
                <div className="mt-10">
                  {top_countries.map((el) => (
                    <div key={el.country} className="mt-6">
                      <div className="">
                        <div className="flex items-center text-black-3 mb-3">
                          <p className="text-[0.81rem] mr-auto">{el.country}</p>
                          <p className="text-[0.81rem]">
                            {new Intl.NumberFormat("en-US").format(el.value)}
                          </p>
                        </div>
                        <Progress color="#181818" value={el.percentage} />
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardPlate>
            </div>
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminDashboardPage;
