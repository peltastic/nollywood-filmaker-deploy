import MenuComponent from "@/components/Menu/MenuComponent";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import { useDisclosure } from "@mantine/hooks";
import ModalComponent from "@/components/Modal/Modal";
import WithdrawalRequestModal from "@/components/Admin/WithdrawalRequestModal";

export interface IAdminWithdrawalRequestColumnData {
  consultant: string;
  email: string;
  date: string;
  status: "Ready" | "Ongoing" | "Completed" | "Pending";
  amount: string;
}

export const admin_withdrawal_request_columns: ColumnDef<IAdminWithdrawalRequestColumnData>[] =
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
      accessorKey: "consultant",
      header: () => <div className="py-4">Consultant</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center w-[20rem] xl:w-auto py-3">
            <div className="mr-2">
              <Image src={TestImage} alt="image" />
            </div>
            <div className="">
              <h1 className=" text-black-4 font-medium">
                {row.getValue("consultant")}
              </h1>
              <p className="text-gray-1 text-[0.88rem]">{row.original.email}</p>
            </div>
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
      accessorKey: "amount",
      header: () => <div className="">Amount</div>,
      cell: ({ row }) => {
        return (
          <div className="text-[0.88rem] text-gray-1 w-[15rem] xl:w-auto">
            $ {row.getValue("amount")}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({}) => {
        const [opened, { open, close }] = useDisclosure();

        return (
          <>
            <ModalComponent withCloseButton={false} size="xl" onClose={close} opened={opened} centered>
              <WithdrawalRequestModal close={close} />
            </ModalComponent>
            <MenuComponent
              target={
                <div className="flex pr-8">
                  <UnstyledButton class="ml-auto mr px-4 py-2 rounded-md items-center bg-black-3 text-white flex">
                    <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                    <IoIosArrowDown />
                  </UnstyledButton>
                </div>
              }
            >
              <div className="bg-white mr-10 ">
                <ul className="px-1 text-gray-6 text-[0.88rem]">
                  <li
                    onClick={open}
                    className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                  >
                    <p>View</p>
                  </li>
                  <li
                    // onClick={open}
                    className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                  >
                    <p>Approve</p>
                  </li>
                  <li
                    // onClick={open}
                    className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                  >
                    <p>Deny</p>
                  </li>
                </ul>
              </div>
            </MenuComponent>
          </>
        );
      },
    },
  ];
