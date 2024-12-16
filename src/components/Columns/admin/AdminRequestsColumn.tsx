import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import { useRouter } from "next/navigation";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { AspectRatio, Rating } from "@mantine/core";
import { ICustomerRequest } from "@/interfaces/admin/requests/requests";
import moment from "moment";

export const admin_reqs_columns: ColumnDef<ICustomerRequest>[] = [
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
          <div className="mr-2 h-[2.5rem] w-[2.5rem]">
            <AspectRatio ratio={1800/1800}>
              <Image
                src={row.original.user.profilepics}
                width={100}
                height={100}
                alt="image"
                className="rounded-full h-full w-full"
              />
            </AspectRatio>
          </div>
          <div className="">
            <h1 className=" text-black-4 font-medium">
              {row.original.user.fname + " " + row.original.user.lname}
            </h1>
            {/* <h1 className=" text-black-4 font-medium">
              {row.getValue("customer")}
            </h1> */}
            {/* <p className="text-gray-1 text-[0.88rem]">{row.original.email}</p> */}
            <p className="text-gray-1 text-[0.88rem]">
              {row.original.user.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "chat_title",
    header: () => <div className="">Service name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center w-[20rem] xl:w-auto py-4">
          <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
            <Image src={ReadMyScriptDarkImg} alt="name-img" />
          </div>
          <div className="text-[0.88rem]">
            <p className="text-black-4 font-medium">
              {row.original.movie_title || row.original.chat_title}
            </p>
            <p className="text-gray-1">{row.original.nameofservice}</p>
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
          <p className="text-gray-1 text-[0.88rem]">
            {moment(row.original.createdAt).format("ll")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "stattusof",
    header: "Status",
    cell: ({ row }) => {
      const className =
        row.original.stattusof === "ready"
          ? "bg-light-blue text-dark-blue"
          : row.original.stattusof === "completed"
          ? "bg-light-green text-dark-green"
          : row.original.stattusof === "pending"
          ? "bg-stroke-4 text-black-6"
          : "bg-light-yellow text-dark-yellow";
      return (
        <div className=" w-[10rem] xl:w-auto">
          <p
            className={`${className} text-sm w-fit flex items-center font-medium py-1 px-2 rounded-full`}
          >
            <span className="block pr-1">
              <GoDotFill />
            </span>{" "}
            {row.getValue("stattusof")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original.rating ? (
            <Rating defaultValue={row.getValue("rating")} color="#F8C51B" />
          ) : (
            <p>N/A</p>
          )}
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
              `/admin/dashboard/order-details/${row.original.orderId}`
            )
          }
          class="bg-black-3 text-[0.88rem] hover:bg-blue-1 transition-all text-white py-2 px-4 rounded-md"
        >
          Open
        </UnstyledButton>
      );
    },
  },
];
