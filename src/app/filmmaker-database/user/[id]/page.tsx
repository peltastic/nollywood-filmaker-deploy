"use client";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Tabs } from "@mantine/core";
import React, { useEffect } from "react";
import CompanyProfileView from "@/components/FilmakerDatabase/CompanyProfileView";
import CrewProfileView from "@/components/FilmakerDatabase/CrewProfileView";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";

type Props = {};

const FilmmakerUser = (props: Props) => {
  const router = useRouter();
  const token = sessionStorage.getItem("filmmaker_token");
  useEffect(() => {
    if (!token) {
      notify(
        "message",
        "Session expired, please login to view and edit your profile"
      );
      router.push("/auth/login-filmmaker-database");
    }
  }, [token]);
  return (
    <HomeLayout hideLogin>
      <section className="px-10 py-10">
        <Tabs color="#181818" defaultValue={"Crew"}>
          <Tabs.List>
            <Tabs.Tab value="Crew">
              <p className="text-xl">Crew</p>
            </Tabs.Tab>
            <Tabs.Tab value="Company">
              <p className="text-xl">Company</p>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Crew">
            <CrewProfileView />
          </Tabs.Panel>
          <Tabs.Panel value="Company">
            <CompanyProfileView />
          </Tabs.Panel>
        </Tabs>
      </section>
    </HomeLayout>
  );
};

export default FilmmakerUser;
