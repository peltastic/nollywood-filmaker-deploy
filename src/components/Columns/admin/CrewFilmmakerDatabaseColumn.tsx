import FilmmakerDatabaseProfileDrawer from "@/components/Admin/FilmmakerDatabaseProfileDrawer";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import MenuComponent from "@/components/Menu/MenuComponent";
import ModalComponent from "@/components/Modal/Modal";
import { ICompanyOrCrewData } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import {
  useDeleteCrewCompanyMutation,
  useLazyFetchCompanyorCrewQuery,
} from "@/lib/features/admin/filmmaker-database/filmmaker-database";
import { notify } from "@/utils/notification";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { nprogress } from "@mantine/nprogress";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export interface ICrewFilmmakerDatabaseColumnData {
  fullname: string;
  category: string;
  role: string[];
  location: string;
  fee?: string;
  email: string;
  phone: string;
  consultant?: boolean;
  department: string[];
  fulldata: ICompanyOrCrewData;
  type?: "crew" | "company";
}

export const crew_database_column: ColumnDef<ICrewFilmmakerDatabaseColumnData>[] =
  [
    {
      id: "select",
      cell: ({ row }) => (
        <>
          {row.original.consultant ? (
            <div className="pl-5">
              <CheckboxComponent
                checked={row.getIsSelected()}
                setCheckedProps={(value) => row.toggleSelected(!!value)}
                label
              />
            </div>
          ) : null}
        </>
      ),
    },
    {
      accessorKey: "fullname",
      header: () => <div className=" py-4 w-[10rem] xl:w-auto">Fullname</div>,
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
          <div className="py-4 w-[10rem] xl:w-auto">
            <p>{row.getValue("category")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "department",
      header: () => <div className="">Department(s)</div>,
      cell: ({ row }) => {
        return (
          <div className="w-[20rem] xl:w-auto">
            {row.original.department.map((el, index) => {
              const islast = index === row.original.department.length - 1;
              return (
                <p className="mt-2 text-[#4B5563]" key={el}>
                  {el} <span>{islast ? "" : ","}</span>
                </p>
              );
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: () => <div className="">Roles</div>,
      cell: ({ row }) => {
        return (
          <div className="w-[20rem] xl:w-auto">
            {row.original.role.map((el, index) => {
              const islast = index === row.original.role.length - 1;
              return (
                <p className="mt-2 text-[#4B5563]" key={el}>
                  {el} <span>{islast ? "" : ","}</span>
                </p>
              );
            })}
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
          <div className="w-[10rem] xl:w-auto">
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
          <div className="w-[10rem] xl:w-auto">
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
          <div className="w-[10rem] xl:w-auto">
            <p>{row.getValue("phone")}</p>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const [opened, { open, close }] = useDisclosure();
        const [deleteOpened, deleteFunc] = useDisclosure();
        const [deleteProfile, { data, isLoading, isError, isSuccess, error }] =
          useDeleteCrewCompanyMutation();
        const [fetchCompanyOrCrew] = useLazyFetchCompanyorCrewQuery();

        useEffect(() => {
          if (isError) {
            nprogress.complete();
            notify(
              "error",
              "",
              (error as any).data?.message || "An Error Occcured"
            );
          }

          if (isSuccess) {
            notify("success", "Bank details saved successfully");
            nprogress.complete();
            if (row.original.type) {
              fetchCompanyOrCrew({ type: row.original.type });
            }
            deleteFunc.close();
          }
        }, [isError, isSuccess]);

        return (
          <>
            <Drawer
              opened={opened}
              onClose={close}
              position="right"
              withCloseButton={false}
              size={"lg"}
            >
              <FilmmakerDatabaseProfileDrawer data={row.original.fulldata} />
            </Drawer>
            <ModalComponent
              opened={deleteOpened}
              onClose={deleteFunc.close}
              centered
              withCloseButton={true}
              size="xl"
            >
              <DeleteModal
                title="Delete Profile"
                body={`Are you sure you want to delete ${row.original.fullname.toUpperCase()} filmmaker database profile permanently?`}
                close={deleteFunc.close}
                deleteAction={() => deleteProfile(row.original.fulldata.userId)}
                isLoading={isLoading}
              />
            </ModalComponent>
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
                  {row.original.consultant ? null : (
                    <li
                      className="cursor-pointer px-2 py-2"
                      onClick={deleteFunc.open}
                    >
                      <p>Delete</p>
                    </li>
                  )}
                </ul>
              </div>
            </MenuComponent>
          </>
        );
      },
    },
  ];
