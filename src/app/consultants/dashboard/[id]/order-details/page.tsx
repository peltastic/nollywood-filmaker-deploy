"use client";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import OrderDetailsBody from "@/components/OrderDetails/OrderDetailsBody";
import OrderDetailsHeader from "@/components/OrderDetails/OrderDetailsHeader";
import OrderDetailsTop from "@/components/OrderDetails/OrderDetailsTop";
import { useLazyGetCustomerRequestDetailQuery } from "@/lib/features/consultants/dashboard/request";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const OrderDetails = (props: Props) => {
  const search = useSearchParams();

  const searchVal = search.get("status") || "Pending";
  const params = useParams();

  const [getCustomerReqDetails, {}] = useLazyGetCustomerRequestDetailQuery();

  useEffect(() => {
    if (params.id) {
      getCustomerReqDetails(params.id as string);
    }
  }, [params]);

  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        <OrderDetailsHeader
          status={(searchVal as string).toLowerCase()}
          statusValue={searchVal as string}
          consultant
        />
        <div className="flex  flex-wrap lg:flex-nowrap items-start">
          <div className=" w-full lg:w-[15%] mt-6">
            <div className="mx-auto bg-black-3 font-bold text-[1.5rem] xl:text-[3.49rem] text-white flex items-center justify-center w-[4rem] xl:w-[8.8rem] h-[4rem] xl:h-[8.8rem] rounded-full">
              <p>NA</p>
            </div>
            <div className="text-black-3 text-center">
              <p className="font-bold text-[1.13rem]">Niyi Akinmolayan</p>
              <p className="text-[0.88rem]">niyi@gmail.com</p>
            </div>
          </div>
          <div className="mb-10 px-3 sm:px-4 lg:px-0 w-full lg:w-[85%]">
            <OrderDetailsTop
              order_date="2024-06-29 10:21:54"
              order_no="O-NG240629806487"
              order_type="Watch the final cut of my film"
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
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default OrderDetails;
