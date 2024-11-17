"use client"
import DashboardBodyLayout from '@/components/Layouts/DashboardBodyLayout'
import ServiceLayout from '@/components/Layouts/ServiceLayout'
import PeferencesSettings from '@/components/Settings/Peferences'
import ProfileSettings from '@/components/Settings/Profile'
import SecuritySettings from '@/components/Settings/Security'
import { Tabs } from '@mantine/core'
import React from 'react'

type Props = {}
const tabs = ["Profile", "Security", "Preferences"]

const ConsultantSettingsPage = (props: Props) => {
  return (
    <ServiceLayout consultant>
    <DashboardBodyLayout>
      <div className="px-4 md:px-[5rem] pt-[3rem] lg:pt-0 lg:mt-10">
        <h1 className="text-black-2 text-[1.5rem] font-bold">Settings</h1>
        <div className="mt-10">
          <Tabs  color="#181818" defaultValue={"profile"}>
            <Tabs.List>
              {tabs.map((el) => (
                <Tabs.Tab value={el.toLowerCase()}>{el}</Tabs.Tab>
              ))}
            </Tabs.List>
            <Tabs.Panel value="profile">
              <ProfileSettings settingsType='consultant' />
            </Tabs.Panel>
            <Tabs.Panel value="security">
              <SecuritySettings />
            </Tabs.Panel>
            <Tabs.Panel value="preferences">
              <PeferencesSettings consultant />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </DashboardBodyLayout>
  </ServiceLayout>
  )
}

export default ConsultantSettingsPage