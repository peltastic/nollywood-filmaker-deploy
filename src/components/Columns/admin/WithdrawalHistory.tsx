import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import WellsFargoImg from "/public/assets/dashboard/wells-fargo.png";
import { GoDotFill } from "react-icons/go";
import UnstyledButton from "@/components/Button/UnstyledButton";

export interface IAdminWithdrawalHistoryData {
  date: string;
  sent_to: string;
  bank: string;
  status: "sent";
  amount: string;
}

export const admin_withdrawal_column: ColumnDef<IAdminWithdrawalHistoryData>[] =
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
      accessorKey: "date",
      header: () => <div className="">Whithdrawal date</div>,
      cell: ({ row }) => {
        return (
          <div className="text-[0.88rem] text-gray-1 w-[15rem] xl:w-auto">
            <p>{row.getValue("date")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "sent_to",
      header: () => <div className="py-4">Sent to</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center w-[15rem] xl:w-auto py-4">
            <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
              <Image src={WellsFargoImg} alt="name-img" />
            </div>
            <div className="text-[0.88rem]">
              <p className="text-black-4 font-medium">
                {row.getValue("sent_to")}
              </p>
              <p className="text-gray-1">{row.original.bank}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="">Status</div>,
      cell: ({ row }) => {
        const className =
          row.original.status === "sent"
            ? "bg-light-green text-dark-green"
            : "";
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
            {row.getValue("amount")} USD
          </div>
        );
      },
    },
    {
      id: "action",
      cell: ({}) => {
        return (
          <div className="flex">
            <UnstyledButton class="ml-auto mr-8 bg-black-3  text-[0.88rem] text-white py-2 px-4 rounded-md">
              Open
            </UnstyledButton>
          </div>
        );
      },
    },
  ];
