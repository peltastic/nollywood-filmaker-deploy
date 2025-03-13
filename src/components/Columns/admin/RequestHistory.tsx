import CheckboxComponent from "@/components/Checkbox/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ReadMyScriptDarkImg from "/public/assets/services/read-my-script-dark.svg";
import { AspectRatio, Progress, Rating } from "@mantine/core";
import { GoDotFill } from "react-icons/go";
import ModalComponent from "@/components/Modal/Modal";
import MenuComponent from "@/components/Menu/MenuComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { generateColorClass } from "@/utils/helperFunction";
import GenerateDarkServiceLogo from "@/components/Generate/GenerateDarkServiceLogo";

export interface IAdminRequestHistory {
  service_name: string;
  service_type:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget";
  progress: number;
  rating: number;
  date_created: string;
  status: "ready" | "ongoing" | "completed" | "pending" | "awaiting";
  orderId: string;
  assignedConsultant?: {
    fname: string;
    lname: string;
  } | null;
  consultant?: boolean;
  user?: {
    fname: string;
    lname: string;
    email: string;
    profilepics: string;
  };
}

export const admin_customer_request_history_column: ColumnDef<IAdminRequestHistory>[] =
  [
    {
      accessorKey: "service_name",
      header: () => <div className="pl-6">Service name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center w-[20rem] chatbp::w-auto py-4 pl-6">
            <div
              className={`${generateColorClass(
                row.original.service_type
              )} h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4`}
            >
              <GenerateDarkServiceLogo service={row.original.service_type} />
            </div>
            <div className="text-[0.88rem]">
              <p className="text-black-4 font-medium">
                {row.getValue("service_name")}
              </p>
              <p className="text-gray-1">{row.original.service_type}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "assignedConsultant",
      header: ({ table }) => {
        const hasConsultant = table
          .getRowModel()
          .rows.some((row) => row.original.consultant);
        return <>{hasConsultant ? <p>Customer</p> : "Assigned consultant"}</>;
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center w-[20rem] xl:w-auto">
            {row.original.consultant ? (
              <div className="flex items-center">
                {row.original.user && (
                  <div className="mr-2 h-[2.5rem] w-[2.5rem]">
                    <AspectRatio ratio={1800 / 1800}>
                      <Image
                        src={row.original.user?.profilepics}
                        width={100}
                        height={100}
                        alt="image"
                        className="rounded-full h-full w-full"
                      />
                    </AspectRatio>
                  </div>
                )}
                <div className="">
                  <h1 className=" text-black-4 font-medium">
                    {row.original.user?.fname + " " + row.original.user?.lname}
                  </h1>
                  <p className="text-gray-1 text-[0.88rem]">
                    {row.original.user?.email}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {row.original.assignedConsultant ? (
                  <div className="flex items-center">
                    <div className="bg-black-3 font-bold text-[0.7rem] mr-4 h-[2.5rem] flex items-center justify-center w-[2.5rem] rounded-full text-white">
                      {row.original.assignedConsultant.fname[0]}
                      {row.original.assignedConsultant.lname[0]}
                    </div>
                    <p>
                      {row.original.assignedConsultant.fname}{" "}
                      {row.original.assignedConsultant.lname}
                    </p>
                  </div>
                ) : (
                  <p>N/A</p>
                )}
              </>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "progress",
      header: "Progress chart",
      cell: ({ row }) => {
        return (
          <div className="flex items-center py-4 w-[20rem] chatbp:w-auto">
            <div className="w-[20rem] mr-2">
              <Progress value={row.getValue("progress")} color="#181818" />
            </div>
            <p className="font-medium text-[0.88rem]">
              {row.getValue("progress")}%
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
          <div className="w-[10rem] chatbp:w-auto">
            <Rating defaultValue={row.getValue("rating")} color="#F8C51B" />
          </div>
        );
      },
    },
    {
      accessorKey: "date_created",
      header: "Date created",
      cell: ({ row }) => {
        return (
          <div className="w-[10rem] chatbp:w-auto">
            <p className="text-gray-1 text-[0.88rem]">
              {row.getValue("date_created")}
            </p>
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
            : "bg-light-yellow text-dark-yellow";
        return (
          <div className="w-[10rem] chatbp:w-auto">
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
      id: "actions",
      cell: ({ row }) => {
        const router = useRouter();
        // const [opened, { open, close }] = useDisclosure();
        return (
          <>
            <MenuComponent
              target={
                <div>
                  <UnstyledButton class="px-4 py-2 hover:bg-blue-1 rounded-md items-center bg-black-3 text-white flex">
                    <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                    <IoIosArrowDown />
                  </UnstyledButton>
                </div>
              }
            >
              <div className=" bg-white">
                <ul className="px-1 text-gray-6 text-[0.88rem]">
                  <li
                    onClick={() =>
                      router.push(
                        `/admin/dashboard/order-details/${row.original.orderId}`
                      )
                    }
                    className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                  >
                    See Details
                  </li>
                </ul>
              </div>
            </MenuComponent>
          </>
        );
      },
    },
  ];
