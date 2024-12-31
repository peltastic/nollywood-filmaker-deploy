import React from "react";
import ModalComponent from "../Modal/Modal";
import CreateNewConsultantModal from "./CreateNewConsultantModal";
import { useDisclosure } from "@mantine/hooks";
import DeleteModal from "../DeleteModal/DeleteModal";

type Props = {
  openEdit: () => void
  openDelete: () => void
};

const ConsultantDeleteAndEditMenu = ({openDelete, openEdit}: Props) => {
  return (
    <>
      <ul className="text-[0.88rem] min-w-[8rem] text-gray-6">
        <li
          onClick={openEdit}
          className=" py-2 px-4 cursor-pointer hover:bg-gray-bg-1 transition-all rounded-md"
        >
          Edit
        </li>
        <li
          onClick={openDelete}
          className="py-2 px-4 cursor-pointer hover:bg-gray-bg-1 transition-all rounded-md"
        >
          Delete
        </li>
      </ul>
    </>
  );
};

export default ConsultantDeleteAndEditMenu;
