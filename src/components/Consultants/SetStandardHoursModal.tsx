import Image from "next/image";
import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { MdInfoOutline } from "react-icons/md";
import {
  days,
  defaultAvailabilityHours,
  defaultAvailabilityHoursV2,
  loaderColor,
} from "@/utils/constants/constants";
import HoursSelector from "./HoursSelector";
import UnstyledButton from "../Button/UnstyledButton";
import {
  ICreateAvailabilityPayload,
  ICreateAvailabilityPayloadV2,
} from "@/interfaces/consultants/profile/availability";
import {
  useEditAvailabilityMutation,
  useLazyGetConsultantAvailabilityQuery,
} from "@/lib/features/consultants/profile/availability";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import Spinner from "@/app/Spinner/Spinner";
import { Skeleton } from "@mantine/core";
import { sortTimeSlots } from "@/utils/helperFunction";

type Props = {
  close: () => void;
  refresh: () => void;
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
    ICreateAvailabilityPayloadV2[]
  >([]);
  const [getConsultantAvailability, result] =
    useLazyGetConsultantAvailabilityQuery();

  useEffect(() => {
    if (result.error) {
      if (consultantExpertise) {
        const defaultHours: ICreateAvailabilityPayloadV2[] =
          defaultAvailabilityHoursV2.map((el) => {
            return {
              day: el.day,
              expertise: el.expertise,
              slots: el.slots,
              status: el.status,
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
      nprogress.complete();
      notify("success", "Successful!", "Availability hours set successfully");
      props.refresh();
      props.close();
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    getConsultantAvailability(consultantId!);
  }, []);

  const updateAvailabiltyHours = (index: number, payload: string[]) => {
    const currAvalabilityHours = [...availableHours];
    const currPayload = currAvalabilityHours[index];

    currAvalabilityHours.splice(index, 1, {
      slots: sortTimeSlots(payload),
      day: currPayload.day,
      status: currPayload.status,
      expertise: currPayload.expertise,
    });

    setAvailableHours(currAvalabilityHours);
  };

  const updateStatus = (index: number, status: "open" | "closed") => {
    const currAvalabilityHours = [...availableHours];
    const currPayload = currAvalabilityHours[index];
    currAvalabilityHours.splice(index, 1, {
      slots: status === "open" ? currPayload.slots : [],
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
            nprogress.start();
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
