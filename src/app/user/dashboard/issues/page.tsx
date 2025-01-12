"use client";

import {
  UserIssuesColumnData,
  issues_columns,
} from "@/components/Columns/UserIssuesColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useGetUsersIssuesQuery } from "@/lib/features/users/issues/issues";
import { RootState } from "@/lib/store";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const DashboardIssues = (props: Props) => {
  const [issuesData, setIssuesData] = useState<UserIssuesColumnData[]>([]);
  useProtectRoute();
  const id = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const { data, isFetching } = useGetUsersIssuesQuery(id!, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      const refined_data: UserIssuesColumnData[] = data.issues.map((el) => {
        return {
          complain: el.complain,
          date_created: moment(el.createdAt).format("ll"),
          id: el._id,
          status: el.status,
          title: el.title,
        };
      });
      setIssuesData(refined_data);
    }
  }, [data]);

  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <DataTable
          columns={issues_columns}
          isFetching={isFetching}
          loaderLength={10}
          data={issuesData}
          title="My Issues"
          emptyHeader="No Issues"
          emptyBody="Reported issues will show up here"
        />
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default DashboardIssues;
