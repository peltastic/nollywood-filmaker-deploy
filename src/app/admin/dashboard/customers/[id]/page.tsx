"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import MenuComponent from "@/components/Menu/MenuComponent";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
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

type Props = {};
const plate_data: {
  change?: "increase" | "decrease";
  title: string;
  value: string;
  percentage: number;
  id: string;
}[] = [
  {
    title: "requests created",
    value: "0",
    percentage: 36,
    change: "increase",
    id: "1",
  },
  {
    title: "chats created",
    value: "0",
    percentage: 36,
    change: "increase",
    id: "4",
  },
  {
    title: "total spent",
    value: "0",
    percentage: 14,
    change: "increase",
    id: "2",
  },
  {
    title: "average rating",
    value: "0",
    percentage: 36,
    change: "increase",
    id: "3",
  },
];

const active_request_data: ICustomerActiveReqData[] = [
  {
    date: "22 Jan, 2022",
    progress: 100,
    service_name: "Mikolo",
    service_type: "Read my script",
    status: "Ready",
  },
  {
    date: "22 Jan, 2022",
    progress: 60,
    service_name: "Jagun",
    service_type: "Read my script",
    status: "Ongoing",
  },
  {
    date: "22 Jan, 2022",
    progress: 1,
    service_name: "Jagun",
    service_type: "Read my script",
    status: "Pending",
  },
  {
    date: "22 Jan, 2022",
    progress: 20,
    service_name: "Jagun",
    service_type: "Read my script",
    status: "Completed",
  },
];

const req_history_data: IAdminRequestHistory[] = [
  {
    date_created: "18 Jan, 2022",
    progress: 100,
    rating: 5,
    service_name: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    date_created: "18 Jan, 2022",
    progress: 100,
    rating: 5,
    service_name: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    date_created: "18 Jan, 2022",
    progress: 100,
    rating: 5,
    service_name: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
];
const CustomerDetailsPage = (props: Props) => {
  const router = useRouter();
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
              ></MenuComponent>
            </div>
          </header>
          <section className="mt-8 grid xl:grid-cols-2 gap-x-6">
            <div
              className={`relative ${classes.InfoBg} w-full h-fit md:h-[25rem] xl:h-auto rounded-xl px-10 md:px-0 py-16 md:py-0 `}
            >
              <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <div className="flex items-center flex-wrap md:flex-nowrap">
                  <div className=" text-center md:mr-20 mx-auto md:mx-0 mb-20 md:mb-0">
                    <div className="w-[8.8rem] h-[8.8rem] bg-white font-bold rounded-full flex items-center justify-center text-[3.5rem]">
                      NA
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
          <div className="mt-10">
            <DataTable
              title="Active requests"
              data={active_request_data}
              columns={customer_active_request_column}
            />
          </div>
          <div className="mt-10">
            <DataTable
              title="Request history"
              subtitle="Keep track of all your past requests"
              data={req_history_data}
              columns={admin_customer_request_history_column}
            />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default CustomerDetailsPage;
