import FilmmakerDatabaseProfileDrawer from "@/components/Admin/FilmmakerDatabaseProfileDrawer";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import MenuComponent from "@/components/Menu/MenuComponent";
import { ICompanyOrCrewData } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { BsThreeDotsVertical } from "react-icons/bs";

export interface ICrewFilmmakerDatabaseColumnData {
  fullname: string;
  category: string;
  role: string;
  location: string;
  fee?: string;
  email: string;
  phone: string;
  consultant?: boolean;
  department: string;
  fulldata: ICompanyOrCrewData;
}

export const crew_database_column: ColumnDef<ICrewFilmmakerDatabaseColumnData>[] =
  [
    {
      id: "select",
      cell: ({ row }) => (
        <>
          {row.original.consultant ? (
            <div className="pl-5">
              <CheckboxComponent label />
            </div>
          ) : null}
        </>
      ),
    },
    {
      accessorKey: "fullname",
      header: () => <div className=" py-4">Fullname</div>,
      cell: ({ row }) => {
        return (
          <div className="">
            <p>{row.getValue("fullname")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <div className="py-4">Category</div>,
      cell: ({ row }) => {
        return (
          <div className="py-4">
            <p>{row.getValue("category")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "department",
      header: () => <div className="">Department</div>,
      cell: ({ row }) => {
        return (
          <div className="py-4">
            <p>{row.getValue("department")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: () => <div className="">Role</div>,
      cell: ({ row }) => {
        return (
          <div className="">
            <p>{row.getValue("role")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: () => <div className="">Location</div>,
      cell: ({ row }) => {
        return (
          <div className="">
            <p>{row.getValue("location")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "fee",
      header: () => <div className="">Fee range</div>,
      cell: ({ row }) => {
        return (
          <div className="">
            <p>{row.getValue("fee")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => <div className="">Email</div>,
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
      header: () => <div className="">Phone number</div>,
      cell: ({ row }) => {
        return (
          <div className="">
            <p>{row.getValue("phone")}</p>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({row}) => {
        const [opened, { open, close }] = useDisclosure();
        return (
          <>
            <Drawer opened={opened} onClose={close} position="right" withCloseButton={false} size={"lg"}>
              <FilmmakerDatabaseProfileDrawer data={row.original.fulldata} />
            </Drawer>
            <MenuComponent
              target={
                <div className="cursor-pointer">
                  <BsThreeDotsVertical />
                </div>
              }
            >
              <div className="bg-white">
                <ul className="px-1 text-gray-6 text-[0.88rem]">
                  <li className="cursor-pointer px-2 py-2" onClick={open}>
                    <p>View Profile</p>
                  </li>
                </ul>
              </div>
            </MenuComponent>
          </>
        );
      },
    },
  ];
