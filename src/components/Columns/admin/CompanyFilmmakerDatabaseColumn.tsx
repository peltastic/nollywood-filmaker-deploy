import CompanyDatabaseProfile from "@/components/Admin/CompanyDatabaseProfile";
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
import { Drawer, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { nprogress } from "@mantine/nprogress";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
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
  type?: "crew" | "company";
  verificationType: string;
  admin?: boolean;
  index: number;
  page: number;
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
      id: "s/n",
      cell: ({ row }) => (
        <p>{(row.original.page - 1) * 10 + 1 + row.original.index}</p>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div className=" py-4">Company name</div>,
      cell: ({ row }) => {
        return (
          <div className="w-[10rem] xl:w-auto">
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
          <div className="py-4 w-[10rem] xl:w-auto">
            <p>{row.getValue("category")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "company_type",
      header: () => (
        <div className=" py-4 w-[20rem] xl:w-auto">Company Type</div>
      ),
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
          <div className="w-[20rem] xl:w-auto">
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
        const [openedMenu, setOpened] = useState(false);
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
            notify("success", "Profile deleted successfully");
            nprogress.complete();
            if (row.original.type) {
              fetchCompanyOrCrew({
                type: row.original.type,
                verified:
                  row.original.verificationType === "verified" ? true : false,
              });
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
              <CompanyDatabaseProfile
                data={row.original.fulldata}
                admin={row.original.admin}
                verfied={
                  row.original.verificationType === "verified" ? true : false
                }
                refetch={() => {
                  if (row.original.type) {
                    fetchCompanyOrCrew({
                      type: row.original.type,
                      verified:
                        row.original.verificationType === "verified"
                          ? true
                          : false,
                    });
                  }
                }}
              />
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
                body={`Are you sure you want to delete ${row.original.name.toUpperCase()} filmmaker database profile permanently?`}
                close={deleteFunc.close}
                deleteAction={() => deleteProfile(row.original.fulldata.userId)}
                isLoading={isLoading}
              />
            </ModalComponent>
            <MenuComponent
              opened={openedMenu}
              setOpened={setOpened}
              target={
                <button className="cursor-pointer">
                  <BsThreeDotsVertical />
                </button>
              }
            >
              <div className="bg-white">
                <ul className="px-1 text-gray-6 text-[0.88rem]">
                  <li
                    className="cursor-pointer px-2 py-2"
                    onClick={() => {
                      open();
                      setOpened(false);
                    }}
                  >
                    <p>View Profile</p>
                  </li>
                  {row.original.consultant ? null : (
                    <li
                      className="cursor-pointer px-2 py-2"
                      onClick={() => {
                        setOpened(false);
                        deleteFunc.open();
                      }}
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
