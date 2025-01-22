"use client";
import {
  ICrewFilmmakerDatabaseColumnData,
  crew_database_column,
} from "@/components/Columns/admin/FilmmakerDatabaseColumn";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SelectComponent from "@/components/Select/SelectComponent";
import { DataTable } from "@/components/Tables/DataTable";
import { useLazyFetchCompanyorCrewQuery } from "@/lib/features/admin/filmmaker-database/filmmaker-database";
import React, { useEffect, useState } from "react";

type Props = {};

const AdminFilmmakerDatabasePage = (props: Props) => {
  const [databaseData, setDatabaseData] = useState<
    ICrewFilmmakerDatabaseColumnData[]
  >([]);
  const [type, setType] = useState<"crew" | "company">("crew");
  const [fetchCompanyOrCrew, { data, isFetching }] =
    useLazyFetchCompanyorCrewQuery();
  useEffect(() => {
    fetchCompanyOrCrew(type);
  }, []);

  useEffect(() => {
    if (data) {
      const transformedData: ICrewFilmmakerDatabaseColumnData[] = data.data.map(
        (el) => {
          return {
            category: "Film crew",
            department: el.department,
            email: el.email,
            fullname: `${el.firstName} ${el.lastName}`,
            location: `${el.location.state},${el.location.country}`,
            phone: el.mobile,
            role: el.role[0],
            fee: el.fee,
            fulldata: el,
          };
        }
      );
      setDatabaseData(transformedData);
    }
  }, [data]);
  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <section>
          <div className="bg-white py-6 px-4">
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
                setValueProps={(val: any) => {
                  setType(val);
                }}
              />
            </div>
          </div>
          <div className="">
            <DataTable
              title="Filmmaker Database"
              data={databaseData}
              isFetching={isFetching}
              loaderLength={10}
              columns={crew_database_column}
            />
          </div>
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminFilmmakerDatabasePage;
