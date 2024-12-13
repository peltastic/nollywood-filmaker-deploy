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
  type: "service" | "chat";
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
          row.original.status === "ready"
            ? "bg-light-blue text-dark-blue"
            : row.original.status === "completed"
            ? "bg-light-green text-dark-green"
            : row.original.status === "pending"
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
              <div className="bg-white ">
                <ul className="px-1 text-gray-6 text-[0.88rem]">
                  {row.original.type === "chat" ? (
                    <li
                      // onClick={open}
                      className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                    >
                      Go to Chat
                    </li>
                  ) : null}
                  <li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                    <Link
                      href={`/consultants/dashboard/${row.original.orderId}/order-details`}
                    >
                      See Details
                    </Link>
                  </li>
                  {/* {<li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                    <Link
                      href={
                        "/user/dashboard/order-details/1?page_type=download_files"
                      }
                    >
                      Download files
                    </Link>
                  </li>} */}
                </ul>
              </div>
            </MenuComponent>
          </>
        );
      },
    },
  ];
