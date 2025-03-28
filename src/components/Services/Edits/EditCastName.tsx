import InputComponent from "@/components/Input/Input";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdAdd, MdDelete } from "react-icons/md";

type Props = {
  updateCastNameProps: (
    value: string,
    type: "add" | "delete" | "update",
    index: number
  ) => void;
  value: string;
  index: number;
};

const EditCastName = (props: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <>
      {edit ? (
        <div className="mt-4">
          <InputComponent
            value={props.value}
            label="Cast name"
            placeholder="Name"
            changed={(val) =>
              props.updateCastNameProps(val, "update", props.index)
            }
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
          {edit && (
            <button
              onClick={() => setEdit(false)}
              disabled={!props.value}
              className="disabled:opacity-40 text-white  flex items-center justify-center h-[1.5rem] w-[1.5rem] bg-black-2 mt-6 rounded-full"
            >
              <MdAdd />
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 text-[0.88rem] flex items-center">
          <div className="mr-auto">
            <h1 className="font-semibold">{props.value}</h1>
          </div>
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={() => setEdit(true)}>
              <FaPen className="text-lg mr-2" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                props.updateCastNameProps(props.value, "delete", props.index);
              }}
            >
              <MdDelete className="text-xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCastName;
