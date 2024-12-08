import Image from "next/image";
import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { MdInfoOutline } from "react-icons/md";
import {
  days,
  defaultAvailabilityHours,
  loaderColor,
} from "@/utils/constants/constants";
import HoursSelector from "./HoursSelector";
import UnstyledButton from "../Button/UnstyledButton";
import { ICreateAvailabilityPayload } from "@/interfaces/consultants/profile/availability";
import {
  useEditAvailabilityMutation,
  useGetConsultantAvailabilityQuery,
  useLazyGetConsultantAvailabilityQuery,
} from "@/lib/features/consultants/profile/availability";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import Spinner from "@/app/Spinner/Spinner";
import { Skeleton } from "@mantine/core";
import { useLazyGetAvailabilityHoursQuery } from "@/lib/features/users/services/chat/chat";

type Props = {
  close: () => void;
};

const SetStandardHoursModal = (props: Props) => {
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );

  const consultantExpertise = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.expertise
  );
  const [setStandardHours, { isSuccess, isError, error, data, isLoading }] =
    useEditAvailabilityMutation();
  const [availableHours, setAvailableHours] = useState<
    ICreateAvailabilityPayload[]
  >([]);
  const [getConsultantAvailability, result] =
    useLazyGetConsultantAvailabilityQuery();

  useEffect(() => {
    if (result.error) {
      if (consultantExpertise) {
        const defaultHours: ICreateAvailabilityPayload[] =
          defaultAvailabilityHours.map((el) => {
            return {
              ctime: el.ctime,
              expertise: consultantExpertise,
              day: el.day,
              status: el.status,
              otime: el.otime,
            };
          });
        setAvailableHours(defaultHours);
      }
    }
    if (result.data) {
      setAvailableHours(result.data.availability);
    }
  }, [result.error, result.data]);

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify(
        "error",
        "Error",
        (error as any).data?.message || "An Error Occured"
      );
    }
    if (isSuccess) {
      notify("success", "Successful!", "Availability hours set successfully");
      props.close();
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    getConsultantAvailability(consultantId!);
  }, []);

  const updateAvailabiltyHours = (
    index: number,
    payload: {
      hours: number;
      minutes: number;
      seconds: number;
    },
    type: "openTime" | "closeTime"
  ) => {
    const currAvalabilityHours = [...availableHours];
    const currPayload = currAvalabilityHours[index];

    currAvalabilityHours.splice(index, 1, {
      ctime: type === "closeTime" ? payload : currPayload.ctime,
      otime: type === "openTime" ? payload : currPayload.otime,
      day: currPayload.day,
      status: currPayload.status,
      expertise: currPayload.expertise,
    });

    setAvailableHours(currAvalabilityHours);
  };

  const updateStatus = (index: number, status: "open" | "close") => {
    const currAvalabilityHours = [...availableHours];
    const currPayload = currAvalabilityHours[index];
    currAvalabilityHours.splice(index, 1, {
      ctime: currPayload.ctime,
      otime: currPayload.otime,
      day: currPayload.day,
      status,
      expertise: currPayload.expertise,
    });
    setAvailableHours(currAvalabilityHours);
  };

  return (
    <section className="px-4 py-4">
      <div className="flex items-center ">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Set standard hours
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="flex mt-6 items-start bg-gray-bg-7 border py-4 rounded-md px-4 border-border-gray">
        <MdInfoOutline className="text-[#14213D] mr-4 text-xl mt-1" />
        <div className="text-black-7 text-[0.88rem]">
          <p>• Set your hours</p>
          <p>• Save the changes</p>
        </div>
      </div>
      {result.isFetching ? (
        <div className="mt-8">
          <div className="mt-4">
            <Skeleton height={50} />
          </div>
          <div className="mt-4">
            <Skeleton height={50} />
          </div>
          <div className="mt-4">
            <Skeleton height={50} />
          </div>
          <div className="mt-4">
            <Skeleton height={50} />
          </div>
          <div className="mt-4">
            <Skeleton height={50} />
          </div>
          <div className="mt-4">
            <Skeleton height={50} />
          </div>
        </div>
      ) : (
        <div className="mt-4">
          {availableHours.map((el, index) => (
            <HoursSelector
              updateHours={updateAvailabiltyHours}
              index={index}
              day={el.day}
              data={el}
              key={el.day}
              updateStatus={updateStatus}
            />
          ))}
        </div>
      )}
      <div className="w-full flex flex-wrap mt-[5rem]">
        <UnstyledButton
          clicked={props.close}
          class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
        >
          Cancel
        </UnstyledButton>
        <UnstyledButton
          clicked={() => {
            setStandardHours({ schedule: availableHours });

          }}
          disabled={isLoading}
          class="flex w-[8rem] py-2 px-4 transition-all rounded-md  justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
        >
          {isLoading ? (
            <div className="">
              <div className="w-[1rem] py-1">
                <Spinner />
              </div>
            </div>
          ) : (
            <p>Save updates</p>
          )}
        </UnstyledButton>
      </div>
    </section>
  );
};

export default SetStandardHoursModal;
