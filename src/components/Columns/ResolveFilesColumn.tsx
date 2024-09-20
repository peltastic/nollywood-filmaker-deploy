import { ColumnDef } from "@tanstack/react-table";
import CheckboxComponent from "../Checkbox/Checkbox";
import Image from "next/image";
import FileImg from "/public/assets/dashboard/file.svg";

export interface IResolveFilesColumnData {
  name: string;
  size: string;
  date: string;
  last_updated: string;
  uploaded_by: string;
}

export const resolve_files_columns: ColumnDef<IResolveFilesColumnData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pl-5">
        <CheckboxComponent label />
      </div>
    ),
    cell: ({ row }) => (
      <div className={`pl-5 py-6`}>
        <CheckboxComponent label />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="">File name</div>,
    cell: ({ row }) => {
      return (
        <div className={`$ py-4 flex items-center`}>
          <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
            <Image src={FileImg} alt="file-img" />
          </div>
          <div className="text-[0.88rem]">
            <p className="text-black-4 font-medium">{row.getValue("name")}</p>
            <p className="text-gray-1">{row.original.size}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "File size",
    cell: ({ row }) => {
      return (
        <div className={` py-6`}>
          <p className="text-gray-1 text-[0.88rem] ">{row.getValue("size")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date uploaded",
    cell: ({ row }) => {
      return (
        <p className="text-gray-1 text-[0.88rem]">{row.getValue("date")}</p>
      );
    },
  },
  {
    accessorKey: "last_updated",
    header: "Last updated",
    cell: ({ row }) => {
      return (
        <p className="text-gray-1 text-[0.88rem]">
          {row.getValue("last_updated")}
        </p>
      );
    },
  },
  {
    accessorKey: "uploaded_by",
    header: "Uploaded By",
    cell: ({ row }) => {
      return (
        <p className="text-gray-1 text-[0.88rem]">
          {row.getValue("uploaded_by")}
        </p>
      );
    },
  },
];
