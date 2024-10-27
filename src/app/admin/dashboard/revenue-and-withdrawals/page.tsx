"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Bar from "@/components/Charts/Bar";
import {
  IAdminWithdrawalHistoryData,
  admin_withdrawal_column,
} from "@/components/Columns/admin/WithdrawalHistory";
import {
  IAdminWithdrawalRequestColumnData,
  admin_withdrawal_request_columns,
} from "@/components/Columns/admin/WithdrawalRequestsColumns";
import {
  IRevenueTableData,
  revenue_column,
} from "@/components/Columns/consultants/RevenueColumn";
import DashboardInfoCard from "@/components/Dashboard/DashboardInfoCard";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SelectComponent from "@/components/Select/SelectComponent";
import { DataTable } from "@/components/Tables/DataTable";
import WithdrawalAmount from "@/components/WithdrawalAmount/WithdrawalAmount";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const data: IAdminWithdrawalRequestColumnData[] = [
  {
    amount: "55.80",
    consultant: "Jenny Wilson",
    date: "Sep 13, 2024",
    email: "w.lawson@example.com",
    status: "Pending",
  },
  {
    amount: "55.80",
    consultant: "Jenny Wilson",
    date: "Sep 13, 2024",
    email: "w.lawson@example.com",
    status: "Pending",
  },
  {
    amount: "55.80",
    consultant: "Jenny Wilson",
    date: "Sep 13, 2024",
    email: "w.lawson@example.com",
    status: "Pending",
  },
];

const plate_data: {
  change?: "increase" | "decrease";
  title: string;
  value: number;
  percentage: number;
  id: string;
}[] = [
  {
    title: "revenue",
    value: 0,
    percentage: 36,
    change: "increase",
    id: "1",
  },
  {
    title: "pending commissions",
    value: 0,
    percentage: 14,
    change: "decrease",
    id: "2",
  },
  {
    title: "claimed revenue",
    value: 0,
    percentage: 36,
    change: "increase",
    id: "3",
  },
];

const bar_chart_data = [
  { month: "Jan", commissions: 21000, revenue: 23000 },
  { month: "Feb", commissions: 7000, revenue: 6000 },
  { month: "Mar", commissions: 17000, revenue: 12000 },
  { month: "Apr", commissions: 8000, revenue: 6000 },
  { month: "May", commissions: 11000, revenue: 9000 },
  { month: "Jun", commissions: 2000, revenue: 1700 },
  { month: "Jul", commissions: 8000, revenue: 7000 },
  { month: "Aug", commissions: 22000, revenue: 21000 },
  { month: "Sep", commissions: 12000, revenue: 11000 },
  { month: "Oct", commissions: 12000, revenue: 11000 },
  { month: "Nov", commissions: 12000, revenue: 11000 },
  { month: "Dec", commissions: 11000, revenue: 10000 },
];

const revenue_data: IRevenueTableData[] = [
  {
    amount: "55.80",
    availabilty: "Sep 13, 2024",
    created_at: "Sep 13, 2024",
    order_id: "O-NG240629806487",
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    amount: "55.80",
    availabilty: "Sep 13, 2024",
    created_at: "Sep 13, 2024",
    order_id: "O-NG240629806487",
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
  {
    amount: "55.80",
    availabilty: "Sep 13, 2024",
    created_at: "Sep 13, 2024",
    order_id: "O-NG240629806487",
    script: "Mikolo",
    service_type: "Read my script",
    status: "Completed",
  },
];

const withdrawal_data: IAdminWithdrawalHistoryData[] = [
  {
    amount: "55.80",
    bank: "*****5864",
    date: "Sep 13, 2024",
    sent_to: "Wells Fargo",
    status: "sent",
  },
  {
    amount: "55.80",
    bank: "*****5864",
    date: "Sep 13, 2024",
    sent_to: "Wells Fargo",
    status: "sent",
  },
  {
    amount: "55.80",
    bank: "*****5864",
    date: "Sep 13, 2024",
    sent_to: "Wells Fargo",
    status: "sent",
  },
];

type Props = {};

const RevenueAndWithdrawalsPage = (props: Props) => {
  const router = useRouter();

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <div className=" px-2 xs:px-8 chatbp:px-0 py-8 chatbp:py-0">
          <header className="mb-[5rem]">
            <div className="flex items-center w-full md:w-auto text-[1.5rem] mr-auto">
              <div
                onClick={() => router.back()}
                className="hover:bg-gray-bg-3 w-fit mr-3 md:mr-8 transition-all cursor-pointer px-1 py-1 rounded-md"
              >
                <IoIosArrowBack className="text-gray-4 " />
              </div>
              <h1 className="text-black-2 font-bold">Revenue & withdrawals</h1>
            </div>
          </header>
          <div className="mt-10">
            <DashboardPlate title="Revenue & withdrawals">
              <div className="grid lg:grid-cols-2 gap-x-5 mt-8 mb-6">
                <WithdrawalAmount
                  amount="100,000"
                  info="This is the amount accrued by the consultants"
                  title="Available for payout"
                />
                <WithdrawalAmount
                  amount="45,000"
                  info="This is the amount already paid out to the consultants"
                  title="Total paid out"
                />
              </div>
            </DashboardPlate>
          </div>
          <div className="mt-10">
            <DataTable
              data={data}
              title="Withdrawal requests"
              columns={admin_withdrawal_request_columns}
            />
          </div>
          <div className="mt-10">
            <DashboardPlate
              topJSXContent={
                <div className="flex flex-wrap md:flex-nowrap items-center mt-6 lg:mt-0">
                  <div className="flex items-center w-full md:w-auto">
                    <div className="flex items-center mr-6">
                      <div className="w-[1rem] h-[1rem] mr-2 rounded-sm bg-[#22C55E]"></div>
                      <p className="text-gray-6 text-[0.88rem]">Revenue</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-[1rem] h-[1rem] mr-2 rounded-sm bg-[#A4FFC5]"></div>
                      <p className="text-gray-6 text-[0.88rem]">Commission</p>
                    </div>
                  </div>
                  <div className="w-[8rem] mt-6 md:mt-0 ml-0 md:ml-8">
                    <SelectComponent
                      data={[
                        {
                          label: "Last 1 year",
                          value: "Last 1 year",
                        },
                      ]}
                      label=""
                      placeholder=""
                      darkBorder
                      setValueProps={() => {}}
                      defaultValue="Last 1 year"
                    />
                  </div>

                  <UnstyledButton class="ml-6 mt-6 md:mt-0 bg-black-3 text-[0.88rem] text-white py-2 px-4 rounded-md">
                    Export PDF
                  </UnstyledButton>
                </div>
              }
              title="Earning and commissions"
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
                    type="stacked"
                    chart_data={bar_chart_data}
                    chart_series={[
                      {
                        name: "revenue",
                        color: "#22C55E",
                      },
                      {
                        name: "commissions",
                        color: "#A4FFC5",
                      },
                    ]}
                    noradius
                  />
                </div>
              </section>
            </DashboardPlate>
          </div>
          <div className="mt-10">
            <DataTable
              title="Revenue history"
              columns={revenue_column}
              data={revenue_data}
            />
          </div>
          <div className="mt-10">
            <DataTable
              title="Withdrawal history"
              columns={admin_withdrawal_column}
              data={withdrawal_data}
            />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default RevenueAndWithdrawalsPage;
