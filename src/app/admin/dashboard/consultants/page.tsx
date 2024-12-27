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
import { useFetchAllConsultantQuery } from "@/lib/features/admin/consultants/consultants";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";

type Props = {};

const AdminConsultantPage = (props: Props) => {
  useProtectAdmin();
  const [opened, { open, close }] = useDisclosure();
  const [consultantPageData, setConsultantPageData] = useState<
    IAdminConsultantData[]
  >([]);
  const { data, isFetching } = useFetchAllConsultantQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      const refined_data: IAdminConsultantData[] = data.consultants.map(
        (el) => {
          return {
            consultant: `${el.fname} ${el.lname}`,
            date: moment(el.createdAt).format("ll"),
            email: el.email,
            expertise: el.expertise.slice(0,3),
            location:
              el.location?.country && el.location.state
                ? `${el.location.state}, ${el.location.country}`
                : "N/A",
            id: el._id,
            number: el.phone,
            fname: el.fname,
            lname: el.lname
          };
        }
      );
      setConsultantPageData(refined_data)
    }
  }, [data]);

  return (
    <>
      <ModalComponent
        onClose={close}
        size="xl"
        withCloseButton={false}
        opened={opened}
        centered
      >
        <CreateNewConsultantModal close={close} />
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
        </DashboardBodyLayout>
      </ServiceLayout>
    </>
  );
};

export default AdminConsultantPage;
