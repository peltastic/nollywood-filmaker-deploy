import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/helperFunction";
import { AspectRatio } from "@mantine/core";

export interface ICustomerReqData {
  customer: string;
  email: string;
  script: string;
  service_type: string;
  date: string;
  status: "ready" | "ongoing" | "completed" | "pending";
  imgurl?: string;
  id: string;
  orderId: string
}

export const customer_req_columns: ColumnDef<ICustomerReqData>[] = [
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
        <div className="flex items-center w-[20rem] xl:w-auto">
          <div className="mr-2">
            {row.original.imgurl && (
              <AspectRatio ratio={1800 / 1800}>
                <Image
                  src={row.original.imgurl}
                  height={100}
                  width={100}
                  alt="image"
                  className="rounded-full w-[2.6rem] h-[2.6rem]"
                />
              </AspectRatio>
            )}
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
          <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
            <Image src={ReadMyScriptDarkImg} alt="name-img" />
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
            {capitalizeFirstLetter(row.getValue("status"))}
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
              `/consultants/dashboard/${row.original.orderId}/order-details`
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
