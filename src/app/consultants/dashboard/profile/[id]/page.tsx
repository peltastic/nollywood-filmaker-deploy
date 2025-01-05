"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import SetStandardHoursModal from "@/components/Consultants/SetStandardHoursModal";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import MenuComponent from "@/components/Menu/MenuComponent";
import ModalComponent from "@/components/Modal/Modal";
import ConsultantProfileLeft from "@/components/Profile/ConsultantProfileLeft";
import ConsultantProfileRight from "@/components/Profile/ConsultantProfileRight";
import { useProtectRouteConsultantRoute } from "@/hooks/useProtectConsultantRoute";
import { ICreateAvailabilityPayloadV2 } from "@/interfaces/consultants/profile/availability";
import { useLazyGetConsultantAvailabilityQuery } from "@/lib/features/consultants/profile/availability";
import {
  useGetConsultantProfileQuery,
  useLazyGetConsultantProfileQuery,
} from "@/lib/features/consultants/profile/profile";
import { RootState } from "@/lib/store";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

type Props = {};

const ConsultantProfilePage = (props: Props) => {
  useProtectRouteConsultantRoute();
  const [opened, { open, close }] = useDisclosure();

  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
  const [fetchConsultantProfile, { data, isFetching }] =
    useLazyGetConsultantProfileQuery();
  const [availableHours, setAvailableHours] = useState<
    ICreateAvailabilityPayloadV2[]
  >([]);

  const [getConsultantAvailability, result] =
    useLazyGetConsultantAvailabilityQuery();

  useEffect(() => {
    if (result.isSuccess) {
      setAvailableHours(result.data.availability);
    }
  }, [result.isSuccess]);

  useEffect(() => {
    getConsultantAvailability(consultantId!);
  }, []);

  useEffect(() => {
    if (consultantId) {
      fetchConsultantProfile(consultantId);
      getConsultantAvailability(consultantId);
    }
  }, [consultantId]);
  const router = useRouter();
  const status: any = "active";
  const statusClassname =
    status === "ready"
      ? "bg-light-blue text-dark-blue"
      : status === "active"
      ? "bg-[#DCFCE7] text-dark-green"
      : status === "pending"
      ? "bg-stroke-4 text-black-6"
      : "bg-light-yellow text-dark-yellow";

  return (
    <ServiceLayout consultant>
      <>
        <ModalComponent
          onClose={close}
          withCloseButton={false}
          opened={opened}
          centered
          size="xl"
        >
          <SetStandardHoursModal
            close={close}
            refresh={() => {
              if (consultantId) {
                fetchConsultantProfile(consultantId);
                getConsultantAvailability(consultantId)
              }
            }}
          />
        </ModalComponent>
        <DashboardBodyLayout>
          <header className="flex flex-wrap md:flex-nowrap items-center pt-10 px-4 chatbp:px-0">
            <div className="flex items-center text-[1.5rem] mr-auto w-full md:w-auto ">
              <div
                onClick={() => router.back()}
                className="hover:bg-gray-bg-3 w-fit mr-8 transition-all cursor-pointer px-1 py-1 rounded-md"
              >
                <IoIosArrowBack className="text-gray-4 " />
              </div>
              <h1 className="text-black-2 font-bold">Profile details</h1>
            </div>
            <div className="flex items-center mt-10 md:mt-0 px-4 md:px-0">
              <p className="font-bold mr-3">Availability</p>
              <p
                className={`${statusClassname} font-medium, w-fit flex text-[0.75rem] items-center font-medium py-2 px-4 rounded-full`}
              >
                <span className="block pr-1">
                  <GoDotFill />
                </span>
                Active
              </p>
              <MenuComponent
                target={
                  <div>
                    <UnstyledButton class="ml-6 px-4 py-2 hover:bg-blue-1 rounded-md items-center bg-black-3 text-white flex">
                      <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                      <IoIosArrowDown />
                    </UnstyledButton>
                  </div>
                }
              >
                <div className="bg-white min-w-[10rem] ">
                  <ul className="px-1 text-gray-6 text-[0.88rem]">
                    <li
                      onClick={open}
                      className="py-2 mb hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                    >
                      Edit Availability
                    </li>
                    <li className="py-2 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4">
                      Delete Account
                    </li>
                  </ul>
                </div>
              </MenuComponent>
            </div>
          </header>
          <div className="flex flex-wrap chatbp:flex-nowrap items-start mt-14 md:mt-10">
            <div className="w-full chatbp:w-[30%]">
              <ConsultantProfileLeft />
            </div>
            {result.data && (
              <div className="px-4 chatbp:px-0 mt-8 chatbp:mt-0 w-full chatbp:w-[70%]">
                <ConsultantProfileRight
                  avalilability={result.data.availability}
                  isFetching={isFetching}
                  data={data}
                />
              </div>
            )}
          </div>
        </DashboardBodyLayout>
      </>
    </ServiceLayout>
  );
};

export default ConsultantProfilePage;
