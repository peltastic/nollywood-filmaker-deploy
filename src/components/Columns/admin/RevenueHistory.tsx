import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import { GoDotFill } from "react-icons/go";
import UnstyledButton from "@/components/Button/UnstyledButton";

export interface IAdminRevenueHistoryColumnData {
  created: string;
  script: string;
  service_type: string;
  order_id: string;
  status: "Ready" | "Ongoing" | "Completed" | "Pending";
  availability: string;
  amount: string;
}

export const active_revenue_history_column: ColumnDef<IAdminRevenueHistoryColumnData>[] =
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
      header: () => <div className="">Source</div>,
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
      accessorKey: "order_id",
      header: () => <div className="">Order ID</div>,
      cell: ({ row }) => {
        return (
          <div className="text-[0.88rem] text-gray-1 w-[15rem] xl:w-auto">
            <p>{row.getValue("order_id")}</p>
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
      accessorKey: "availability",
      header: "Estimated availability",
      cell: ({ row }) => {
        return (
          <div className=" w-[10rem] xl:w-auto">
            <p className="text-gray-1 text-[0.88rem]">
              {row.getValue("availability")}
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
          <UnstyledButton class="bg-black-3 text-[0.88rem] text-white py-2 px-4 rounded-md">
            Open
          </UnstyledButton>
        );
      },
    },
  ];
