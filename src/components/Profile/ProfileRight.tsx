import { IGetUserProfileResponse } from "@/interfaces/profile/profile";

import { Skeleton } from "@mantine/core";
import React from "react";

type Props = {
  data?: IGetUserProfileResponse;
  isFetching?: boolean;
};
const expertise = [
  "Producer",
  "Director",
  "Composer",
  "Cinematographer",
  "Editor",
  "Writer",
];

const ProfileRight = ({ data, isFetching }: Props) => {
  return (
    <div className="">
      {data?.bio && (
        <div className="bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
          <div className="py-4 border-b border-b-stroke-6">
            <h1 className="font-medium text-[1.13rem]">About</h1>
          </div>
          <div className="mt-6">
            <h1 className="font-bold mb-2">Profile Bio</h1>
            <div className="text-black-2">
              <p>
                I am based in Miami, Florida USA and am a Business Entrepreneur
                with proven talent for driving website traffic along with a
                superior quality deliverable.A keen acumen and web building
                spirit help me in providing impeccable customer service for your
                personal or business website.
              </p>
              <p className="mt-4">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour
              </p>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${
          data?.bio ? "mt-4" : "mt-0"
        }  bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]`}
      >
        <div className="py-4 border-b border-b-stroke-6">
          <h1 className="font-medium text-[1.13rem]">Skills</h1>
        </div>
        <div className="grid-cols-4 grid mt-8 gap-x-6 gap-y-6">
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
      <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
        <div className="py-4 border-b border-b-stroke-6">
          <h1 className="font-medium text-[1.13rem]">Contact</h1>
        </div>
        <div className="grid grid-cols-3 gap-x-3 mt-8">
          {isFetching ? (
            <>
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
            </>
          ) : (
            <>
              <div className="">
                <h1 className="font-bold">Phone</h1>
                <p>{data?.phone}</p>
              </div>
              <div className="">
                <h1 className="font-bold">Email</h1>
                <p>{data?.email}</p>
              </div>
              {data?.website && (
                <div className="">
                  <h1 className="font-bold">Website</h1>
                  <p>{data.website}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-4 bg-white rounded-2xl pb-6 pt-2 px-6 border shadow-md border-stroke-5 shadow-[#1018280F]">
        <div className="py-4 border-b border-b-stroke-6">
          <h1 className="font-medium text-[1.13rem]">Location</h1>
        </div>
        <div className="grid grid-cols-3 mt-8">
          <div className="">
            <h1 className="font-bold">City</h1>
            <p>+861 555 669 6985</p>
          </div>
          <div className="">
            <h1 className="font-bold">Country</h1>
            <p>niyi@gmail.com</p>
          </div>
          <div className="">
            <h1 className="font-bold">Postal code</h1>
            <p>+234</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRight;
