"use client";
import {
  IWaitlistColumnData,
  waitlist_column,
} from "@/components/Columns/admin/WaitlistColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useFetchWaitListQuery } from "@/lib/features/admin/waitlist/waitlist";
import moment from "moment";
import React, { useEffect, useState } from "react";

type Props = {};

const Waitlist = (props: Props) => {
  const [waitlistData, setWaitlistData] = useState<IWaitlistColumnData[]>([]);
  const { data, isFetching } = useFetchWaitListQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      const val: IWaitlistColumnData[] = data.data.map((el) => {
        return {
          date: moment(el.createAt).format("ll"),
          email: el.email,
          name: el.name,
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
    </ServiceLayout>
  );
};

export default Waitlist;
