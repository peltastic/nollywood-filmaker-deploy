import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AspectRatio } from "@mantine/core";

export interface IAdminCustomersColumnData {
  customer: string;
  email: string;
  number: string;
  location: string;
  expertise: string[];
  date: string;
  profilePic: string;
  id: string
}

export const admin_customers_column: ColumnDef<IAdminCustomersColumnData>[] = [
  {
    accessorKey: "customer",
    header: () => <div className="pl-6">Customer</div>,
    cell: ({ row }) => {
      return (
        <div className="mr-2 flex items-center">
            <div className="pl-6 mr-2 flex items-center w-[20rem] xl:w-auto">
            <AspectRatio ratio={1800/1800}>
              <Image
                className="w-[3rem] rounded-full h-[3rem]"
                src={row.original.profilePic}
                alt="image"
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
    accessorKey: "number",
    header: () => <div className="">Phone number</div>,
    cell: ({ row }) => {
      return (
        <div className="text-[0.88rem] py-8 text-gray-1 w-[15rem] xl:w-auto">
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
    cell: ({row}) => {
      const router = useRouter();
      return (
        <div className="w-[15rem] xl:w-auto">
          <UnstyledButton
            clicked={() => router.push(`/admin/dashboard/customers/${row.original.id}`)}
            class=" hover:bg-gray-bg-9 transition-all border-stroke-2 border text-[0.88rem] text-black-5 py-2 px-4 rounded-md"
          >
            See more
          </UnstyledButton>
        </div>
      );
    },
  },
];
