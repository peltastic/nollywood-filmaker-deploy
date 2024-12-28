"use client";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import OrderDetailsHeader from "@/components/OrderDetails/OrderDetailsHeader";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TestImg from "/public/assets/test-avatar.png";
import OrderDetailsTop from "@/components/OrderDetails/OrderDetailsTop";
import OrderDetailsBody from "@/components/OrderDetails/OrderDetailsBody";

import OrderDetailsPageSkeleton from "@/components/Skeletons/OrderDetailsPageSkeleton";
import { useLazyGetCustomerRequestDetailQuery } from "@/lib/features/admin/requests/request";
type Props = {};

const CustomerOrderDetailsPage = (props: Props) => {
  const [getCustomerReqDetails, { data, isFetching }] =
    useLazyGetCustomerRequestDetailQuery();
  const search = useSearchParams();
  const params = useParams();
  const [bodyData, setBodyData] = useState<
    { title: string; content: string }[]
  >([]);

  useEffect(() => {
    if (params.id) {
      getCustomerReqDetails(params.id as string);
    }
  }, [params]);

  const searchVal = search.get("status") || "Pending";

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        {isFetching ? (
          <OrderDetailsPageSkeleton />
        ) : (
          <>
            <div className="px-2 sm:px-8 chatbp:px-0 py-8 chatbp:py-0">
              {data && (
                <OrderDetailsHeader
                  admin
                  status={data?.request.stattusof}
                  statusValue={data?.request.stattusof}
                  orderId={data?.request.orderId}
                  expertise={data?.request.expertise}
                  chat_appointment_data={{
                    date: data.request.booktime || data.request.date,
                    time: {
                      hours: data.request.time ? data.request.time.hours : 0,
                      minutes: data.request.time
                        ? data.request.time.minutes
                        : 0,
                      seconds: data.request.time
                        ? data.request.time.seconds
                        : 0,
                    },
                    userId: data.request.userId,
                    nameofservice: data.request.nameofservice,
                  }}
                />
              )}
              <div className="flex flex-wrap chatbp:flex-nowrap items-start mt-6">
                <div className="w-full lg:w-[20%] text-black-3 mt-6 px-4 lg:px-0">
                  <p className="text-[0.88rem] font-medium">Client</p>
                  <div className="flex items-center w-fit py-1 px-2 rounded-md bg-border-gray">
                    <div className="w-[1.2rem] mr-1">
                      <Image src={TestImg} alt="test-image" />
                    </div>
                    <p className="text-[0.88rem]">{data?.user.fullName}</p>
                  </div>
                </div>
                <div className="mb-10 px-3 sm:px-4 lg:px-0 w-full chatbp::w-[80%]">
                  <OrderDetailsTop
                    order_date={data?.request.date}
                    order_no="O-NG240629806487"
                    order_type={data?.request.nameofservice}
                    isChat={data?.request.type === "Chat"}
                    // rating="5"
                    />
                  <OrderDetailsBody
                    chat={
                      data?.request.nameofservice === "Chat With A Professional"
                    }
                    isChat={data?.request.type === "Chat"}
                    concerns={data?.request.concerns}
                    consultant_type={data?.request.consultant}
                    genre={data?.request.genre}
                    platform={data?.request.platform}
                    synopsis={data?.request.synopsis}
                    summary={data?.request.summary}
                    script={
                      data?.request.nameofservice ===
                        "Read my Script and advice" ||
                      data?.request.nameofservice ===
                        "Look at my Budget and advice" ||
                      data?.request.nameofservice ===
                        "Create a Production budget" ||
                      data?.request.nameofservice ===
                        "Create a Pitch based on my Script"
                        ? data?.request.movie_title
                        : null
                    }
                    fileLink={data?.request.files && data.request.files[0]}
                    title={data?.request.movie_title}
                    link={data?.request.link}
                    chat_title={data?.request.chat_title}
                    actors={data?.request.actors}
                    budget={data?.request.budgetrange}
                    days={data?.request.days}
                    info={data?.request.info}
                    ooh={data?.request.oohTarget}
                    target_social={data?.request.socialTarget}
                    visual={data?.request.visualStyle}
                    company={data?.request.productionCompany}
                    booktime={data?.request.booktime}
                    contact_info={data?.request.contactInfo}
                  />
                
                </div>
              </div>
            </div>
          </>
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default CustomerOrderDetailsPage;
