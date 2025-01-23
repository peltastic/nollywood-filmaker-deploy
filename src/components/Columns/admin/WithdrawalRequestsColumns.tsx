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
import { numberWithCommas } from "@/utils/helperFunction";
import ApproveRequestModal from "@/components/Admin/ApproveRequestModal";
import {
  useLazyFetchTranscationStatQuery,
  useLazyFetchWithdrawalsQuery,
} from "@/lib/features/admin/dashboard/withdrawals";

export interface IAdminWithdrawalRequestColumnData {
  consultant: string;
  email: string;
  date: string;
  status: "pending" | "sent" | "completed";
  amount: string;
  id: string;
  fname: string;
  lname: string;
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
            <div className="bg-black-3 font-bold text-[0.7rem] mr-4 h-[2.5rem] flex items-center justify-center w-[2.5rem] rounded-full text-white">
              {row.original.fname[0]} {row.original.lname[0]}
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
          row.original.status === "sent"
            ? "bg-light-green text-dark-green"
            : row.original.status === "pending"
            ? "bg-stroke-4 text-black-6"
            : row.original.status === "completed"
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
      accessorKey: "amount",
      header: () => <div className="">Amount</div>,
      cell: ({ row }) => {
        return (
          <div className="text-[0.88rem] text-gray-1 w-[15rem] xl:w-auto">
            ₦ {numberWithCommas(Number(row.original.amount))}
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: () => <div className="">Date Created</div>,
      cell: ({ row }) => {
        return (
          <div className="text-[0.88rem] text-gray-1 w-[15rem] xl:w-auto">
            {row.getValue("date")}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const [opened, { open, close }] = useDisclosure();
        const [modalOpened, approvedModal] = useDisclosure();
        const [fetchWithdrawals] = useLazyFetchWithdrawalsQuery();
        const [fetchTransactionStat] = useLazyFetchTranscationStatQuery();

        return (
          <>
            <ModalComponent
              withCloseButton={false}
              size="xl"
              onClose={approvedModal.close}
              opened={modalOpened}
              centered
            >
              <ApproveRequestModal
                refetch={() => {
                  fetchWithdrawals();
                  fetchTransactionStat();
                }}
                amount={row.original.amount}
                close={approvedModal.close}
                consultant={row.original.consultant}
                id={row.original.id}
              />
            </ModalComponent>
            <ModalComponent
              withCloseButton={false}
              size="xl"
              onClose={close}
              opened={opened}
              centered
            >
              <WithdrawalRequestModal id={row.original.id} close={close} />
            </ModalComponent>
            <MenuComponent
              target={
                <div className="flex pr-8">
                  <UnstyledButton class="transition-all hover:bg-blue-1 ml-auto mr px-4 py-2 rounded-md items-center bg-black-3 text-white flex">
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
                    onClick={approvedModal.open}
                    className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                  >
                    <p>Approve</p>
                  </li>
                  {/* <li
                    // onClick={open}
                    className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                  >
                    <p>Deny</p>
                  </li> */}
                </ul>
              </div>
            </MenuComponent>
          </>
        );
      },
    },
  ];
