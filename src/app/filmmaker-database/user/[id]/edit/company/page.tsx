"use client"
import Spinner from "@/app/Spinner/Spinner";
import EditCompanyForm from "@/components/FilmakerDatabase/Forms/Crew/EditCompanyForm";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { useLazyFetchCompanyDataQuery } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const EditFilmmakerCompanyPage = (props: Props) => {
  const [fetchCompanyData, { isFetching, data }] =
    useLazyFetchCompanyDataQuery();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      fetchCompanyData(params.id);
    }
  }, [params.id]);
  return (
    <HomeLayout hideLogin>
      <section className="px-10 text-center w-[60%] mx-auto">
        <h1 className="text-3xl mt-10 font-medium">
          Edit Filmmaker Database Company Profile
        </h1>
        <div className="mt-10">
          {isFetching ? (
            <div className="w-[3rem] mx-auto">
              <Spinner dark />
            </div>
          ) : (
            <>{data && <EditCompanyForm data={data} id={params.id} />} </>
          )}
        </div>
      </section>
    </HomeLayout>
  );
};

export default EditFilmmakerCompanyPage;
