"use client";
import {
  IssuesColumnData,
  issues_columns,
} from "@/components/Columns/IssuesColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import Img1 from "/public/assets/dashboard/issues-img-1.png";
import Img2 from "/public/assets/dashboard/issues-img-2.png";

import React, { useEffect, useState } from "react";
import { useLazyFetchAllIssuesQuery } from "@/lib/features/admin/issues/issues";
import { useProtectAdmin } from "@/hooks/useProtectAdminRoute";
import moment from "moment";

type Props = {};

const AdminIssuesPage = (props: Props) => {
  const [issuesData, setIssuesdData] = useState<IssuesColumnData[]>([]);
  useProtectAdmin();
  const [fetchAllIssues, { data, isFetching }] = useLazyFetchAllIssuesQuery();
  useEffect(() => {
    fetchAllIssues();
  }, []);

  useEffect(() => {
    if (data) {
      const refined_data: IssuesColumnData[] = data.issues.map((el) => {
        return {
          customer: `${el.uid.fname} ${el.uid.lname}`,
          date_created: moment(el.createdAt).format("ll"),
          email: el.uid.email,
          image: el.uid.profilepics,
          service_body: el.complain,
          service_name: el.title,
          status: el.status,
          admin: true,
        };
      });
      setIssuesdData(refined_data);
    }
  }, [data]);

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <DataTable
          columns={issues_columns}
          isFetching={isFetching}
          loaderLength={10}
          data={issuesData}
        />
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminIssuesPage;
