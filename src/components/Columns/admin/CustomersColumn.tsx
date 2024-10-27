import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import { useRouter } from "next/navigation";

export interface IAdminCustomersColumnData {
  customer: string;
  email: string;
  number: string;
  location: string;
  expertise: string[];
  date: string;
}

export const admin_customers_column: ColumnDef<IAdminCustomersColumnData>[] = [
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
    header: () => <div className="">Customer</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[20rem] xl:w-auto">
          <div className="mr-2">
            <Image src={TestImage} alt="image" />
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
    accessorKey: "number",
    header: () => <div className="">Phone number</div>,
    cell: ({ row }) => {
      return (
        <div className="text-[0.88rem] py-6 text-gray-1 w-[15rem] xl:w-auto">
          {row.getValue("number")}
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="">Location</div>,
    cell: ({ row }) => {
      return (
        <div className="text-[0.88rem] py-6 text-gray-1 w-[15rem] xl:w-auto">
          {row.getValue("location")}
        </div>
      );
    },
  },
  {
    accessorKey: "expertise",
    header: () => <div className="">Expertise</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {row.original.expertise.map((el) => (
            <div
              className="bg-gray-bg-9 mr-2 text-black-3 font-medium text-[0.75rem] py-1 px-4 rounded-full"
              key={el}
            >
              {el}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="">Date Joined</div>,
    cell: ({ row }) => {
      return (
        <div className="text-[0.88rem] text-gray-1 w-[15rem] xl:w-auto">
          {row.getValue("date")}
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({}) => {
      const router = useRouter();
      return (
        <div className="w-[15rem] xl:w-auto">
          <UnstyledButton
            clicked={() => router.push(`/admin/dashboard/customers/1`)}
            class=" border-stroke-2 border text-[0.88rem] text-black-5 py-2 px-4 rounded-md"
          >
            See more
          </UnstyledButton>
        </div>
      );
    },
  },
];
