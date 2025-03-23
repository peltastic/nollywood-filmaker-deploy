"use client";
import ContactUSResponseForm from "@/components/Admin/ContactUSResponseForm";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import RenderTextAreaInput from "@/components/RenderTextAreaInput/RenderTextAreaInput";
import ContactUsSkeleton from "@/components/Skeletons/ContactUsSkeleton";
import { useLazyFetchSingleContactResponseQuery } from "@/lib/features/admin/contact-us/contact-us";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const SingleContactUsPage = (props: Props) => {
  const params = useParams<{ id: string }>();
  const [getSingleSingle, { isError, isFetching, data }] =
    useLazyFetchSingleContactResponseQuery();
  useEffect(() => {
    if (params.id) {
      getSingleSingle(params.id);
    }
  }, [params.id]);
  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        {isFetching ? (
          <ContactUsSkeleton />
        ) : (
          <section>
            <h1 className="text-2xl mb-6 mt-8">
              {data?.submission.firstName} {data?.submission.lastName}
            </h1>
            <p className="mb-6">{data?.submission.email}</p>
            <p className="mb-10">{data?.submission.phone}</p>
            <div className="bg-stroke-5 text-black-2 py-6 px-8 rounded-xl w-[60%]">
              <RenderTextAreaInput text={data?.submission.message || ""} />
            </div>
            <div className="w-[60%]">
              <ContactUSResponseForm id={params.id as string} />
            </div>
          </section>
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default SingleContactUsPage;
