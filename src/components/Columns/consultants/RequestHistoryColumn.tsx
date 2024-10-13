import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import Image from "next/image";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import { Rating } from "@mantine/core";
import MenuComponent from "@/components/Menu/MenuComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

export interface ReqHistoryColumnData {
  script: string;
  service_type: string;
  customer: string;
  email: string;
  rating: number;
  date: string;
  status: "Ready" | "Ongoing" | "Completed";
  type?: "consultant" | "user";
}

export const request_history_column: ColumnDef<ReqHistoryColumnData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pl-5">
        <CheckboxComponent label />
      </div>
    ),
    cell: () => (
      <div className="pl-5">
        <CheckboxComponent label />
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: () => <div className="py-4">Customer</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[20rem] xl:w-auto">
          <div className="mr-2">
            <Image src={TestImage} alt="image" />
          </div>
          <div className="">
            <h1 className=" text-black-4 font-medium">
              {row.getValue("customer")}
            </h1>
            <p className="text-gray-1 text-[0.88rem]">{row.original.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "script",
    header: () => <div className="">Service name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[20rem] xl:w-auto py-4">
          <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
            <Image src={ReadMyScriptDarkImg} alt="name-img" />
          </div>
          <div className="text-[0.88rem]">
            <p className="text-black-4 font-medium">{row.getValue("script")}</p>
            <p className="text-gray-1">{row.original.service_type}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date created",
    cell: ({ row }) => {
      return (
        <div className=" w-[10rem] xl:w-auto">
          <p className="text-gray-1 text-[0.88rem]">{row.getValue("date")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const className =
        row.original.status === "Ready"
          ? "bg-light-blue text-dark-blue"
          : row.original.status === "Completed"
          ? "bg-light-green text-dark-green"
          : "bg-light-yellow text-dark-yellow";
      return (
        <div className=" w-[10rem] xl:w-auto">
          <p
            className={`${className} w-fit flex items-center font-medium py-1 px-2 rounded-full`}
          >
            <span className="block pr-1">
              <GoDotFill />
            </span>{" "}
            {row.getValue("status")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      return (
        <div className="w-[15rem] xl:w-auto">
          <Rating defaultValue={row.getValue("rating")} color="#F8C51B" />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //   const [opened, { open, close }] = useDisclosure();
      return (
        <>
          <MenuComponent
            target={
              <UnstyledButton class="px-4 py-2 hover:bg-blue-1 rounded-md items-center bg-black-3 text-white flex">
                <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                <IoIosArrowDown />
              </UnstyledButton>
            }
          >
            {row.original.type === "consultant" ? (
              <div className=""></div>
            ) : (
              <div className="shadow-xl border bg-white border-[#1925321A]">
                <ul>
                  <li
                    className="cursor-pointer"
                    //  onClick={open}
                  >
                    Go to Chat
                  </li>
                  <li>
                    <Link href={"/user/dashboard/order-details/1"}>
                      See Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={
                        "/user/dashboard/order-details/1?page_type=download_files"
                      }
                    >
                      See Details
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </MenuComponent>
        </>
      );
    },
  },
];
