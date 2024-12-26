import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import UnstyledButton from "../Button/UnstyledButton";

export interface UserIssuesColumnData {
  title: string;
  complain: string;
  date_created: string;
  status: "closed" | "pending" | "opened";
  id: string;
}

export const issues_columns: ColumnDef<UserIssuesColumnData>[] = [
  {
    accessorKey: "title",
    header: () => <div className="pl-6">Issue</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[27rem] py-4 pl-6">
          <h1 className="text-black-4 font-medium">{row.getValue("title")}</h1>
          <p className="text-gray-1 text-[0.88rem]">{row.original.complain}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "date_created",
    header: () => <div className="">Date created</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[10rem] xl:w-auto">
          <p className="text-gray-1">{row.getValue("date_created")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      const className =
      row.original.status.toLowerCase() === "closed"
        ? "bg-light-green text-dark-green"
        : row.original.status === "pending"
        ? "bg-stroke-4 text-black-6"
        : "bg-light-yellow text-dark-yellow";
      return (
        <div className="w-[10rem] xl:w-auto">
          <p
            className={` ${className} w-fit text-[12px] flex items-center font-medium py-1 px-2 rounded-full`}
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
      const router = useRouter();
      return (
        <UnstyledButton
          clicked={() =>
            router.push(`/user/dashboard/issues/details/${row.original.id}`)
          }
          class="px-4 hover:bg-blue-1 transition-all py-2 rounded-md items-center bg-black-3 text-white flex"
        >
          <p className="mr-1 font-medium text-[0.88rem]">Open</p>
        </UnstyledButton>
      );
    },
  },
];
