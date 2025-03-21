import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import Image from "next/image";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import { GoDotFill } from "react-icons/go";
import ModalComponent from "@/components/Modal/Modal";
import MenuComponent from "@/components/Menu/MenuComponent";
import { IoIosArrowDown } from "react-icons/io";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Link from "next/link";
import { AspectRatio } from "@mantine/core";
import GenerateDarkServiceLogo from "@/components/Generate/GenerateDarkServiceLogo";
import { generateColorClass } from "@/utils/helperFunction";
import { isAfter, isBefore } from "date-fns";

export interface IConsultantActiveRequestColumnData {
  customer: string;
  email: string;
  script: string;
  service_type:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget";
  date: string;
  status: "ready" | "ongoing" | "completed" | "pending";
  profilepic: string;
  orderId: string;
  type: "service" | "Chat";
  creation_date: string;
  admin?: boolean;
  booktime?: string
  endTime?: string;
}

export const consultant_active_requests_columns: ColumnDef<IConsultantActiveRequestColumnData>[] =
  [
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
            <div className="mr-2 w-[2.5rem] h-[2.5rem]">
              <AspectRatio ratio={1800 / 1800}>
                <Image
                  src={row.original.profilepic}
                  width={100}
                  height={100}
                  alt="image"
                  className="w-full h-full rounded-full"
                />
              </AspectRatio>
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
            <div
              className={`${generateColorClass(
                row.original.service_type
              )} h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4`}
            >
              <GenerateDarkServiceLogo service={row.original.service_type} />
            </div>
            <div className="text-[0.88rem]">
              <p className="text-black-4 font-medium">
                {row.getValue("script")}
              </p>
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
        const now = new Date();
        let isBeforeStartime, isAfterEndTime;
        if (row.original.booktime && row.original.endTime) {
          isBeforeStartime = isBefore(now, row.original.booktime);
          isAfterEndTime = isAfter(now, row.original.endTime);
        }
        const formatted_status = isBeforeStartime
          ? "pending"
          : isAfterEndTime
          ? "completed"
          : row.original.status.toLowerCase();
        const className =
          formatted_status === "ready"
            ? "bg-light-blue text-dark-blue"
            : formatted_status === "completed"
            ? "bg-light-green text-dark-green"
            : formatted_status === "pending"
            ? "bg-stroke-4 text-black-6"
            : "bg-light-yellow text-dark-yellow";
        return (
          <div className=" w-[10rem] xl:w-auto">
            <p
              className={`${className} w-fit flex items-center font-medium py-1 px-2 rounded-full`}
            >
              <span className="block pr-1">
                <GoDotFill />
              </span>{" "}
              {formatted_status}
            </p>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        // const [opened, { open, close }] = useDisclosure();
        // const
        return (
          <>
            <MenuComponent
              target={
                <div>
                  <UnstyledButton class="px-4 py-2 rounded-md items-center bg-black-3 text-white flex">
                    <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                    <IoIosArrowDown />
                  </UnstyledButton>
                </div>
              }
            >
              {row.original.admin ? (
                <div className="bg-white">
                  <ul>
                    <li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                      <Link
                        href={`/admin/dashboard/order-details/${row.original.orderId}`}
                      >
                        See Details
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-white ">
                  <ul className="px-1 text-gray-6 text-[0.88rem]">
                    {row.original.type === "Chat" ? (
                      <Link
                        href={`/consultants/dashboard/chats?chat=${row.original.orderId}`}
                      >
                        <li
                          // onClick={open}
                          className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                        >
                          Go to Chat
                        </li>
                      </Link>
                    ) : null}
                    <li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                      <Link
                        href={`/consultants/dashboard/${row.original.orderId}/order-details`}
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
