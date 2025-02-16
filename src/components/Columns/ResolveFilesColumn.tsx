import { ColumnDef } from "@tanstack/react-table";
import CheckboxComponent from "../Checkbox/Checkbox";
import Image from "next/image";
import FileImg from "/public/assets/dashboard/file.svg";
import Link from "next/link";

export interface IResolveFilesColumnData {
  name: string;
  size: string;
  date: string;
  last_updated: string;
  uploaded_by: string;
  file: string;
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
        <Link href={row.original.file}>
          <div
            className={`cursor-pointer py-4 flex items-center w-[20rem] xl:w-auto`}
          >
            <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
              <Image src={FileImg} alt="file-img" />
            </div>
            <div className="text-[0.88rem]">
              <p className="text-black-4 font-medium">{row.getValue("name")}</p>
              <p className="text-gray-1">{row.original.size}</p>
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "size",
    header: "File size",
    cell: ({ row }) => {
      return (
        <div className={` py-6 w-[7rem] xl:w-auto`}>
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
        <div className="w-[10rem] xl:w-auto">
          <p className="text-gray-1 text-[0.88rem]">{row.getValue("date")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "last_updated",
    header: "Last updated",
    cell: ({ row }) => {
      return (
        <div className="w-[10rem] xl:w-auto">
          <p className="text-gray-1 text-[0.88rem]">
            {row.getValue("last_updated")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "uploaded_by",
    header: "Uploaded By",
    cell: ({ row }) => {
      return (
        <div className="w-[10rem] xl:w-auto">
          <p className="text-gray-1 text-[0.88rem]">
            {row.getValue("uploaded_by")}
          </p>
        </div>
      );
    },
  },
];
