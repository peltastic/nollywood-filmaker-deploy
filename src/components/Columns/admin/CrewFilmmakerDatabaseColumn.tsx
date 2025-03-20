import FilmmakerDatabaseProfileDrawer from "@/components/Admin/FilmmakerDatabaseProfileDrawer";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import HoverCardComponent from "@/components/HoverCard/HoverCardComponent";
import MenuComponent from "@/components/Menu/MenuComponent";
import ModalComponent from "@/components/Modal/Modal";
import { ICompanyOrCrewData } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import {
  useDeleteCrewCompanyMutation,
  useLazyFetchCompanyorCrewQuery,
} from "@/lib/features/admin/filmmaker-database/filmmaker-database";
import { truncateStr } from "@/utils/helperFunction";
import { notify } from "@/utils/notification";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { nprogress } from "@mantine/nprogress";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  verificationType: string;
  admin?: boolean;
  index: number;
  page: number;
  works?: { name: string; link: string; id: string }[];
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
      id: "s/n",
      cell: ({ row }) => (
        <p>{(row.original.page - 1) * 10 + 1 + row.original.index}</p>
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
      accessorKey: "nfscore",
      header: () => <div className="">NF Score</div>,
      cell: ({ row }) => {
        return (
          <div className="py-4 w-[10rem] xl:w-auto">
            <p>{row.original.fulldata.nfscore || "0"}</p>
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
      accessorKey: "works",
      header: ({ table }) => {
        const hasAdmin = table
          .getRowModel()
          .rows.some((row) => row.original.works);
        return <>{hasAdmin && <div className="">Works</div>}</>;
      },
      cell: ({ row }) => {
        return (
          <div className="">
            {row.original.works && (
              <div className="">
                {row.original.works.length > 0 ? (
                  <>
                    {row.original.works.map((el) => (
                      <HoverCardComponent
                        target={
                          <div>
                            {
                              el.link ? (
                                <Link
                                  href={el.link}
                                  key={el.id}
                                  target="_blank"
                                  className="underline"
                                >
                                  <p className="mb-2">
                                    {truncateStr(el.name, 20)}
                                  </p>
                                </Link>
                              ) : null
                              // <p className="mb-2">{truncateStr(el.name, 20)}</p>
                            }
                          </div>
                        }
                      >
                        <p className="text-xs">{el.name}</p>
                      </HoverCardComponent>
                    ))}
                  </>
                ) : (
                  <p>N/A</p>
                )}
              </div>
            )}
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
      header: ({ table }) => {
        const hasAdmin = table
          .getRowModel()
          .rows.some((row) => row.original.admin);
        return <>{hasAdmin && <div className="">Email</div>}</>;
      },
      cell: ({ row }) => {
        return (
          <>
            {row.original.admin && (
              <div className="w-[20rem] xl:w-auto">
                <p>{row.getValue("email")}</p>
              </div>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "phone",
      header: () => <div className="">Phone number</div>,
      cell: ({ row }) => {
        return (
          <div className="w-[15rem] xl:w-auto">
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
              <FilmmakerDatabaseProfileDrawer
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
                admin={row.original.admin}
                data={row.original.fulldata}
                verfied={
                  row.original.verificationType === "verified" ? true : false
                }
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
                body={`Are you sure you want to delete ${row.original.fullname.toUpperCase()} filmmaker database profile permanently?`}
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
