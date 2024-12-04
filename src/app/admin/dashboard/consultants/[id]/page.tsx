"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import MenuComponent from "@/components/Menu/MenuComponent";
import { useRouter } from "next/navigation";
import React from "react";
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

type Props = {};

const ConsultantDetailsPage = (props: Props) => {
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
  const router = useRouter();
  const plate_data: {
    change?: "increase" | "decrease";
    title: string;
    value: number;
    percentage: number;
    id: string;
  }[] = [
    {
      title: "all-time revenue",
      value: 0,
      percentage: 36,
      change: "increase",
      id: "1",
    },
    {
      title: "all-time pending revenue",
      value: 0,
      percentage: 36,
      change: "increase",
      id: "4",
    },
    {
      title: "all-time claimed revenue",
      value: 0,
      percentage: 14,
      change: "increase",
      id: "2",
    },
  ];

  const reqHistory: ReqHistoryColumnData[] = [
    {
      customer: "Jenny Wilson",
      date: "22 Jan 2022",
      email: "w.lawson@example.com",
      script: "Mikolo",
      service_type: "Read my script",
      status: "Completed",
      rating: 5,
    },
    {
      customer: "Devon Lane",
      date: "26 Jan 2022",
      email: "dat.roberts@example.com",
      script: "Jagun Jagun",
      service_type: "Watch the Final cut of my film",
      status: "Completed",
      rating: 4,
    },
    {
      customer: "Jane Cooper",
      date: "18 Jan 2022",
      email: "jgraham@example.com",
      script: "Criminal",
      service_type: "Create a production Budget",
      status: "Completed",
      rating: 3,
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
                <h1 className="text-black-2 font-bold ">
                  Profile Details
                </h1>
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
            <div
              className={`relative ${classes.InfoBg} h-fit md:h-[25rem] xl:h-auto w-full rounded-xl px-10 md:px-0 py-16 md:py-0`}
            >
              <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <div className="flex items-center flex-wrap md:flex-nowrap">
                  <div className=" text-center md:mr-20 mx-auto md:mx-0 mb-20 md:mb-0">
                    <div className="w-[8.8rem] h-[8.8rem] bg-white font-bold rounded-full flex items-center justify-center text-[3.5rem]">
                      DA
                    </div>
                    <div className="text-[0.75rem] mx-auto mt-3 px-3 py-1 rounded-full w-fit bg-light-green text-dark-green flex items-center">
                      <GoDotFill className="mr-1 text-[#22C55E]" />
                      <p>Active</p>
                    </div>
                  </div>
                  <div className="grid w-full md:w-[15rem] chatbp:w-[20rem] text-white xs:grid-cols-2 text-[0.88rem]">
                    <div className="">
                      <p className="font-medium">Name</p>
                      <p>Niyi Akinmolayan</p>
                    </div>
                    <div className="mt-8 xs:mt-0">
                      <p className="font-medium">Email</p>
                      <p>niyi@gnail.com</p>
                    </div>
                    <div className="mt-8">
                      <p className="font-medium">Expertise</p>
                      <p>Producer</p>
                    </div>
                    <div className="mt-8">
                      <p className="font-medium">Joined</p>
                      <p>January 2, 2024</p>
                    </div>
                    <div className="mt-8">
                      <p className="font-medium">Phone</p>
                      <p>08076542132</p>
                    </div>
                    <div className="mt-8">
                      <p className="font-medium">Location</p>
                      <p>Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 xl:mt-0">
              <DashboardPlate title="Overview">
                <div className="grid md:grid-cols-2 mt-6 mb-4 gap-6">
                  {plate_data.map((el) => (
                    <DashboardInfoCard
                      percentage={el.percentage}
                      title={el.title}
                      value={el.value}
                      change={el.change}
                      key={el.id}
                    />
                  ))}
                </div>
              </DashboardPlate>
            </div>
          </section>
          <div className="mt-16 ">
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

          <div className="mt-16">
            <DataTable
              title="Active Requests"
              columns={consultant_active_requests_columns}
              data={active_req_table_data}
            />
          </div>

          <div className="mt-16 px-6 chatbp:px-0">
            <DataTable
              showMoreBtnContent="See all"
              link="/consultants/dashboard/request-history"
              title="Request History"
              subtitle="Keep track of all your past requests"
              columns={request_history_column}
              data={reqHistory}
            />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ConsultantDetailsPage;
