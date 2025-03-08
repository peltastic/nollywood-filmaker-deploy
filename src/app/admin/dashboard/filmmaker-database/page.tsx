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
import { Country, State } from "country-state-city";
import { Pagination } from "@mantine/core";

type Props = {};

const AdminFilmmakerDatabasePage = (props: Props) => {
  useProtectAdmin();

  const [activePages, setActivePages] = useState<number>(1);
  const [countriesVal, setCountriesVal] = useState<string>("NG Nigeria");
  const [countriesData, setCountriesData] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [statesData, setStatesData] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [feeVal, setFeeVal] = useState<string>("");

  useEffect(() => {
    const countriesData: { label: string; value: string }[] =
      Country.getAllCountries().map((el) => {
        return {
          label: el.name,
          value: `${el.isoCode} ${el.name}`,
        };
      });
    setCountriesData([{ label: "All", value: "All" }, ...countriesData]);
  }, []);
  useEffect(() => {
    if (countriesVal) {
      const stateData: { label: string; value: string }[] =
        State.getStatesOfCountry(countriesVal.split(" ")[0]).map((el) => {
          return {
            label: el.name,
            value: el.name,
          };
        });
      setStatesData([{ label: "All", value: "All" }, ...stateData]);
    }
  }, [countriesVal]);

  const [databaseData, setDatabaseData] = useState<
    ICrewFilmmakerDatabaseColumnData[]
  >([]);
  const [companyDatabaseData, setCompanyDatabase] = useState<
    ICompanyFilmmakerDatabaseColumnData[]
  >([]);

  const [companyType, setCompanyType] = useState<string>("");
  const [verificationType, setVerificationType] =
    useState<string>("unverified");

  const [companyDepartmentVal, setCompanyDepartmentVal] = useState<string>("");
  const [rolesList, setRolesList] = useState<string[]>([]);
  const [roleVal, setRoleVal] = useState<string | null>(null);

  const [location, setLocation] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [type, setType] = useState<"crew" | "company">("crew");

  const [refresh, setRefresh] = useState<boolean>(false);

  const [fetchCompanyOrCrew, { data, isFetching }] =
    useLazyFetchCompanyorCrewQuery();
  useEffect(() => {
    fetchCompanyOrCrew({
      type,
      verified: verificationType === "verified" ? true : false,
    });
  }, []);
  useEffect(() => {
    if (companyDepartmentVal && companyDepartmentVal !== "all") {
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
          data.data.map((el, index) => {
            return {
              category: "Film crew",
              department: el.department,
              email: el.email,
              fullname: `${el.firstName} ${el.lastName}`,
              location: `${el.location?.state},${el.location?.country}`,
              phone: el.mobile,
              role: el.role,
              fee: el.fee || "N/A",
              fulldata: el,
              type,
              verificationType,
              admin: true,
              index,
              page: activePages,
            };
          });
        setDatabaseData(transformedData);
      }
      if (type === "company") {
        const transformedData: ICompanyFilmmakerDatabaseColumnData[] =
          data.data.map((el, index) => {
            return {
              category: "Film company",
              company_type: el.type,
              email: el.email,
              location: `${el.location?.state},${el.location?.country}`,
              name: el.name,
              phone: el.mobile,
              fee: el.fee || "N/A",
              fulldata: el,
              type,
              verificationType,
              admin: true,
              index,
              page: activePages,
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
          <div className="bg-white py-6 px-4 ">
            <div className="flex items-center text-sm font-medium mb-10">
              <div
                onClick={() => {
                  setRefresh(false);
                  setType("crew");
                  setCompanyType("");
                  setLocation("");
                  setName("")
                  setActivePages(1);
                  fetchCompanyOrCrew({
                    type: "crew",
                    verified: verificationType === "verified" ? true : false,
                  });
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
                  setName("")
                  setLocation("");
                  setActivePages(1);
                  fetchCompanyOrCrew({
                    type: "company",
                    verified: verificationType === "verified" ? true : false,
                  });
                  setCompanyDepartmentVal("");
                  setRoleVal(null);
                }}
                className={`${
                  type === "company" ? "border border-black-2" : "border"
                } py-2 px-6 rounded-md mr-2 cursor-pointer`}
              >
                <p>Company</p>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap items-center w-full lg:w-auto mt-8 lg:mt-0">
              <div className="mr-4 mb-6 mid:mb-auto">
                <SelectComponent
                  defaultValue={verificationType}
                  value={verificationType}
                  label=""
                  placeholder=""
                  setValueProps={(val) => {
                    if (val) {
                      fetchCompanyOrCrew({
                        type,
                        companyType:
                          companyType.toLowerCase() === "all"
                            ? ""
                            : companyType,
                        location:
                          location.toLowerCase() === "all" ? "" : location,
                        verified: val === "verified" ? true : false,
                      });

                      setActivePages(1);
                      setVerificationType(val);
                    }
                  }}
                  size="md"
                  data={[
                    {
                      label: "Unverifed",
                      value: "unverified",
                    },
                    {
                      label: "Verified",
                      value: "verified",
                    },
                  ]}
                />
              </div>
              {type === "company" ? (
                <div className="mid:mr-2 w-full mid:w-auto mb-6 mid:mb-auto">
                  <SelectComponent
                    data={companyTypeList}
                    label=""
                    placeholder="Select company type"
                    value={companyType}
                    setValueProps={(val) => {
                      if (val) {
                        setRefresh(true);
                        setCompanyType(val);
                        setActivePages(1);
                        fetchCompanyOrCrew({
                          type,
                          companyType: val,
                          location:
                            location.toLowerCase() === "all" ? "" : location,
                          verified:
                            verificationType === "verified" ? true : false,
                        });
                      }
                    }}
                    size="md"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap mid:mr-4 items-center w-full mid:w-auto">
                  <div className="w-full mid:w-auto mb-6 mid:mb-auto">
                    <SelectComponent
                      data={[
                        {
                          label: "All",
                          value: "all",
                        },
                        ...departmentList,
                      ]}
                      label=""
                      placeholder="Select department"
                      size="md"
                      value={companyDepartmentVal}
                      defaultValue={companyDepartmentVal}
                      setValueProps={(val) => {
                        setActivePages(1);
                        if (val === "all") {
                          setCompanyDepartmentVal("");
                          setRoleVal(null);
                          setRefresh(true);
                          fetchCompanyOrCrew({
                            type,
                            location:
                              location.toLowerCase() === "all" ? "" : location,
                            verified:
                              verificationType === "verified" ? true : false,
                          });
                        } else if (val) {
                          setCompanyDepartmentVal(val);
                          setRefresh(true);
                          setRoleVal(null);
                          fetchCompanyOrCrew({
                            type,
                            department:
                              companyDepartmentVal?.toLowerCase() === "all"
                                ? ""
                                : companyDepartmentVal || undefined,
                            location:
                              location.toLowerCase() === "all" ? "" : location,
                            verified:
                              verificationType === "verified" ? true : false,
                          });
                        }
                      }}
                    />
                  </div>
                  {rolesList.length > 0 && (
                    <div className="mid:ml-4 w-full mid:w-auto mb-6 mid:mb-auto">
                      <SelectComponent
                        data={[
                          {
                            label: "All",
                            value: "all",
                          },
                          ...rolesList.map((el) => {
                            return {
                              label: el,
                              value: el,
                            };
                          }),
                        ]}
                        size="md"
                        label=""
                        placeholder="Select role"
                        value={roleVal}
                        defaultValue={roleVal}
                        setValueProps={(val) => {
                          setActivePages(1);
                          if (val === "all") {
                            setRoleVal(null);
                            setRefresh(true);
                            fetchCompanyOrCrew({
                              type,
                              department: companyDepartmentVal
                                ? companyDepartmentVal
                                : "",
                              location,
                              verified:
                                verificationType === "verified" ? true : false,
                            });
                          } else if (val) {
                            setRoleVal(val);
                            setRefresh(true);
                            fetchCompanyOrCrew({
                              type,
                              roles: val,
                              department:
                                companyDepartmentVal?.toLowerCase() === "all"
                                  ? ""
                                  : companyDepartmentVal,
                              location:
                                location.toLowerCase() === "all"
                                  ? ""
                                  : location,
                              verified:
                                verificationType === "verified" ? true : false,
                            });
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="mb-6 mid:mb-auto">
                <div className="">
                  <SelectComponent
                    data={countriesData}
                    placeholder="Search for country"
                    label=""
                    value={countriesVal}
                    defaultValue={countriesVal}
                    setValueProps={(val) => {
                      setActivePages(1);
                      if (val) {
                        const country_name = val.split(" ")[1];
                        if (val === "All") {
                          setCountriesVal("");
                          setLocation("");
                          fetchCompanyOrCrew({
                            type,
                            verified:
                              verificationType === "verified" ? true : false,
                          });
                        } else {
                          setRefresh(true);
                          fetchCompanyOrCrew({
                            type,
                            location: country_name,
                            verified:
                              verificationType === "verified" ? true : false,
                          });
                          setLocation(country_name);
                          setCountriesVal(val);
                          // setFormData((prev) => ({ ...prev, country: country_name }));
                        }
                      }
                    }}
                    size="md"
                    searchable
                  />
                </div>
              </div>
              {countriesVal ? (
                <div className="ml-4 mb-6 mid:mb-auto">
                  <div className="">
                    <SelectComponent
                      data={statesData}
                      placeholder="Search for state"
                      label=""
                      setValueProps={(val) => {
                        setActivePages(1);
                        if (val) {
                          setRefresh(true);
                          const country_name = countriesVal.split(" ")[1];
                          fetchCompanyOrCrew({
                            type,
                            location: `${country_name}${
                              val.toLowerCase() === "all" ? "" : ","
                            }${val.toLowerCase() === "all" ? "" : val}`,
                            verified:
                              verificationType === "verified" ? true : false,
                          });
                          setLocation(
                            `${country_name}${
                              val.toLowerCase() === "all" ? "" : ","
                            }${val.toLowerCase() === "all" ? "" : val}`
                          );

                          // setFormData((prev) => ({ ...prev, state: val }));
                        }
                      }}
                      searchable
                      size="md"
                    />
                  </div>
                </div>
              ) : null}
              <div className="ml-4">
                <SelectComponent
                  data={[
                    {
                      label: "All",
                      value: "All",
                    },
                    {
                      label: "0 - 500k",
                      value: "0 - 500k",
                    },
                    {
                      label: "500k - 2m",
                      value: "500k - 2m",
                    },
                    {
                      label: "2m - 5m",
                      value: "2m - 5m",
                    },
                    {
                      label: "5m+",
                      value: "5m+",
                    },
                  ]}
                  label=""
                  placeholder="Select fee"
                  setValueProps={(val) => {
                    if (val) {
                      setActivePages(1);
                      if (val === "All") {
                        fetchCompanyOrCrew({
                          type,
                          verified:
                            verificationType === "verified" ? true : false,
                        });
                      } else {
                        setRefresh(true);
                        fetchCompanyOrCrew({
                          type,
                          fee: val,
                          verified:
                            verificationType === "verified" ? true : false,
                        });
                      }
                      setFeeVal(val);
                    }
                  }}
                  value={feeVal || null}
                  size="md"
                />
              </div>
              <input
                type="text"
                placeholder="Search by name"
                value={name}
                className="outline-none border focus:border py-2 px-6 rounded-md text-md w-full sm:w-auto md:ml-4"
                onChange={(e) => {
                  if (e.target.value) {
                    setName(e.target.value);
                    fetchCompanyOrCrew({
                      type,
                      name,
                      verified: verificationType === "verified" ? true : false,
                    });
                  } else {
                    setName(e.target.value);
                    fetchCompanyOrCrew({
                      type,
                      verified: verificationType === "verified" ? true : false,
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
                          verified:
                            verificationType === "verified" ? true : false,
                        });
                        setCompanyDepartmentVal("");

                        setActivePages(1);
                        setCompanyType("");
                        setRoleVal(null);
                        setName("")
                        setRolesList([]);
                        setLocation("");
                        setFeeVal("");

                        setRefresh(false);
                      }}
                      className=" mt-8 mid:mt-auto text-2xl mid:ml-6 cursor-pointer transition-all hover:bg-gray-bg-9 rounded-full py-1 px-1"
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
                    : verificationType === "verified"
                    ? "No verified crew profiles registerd yet"
                    : "No unverified crew profiles"
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
                    : verificationType === "verified"
                    ? "No verified company profiles registerd yet"
                    : "No unverified company profiles"
                }
              />
            )}
          </div>
          {data && data.pagination.totalPages > 1 && (
            <Pagination
              total={data.pagination.totalPages}
              value={activePages}
              color="#333333"
              onChange={(val) => {
                fetchCompanyOrCrew({
                  type,
                  verified: verificationType === "verified" ? true : false,
                  page: val,
                  limit: 10,
                  location: location.toLowerCase() === "all" ? "" : location,
                  companyType:
                    companyType.toLowerCase() === "all" ? "" : companyType,
                  department:
                    companyDepartmentVal?.toLowerCase() === "all"
                      ? ""
                      : companyDepartmentVal || undefined,
                  fee: feeVal.toLowerCase() === "all" ? "" : feeVal,
                  roles:
                    roleVal?.toLowerCase() === "all"
                      ? ""
                      : roleVal || undefined,
                });
                setActivePages(val);
              }}
              mt={"xl"}
            />
          )}
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminFilmmakerDatabasePage;
