import FileButtonComponent from "@/components/FileButton/FileButtonComponent";
import React from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type Props = {
  updateFile: (
    file: File[],
    index: number,
    type: "update" | "delete" | "add"
  ) => void;
  index: number;
  file: File;
};

const EditFiles = (props: Props) => {
  return (
    <div className="flex items-center bg-gray-bg-1 py-2 px-4 rounded-md mt-6">
      <div className="text-[0.88rem]">
        <p className="font-semibold">{props.file.name}</p>
        <p>{(props.file.size /  (1024 * 1024)).toFixed(2)} MB</p>
      </div>
      <div className="ml-auto flex items-center">
        <FileButtonComponent
          accept=""
          setFile={(file) => {
            if (file) {
              props.updateFile([file], props.index, "update");
            }
          }}
        >
          <div className="cursor-pointer">
            <FaPen className="text-xl mr-2" />
          </div>
        </FileButtonComponent>
        <div
          className="cursor-pointer"
          onClick={() => {
            props.updateFile([props.file], props.index, "delete");
          }}
        >
          <MdDelete className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default EditFiles;
