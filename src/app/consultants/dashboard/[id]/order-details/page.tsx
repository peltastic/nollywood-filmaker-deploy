"use client";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import OrderDetailsBody from "@/components/OrderDetails/OrderDetailsBody";
import OrderDetailsHeader from "@/components/OrderDetails/OrderDetailsHeader";
import OrderDetailsTop from "@/components/OrderDetails/OrderDetailsTop";
import OrderDetailsPageSkeleton from "@/components/Skeletons/OrderDetailsPageSkeleton";
import { useLazyGetCustomerRequestDetailQuery } from "@/lib/features/consultants/dashboard/request";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const OrderDetails = (props: Props) => {
  const search = useSearchParams();

  const searchVal = search.get("status") || "Pending";
  const params = useParams();

  const [getCustomerReqDetails, { isFetching, data, isSuccess }] =
    useLazyGetCustomerRequestDetailQuery();

  const [bodyData, setBodyData] = useState<
    { title: string; content: string }[]
  >([]);

  useEffect(() => {
    if (params.id) {
      getCustomerReqDetails(params.id as string);
    }
  }, [params]);

  useEffect(() => {
    if (data) {
      if (data.request.nameofservice === "Chat With A Professional") {
        setBodyData([
          {
            title: "Conversation title",
            content: data.request.chat_title,
          },
          {
            title: "Quick summary",
            content: data.request.summary,
          },
          {
            title: "Consultant type",
            content: data.request.consultant,
          },
        ]);
      }
    }
  }, [data]);

  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        {isFetching ? (
          <OrderDetailsPageSkeleton />
        ) : (
          <>
            <OrderDetailsHeader
              status={data?.request.stattusof}
              statusValue={data?.request.stattusof}
              consultant
              orderId={data?.request.orderId}
            />
            <div className="flex  flex-wrap lg:flex-nowrap items-start">
              <div className=" w-full lg:w-[15%] mt-6">
                <div className="mx-auto bg-black-3 font-bold text-[1.5rem] xl:text-[3.49rem] text-white flex items-center justify-center w-[4rem] xl:w-[8.8rem] h-[4rem] xl:h-[8.8rem] rounded-full">
                  <p>
                    {data?.user.fullName.split(" ")[0][0]}
                    {data?.user.fullName.split(" ")[1][0]}
                  </p>
                </div>
                <div className="text-black-3 text-center">
                  <p className="font-bold text-[1.13rem]">
                    {data?.user.fullName}
                  </p>
                  <p className="text-[0.88rem]">{data?.user.email}</p>
                </div>
              </div>
              <div className="mb-10 px-3 sm:px-4 lg:px-0 w-full lg:w-[80%] ml-auto">
                <OrderDetailsTop
                  order_date={data?.request.date}
                  order_no="O-NG240629806487"
                  order_type={data?.request.nameofservice}
                />
                <OrderDetailsBody
                  chat={
                    data?.request.nameofservice === "Chat With A Professional"
                  }
                  // bodyData={bodyData}
                  script="Movie script 2024.pdf"
                  title="Mission Impossible"
                />
              </div>
            </div>
          </>
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default OrderDetails;

// [
//   {
//     title: "Platform for exhibition",
//     content: "Cinema",
//   },
//   {
//     title: "Key actors in mind",
//     content: "I’ll defer to your expertise on this",
//   },
//   {
//     title: "Key Crew in mind",
//     content: "I’ll defer to your expertise on this",
//   },
//   {
//     title: "Number of days",
//     content: "125",
//   },
//   {
//     title: "Relevant information",
//     content: "I’ll defer to your expertise on this",
//   },
//   {
//     title: "Budget Range",
//     content: "20,000,000 - 80,000,000",
//   },
// ]
