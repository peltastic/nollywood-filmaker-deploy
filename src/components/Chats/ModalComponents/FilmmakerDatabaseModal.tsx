import Image from "next/image";
import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import {
  crew_database_column,
  ICrewFilmmakerDatabaseColumnData,
} from "@/components/Columns/admin/CrewFilmmakerDatabaseColumn";
import {
  company_database_column,
  ICompanyFilmmakerDatabaseColumnData,
} from "@/components/Columns/admin/CompanyFilmmakerDatabaseColumn";
import { useLazyGetCompanyOrCrewDataQuery } from "@/lib/features/consultants/dashboard/chat/filmmaker-database";
import { DataTable } from "@/components/Tables/DataTable";
import SelectComponent from "@/components/Select/SelectComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import HoverCardComponent from "@/components/HoverCard/HoverCardComponent";
import { MdRefresh } from "react-icons/md";
import { Country, State, IState, ICountry } from "country-state-city";
import {
  companyTypeList,
  departmentList,
  film_crew_values,
} from "@/utils/constants/constants";
import { Pagination } from "@mantine/core";

type Props = {
  close: () => void;
  sendCrewContact: (val: ICrewFilmmakerDatabaseColumnData[]) => void;
  sendCompanyContact: (val: ICompanyFilmmakerDatabaseColumnData[]) => void;
};

const FilmmakerDatabaseModal = (props: Props) => {
  const [activePages, setActivePages] = useState<number>(1);
  const [crewSelectedData, setCrewSelectedData] = useState<any>({});
  const [companySelectedData, setCompanySelectedData] = useState<any>({});

  const [selectedCrewDataArray, setSelectedCrewDataArray] = useState<
    ICrewFilmmakerDatabaseColumnData[]
  >([]);
  const [selectedCompanyDataArray, setSelectedCompanyDataArray] = useState<
    ICompanyFilmmakerDatabaseColumnData[]
  >([]);
  const [databaseData, setDatabaseData] = useState<
    ICrewFilmmakerDatabaseColumnData[]
  >([]);

  const [companyDatabaseData, setCompanyDatabase] = useState<
    ICompanyFilmmakerDatabaseColumnData[]
  >([]);

  const [type, setType] = useState<"crew" | "company">("crew");

  const [refresh, setRefresh] = useState<boolean>(false);

  const [companyType, setCompanyType] = useState<string>("");

  const [companyDepartmentVal, setCompanyDepartmentVal] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rolesList, setRolesList] = useState<string[]>([]);
  const [roleVal, setRoleVal] = useState<string>("");
  const [location, setLocation] = useState<string>("");
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

  const [fetchCompanyOrCrew, { data, isFetching }] =
    useLazyGetCompanyOrCrewDataQuery();
  useEffect(() => {
    fetchCompanyOrCrew({ type });
  }, []);

  useEffect(() => {
    const arr = Object.keys(crewSelectedData).map((key) => Number(key));
    const selectedValues = arr.map((index) => databaseData[index]);
    setSelectedCrewDataArray(selectedValues);
  }, [crewSelectedData]);
  useEffect(() => {
    const arr = Object.keys(companySelectedData).map((key) => Number(key));
    const selectedValues = arr.map((index) => companyDatabaseData[index]);
    setSelectedCompanyDataArray(selectedValues);
  }, [companySelectedData]);

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
          data.data.map((el, index) => {
            return {
              category: "Film crew",
              department: el.department,
              email: el.email,
              fullname: `${el.firstName} ${el.lastName}`,
              location: `${el.location.state},${el.location.country}`,
              phone: el.mobile,
              role: el.role,
              fee: el.fee || "N/A",
              fulldata: el,
              consultant: true,
              verificationType: "verified",
              index,
              page: activePages,
              works: el.works.map((el) => {
                return {
                  name: el.title,
                  link: el.link,
                  id: el._id,
                };
              }),
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
              location: `${el.location.state},${el.location.country}`,
              name: el.name,
              phone: el.mobile,
              fee: el.fee || "N/A",
              fulldata: el,
              consultant: true,
              verificationType: "verified",
              index,
              page: activePages,
              clientele: el.clientele.map((el) => {
                return {
                  name: el.title,
                  link: el.link || "",
                  id: el._id,
                };
              }),
            };
          });
        setCompanyDatabase(transformedData);
      }
    }
  }, [data]);

  return (
    <section className="px-6">
      <div className="flex">
        <h1 className="font-semibold text-[2rem]">
          Select filmmaker Database Contacts
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="bg-white py-6  ">
        <div className="flex items-center mb-6 gap-6 text-sm font-medium">
          <div
            onClick={() => {
              setRefresh(false);
              setType("crew");
              setCompanyType("");
              setLocation("Nigeria");
              setActivePages(1);
              setFeeVal("");

              fetchCompanyOrCrew({ type: "crew" });
            }}
            className={`${
              type === "crew" ? "border border-black-2" : "border"
            }  py-2 px-6 rounded-md  cursor-pointer`}
          >
            <p>Crew</p>
          </div>
          <div
            onClick={() => {
              setRefresh(false);
              setType("company");
              setActivePages(1);
              setLocation("Nigeria");
              setFeeVal("");
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
        <div className="ml-auto flex flex-wrap gap-6 items-center w-full lg:w-auto mt-8 lg:mt-0">
          {type === "company" ? (
            <div className="md:mr-2 w-full md:w-auto mb-6 md:mb-auto">
              <SelectComponent
                data={companyTypeList}
                label=""
                placeholder="Select company type"
                value={companyType || null}
                setValueProps={(val) => {
                  setActivePages(1);
                  if (val) {
                    setRefresh(true);
                    setCompanyType(val);
                    fetchCompanyOrCrew({
                      type,
                      companyType: val,
                      location:
                        location.toLowerCase() === "all" ? "" : location,
                    });
                  }
                }}
                size="md"
              />
            </div>
          ) : (
            <div className="flex flex-wrap md:mr-4 items-center w-full md:w-auto">
              <div className="w-full md:w-auto mb-6 md:mb-auto">
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
                  value={companyDepartmentVal || null}
                  defaultValue={companyDepartmentVal}
                  setValueProps={(val) => {
                    setActivePages(1);
                    if (val === "all") {
                      setCompanyDepartmentVal("");
                      setRoleVal("");
                      setRefresh(true);
                      fetchCompanyOrCrew({
                        type,
                        fee: feeVal,
                        roles:
                          roleVal?.toLowerCase() === "all"
                            ? ""
                            : roleVal || undefined,
                        location:
                          location.toLowerCase() === "all" ? "" : location,
                      });
                    } else if (val) {
                      setCompanyDepartmentVal(val);
                      setRoleVal("");
                      setRefresh(true);
                      fetchCompanyOrCrew({
                        type,
                        fee: feeVal,
                        department: val,
                        roles:
                          roleVal?.toLowerCase() === "all"
                            ? ""
                            : roleVal || undefined,
                        location:
                          location.toLowerCase() === "all" ? "" : location,
                      });
                    }
                  }}
                />
              </div>
              {rolesList.length > 0 && (
                <div className=" w-full md:w-auto mb-6 md:mb-auto ml-6">
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
                        setRoleVal("");
                        setRefresh(true);
                        fetchCompanyOrCrew({
                          type,
                          department: companyDepartmentVal
                            ? companyDepartmentVal
                            : "",
                          fee: feeVal,
                          location,
                        });
                      } else if (val) {
                        setRoleVal(val);
                        setRefresh(true);
                        fetchCompanyOrCrew({
                          type,
                          roles: val,
                          fee: feeVal,
                          department:
                            companyDepartmentVal?.toLowerCase() === "all"
                              ? ""
                              : companyDepartmentVal,
                          location:
                            location.toLowerCase() === "all" ? "" : location,
                        });
                      }
                    }}
                  />
                </div>
              )}
            </div>
          )}
          <div className="mb-6 md:mb-auto w-full md:w-auto">
            <div className=" w-full md:w-auto">
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
                      fetchCompanyOrCrew({
                        type,

                        department: companyDepartmentVal,
                        roles: roleVal,

                        companyType,
                      });
                    } else {
                      setRefresh(true);
                      fetchCompanyOrCrew({
                        type,

                        department: companyDepartmentVal,
                        roles: roleVal,

                        companyType,
                        location: country_name,
                      });
                      // setFormData((prev) => ({ ...prev, country: country_name }));
                      setCountriesVal(val);
                    }
                  }
                }}
                size="md"
                searchable
              />
            </div>
          </div>
          {countriesVal && (
            <div className=" mb-6 md:mb-auto w-full md:w-auto">
              <div className="w-full md:w-auto">
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

                        department: companyDepartmentVal,
                        roles: roleVal,

                        companyType,
                        location: `${country_name}${
                          val.toLowerCase() === "all" ? "" : ","
                        }${val.toLowerCase() === "all" ? "" : val}`,
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
          )}
          <div className=" w-full md:w-auto mb-6 md:mb-auto">
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
                setActivePages(1);
                if (val) {
                  if (val === "All") {
                    fetchCompanyOrCrew({
                      type,

                      department: companyDepartmentVal,
                      roles: roleVal,
                      location,
                      companyType,
                    });
                  } else {
                    setRefresh(true);
                    fetchCompanyOrCrew({
                      type,
                      fee: val,

                      department: companyDepartmentVal,
                      roles: roleVal,
                      location,
                      companyType,
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
            className="outline-none border focus:border py-3 px-6 rounded-md text-md md:ml-4 w-full md:w-auto"
            onChange={(e) => {
              if (e.target.value) {
                setName(e.target.value);
                fetchCompanyOrCrew({
                  type,
                  name,
                });
              } else {
                setName(e.target.value);
                fetchCompanyOrCrew({
                  type,
                });
              }
            }}
          />
          {/* <input
            type="text"
            placeholder="Search by Location"
            value={location}
            className="outline-none border focus:border py-2 px-6 rounded-md text-md w-full md:w-auto"
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
          /> */}
          {refresh && (
            <HoverCardComponent
              target={
                <div
                  onClick={() => {
                    fetchCompanyOrCrew({
                      type,
                    });
                    setCompanyDepartmentVal("");

                    setActivePages(1);
                    setCompanyType("");
                    setRoleVal("");
                    setRolesList([]);
                    setLocation("Nigeria");
                    setRefresh(false);
                    setFeeVal("");
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
        {selectedCrewDataArray.length > 0 ||
        selectedCompanyDataArray.length > 0 ? (
          <UnstyledButton
            clicked={() => {
              if (type === "crew") {
                props.sendCrewContact(selectedCrewDataArray);
              } else {
                console.log(selectedCompanyDataArray);
                props.sendCompanyContact(selectedCompanyDataArray);
              }
              props.close();
            }}
            class="mt-10 lg:mt-0 lg:ml-6 transition-all hover:bg-blue-1 bg-black-3 text-white text-[0.88rem] py-2 px-4 rounded-md"
          >
            Upload to chat
          </UnstyledButton>
        ) : null}
      </div>
      <div className="">
        {type === "crew" ? (
          <DataTable
            title="Filmmaker Database"
            data={databaseData}
            isFetching={isFetching}
            loaderLength={10}
            columns={crew_database_column}
            emptyHeader="No crew profiles registered yet"
            setRowSelectData={(val) => setCrewSelectedData(val)}
            crew={type}
          />
        ) : (
          <DataTable
            title="Filmmaker Database"
            data={companyDatabaseData}
            isFetching={isFetching}
            loaderLength={10}
            crew={type}
            columns={company_database_column}
            emptyHeader="No company profiles registered yet"
            setRowSelectData={(val) => setCompanySelectedData(val)}
          />
        )}
        {data && data.pagination.totalPages > 1 && (
          <Pagination
            total={data.pagination.totalPages}
            value={activePages}
            color="#333333"
            onChange={(val) => {
              fetchCompanyOrCrew({
                type,
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
                  roleVal?.toLowerCase() === "all" ? "" : roleVal || undefined,
              });
              setActivePages(val);
            }}
            mt={"xl"}
          />
        )}
      </div>
    </section>
  );
};

export default FilmmakerDatabaseModal;
