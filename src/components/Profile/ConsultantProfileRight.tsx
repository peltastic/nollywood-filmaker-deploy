import {
  ICreateAvailabilityPayload,
  ICreateAvailabilityPayloadV2,
} from "@/interfaces/consultants/profile/availability";
import { IConsultantProfileResponse } from "@/interfaces/consultants/profile/profile";
import { useLazyGetConsultantAvailabilityQuery } from "@/lib/features/consultants/profile/availability";
import { RootState } from "@/lib/store";
import { convert12HT24, get12HTime } from "@/utils/helperFunction";
import { Skeleton } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  data?: IConsultantProfileResponse;
  isFetching?: boolean;
};

const expertise = ["Producer", "Director", "Composer"];

const ConsultantProfileRight = ({ isFetching, data }: Props) => {
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
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

  return (
    <div className="">
      {data?.bio && (
        <div className="bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
          <div className="py-4 border-b border-b-stroke-6">
            <h1 className="font-medium text-[1.13rem]">About</h1>
          </div>
          <div className="mt-6">
            <h1 className="font-bold mb-2">Profile Bio</h1>
            <div className="text-black-2">{data.bio}</div>
          </div>
        </div>
      )}
      <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
        <div className="py-4 border-b border-b-stroke-6">
          <h1 className="font-medium text-[1.13rem]">Skills/Expertise</h1>
        </div>
        <div className="xs:grid-cols-2 md:grid-cols-4 grid mt-8 gap-x-6 gap-y-6">
          {isFetching ? (
            <>
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
            </>
          ) : (
            <>
              {data?.expertise.map((el) => (
                <div
                  className={
                    "border border-stroke-2 transition-all cursor-pointer text-[0.88rem] font-medium  flex items-center justify-center rounded-md  text-black-2 px-[3rem] h-[3.62rem]"
                  }
                  key={el}
                >
                  {el}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {(data?.phone || data?.email || data?.website) && (
        <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
          <div className="py-4 border-b border-b-stroke-6">
            <h1 className="font-medium text-[1.13rem]">Contact</h1>
          </div>
          <div className="grid mid:grid-cols-3 gap-x-3 mt-8">
            {isFetching ? (
              <>
                <Skeleton height={50} />
                <Skeleton height={50} />
                <Skeleton height={50} />
              </>
            ) : (
              <>
                {data?.phone && (
                  <div className="mb-4 mid:mb-0">
                    <h1 className="font-bold">Phone</h1>
                    <p>{data?.phone}</p>
                  </div>
                )}
                {data?.email && (
                  <div className="mb-4 mid:mb-0">
                    <h1 className="font-bold">Email</h1>
                    <p>{data?.email}</p>
                  </div>
                )}
                {data?.website && (
                  <div className="mb-4 mid:mb-0">
                    <h1 className="font-bold">Website</h1>
                    <p>{data.website}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {(data?.location?.city ||
        data?.location?.country ||
        data?.location?.state) && (
        <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
          <div className="py-4 border-b border-b-stroke-6">
            <h1 className="font-medium text-[1.13rem]">Location</h1>
          </div>
          <div className="grid mid:grid-cols-3 mt-8">
            {data.location.city && (
              <div className="mb-4 mid:mb-0">
                <h1 className="font-bold">City</h1>
                <p>{data.location.city}</p>
              </div>
            )}
            {data.location.country && (
              <div className="mb-4 mid:mb-0">
                <h1 className="font-bold">Country</h1>
                <p>{data.location.country}</p>
              </div>
            )}
            {data.location.state && (
              <div className="mb-4 mid:mb-0">
                <h1 className="font-bold">State</h1>
                <p>{data.location.state}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {availableHours.length > 0 && (
        <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
          <div className="py-4 border-b border-b-stroke-6">
            <h1 className="font-medium text-[1.13rem]">Availability</h1>
          </div>
          {availableHours.map((el) => (
            <div className="mt-6" key={el.day}>
              <h1 className="font-bold">{el.day}</h1>
              <div className="flex flex-wrap gap-4 mt-5">
                {el.slots.length > 0 ?<>
                {el.slots.map((el) => (
                  <div
                  className="text-gray-1 border font-normal border-gray-1    py-2 px-4 rounded-md transition-all"
                  key={el}
                  >
                    <p>{moment(el, "HH:mm").format("h:mm A")}</p>
                  </div>
                ))}
                </>: <p>No time slots chosen</p> }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultantProfileRight;
