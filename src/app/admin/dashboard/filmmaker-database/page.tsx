"use client";
import {
  ICompanyFilmmakerDatabaseColumnData,
  company_database_column,
} from "@/components/Columns/admin/CompanyFilmmakerDatabaseColumn";
import {
  ICrewFilmmakerDatabaseColumnData,
  crew_database_column,
} from "@/components/Columns/admin/CrewFilmmakerDatabaseColumn";
import HoverCardComponent from "@/components/HoverCard/HoverCardComponent";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SelectComponent from "@/components/Select/SelectComponent";
import { DataTable } from "@/components/Tables/DataTable";
import { useProtectAdmin } from "@/hooks/useProtectAdminRoute";
import { useLazyFetchCompanyorCrewQuery } from "@/lib/features/admin/filmmaker-database/filmmaker-database";
import {
  companyTypeList,
  departmentList,
  film_crew_values,
} from "@/utils/constants/constants";
import React, { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";

type Props = {};

const AdminFilmmakerDatabasePage = (props: Props) => {
  useProtectAdmin();
  const [databaseData, setDatabaseData] = useState<
    ICrewFilmmakerDatabaseColumnData[]
  >([]);
  const [companyDatabaseData, setCompanyDatabase] = useState<
    ICompanyFilmmakerDatabaseColumnData[]
  >([]);

  const [companyType, setCompanyType] = useState<string>("");

  const [companyDepartmentVal, setCompanyDepartmentVal] = useState<string>("");
  const [rolesList, setRolesList] = useState<string[]>([]);
  const [roleVal, setRoleVal] = useState<string>("");

  const [location, setLocation] = useState<string>("");

  const [type, setType] = useState<"crew" | "company">("crew");

  const [refresh, setRefresh] = useState<boolean>(false);

  const [fetchCompanyOrCrew, { data, isFetching }] =
    useLazyFetchCompanyorCrewQuery();
  useEffect(() => {
    fetchCompanyOrCrew({
      type,
    });
  }, []);
  useEffect(() => {
    if (companyDepartmentVal) {
      const list = film_crew_values.filter(
        (el) => el.key === companyDepartmentVal
      );
      setRolesList(list[0].value);
    }
  }, [companyDepartmentVal]);

  useEffect(() => {
    if (data) {
      if (type == "crew") {
        const transformedData: ICrewFilmmakerDatabaseColumnData[] =
          data.data.map((el) => {
            return {
              category: "Film crew",
              department: el.department,
              email: el.email,
              fullname: `${el.firstName} ${el.lastName}`,
              location: `${el.location.state},${el.location.country}`,
              phone: el.mobile,
              role: el.role[0],
              fee: el.fee || "N/A",
              fulldata: el,
              type,
            };
          });
        setDatabaseData(transformedData);
      }
      if (type === "company") {
        const transformedData: ICompanyFilmmakerDatabaseColumnData[] =
          data.data.map((el) => {
            return {
              category: "Film company",
              company_type: el.type,
              email: el.email,
              location: `${el.location.state},${el.location.country}`,
              name: el.name,
              phone: el.mobile,
              fee: el.fee || "N/A",
              fulldata: el,
              type,
            };
          });
        setCompanyDatabase(transformedData);
      }
    }
  }, [data]);
  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <section>
          <div className="bg-white py-6 px-4 flex items-center">
            <div className="flex items-center text-sm font-medium">
              <div
                onClick={() => {
                  setRefresh(false);
                  setType("crew");
                  setCompanyType("");
                  setLocation("");
                  fetchCompanyOrCrew({ type: "crew" });
                }}
                className={`${
                  type === "crew" ? "border border-black-2" : "border"
                }  py-2 px-6 rounded-md mr-2 cursor-pointer`}
              >
                <p>Crew</p>
              </div>
              <div
                onClick={() => {
                  setRefresh(false);
                  setType("company");
                  setLocation("");
                  fetchCompanyOrCrew({ type: "company" });
                  setCompanyDepartmentVal("");
                  setRoleVal("");
                }}
                className={`${
                  type === "company" ? "border border-black-2" : "border"
                } py-2 px-6 rounded-md mr-2 cursor-pointer`}
              >
                <p>Company</p>
              </div>
            </div>
            <div className="ml-auto flex items-center">
              {type === "company" ? (
                <div className="mr-2">
                  <SelectComponent
                    data={companyTypeList}
                    label=""
                    placeholder="Select company type"
                    value={companyType}
                    setValueProps={(val) => {
                      if (val) {
                        setRefresh(true);
                        setCompanyType(val);
                        fetchCompanyOrCrew({
                          type,
                          companyType: val,
                          location,
                        });
                      }
                    }}
                    size="md"
                  />
                </div>
              ) : (
                <div className="flex mr-4 items-center">
                  <div className="">
                    <SelectComponent
                      data={departmentList}
                      label=""
                      placeholder="Select department"
                      size="md"
                      value={companyDepartmentVal}
                      defaultValue={companyDepartmentVal}
                      setValueProps={(val) => {
                        if (val) {
                          setCompanyDepartmentVal(val);
                          setRefresh(true);
                          fetchCompanyOrCrew({
                            type,
                            roles: roleVal,
                            department: val,
                            location,
                          });
                        }
                      }}
                    />
                  </div>
                  {rolesList.length > 0 && (
                    <div className="ml-4">
                      <SelectComponent
                        data={rolesList.map((el) => {
                          return {
                            label: el,
                            value: el,
                          };
                        })}
                        size="md"
                        label=""
                        placeholder="Select role"
                        value={roleVal}
                        defaultValue={roleVal}
                        setValueProps={(val) => {
                          if (val) {
                            setRoleVal(val);
                            setRefresh(true);
                            fetchCompanyOrCrew({
                              type,
                              roles: val,
                              department: companyDepartmentVal,
                              location,
                            });
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              <input
                type="text"
                placeholder="Search by Location"
                value={location}
                className="outline-none border focus:border py-2 px-6 rounded-md text-md"
                onChange={(e) => {
                  if (e.target.value) {
                    setLocation(e.target.value);
                    fetchCompanyOrCrew({
                      type,
                      location,
                    });
                  } else {
                    setLocation(e.target.value);
                    fetchCompanyOrCrew({
                      type,
                    });
                  }
                }}
              />
              {refresh && (
                <HoverCardComponent
                  target={
                    <div
                      onClick={() => {
                        fetchCompanyOrCrew({
                          type,
                        });
                        setCompanyDepartmentVal("");
                        setCompanyType("");
                        setRoleVal("");
                        setRolesList([])
                        setLocation("");
                        setRefresh(false)
                      }}
                      className="text-2xl ml-6 cursor-pointer transition-all hover:bg-gray-bg-9 rounded-full py-1 px-1"
                    >
                      <MdRefresh />
                    </div>
                  }
                >
                  <p className="text-sm">Refresh table</p>
                </HoverCardComponent>
              )}
            </div>
          </div>
          <div className="">
            {type === "crew" ? (
              <DataTable
                title="Filmmaker Database"
                data={databaseData}
                isFetching={isFetching}
                loaderLength={10}
                columns={crew_database_column}
                emptyHeader={
                  location
                    ? "No results found for your search"
                    : "No crew profiles registered yet"
                }
              />
            ) : (
              <DataTable
                title="Filmmaker Database"
                data={companyDatabaseData}
                isFetching={isFetching}
                loaderLength={10}
                columns={company_database_column}
                emptyHeader={
                  companyType || location
                    ? "No results found for your search"
                    : "No company profiles registered yet"
                }
              />
            )}
          </div>
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminFilmmakerDatabasePage;
