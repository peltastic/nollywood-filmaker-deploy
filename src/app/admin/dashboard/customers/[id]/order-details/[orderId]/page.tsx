"use client";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import OrderDetailsHeader from "@/components/OrderDetails/OrderDetailsHeader";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import TestImg from "/public/assets/test-avatar.png";
import OrderDetailsTop from "@/components/OrderDetails/OrderDetailsTop";
import OrderDetailsBody from "@/components/OrderDetails/OrderDetailsBody";
type Props = {};

const CustomerOrderDetailsPage = (props: Props) => {
  const search = useSearchParams();

  const searchVal = search.get("status") || "Pending";
  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <div className="px-2 sm:px-8 chatbp:px-0 py-8 chatbp:py-0">
          <OrderDetailsHeader
            admin
            status={(searchVal as string).toLowerCase()}
            statusValue={searchVal as string}
          />
          <div className="flex flex-wrap chatbp:flex-nowrap items-start mt-6">
            <div className="w-full lg:w-[20%] text-black-3 mt-6 px-4 lg:px-0">
              <p className="text-[0.88rem] font-medium">Client</p>
              <div className="flex items-center w-fit py-1 px-2 rounded-md bg-border-gray">
                <div className="w-[1.2rem] mr-1">
                  <Image src={TestImg} alt="test-image" />
                </div>
                <p className="text-[0.88rem]">Niyi Akinmolayan</p>
              </div>

              <p className="text-[0.88rem] font-medium mt-4">Assigned to</p>
              <div className="flex items-center w-fit py-1 px-2 rounded-md bg-border-gray">
                <div className="w-[1.2rem] mr-1">
                  <Image src={TestImg} alt="test-image" />
                </div>
                <p className="text-[0.88rem]">Damilola Emmanuel</p>
              </div>
            </div>
            <div className="mb-10 px-3 sm:px-4 lg:px-0 w-full chatbp::w-[80%]">
              <OrderDetailsTop
                order_date="2024-06-29 10:21:54"
                order_no="O-NG240629806487"
                order_type="Watch the final cut of my film"
                rating="5"
              />
              <OrderDetailsBody
                bodyData={[
                  {
                    title: "Platform for exhibition",
                    content: "Cinema",
                  },
                  {
                    title: "Key actors in mind",
                    content: "I’ll defer to your expertise on this",
                  },
                  {
                    title: "Key Crew in mind",
                    content: "I’ll defer to your expertise on this",
                  },
                  {
                    title: "Number of days",
                    content: "125",
                  },
                  {
                    title: "Relevant information",
                    content: "I’ll defer to your expertise on this",
                  },
                  {
                    title: "Budget Range",
                    content: "20,000,000 - 80,000,000",
                  },
                ]}
                script="Movie script 2024.pdf"
                title="Mission Impossible"
              />
            </div>
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default CustomerOrderDetailsPage;
