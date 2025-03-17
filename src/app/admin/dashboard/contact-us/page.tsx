"use client"

import {
  IAdminContactusData,
  admin_contact_us,
} from "@/components/Columns/admin/AdminContactUsColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { DataTable } from "@/components/Tables/DataTable";
import { useLazyFetchContactUsResponsesQuery } from "@/lib/features/admin/contact-us/contact-us";
import { Pagination } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useState } from "react";

type Props = {};

const ContactUsResponsesPage = (props: Props) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [contactUsData, setContactUsData] = useState<IAdminContactusData[]>([]);
  const [getContactResponse, { data, isError, isFetching, isSuccess }] =
    useLazyFetchContactUsResponsesQuery();

  useEffect(() => {
    if (data) {
      const val: IAdminContactusData[] = data.submissions.map((el) => {
        return {
          date: moment(el.submittedAt).format("ll"),
          email: el.email,
          fullname: `${el.firstName} ${el.lastName}`,
          id: el._id,
          message: el.message,
          phone: el.phone,
        };
      });
      setContactUsData(val);
    }
  }, [data]);

  useEffect(() => {
    getContactResponse({});
  }, []);

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <DataTable
          columns={admin_contact_us}
          data={contactUsData}
          loaderLength={10}
          title="Contact us response"
          isFetching={isFetching}
          emptyHeader="No responses yet"
        />
        <div className="px-10 mb-10">
          {data && data.totalPages > 1 && (
            <Pagination
              total={data.totalPages}
              value={activePage}
              color="#333333"
              onChange={(val) => {
                setActivePage(val);
                getContactResponse({ page: val });
              }}
              mt={"xl"}
            />
          )}
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default ContactUsResponsesPage;
