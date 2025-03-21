"use client";
import { IResolveFilesColumnData, resolve_files_columns } from "@/components/Columns/ResolveFilesColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import OrderDetailsBody from "@/components/OrderDetails/OrderDetailsBody";
import OrderDetailsHeader from "@/components/OrderDetails/OrderDetailsHeader";
import OrderDetailsServiceChat from "@/components/OrderDetails/OrderDetailsServiceChat";
import OrderDetailsTop from "@/components/OrderDetails/OrderDetailsTop";
import OrderDetailsPageSkeleton from "@/components/Skeletons/OrderDetailsPageSkeleton";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectRouteConsultantRoute } from "@/hooks/useProtectConsultantRoute";
import {
  useLazyFetchResolvedFilesConsultantQuery,
  useLazyGetCustomerRequestDetailQuery,
} from "@/lib/features/consultants/dashboard/request";
import { isResolveFile } from "@/utils/helperFunction";
import moment from "moment";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const OrderDetails = (props: Props) => {
  useProtectRouteConsultantRoute();
  const params = useParams();
  const [resolveFilesData, setResolveFilesData] = useState<
  IResolveFilesColumnData[]
>([]);

  const [getCustomerReqDetails, { isFetching, data, isSuccess }] =
    useLazyGetCustomerRequestDetailQuery();
  const [fetchResolveFiles, result] =
    useLazyFetchResolvedFilesConsultantQuery();
  useEffect(() => {
    if (data) {
      const isResolve = isResolveFile(data.request.nameofservice);

      if (isResolve) {
        setIsResolveFile(true);
      } else {
        setIsResolveFile(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (params.id) {
      getCustomerReqDetails(params.id as string);
      fetchResolveFiles(params.id as string);
    }
  }, [params]);

  useEffect(() => {
    if (result.data) {
      const refined_data: IResolveFilesColumnData[] = result.data.files.map(
        (el) => {
          return {
            date: moment(el.createdAt).fromNow(),
            last_updated: moment(el.createdAt).fromNow(),
            name: el.filename,
            file: el.filepath,
            size: `${(el.size / 1000000).toFixed(2)} MB`,
            uploaded_by: "Admin",
          };
        }
      );
      setResolveFilesData(refined_data);
    }
  }, [result.data]);

  const [isResolveFileState, setIsResolveFile] = useState<boolean>(false);
  return (
    <ServiceLayout consultant>
      <DashboardBodyLayout>
        {isFetching ? (
          <OrderDetailsPageSkeleton />
        ) : (
          <>
            <OrderDetailsHeader
              isChat={
                data?.request.nameofservice === "Chat With A Professional" ||
                data?.request.type === "Chat"
              }
              status={data?.request.stattusof}
              statusValue={data?.request.stattusof}
              consultant
              orderId={data?.request.orderId}
              chat_title={data?.request.movie_title}
              summary={data?.request.summary || data?.request.synopsis || ""}
              userId={data?.request.userId}
              nameofservice={data?.request.nameofservice}
              expertise={data?.request.expertise}
              refetch={() => {
                if (params.id) {
                  getCustomerReqDetails(params.id as string);
                  fetchResolveFiles(params.id as string);
                }
              }}
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
                  order_no={data?.request.orderId}
                  order_type={data?.request.nameofservice}
                  isChat={data?.request.type === "Chat"}
                />
                <OrderDetailsBody data={data} />
                {isResolveFileState && (
                  <div className="mt-14" >
                    <DataTable
                      columns={resolve_files_columns}
                      data={resolveFilesData}
                      title="Request Resolve Files"
                      faded
                      emptyHeader="No files yet"
                      isFetching={result.isFetching}
                      loaderLength={5}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className=" lg:w-[80%] ml-auto">
                {data && (
                  <OrderDetailsServiceChat
                    service={data.request.nameofservice}
                    type="consultant"
                    orderId={data.request.orderId}
                    refecth={() => {
                      if (params.id) {
                        getCustomerReqDetails(params.id as string);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default OrderDetails;
