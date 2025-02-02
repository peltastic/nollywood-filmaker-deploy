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
import {
  companyTypeList,
  departmentList,
  film_crew_values,
} from "@/utils/constants/constants";

type Props = {
  close: () => void;
  sendCrewContact: (val: ICrewFilmmakerDatabaseColumnData[]) => void;
  sendCompanyContact: (val: ICompanyFilmmakerDatabaseColumnData[]) => void;
};

const FilmmakerDatabaseModal = (props: Props) => {
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
  const [rolesList, setRolesList] = useState<string[]>([]);
  const [roleVal, setRoleVal] = useState<string>("");
  const [location, setLocation] = useState<string>("");

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
          data.data.map((el) => {
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
              consultant: true,
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
      <div className="bg-white py-6 flex items-center flex-wrap ">
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
        <div className="ml-auto flex flex-wrap items-center w-full lg:w-auto mt-8 lg:mt-0">
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
            <div className="flex flex-wrap mid:mr-4 items-center w-full mid:w-auto">
              <div className="w-full mid:w-auto mb-6 mid:mb-auto">
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
                <div className="mid:ml-4 w-full mid:w-auto mb-6 mid:mb-auto">
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
            className="outline-none border focus:border py-2 px-6 rounded-md text-md w-full mid:w-auto"
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
                    setRolesList([]);
                    setLocation("");
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
        {selectedCrewDataArray.length > 0 ||
        selectedCompanyDataArray.length > 0 ? (
          <UnstyledButton
            clicked={() => {
              if (type === "crew") {
                props.sendCrewContact(selectedCrewDataArray);
              } else {
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
      </div>
    </section>
  );
};

export default FilmmakerDatabaseModal;
