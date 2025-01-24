import CompanyDatabaseProfile from "@/components/Admin/CompanyDatabaseProfile";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import MenuComponent from "@/components/Menu/MenuComponent";
import { ICompanyOrCrewData } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export interface ICompanyFilmmakerDatabaseColumnData {
  name: string;
  category: string;
  company_type: string;
  location: string;
  fee?: string;
  email: string;
  phone: string;
  consultant?: boolean;
  fulldata: ICompanyOrCrewData;
}

export const company_database_column: ColumnDef<ICompanyFilmmakerDatabaseColumnData>[] =
  [
    {
      id: "select",
      cell: ({ row }) => {
        const [checked, setChecked] = useState<boolean>(false);
        return (
          <>
            {row.original.consultant ? (
              <div className="pl-5">
                <CheckboxComponent
                  checked={row.getIsSelected()}
                  setCheckedProps={(val) => {
                    // setChecked(val);
                    console.log(!!val)
                    row.toggleSelected(!!val);
                  }}
               
                  label
                />
              </div>
            ) : null}
          </>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => <div className=" py-4">Company name</div>,
      cell: ({ row }) => {
        return (
          <div className="">
            <p>{row.getValue("name")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <div className=" ">Category</div>,
      cell: ({ row }) => {
        return (
          <div className="py-4">
            <p>{row.getValue("category")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "company_type",
      header: () => <div className=" py-4">Company Type</div>,
      cell: ({ row }) => {
        return (
          <div className="">
            <p>{row.getValue("company_type")}</p>
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
      cell: ({ row }) => {
        const [opened, { open, close }] = useDisclosure();
        return (
          <>
            <Drawer
              opened={opened}
              onClose={close}
              position="right"
              withCloseButton={false}
              size={"lg"}
            >
              <CompanyDatabaseProfile data={row.original.fulldata} />
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
