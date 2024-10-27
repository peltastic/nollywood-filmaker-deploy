import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import { Progress, Rating } from "@mantine/core";
import { GoDotFill } from "react-icons/go";
import ModalComponent from "@/components/Modal/Modal";
import MenuComponent from "@/components/Menu/MenuComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";

export interface IAdminRequestHistory {
  service_name: string;
  service_type: string;
  progress: number;
  rating: number;
  date_created: string;
  status: "Ready" | "Ongoing" | "Completed" | "Pending";
}

export const admin_customer_request_history_column: ColumnDef<IAdminRequestHistory>[] =
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
      accessorKey: "script",
      header: () => <div className="">Service name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center w-[20rem] chatbp::w-auto py-4">
            <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
              <Image src={ReadMyScriptDarkImg} alt="name-img" />
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
      accessorKey: "progress",
      header: "Progress chart",
      cell: ({ row }) => {
        return (
          <div className="flex items-center py-4 w-[20rem] chatbp:w-auto">
            <div className="w-[25rem] mr-2">
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
        return (
          <div className="w-[10rem] chatbp:w-auto">
            <Rating defaultValue={row.getValue("rating")} color="#F8C51B" />
          </div>
        );
      },
    },
    {
      accessorKey: "date_created",
      header: "Date created",
      cell: ({ row }) => {
        return (
          <div className="w-[10rem] chatbp:w-auto">
            <p className="text-gray-1 text-[0.88rem]">
              {row.getValue("date_created")}
            </p>
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
          <div className="w-[10rem] chatbp:w-auto">
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
        // const [opened, { open, close }] = useDisclosure();
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
              <div className="shadow-xl border bg-white border-[#1925321A]">
                <ul>
                  <li className="cursor-pointer">Go to Chat</li>
                </ul>
              </div>
            </MenuComponent>
          </>
        );
      },
    },
  ];
