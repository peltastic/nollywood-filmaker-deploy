"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Bar from "@/components/Charts/Bar";
import {
  IRevenueTableData,
  revenue_column,
} from "@/components/Columns/consultants/RevenueColumn";
import {
  IWithdrawalsData,
  withdrawal_column,
} from "@/components/Columns/consultants/WithdrawalsColumn";
import WithdrawFunds from "@/components/Dashboard/Consultants/WithdrawFunds";
import DashboardInfoCard from "@/components/Dashboard/DashboardInfoCard";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
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
    percentage: 14,
    change: "decrease",
    id: "2",
  },
  {
    title: "all-time claimed revenue",
    value: 0,
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

const revenue_data: IRevenueTableData[] = [
  {
    created_at: "Sep 13, 2024",
    amount: "55.80",
    availabilty: "Sep 13, 2024",
    order_id: "O-NG240629806487",
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    created_at: "Sep 13, 2024",
    amount: "55.80",
    availabilty: "Sep 13, 2024",
    order_id: "O-NG240629806487",
    script: "Jagun Jagun",
    service_type: "Watch the Final cut of my film",
    status: "Completed",
  },
  {
    created_at: "Sep 13, 2024",
    amount: "55.80",
    availabilty: "Sep 13, 2024",
    order_id: "O-NG240629806487",
    script: "Criminal",
    service_type: "Create a production  Budget",
    status: "Completed",
  },
];

const withdrawal_data: IWithdrawalsData[] = [
  {
    amount: "55.80",
    bank: "Wells Fargo",
    date: "2024-06-29 10:21:54",
    sent_to: "*****564",
    status: "sent",
  },
  {
    amount: "55.80",
    bank: "Wells Fargo",
    date: "2024-06-29 10:21:54",
    sent_to: "*****564",
    status: "sent",
  },
  {
    amount: "55.80",
    bank: "Wells Fargo",
    date: "2024-06-29 10:21:54",
    sent_to: "*****564",
    status: "sent",
  },
];

type Props = {};

const CommissionsAndWithdrawalsPage = (props: Props) => {
  const router = useRouter();
  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        <div className="px-2 xs:px-6 chatbp:px-0 py-8 chatbp:py-0">
          <header className="mb-[5rem]">
            <div className="flex items-center w-full md:w-auto text-[1.5rem] mr-auto">
              <div
                onClick={() => router.back()}
                className="hover:bg-gray-bg-3 w-fit mr-3 md:mr-8 transition-all cursor-pointer px-1 py-1 rounded-md"
              >
                <IoIosArrowBack className="text-gray-4 " />
              </div>
              <h1 className="text-black-2 font-bold ]">
                Commissions & withdrawals
              </h1>
            </div>
          </header>
          <div className="mt-14">
            <DashboardPlate title="Commissions & withdrawals">
              <div className="grid lg:grid-cols-2 py-7 gap-x-5">
                <div className="mb-8 lg:mb-0 border border-stroke-10 px-4 sm:px-10 py-4 rounded-md">
                  <h3 className="font-bold mb-4">Available funds</h3>
                  <p className="flex items-end mb-3">
                    <span className="text-[4rem] font-bold">$0.00</span>
                    <span className=" block mb-2 font-bold text-[1.5rem]">
                      USD
                    </span>
                  </p>
                  <p className="text-[0.88rem] text-black-4 font-medium">
                    Nothing to withdraw, yet. Accept and complete requests to
                    start earning.
                  </p>
                </div>
                <WithdrawFunds />
              </div>
            </DashboardPlate>
          </div>
          <div className="mt-16">
            <DashboardPlate title="Your earnings">
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
                <div className="mt-10 lg:mt-0 w-full lg:w-[70%] border border-stroke-10 px-6 py-10 flex items-center rounded-lg">
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
              title="Revenue"
              columns={revenue_column}
              data={revenue_data}
            />
          </div>
          <div className="mt-16">
            <DataTable
              title="Withdrawal"
              columns={withdrawal_column}
              data={withdrawal_data}
            />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default CommissionsAndWithdrawalsPage;
