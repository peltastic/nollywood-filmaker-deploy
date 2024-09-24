"use client";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import IssuesOrderDetails from "@/components/OrderDetails/IssuesOrderDetails";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

type Props = {};

const OrderDetails = (props: Props) => {
  const router = useRouter();
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <div>
          <header className="flex items-center">
            <div className="flex items-center text-[1.5rem] mr-auto">
              <div
                onClick={() => router.back()}
                className="hover:bg-gray-bg-3 w-fit mr-8 transition-all cursor-pointer px-1 py-1 rounded-md"
              >
                <IoIosArrowBack className="text-gray-4 " />
              </div>
              <h1 className="text-black-2 font-bold">Order details</h1>
            </div>
            <div className="flex items-center">
              <p className="text-[0.88rem] text-black-2 mr-2">Set status:</p>
              <div className="font-medium text-[0.88rem] text-black-5 rounded-md px-4 py-2 bg-white border border-stroke-2">
                <p>Pending</p>
              </div>
            </div>
          </header>
          <div className="mt-14">

          <IssuesOrderDetails />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default OrderDetails;
