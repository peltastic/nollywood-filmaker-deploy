"use client";
import Spinner from "@/app/Spinner/Spinner";
import EditCrewForm from "@/components/FilmakerDatabase/Forms/Crew/EditCrewForm";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { useLazyFetchCrewDataQuery } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const EditFilmmakerCrewProfile = (props: Props) => {
  const params = useParams<{ id: string }>();
  const [fetchCrewData, { isFetching, data }] = useLazyFetchCrewDataQuery();
  useEffect(() => {
    if (params.id) {
      fetchCrewData(params.id);
    }
  }, [params.id]);
  return (
    <HomeLayout hideLogin>
      <section className="px-10 text-center w-[60%] mx-auto">
        <h1 className="text-3xl mt-10 font-medium">
          Edit Filmmaker Database Crew Profile
        </h1>
        <div className="mt-10">
          {isFetching ? (
            <div className="w-[3rem] mx-auto">
              <Spinner dark />
            </div>
          ) : (
            <>{data && <EditCrewForm data={data} id={params.id} />} </>
          )}
        </div>
      </section>
    </HomeLayout>
  );
};

export default EditFilmmakerCrewProfile;
