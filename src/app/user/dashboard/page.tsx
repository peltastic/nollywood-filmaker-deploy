"use client";
import Header from "@/components/Dashboard/Header";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/Tables/DataTable";
import {
  IActiveRequestColumnData,
  active_requests_columns,
} from "@/components/Columns/ActiveRequestsColumn";
import {
  request_history_columns,
  ReqHistoryColumnData,
} from "@/components/Columns/RequestHistoryColumns";
import moment from "moment";
import {
  useLazyFetchActiveRequestsQuery,
  useLazyFetchUserRequestHistoryQuery,
} from "@/lib/features/users/dashboard/requests/requests";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import ModalComponent from "@/components/Modal/Modal";
import SetChatDateByUser from "@/components/ModalPages/SetChatDateByUser";
import { Pagination } from "@mantine/core";
import Link from "next/link";

type Props = {};

const DashboardHomePgae = (props: Props) => {
  useProtectRoute();
  const [reqHistoryData, setReqHistoryData] = useState<ReqHistoryColumnData[]>(
    []
  );
  const [activePage, setActivePage] = useState<number>(1);
  const search = useSearchParams();
  const cid = search.get("cid");
  const orderId = search.get("orderId");
  const date = search.get("date");
  const time = search.get("time");
  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );

  useProtectRoute();
  const [activeReqData, setActiveReqData] = useState<
    IActiveRequestColumnData[]
  >([]);
  const [fetchActiveRequest, { data, isFetching }] =
    useLazyFetchActiveRequestsQuery();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );

  const [opened, { open, close }] = useDisclosure();
  const [fetchRequestHistory, result] = useLazyFetchUserRequestHistoryQuery();

  useEffect(() => {
    if (data) {
      const formattedData = data.requests.map((el) => {
        return {
          name: el.movie_title,
          date: moment(el.createdAt).format("ll"),
          status: el.stattusof,
          service_type: el.nameofservice,
          chat_title: el.chat_title,
          orderId: el.orderId,
          booktime: el.booktime,
          endTime: el.endTime,
          cid: el.cid,
          progress:
            el.stattusof === "completed"
              ? 100
              : el.stattusof === "ongoing"
              ? 50
              : el.stattusof === "pending"
              ? 25
              : el.stattusof === "awaiting"
              ? 40
              : 100,
        };
      });
      setActiveReqData(formattedData);
    }
  }, [data]);

  useEffect(() => {
    fetchActiveRequest({ limit: 10 });
    fetchRequestHistory({ userId: userId!, limit: 5 });
  }, []);

  useEffect(() => {
    if (result.isSuccess) {
      const modData: ReqHistoryColumnData[] = result.data.requests.map((el) => {
        return {
          date: moment(el.createdAt).format("ll"),
          name: el.movie_title || el.chat_title,
          progress: 100,
          rating: 5,
          service_type: el.nameofservice,
          status: el.stattusof,
          orderId: el.orderId,
        };
      });
      setReqHistoryData(modData);
    }
  }, [result.isSuccess]);
  useEffect(() => {
    if (cid && orderId && time && date) {
      open();
    }
  }, [cid, orderId, time, date]);
  return (
    <>
      <ModalComponent
        opened={opened}
        centered
        onClose={close}
        withCloseButton={false}
        size="xl"
      >
        {orderId && cid && date && time && (
          <SetChatDateByUser
            close={close}
            cid={cid}
            date={date}
            orderId={orderId}
            time={time}
            refetch={() => fetchActiveRequest({ limit: 10 })}
          />
        )}
      </ModalComponent>
      <ServiceLayout>
        <DashboardBodyLayout>
          <div className="px-4 xs:px-8 chatbp:px-0">
            <Header
              fname={userData?.fname || ""}
              lname={userData?.lname || ""}
              ppicture={userData?.profilepics}
            />

            <div className="mt-14">
              <DataTable
                title="Active requests"
                columns={active_requests_columns}
                data={activeReqData}
                loaderLength={4}
                isFetching={isFetching}
                emptyHeader="You have no active requests"
                emptyBody="Any requests you have made will show up here."
              />
            </div>
            {data && data.total > 10 && (
              <Pagination
                total={
                  data.total % 10
                    ? Math.floor(data.total / 10) + 1
                    : data.total / 10
                }
                value={activePage}
                color="#333333"
                onChange={(val) => {
                  fetchActiveRequest({
                    limit: 10,
                    page: val,
                  });
                  setActivePage(val);
                }}
                mt={"xl"}
              />
            )}
            <div className="mt-14">
              <DataTable
                link="/user/dashboard/request-history"
                showMoreBtnContent="See All"
                title="Request History"
                subtitle="Keep track of all your past requests"
                columns={request_history_columns}
                isFetching={result.isFetching}
                loaderLength={5}
                data={reqHistoryData}
                emptyHeader="No completed requests"
                emptyBody="Any requests you made will show up here."
              />
            </div>
          </div>
        </DashboardBodyLayout>
      </ServiceLayout>
    </>
  );
};

export default DashboardHomePgae;
