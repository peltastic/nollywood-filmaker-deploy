import { ColumnDef } from "@tanstack/react-table";
import { IActiveRequestColumnData } from "./ActiveRequestsColumn";
import { GoDotFill } from "react-icons/go";
import MenuComponent from "../Menu/MenuComponent";
import UnstyledButton from "../Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import CheckboxComponent from "../Checkbox/Checkbox";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import Image from "next/image";
import { Progress, Rating } from "@mantine/core";
import Link from "next/link";
import ModalComponent from "../Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import CustomCalender from "@/components/CustomCalender/CustomCalender";
import CustomTime from "../CustomTime/CustomTime";
import GenerateDarkServiceLogo from "../Generate/GenerateDarkServiceLogo";
import { generateColorClass } from "@/utils/helperFunction";

export interface ReqHistoryColumnData {
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
  rating: number;
  date: string;
  status: "pending" | "ongoing" | "ready" | "completed" | "awaiting";
  orderId: string;
}

export const request_history_columns: ColumnDef<ReqHistoryColumnData>[] = [
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
    accessorKey: "name",
    header: () => <div className=" py-4 ">Service name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className={`${generateColorClass(row.original.service_type)} h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4`}>
           <GenerateDarkServiceLogo service={row.original.service_type} />
          </div>
          <div className="text-[0.88rem]">
            <p className="text-black-4 font-medium">{row.getValue("name")}</p>
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
        <div className="flex items-center py-8">
          <div className="w-[15rem] mr-2">
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
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      return <Rating defaultValue={row.getValue("rating")} color="#F8C51B" />;
    },
  },

  {
    accessorKey: "date",
    header: "Date created",
    cell: ({ row }) => {
      return (
        <p className="text-gray-1 text-[0.88rem]">{row.getValue("date")}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const className =
        row.original.status === "ready"
          ? "bg-light-blue text-dark-blue"
          : row.original.status === "completed"
          ? "bg-light-green text-dark-green"
          : "bg-light-yellow text-dark-yellow";
      return (
        <p
          className={`${className} w-fit flex items-center font-medium py-1 px-2 rounded-full`}
        >
          <span className="block pr-1">
            <GoDotFill />
          </span>{" "}
          {row.getValue("status")}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [opened, { open, close }] = useDisclosure();
      return (
        <>
          <ModalComponent
            onClose={close}
            withCloseButton={false}
            opened={opened}
          >
            <div className="flex">
              <CustomCalender value={new Date()} onChange={() => {}} />
              <CustomTime selectedTime="11:00 AM" />
            </div>
          </ModalComponent>
          <MenuComponent
            target={
              <div>
                <UnstyledButton class="px-4 py-2 hover:bg-blue-1 rounded-md items-center bg-black-3 text-white flex">
                  <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                  <IoIosArrowDown />
                </UnstyledButton>
              </div>
            }
          >
            <div className="sborder bg-white ">
              <ul className="px-1 text-gray-6 text-[0.88rem]">
                <li>
                  <Link
                    href={`/user/dashboard/order-details/${row.original.orderId}`}
                  >
                    See Details
                  </Link>
                </li>
              </ul>
            </div>
          </MenuComponent>
        </>
      );
    },
  },
];
