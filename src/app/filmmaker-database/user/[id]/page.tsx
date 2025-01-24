"use client";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Tabs } from "@mantine/core";
import React from "react";
import CrewProfile from "../../profile/crew/[id]/page";
import CompanyProfile from "../../profile/company/[id]/page";
import CompanyProfileView from "@/components/FilmakerDatabase/CompanyProfileView";
import CrewProfileView from "@/components/FilmakerDatabase/CrewProfileView";

type Props = {};

const FilmmakerUser = (props: Props) => {
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
