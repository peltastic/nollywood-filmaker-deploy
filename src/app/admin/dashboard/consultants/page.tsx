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
import { useDisclosure } from "@mantine/hooks";
import React from "react";

type Props = {};

const AdminConsultantPage = (props: Props) => {
  const [opened, { open, close }] = useDisclosure();
  const consultant: IAdminConsultantData[] = [
    {
      consultant: "Jenny Wilson",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Davon Lane",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Jane Cooper",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Jenny Wilson",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Davon Lane",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Jane Cooper",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Jenny Wilson",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Davon Lane",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Jane Cooper",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Jenny Wilson",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Davon Lane",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
    {
      consultant: "Jane Cooper",
      email: "w.lawson@example.com",
      number: "09087675243",
      date: "22 Jan 2022",
      expertise: ["Producer", "Director"],
      location: "Lagos, Nigeria",
    },
  ];
  return (
    <>
      <ModalComponent onClose={close} size="xl" withCloseButton={false} opened={opened} centered>
        <CreateNewConsultantModal close={close} />
      </ModalComponent>
      <ServiceLayout admin>
        <DashboardBodyLayout>
          <DataTable
            showMoreBtnContent="Add New"
            title="Consultants"
            columns={admin_consultant_column}
            data={consultant}
            clicked={open}
          />
        </DashboardBodyLayout>
      </ServiceLayout>
    </>
  );
};

export default AdminConsultantPage;
