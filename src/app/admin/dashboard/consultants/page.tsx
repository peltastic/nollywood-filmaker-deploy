"use client";
import CreateNewConsultantModal from "@/components/Admin/CreateNewConsultantModal";
import {
  IAdminConsultantData,
  admin_consultant_column,
} from "@/components/Columns/admin/ConsultantColumns";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ModalComponent from "@/components/Modal/Modal";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectAdmin } from "@/hooks/useProtectAdminRoute";
import {
  useLazyFetchAllConsultantQuery,
} from "@/lib/features/admin/consultants/consultants";
import { Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";

type Props = {};

const AdminConsultantPage = (props: Props) => {
  useProtectAdmin();
  const [activePage, setActivePage] = useState<number>(1);
  const [opened, { open, close }] = useDisclosure();
  const [consultantPageData, setConsultantPageData] = useState<
    IAdminConsultantData[]
  >([]);
  const [getAllConsultants, { data, isFetching }] =
    useLazyFetchAllConsultantQuery();

  useEffect(() => {
    if (data) {
      const refined_data: IAdminConsultantData[] = data.consultants.map(
        (el) => {
          return {
            consultant: `${el.fname} ${el.lname}`,
            date: moment(el.createdAt).format("ll"),
            email: el.email,
            expertise: el.expertise.slice(0, 3),
            location:
              el.location?.country && el.location.state
                ? `${el.location.state}, ${el.location.country}`
                : "N/A",
            id: el._id,
            number: el.phone,
            fname: el.fname,
            lname: el.lname,
          };
        }
      );
      setConsultantPageData(refined_data);
    }
  }, [data]);

  useEffect(() => {
    getAllConsultants({
      limit: 10,
      page: activePage,
    });
  }, []);

  const refresh = () => {
    getAllConsultants({
      limit: 10,
      page: activePage,
    });
  };

  return (
    <>
      <ModalComponent
        onClose={close}
        size="xl"
        withCloseButton={false}
        opened={opened}
        centered
      >
        <CreateNewConsultantModal refresh={refresh} close={close} />
      </ModalComponent>
      <ServiceLayout admin>
        <DashboardBodyLayout>
          <DataTable
            showMoreBtnContent="Add New"
            title="Consultants"
            columns={admin_consultant_column}
            data={consultantPageData}
            isFetching={isFetching}
            loaderLength={10}
            clicked={open}
            emptyHeader="No consultants"
          />
          {data && data.pagination.totalPages > 1  && (
            <Pagination
              total={data.pagination.totalPages}
              value={activePage}
              color="#333333"
              onChange={(val) => {
                getAllConsultants({
                  limit: 10,
                  page: val,
                });
                setActivePage(val);
              }}
              mt={"xl"}
            />
          )}
        </DashboardBodyLayout>
      </ServiceLayout>
    </>
  );
};

export default AdminConsultantPage;
