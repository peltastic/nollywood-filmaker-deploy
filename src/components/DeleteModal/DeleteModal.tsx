import React from "react";
import DeleteIcon from "/public/assets/admin/delete-icon.svg";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import Spinner from "@/app/Spinner/Spinner";

type Props = {
  title: string;
  body: string;
  close: () => void;
  isLoading?: boolean;
  deleteAction: () => void;
};

const DeleteModal = (props: Props) => {
  return (
    <section className="px-6 py-4">
      <Image src={DeleteIcon} alt="delete-icon" />
      <h1 className="font-bold text-[2rem] my-6">{props.title}</h1>
      <p className="text-gray-1">{props.body}</p>
      <div className="  w-full flex flex-wrap mt-[5rem]">
        <UnstyledButton
          clicked={props.close}
          class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-black-3 w-full xs:w-auto border ml-auto xs:mr-4"
        >
          No, Cancel
        </UnstyledButton>
        <UnstyledButton clicked={props.deleteAction} class="flex w-[8rem] py-2 px-4 transition-all rounded-md  justify-center items-center text-white border border-red-1 disabled:border-black-2  bg-red-1  disabled:opacity-50 text-[0.88rem] disabled:bg-black-2">
          {props.isLoading ? (
            <div className="w-[1rem] py-1">
              <Spinner />
            </div>
          ) : (
            <p>Yes, Delete</p>
          )}
        </UnstyledButton>
      </div>
    </section>
  );
};

export default DeleteModal;
