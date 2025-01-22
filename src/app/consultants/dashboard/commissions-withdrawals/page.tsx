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
import WithdrawalAmount from "@/components/WithdrawalAmount/WithdrawalAmount";
import { useProtectRouteConsultantRoute } from "@/hooks/useProtectConsultantRoute";
import {
  useLazyFetchConsultantRevenueQuery,
  useLazyFetchWalletBalanceQuery,
  useLazyFetchWithdrawalsQuery,
} from "@/lib/features/consultants/dashboard/withdrawals/withdrawals";
import { RootState } from "@/lib/store";
import { numberWithCommas } from "@/utils/helperFunction";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
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

type Props = {};

const CommissionsAndWithdrawalsPage = (props: Props) => {
  const [revenueData, setRevenueData] = useState<IRevenueTableData[]>([]);
  const [withdrawalData, setWithdrawal] = useState<IWithdrawalsData[]>([]);
  useProtectRouteConsultantRoute();
  const router = useRouter();
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
  const [fetchWalletBalance, balance] = useLazyFetchWalletBalanceQuery();
  const [fetchWithdrawals, withdrawals] = useLazyFetchWithdrawalsQuery();
  const [fetchRevenue, revenue] = useLazyFetchConsultantRevenueQuery();

  useEffect(() => {
    if (consultantId) {
      fetchWalletBalance(consultantId);
      fetchWithdrawals(consultantId);
      fetchRevenue(consultantId);
    }
  }, []);
  useEffect(() => {
    if (withdrawals.data) {
      const transformed_data: IWithdrawalsData[] =
        withdrawals.data.withdrawals.map((el) => {
          return {
            amount: el.amount,
            bank: el.orderId,
            date: moment(el.createdAt).format("YYYY-MM-DD"),
            status: el.status,
            withdrawal_account: "*****45678",
            id: el._id,
          };
        });
      setWithdrawal(transformed_data);
    }
  }, [withdrawals.data]);

  useEffect(() => {
    if (revenue.data) {
      const transformed_data: IRevenueTableData[] = revenue.data.deposits.map(
        (el) => {
          return {
            amount: el.amount,
            created_at: moment(el.createdAt).format("YYYY-MM-DD"),
            order_id: el.orderId,
            script: el.movie_title,
            service_type: el.nameofservice,
            status: el.status,
            id: el._id,
          };
        }
      );
      setRevenueData(transformed_data);
    }
  }, [revenue.data]);

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
                <WithdrawalAmount
                  title="Available funds"
                  amount={
                    balance.data
                      ? numberWithCommas(balance.data.balance)
                      : "0.00"
                  }
                  isLoading={balance.isFetching}
                  info="Nothing to withdraw, yet. Accept and complete requests to start earning."
                />
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
              data={revenueData}
              loaderLength={5}
              isFetching={revenue.isFetching}
              emptyHeader="No revenue yet"
            />
          </div>
          <div className="mt-16">
            <DataTable
              title="Withdrawal"
              columns={withdrawal_column}
              data={withdrawalData}
              isFetching={withdrawals.isLoading}
              emptyHeader="No withdrawal requests yet"
              loaderLength={5}
            />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default CommissionsAndWithdrawalsPage;
