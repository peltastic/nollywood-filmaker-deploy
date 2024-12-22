import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import { AspectRatio, Rating } from "@mantine/core";

export interface IFeedbackData {
  customer: string;
  email: string;
  quality: number;
  speed: number;
  comment: string;
  date: string;
  _id: string;
  orderId: string;
  image: string;
}

export const feedback_column: ColumnDef<IFeedbackData>[] = [
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
        <div className="flex items-center py-4  w-[20rem] xl:w-auto">
          <div className="mr-2 w-[2.5rem] h-[2.5rem]">
            {row.original.image && (
              <AspectRatio ratio={1800 / 1800}>
                <Image
                  src={row.original.image}
                  height={100}
                  width={100}
                  className="w-full h-full rounded-full"
                  alt="image"
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
    accessorKey: "quality",
    header: "Delivery Quality",
    cell: ({ row }) => {
      return (
        <div className="w-[10rem] xl:w-auto">
          <Rating defaultValue={row.getValue("quality")} color="#F8C51B" />
        </div>
      );
    },
  },
  {
    accessorKey: "speed",
    header: "Delivery Speed",
    cell: ({ row }) => {
      return (
        <div className="w-[10rem] xl:w-auto">
          <Rating defaultValue={row.getValue("speed")} color="#F8C51B" />
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      return (
        <div className="w-[20rem] xl:w-auto">
          <p className="text-gray-1 text-[0.88rem]">
            {row.getValue("comment") || "N/A"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date created",
    cell: ({ row }) => {
      return (
        <div className="w-[10rem] xl:w-auto">
          <p className="text-gray-1 text-[0.88rem]">{row.getValue("date")}</p>
        </div>
      );
    },
  },
];
