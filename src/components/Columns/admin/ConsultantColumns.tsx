import UnstyledButton from "@/components/Button/UnstyledButton";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";;

export interface IAdminConsultantData {
  id: string;
  consultant: string;
  fname: string;
  lname: string;
  email: string;
  number: string;
  location: string;
  expertise: string[];
  date: string;
}

export const admin_consultant_column: ColumnDef<IAdminConsultantData>[] = [
  {
    accessorKey: "consultant",
    header: () => <div className="pl-6">Consultant</div>,
    cell: ({ row }) => {
      return (
        <div className="pl-6 flex items-center w-[20rem] xl:w-auto">
          <div className="bg-black-3 font-bold text-[0.7rem] mr-2 h-[2.5rem] flex items-center justify-center w-[2.5rem] rounded-full text-white">
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
          <p>...</p>
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
            clicked={() => router.push(`/admin/dashboard/consultants/${row.original.id}`)}
            class="hover:bg-gray-bg-9 border-stroke-2 border text-[0.88rem] text-black-5 py-2 px-4 rounded-md"
          >
            See more
          </UnstyledButton>
        </div>
      );
    },
  },
];
