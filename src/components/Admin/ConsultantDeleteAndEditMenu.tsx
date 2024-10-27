import React from "react";
import ModalComponent from "../Modal/Modal";
import CreateNewConsultantModal from "./CreateNewConsultantModal";
import { useDisclosure } from "@mantine/hooks";
import DeleteModal from "../DeleteModal/DeleteModal";

type Props = {};

const ConsultantDeleteAndEditMenu = (props: Props) => {
  const [opened, { close, open }] = useDisclosure();
  const [deleteOpenedModal, deleteModalOptions] = useDisclosure();
  return (
    <>
      <ModalComponent
        size="xl"
        opened={opened}
        withCloseButton={false}
        onClose={close}
        >
        <CreateNewConsultantModal close={close} edit />
      </ModalComponent>
      <ModalComponent
          withCloseButton={false}
        size="xl"
        opened={deleteOpenedModal}
        onClose={deleteModalOptions.close}
        centered
      >
        <DeleteModal
          close={deleteModalOptions.close}
          title="Delete consultant"
          body="Are you sure you want to remove this consultant? Once a consultant is removed, any projects assigned to them will be redirected to other available consultants. This action cannot be undone. "
        />
      </ModalComponent>
      <ul className="text-[0.88rem] min-w-[8rem] text-gray-6">
        <li
          onClick={open}
          className=" py-2 px-4 cursor-pointer hover:bg-gray-bg-1 transition-all rounded-md"
        >
          Edit
        </li>
        <li
          onClick={deleteModalOptions.open}
          className="py-2 px-4 cursor-pointer hover:bg-gray-bg-1 transition-all rounded-md"
        >
          Delete
        </li>
      </ul>
    </>
  );
};

export default ConsultantDeleteAndEditMenu;
