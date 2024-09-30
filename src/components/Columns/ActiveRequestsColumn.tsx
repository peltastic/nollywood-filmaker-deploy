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

export interface IActiveRequestColumnData {
  name: string;
  service_type:
    | "Read my script"
    | "Watch the Final cut of my film"
    | "Create a production Budget";
  progress: number;

  date: string;
  status: "Ready" | "Ongoing" | "Completed";
}

export const active_requests_columns: ColumnDef<IActiveRequestColumnData>[] = [
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
        <div className="flex items-center w-[20rem] xl:w-auto">
          <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
            <Image src={ReadMyScriptDarkImg} alt="name-img" />
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
        <div className="flex items-center py-4">
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
    id: "actions",
    cell: ({}) => {
      const [opened, { open, close }] = useDisclosure();
      // const
      return (
        <>
          <ModalComponent
            onClose={close}
            withCloseButton={false}
            opened={opened}
            size="xl"
            centered
          >
              <SetChatDate open={open} close={close} />
          </ModalComponent>
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
            <div className="bg-white ">
              <ul className="px-1 text-gray-6 text-[0.88rem]">
                <li
                  onClick={open}
                  className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                >
                  Go to Chat
                </li>
                <li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                  <Link href={"/user/dashboard/order-details/1"}>
                    See Details
                  </Link>
                </li>
                <li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                  <Link
                    href={
                      "/user/dashboard/order-details/1?page_type=download_files"
                    }
                  >
                    Download files
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
