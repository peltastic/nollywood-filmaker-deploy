import { ColumnDef } from "@tanstack/react-table";
import CheckboxComponent from "../Checkbox/Checkbox";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { GoDotFill } from "react-icons/go";
import UnstyledButton from "../Button/UnstyledButton";
import { useRouter } from "next/navigation";
import { AspectRatio } from "@mantine/core";

export interface IssuesColumnData {
  customer: string;
  service_name: string;
  service_body: string;
  date_created: string;
  status: "closed" | "pending" | "opened";
  image: string | StaticImport;
  email: string;
  admin?: boolean;
  id: string;
}
export const issues_columns: ColumnDef<IssuesColumnData>[] = [
  {
    accessorKey: "customer",
    header: () => <div className="py-4 pl-8">Customer</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[15rem] xl:w-auto pl-8">
          <div className="w-[2.5rem] h-[2.5rem] mr-2">
            <AspectRatio ratio={1800 / 1800}>
              <Image
                src={row.original.image}
                alt="image"
                className="w-full h-full rounded-full"
                width={100}
                height={100}
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
    accessorKey: "service_name",
    header: () => <div className="">Issue</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[27rem] py-4">
          <h1 className="text-black-4 font-medium">
            {row.getValue("service_name")}
          </h1>
          <p className="text-gray-1 text-[0.88rem]">
            {row.original.service_body}
          </p>
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
            className={`${className}  w-fit text-[12px]  flex items-center font-medium py-1 px-2 rounded-full`}
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
            router.push(`/admin/dashboard/issues/details/${row.original.id}`)
          }
          class="px-4 hover:bg-blue-1 transition-all py-2 rounded-md items-center bg-black-3 text-white flex"
        >
          <p className="mr-1 font-medium text-[0.88rem]">Open</p>
        </UnstyledButton>
      );
    },
  },
];
