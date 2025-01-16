"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React, { useEffect, useRef, useState } from "react";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import OrderDetailsHeader from "@/components/OrderDetails/OrderDetailsHeader";
import OrderDetailsTop from "@/components/OrderDetails/OrderDetailsTop";
import OrderDetailsBody from "@/components/OrderDetails/OrderDetailsBody";
import { useParams, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/Tables/DataTable";
import {
  IResolveFilesColumnData,
  resolve_files_columns,
} from "@/components/Columns/ResolveFilesColumn";

import OrderDetailsPageSkeleton from "@/components/Skeletons/OrderDetailsPageSkeleton";
import moment from "moment";
import {
  useLazyFetchResolvedFilesQuery,
  useLazyGetCustomerRequestDetailQuery,
} from "@/lib/features/users/dashboard/requests/requests";
import { isResolveFile } from "@/utils/helperFunction";

type Props = {};

const OrderDetailsPage = (props: Props) => {
  const [resolveFilesData, setResolveFilesData] = useState<
    IResolveFilesColumnData[]
  >([]);
  const ref = useRef<HTMLDivElement>(null);
  const search = useSearchParams();
  const [isResolveFileState, setIsResolveFile] = useState<boolean>(false);
  const params = useParams();
  const searchVal = search.get("type");
  const [getCustomerReqDetails, { isFetching, data }] =
    useLazyGetCustomerRequestDetailQuery();
  const [fetchResolveFiles, result] = useLazyFetchResolvedFilesQuery();

  useEffect(() => {
    if (params.id) {
      getCustomerReqDetails(params.id as string);
      fetchResolveFiles(params.id as string);
    }
  }, [params]);

  useEffect(() => {
    if (!ref.current) return () => {};
    if (searchVal && result.data) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end",
      });
    }
  }, [searchVal, result.data]);

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
    if (result.data) {
      const refined_data: IResolveFilesColumnData[] = result.data.files.map(
        (el) => {
          return {
            date: moment(el.createdAt).fromNow(),
            last_updated: moment(el.createdAt).fromNow(),
            name: el.filename,
            file: el.filepath,
            size: `${el.size / 1000000} MB`,
            uploaded_by: "Admin",
          };
        }
      );
      setResolveFilesData(refined_data);
    }
  }, [result.data]);

  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        {isFetching ? (
          <OrderDetailsPageSkeleton noUserInfo />
        ) : (
          <>
            <OrderDetailsHeader
              status={data?.request.stattusof}
              statusValue={data?.request.stattusof}
              isChat={
                data?.request.nameofservice === "Chat With A Professional" ||
                data?.request.type === "Chat"
              }
              orderId={data?.request.orderId}
              user
            />
            <div className="w-[90%] lg:w-[82%] mx-auto">
              <OrderDetailsTop
                order_date={data?.request.date}
                order_no={data?.request.orderId}
                order_type={data?.request.nameofservice}
                isChat={data?.request.type === "Chat"}
              />
              <OrderDetailsBody
                chat={
                  data?.request.nameofservice === "Chat With A Professional"
                }
                concerns={data?.request.concerns}
                consultant_type={data?.request.consultant}
                genre={data?.request.genre}
                platform={data?.request.platform}
                synopsis={data?.request.synopsis}
                isChat={data?.request.type === "Chat"}
                summary={data?.request.summary}
                script={
                  data?.request.nameofservice === "Read my Script and advice" ||
                  data?.request.nameofservice ===
                    "Look at my Budget and advice" ||
                  data?.request.nameofservice ===
                    "Create a Production budget" ||
                  data?.request.nameofservice ===
                    "Create a Pitch based on my Script"
                    ? data?.request.filename
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
                contact_info={data?.request.contactInfo}
                booktime={data?.request.booktime}
              />
              {isResolveFileState && (
                <div className="mt-14" ref={ref}>
                  <DataTable
                    columns={resolve_files_columns}
                    data={resolveFilesData}
                    title="Request Resolve Files"
                    faded
                  />
                </div>
              )}
            </div>
          </>
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default OrderDetailsPage;
