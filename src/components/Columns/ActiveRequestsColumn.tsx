import { ColumnDef } from "@tanstack/react-table";
import { GoDotFill } from "react-icons/go";
import CheckboxComponent from "../Checkbox/Checkbox";
import Image from "next/image";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import { Progress } from "@mantine/core";
import MenuComponent from "../Menu/MenuComponent";
import UnstyledButton from "../Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import ModalComponent from "../Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import SetChatDate from "../ModalPages/SetChatDate";
import {
  capitalizeFirstLetter,
  generateColorClass,
  isResolveFile,
} from "@/utils/helperFunction";
import moment from "moment";
import SetChatDateByUser from "../ModalPages/SetChatDateByUser";
import { useLazyFetchActiveRequestsQuery } from "@/lib/features/users/dashboard/requests/requests";
import GenerateDarkServiceLogo from "../Generate/GenerateDarkServiceLogo";

export interface IActiveRequestColumnData {
  name: string;
  service_type:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget";
  progress: number;
  chat_title?: string;
  date: string;
  status: "ready" | "ongoing" | "completed" | "pending" | "awaiting";
  orderId: string;
  booktime?: string;
  cid: string;
}

export const active_requests_columns: ColumnDef<IActiveRequestColumnData>[] = [
  {
    accessorKey: "name",
    header: () => <div className=" py-4 pl-6 ">Service name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[20rem] xl:w-auto pl-6">
          <div
            className={`${generateColorClass(
              row.original.service_type
            )} h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4`}
          >
            <GenerateDarkServiceLogo service={row.original.service_type} />
          </div>
          <div className="text-[0.88rem]">
            <p className="text-black-4 font-medium">
              {row.getValue("name") || row.original.chat_title}
            </p>
            <p className="text-gray-1">{row.original.service_type}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress chart",
    cell: ({ row }) => {
      return (
        <div className="flex items-center py-6">
          <div className="w-[20rem] mr-2">
            <Progress value={row.getValue("progress")} color="#181818" />
          </div>
          <p className="font-medium text-[0.88rem]">
            {row.getValue("progress")}%
          </p>
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
        row.original.status.toLowerCase() === "ready"
          ? "bg-light-blue text-dark-blue"
          : row.original.status.toLowerCase() === "completed"
          ? "bg-light-green text-dark-green"
          : row.original.status === "pending"
          ? "bg-stroke-4 text-black-6"
          : row.original.status === "awaiting"
          ? "bg-light-awaiting text-dark-awaiting"
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
    id: "actions",
    cell: ({ row }) => {
      const [fetchActiveRequest] = useLazyFetchActiveRequestsQuery();
      const [opened, { open, close }] = useDisclosure();
      let formattedDate;
      let time;
      const { cid, booktime, orderId, status } = row.original;
      if (status === "awaiting" && booktime) {
        formattedDate = moment(booktime).format("YYYY-MM-DD");
        time = moment(booktime).format("HH:mm");
      }
      return (
        <>
          <ModalComponent
            opened={opened}
            onClose={close}
            size="xl"
            centered
            withCloseButton={false}
          >
            {formattedDate && time && cid && orderId && (
              <SetChatDateByUser
                close={close}
                cid={cid}
                date={formattedDate}
                orderId={orderId}
                time={time}
                refetch={() => fetchActiveRequest({ limit: 10 })}
              />
            )}
          </ModalComponent>
          <MenuComponent
            target={
              <div>
                <UnstyledButton class="transition-all hover:bg-blue-1 duration-500 px-4 py-2 rounded-md items-center bg-black-3 text-white flex">
                  <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                  <IoIosArrowDown />
                </UnstyledButton>
              </div>
            }
          >
            <div className="bg-white ">
              <ul className="px-1 text-gray-6 text-[0.88rem]">
                <li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                  <Link
                    href={`/user/dashboard/order-details/${row.original.orderId}`}
                  >
                    See Details
                  </Link>
                </li>
                {row.original.status !== "pending" &&
                  isResolveFile(row.original.service_type) && (
                    <li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                      <Link
                        href={`/user/dashboard/order-details/${row.original.orderId}?type=download`}
                      >
                        Download files
                      </Link>
                    </li>
                  )}
                {row.original.status === "awaiting" && (
                  <li
                    onClick={open}
                    className="cursor-pointer py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md"
                  >
                    <p>Set Chat Date</p>
                  </li>
                )}
              </ul>
            </div>
          </MenuComponent>
        </>
      );
    },
  },
];
