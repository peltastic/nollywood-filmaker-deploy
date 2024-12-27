import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import Image from "next/image";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { AspectRatio } from "@mantine/core";
import { generateColorClass } from "@/utils/helperFunction";
import GenerateDarkServiceLogo from "@/components/Generate/GenerateDarkServiceLogo";

export interface ICustomerReqData {
  customer: string;
  email: string;
  script: string;
  service_type:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget";
  date: string;
  status: "ready" | "ongoing" | "completed" | "pending";
  profilepic: string;
}

export const customer_req_columns: ColumnDef<ICustomerReqData>[] = [

  {
    accessorKey: "customer",
    header: () => <div className="py-4 pl-6">Customer</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[20rem] xl:w-auto pl-6">
          <div className="mr-2 w-[2.5rem] h-[2.5rem]">
            <AspectRatio ratio={1800/1800}>
              <Image
                src={row.original.profilepic}
                alt="image"
                width={100}
                height={100}
                className="w-full h-full rounded-full"
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
    accessorKey: "script",
    header: () => <div className="">Service name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[20rem] xl:w-auto py-4">
          <div
            className={`${generateColorClass(
              row.original.service_type
            )} h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4`}
          >
            <GenerateDarkServiceLogo service={row.original.service_type} />
          </div>
          <div className="text-[0.88rem]">
            <p className="text-black-4 font-medium">{row.getValue("script")}</p>
            <p className="text-gray-1">{row.original.service_type}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date created",
    cell: ({ row }) => {
      return (
        <div className=" w-[10rem] xl:w-auto">
          <p className="text-gray-1 text-[0.88rem]">{row.getValue("date")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const className =
        row.original.status === "ready"
          ? "bg-light-blue text-dark-blue"
          : row.original.status === "completed"
          ? "bg-light-green text-dark-green"
          : row.original.status === "pending"
          ? "bg-stroke-4 text-black-6"
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
    id: "action",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <UnstyledButton
          clicked={() =>
            router.push(
              `/consultants/dashboard/order-details?status=${row.original.status}`
            )
          }
          class="bg-black-3 text-[0.88rem] text-white py-2 px-4 rounded-md"
        >
          Open
        </UnstyledButton>
      );
    },
  },
];
