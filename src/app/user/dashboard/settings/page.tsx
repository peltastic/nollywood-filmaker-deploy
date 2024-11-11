"use client";
import Spinner from "@/app/Spinner/Spinner";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import PeferencesSettings from "@/components/Settings/Peferences";
import ProfileSettings from "@/components/Settings/Profile";
import SecuritySettings from "@/components/Settings/Security";
import { useFetchUserPreferencesQuery } from "@/lib/features/users/profile/profile";
import { RootState } from "@/lib/store";
import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const tabs = ["Profile", "Security", "Preferences"];
const SettingsPage = (props: Props) => {
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const preferencesQuery = useFetchUserPreferencesQuery(userId!, {
    refetchOnMountOrArgChange: true,
  });

  // const [activeTab, setActiveTab] = useState<string> ('first');
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <div className="px-4 md:px-[5rem] pt-[3rem] lg:pt-0 lg:mt-10">
          <h1 className="text-black-2 text-[1.5rem] font-bold">Settings</h1>
          <div className="mt-10">
            <Tabs color="#181818" defaultValue={"profile"}>
              <Tabs.List>
                {tabs.map((el) => (
                  <Tabs.Tab value={el.toLowerCase()}>{el}</Tabs.Tab>
                ))}
              </Tabs.List>
              <Tabs.Panel value="profile">
                <ProfileSettings />
              </Tabs.Panel>
              <Tabs.Panel value="security">
                <SecuritySettings />
              </Tabs.Panel>
              <Tabs.Panel value="preferences">
                {preferencesQuery.isFetching ? (
                  <div className="w-[5rem] mt-10 mx-auto">
                    <Spinner dark />
                  </div>
                ) : (
                  <PeferencesSettings data={preferencesQuery.data} />
                )}
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default SettingsPage;
