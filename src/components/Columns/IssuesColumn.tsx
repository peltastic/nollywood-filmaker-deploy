import { ColumnDef } from "@tanstack/react-table";
import CheckboxComponent from "../Checkbox/Checkbox";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { GoDotFill } from "react-icons/go";
import UnstyledButton from "../Button/UnstyledButton";
import { useRouter } from "next/navigation";

export interface IssuesColumnData {
  customer: string;
  service_name: string;
  service_body: string;
  date_created: string;
  status: string;
  image: string | StaticImport;
  email: string;
  admin?: boolean;
}

export const issues_columns: ColumnDef<IssuesColumnData>[] = [
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
        <div className="flex items-center w-[15rem] xl:w-auto">
          <div className="mr-2">
            <Image src={row.original.image} alt="image" />
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
    header: () => <div className="">Service name</div>,
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
          <p className="text-gray-1">{row.getValue("date_created")}</p>;
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[10rem] xl:w-auto">
          <p
            className={`bg-stroke-4 w-fit text-[12px] text-black-3 flex items-center font-medium py-1 px-2 rounded-full`}
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
            router.push(
              row.original.admin
                ? `/admin/dashboard/issues/details/1`
                : `/user/dashboard/issues/details/1`
            )
          }
          class="px-4 py-2 rounded-md items-center bg-black-3 text-white flex"
        >
          <p className="mr-1 font-medium text-[0.88rem]">Open</p>
        </UnstyledButton>
      );
    },
  },
];
