import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import WellsFargoImg from "/public/assets/dashboard/wells-fargo.png";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { numberWithCommas } from "@/utils/helperFunction";
import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import WithdrawalInfo from "@/components/Dashboard/Consultants/WithdrawalInfo";

export interface IWithdrawalsData {
  date: string;
  withdrawal_account: string;
  bank: string;
  status: "sent" | "pending";
  amount: string;
  id: string;
}

export const withdrawal_column: ColumnDef<IWithdrawalsData>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <div className="pl-5">
  //       <CheckboxComponent label />
  //     </div>
  //   ),
  //   cell: () => (
  //     <div className="pl-5">
  //       <CheckboxComponent label />
  //     </div>
  //   ),
  // },
  {
    accessorKey: "date",
    header: () => <div className="pl-6">Whithdrawal date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-[0.88rem] text-gray-1 w-[15rem] xl:w-auto pl-6">
          <p>{row.getValue("date")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "withdrawal_account",
    header: () => <div className="py-4">Withdrawal account</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[15rem] xl:w-auto py-4">
          {/* <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
            <Image src={WellsFargoImg} alt="name-img" />
          </div> */}
          <div className="text-[0.88rem]">
            <p className="text-black-4 font-medium">
              {row.getValue("withdrawal_account")}
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
          : "bg-stroke-4 text-black-6";
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
          ₦ {numberWithCommas(Number(row.getValue("amount")))}
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({row}) => {
      const [opened, {close, open, toggle}] = useDisclosure()
      return (
        <>
        <ModalComponent onClose={close} withCloseButton={false} opened={opened} size="xl">
          <WithdrawalInfo close={close} id={row.original.id} />
        </ModalComponent>
        <UnstyledButton clicked={open} class="transition-all hover:bg-blue-1 bg-black-3 text-[0.88rem] text-white py-2 px-4 rounded-md">
          Open
        </UnstyledButton>
        </>
      );
    },
  },
];
