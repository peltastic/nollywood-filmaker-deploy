import UnstyledButton from "@/components/Button/UnstyledButton";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export interface IAdminContactusData {
  fullname: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  id: string;
}

export const admin_contact_us: ColumnDef<IAdminContactusData>[] = [
  {
    accessorKey: "fullname",
    header: () => <div className="py-4 pl-4">Fullname</div>,
    cell: ({ row }) => {
      return (
        <div className="pl-4">
          <p>{row.getValue("fullname")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="py-4">Email</div>,
    cell: ({ row }) => {
      return (
        <div className="">
          <p>{row.getValue("email")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="py-4">Phone</div>,
    cell: ({ row }) => {
      return (
        <div className="py-10">
          <p>{row.getValue("phone")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="py-4">Date sent</div>,
    cell: ({ row }) => {
      return (
        <div className="">
          <p>{row.getValue("date")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: () => <div className="py-4">Message</div>,
    cell: ({ row }) => {
      return (
        <div className="">
          <p>{row.getValue("message")}</p>
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
            router.push(`/admin/dashboard/contact-us/${row.original.id}`)
          }
          class="px-4 hover:bg-blue-1 transition-all py-2 rounded-md items-center bg-black-3 text-white flex"
        >
          <p className="mr-1 font-medium text-[0.88rem]">View</p>
        </UnstyledButton>
      );
    },
  },
];
