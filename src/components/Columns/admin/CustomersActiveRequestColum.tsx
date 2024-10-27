import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import { Progress } from "@mantine/core";
import { GoDotFill } from "react-icons/go";
import MenuComponent from "@/components/Menu/MenuComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";

export interface ICustomerActiveReqData {
  service_name: string;
  service_type: string;
  progress: number;
  date: string;
  status: "Ready" | "Ongoing" | "Completed" | "Pending";
}

export const customer_active_request_column: ColumnDef<ICustomerActiveReqData>[] =
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
      accessorKey: "service_name",
      header: () => <div className="">Service name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center w-[20rem] xl:w-auto py-4">
            <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
              <Image src={ReadMyScriptDarkImg} alt="name-img" />
            </div>
            <div className="text-[0.88rem]">
              <p className="text-black-4 font-medium">
                {row.getValue("service_name")}
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
          <div className="flex items-center py-4">
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
            : row.original.status === "Pending"
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
        const router = useRouter();
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
                  <li
                    onClick={() =>
                      router.push(
                        `/admin/dashboard/customers/1/order-details/1?status=${row.original.status}`
                      )
                    }
                    className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                  >
                    See Details
                  </li>
                </ul>
              </div>
            </MenuComponent>
          </>
        );
      },
    },
  ];
