"use client";
import {
  IWaitlistColumnData,
  waitlist_column,
} from "@/components/Columns/admin/WaitlistColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useLazyFetchWaitListQuery } from "@/lib/features/admin/waitlist/waitlist";
import { Pagination } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useState } from "react";

type Props = {};

const Waitlist = (props: Props) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [waitlistData, setWaitlistData] = useState<IWaitlistColumnData[]>([]);
  const [getWaitList, { data, isFetching }] = useLazyFetchWaitListQuery();

  useEffect(() => {
    getWaitList({});
  }, []);
  useEffect(() => {
    if (data) {
      const val: IWaitlistColumnData[] = data.data.map((el) => {
        return {
          date: moment(el.createAt).format("ll"),
          email: el.email,
          name: el.name,
          page: activePage
        };
      });
      setWaitlistData(val);
    }
  }, [data]);

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <DataTable
          columns={waitlist_column}
          loaderLength={10}
          isFetching={isFetching}
          emptyBody=""
          emptyHeader="Nobody on waitlist"
          title="Nollywood filmmaker waitlist"
          data={waitlistData}
        />
      </DashboardBodyLayout>
      <div className="px-10 mb-10">
        {data && data.pagination.totalPages > 1 && (
          <Pagination
            total={data.pagination.totalPages}
            value={activePage}
            color="#333333"
            onChange={(val) => {
              setActivePage(val);
              getWaitList({ page: val });
            }}
            mt={"xl"}
          />
        )}
      </div>
    </ServiceLayout>
  );
};

export default Waitlist;
