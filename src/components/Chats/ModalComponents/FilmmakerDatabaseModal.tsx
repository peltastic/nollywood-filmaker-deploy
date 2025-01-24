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

  const [fetchCompanyOrCrew, { data, isFetching }] =
    useLazyGetCompanyOrCrewDataQuery();
  useEffect(() => {
    fetchCompanyOrCrew(type);
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
      <div className="bg-white py-6 flex items-center ">
        <div className="w-[10rem]">
          <SelectComponent
            data={[
              {
                label: "Crew",
                value: "crew",
              },
              {
                label: "Company",
                value: "company",
              },
            ]}
            label=""
            placeholder=""
            value={type}
            setValueProps={(val: any) => {
              setSelectedCompanyDataArray([])
              setSelectedCrewDataArray([])
              setType(val);
              fetchCompanyOrCrew(val);
            }}
          />
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
            class="ml-auto transition-all hover:bg-blue-1 bg-black-3 text-white text-[0.88rem] py-2 px-4 rounded-md"
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
