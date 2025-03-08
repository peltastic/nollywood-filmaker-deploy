"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Logo from "/public/assets/logo22.png";
import ProfileBanner from "/public/assets/filmmaker-database/filmmaker-profile-banner.png";
import { useLazyFetchCrewDataQuery } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { useParams } from "next/navigation";
import FilmmakerSkeletonProfile from "@/components/Skeletons/FilmmakerSkeletonProfile";
import { FaUser } from "react-icons/fa";
import { IoBriefcaseOutline, IoLocationOutline } from "react-icons/io5";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { AspectRatio, Tabs } from "@mantine/core";
import Link from "next/link";
import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import CancelImg from "/public/assets/cancel.svg";
import { IoMdClipboard } from "react-icons/io";
import {
  TwitterShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { notify } from "@/utils/notification";
import HomeLayout from "@/components/Layouts/HomeLayout";
import RenderTextAreaInput from "@/components/RenderTextAreaInput/RenderTextAreaInput";

type Props = {};
const tabs_list = ["About", "Jobs", "Rate"];
const CrewProfile = (props: Props) => {
  const [fetchCrewData, { isFetching, data }] = useLazyFetchCrewDataQuery();
  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (params.id) {
      fetchCrewData(params.id);
    }
  }, [params.id]);
  const origin =
    window.origin +
    "/filmmaker-database" +
    "/profile" +
    "/crew" +
    "/" +
    params.id;
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <ModalComponent
        centered
        onClose={close}
        opened={opened}
        withCloseButton={false}
        size="xl"
      >
        <div className=" my-4 px-4">
          <div className="flex items-center">
            <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
              Share Profile
            </h1>
            <div
              onClick={close}
              className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
            >
              <Image src={CancelImg} alt="cancel-img" />
            </div>
          </div>
          <div className="my-4 bg-gray-bg-3  break-words py-2 px-4 rounded-md cursor-pointer text-center">
            <p className="break-words">{origin}</p>
          </div>
          <div className="flex flex-wrap gap-6 mt-8">
            <TwitterShareButton url={origin}>
              <XIcon size={40} />
            </TwitterShareButton>
            <WhatsappShareButton url={origin}>
              <WhatsappIcon size={40} />
            </WhatsappShareButton>
            <div
              onClick={() => {
                navigator.clipboard.writeText(origin);
                notify("success", "", "copied");
              }}
              className="flex items-center w-fit cursor-pointer bg-gray-bg-3 px-3 py-1 rounded-md"
            >
              <p className="text-lg mr-2">Copy to clipboard</p>
              <IoMdClipboard className="text-xl" />
            </div>
          </div>
        </div>
      </ModalComponent>
      <HomeLayout>
        <div className="">
          <section className="w-[90%] lg:w-[70%] mx-auto mt-10 max-w-[1200px]">
            {isFetching ? (
              <FilmmakerSkeletonProfile />
            ) : (
              <>
                <div
                  className="w-full h-[7rem] sm:h-[15rem] rounded-lg"
                  style={{
                    backgroundImage: `url(${ProfileBanner.src})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="flex items-start px-4 lg:px-16 flex-wrap">
                  <div className="flex items-center mr-auto flex-wrap ">
                    <div className="h-[6rem] mid:h-[9rem] -mt-10 w-[6rem] mid:w-[9rem] rounded-full bg-black-2 border-white flex items-center justify-center border">
                      {data?.crew.propic ? (
                        <AspectRatio ratio={1800 / 1800}>
                          <Image
                            src={data.crew.propic}
                            width={100}
                            height={100}
                            className="w-full h-full rounded-full"
                            alt="profile-pic"
                          />
                        </AspectRatio>
                      ) : (
                        <FaUser className="text-[5rem] text-white" />
                      )}
                    </div>
                    <div className="text-black-2  mt-4 md:ml-4 mr-auto w-full md:w-auto">
                      <p className="font-bold text-[1.4rem] sm:text-[1.8rem]">
                        {data?.crew.firstName} {data?.crew.lastName}
                      </p>
                      <div className="flex items-start sm:items-center mt-6 sm:mt-3">
                        <IoBriefcaseOutline className="text-2xl mr-5 xs:mr-3 mt-[0.2rem] sm:mt-0" />
                        <div className="flex items-center">
                          {data && data.crew ? (
                            <div className="flex items-center flex-wrap">
                              {data.crew.department.map((el, index) => {
                                return (
                                  <p key={el}>
                                    {el}
                                    <span>
                                      {index === data.crew.department.length - 1
                                        ? ""
                                        : ","}
                                      &nbsp;
                                    </span>
                                  </p>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex items-center mt-3">
                        <IoLocationOutline className="text-2xl mr-3" />
                        <p className="text-md sm:text-lg">
                          {data?.crew.location.state},{" "}
                          {data?.crew.location.country}
                        </p>
                      </div>
                    </div>
                  </div>
                  <UnstyledButton
                    clicked={open}
                    class="bg-black-2 transition-all hover:bg-blue-1 text-white py-2 px-4 mt-14 sm:mt-6 rounded-md"
                  >
                    Share profile
                  </UnstyledButton>
                </div>
                <section className="mt-16 mb-20 h-[50rem] md:h-auto">
                  <Tabs color="#181818" defaultValue={"about"}>
                    <Tabs.List>
                      {tabs_list.map((el) => (
                        <Tabs.Tab value={el.toLowerCase()}>
                          <p className="text-lg px-2 sm:px-6">{el}</p>
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                    <Tabs.Panel value="about">
                      <section>
                        {data?.crew.bio && (
                          <div className="mt-8">
                            <p className="text-[#A5A5A5]">Bio</p>
                            <div className="mt-2 text-[#4B5563]">
                              <RenderTextAreaInput text={data?.crew.bio} />
                            </div>
                          </div>
                        )}
                        <div className="mt-8">
                          <p className="text-[#A5A5A5]">Email</p>
                          <p className="mt-2 text-[#4B5563]">
                            {data?.crew.email}
                          </p>
                        </div>
                        <div className="mt-8">
                          <p className="text-[#A5A5A5]">Mobile</p>
                          <p className="mt-2 text-[#4B5563]">
                            {data?.crew.mobile}
                          </p>
                        </div>
                        <div className="mt-8 ">
                          <p className="text-[#A5A5A5]">Roles</p>
                          <div className="flex flex-wrap items-center">
                            {data?.crew.role.map((el, index) => {
                              const islast =
                                index === data.crew.role.length - 1;
                              return (
                                <p className="mt-2 text-[#4B5563]" key={el}>
                                  {el}
                                  <span>{islast ? "." : ","}</span> &nbsp;
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      </section>
                    </Tabs.Panel>
                    <Tabs.Panel value="jobs">
                      <section>
                        {data?.crew.works.length === 0 ? (
                          <div className="mt-10 text-[#4B5563]">
                            <p>No Works</p>
                          </div>
                        ) : (
                          <div className="">
                            {data?.crew.works.map((el) => (
                              <div className="mt-6" key={el._id}>
                                {el.year && (
                                  <p className="text-[#A5A5A5] mb-1">
                                    {el.year}
                                  </p>
                                )}
                                <p className="mb-1">{el.title}</p>
                                <p className="mb-1">{el.role}</p>
                                {el.link && (
                                  <Link
                                    target="_blank"
                                    className="text-[#4B5563] border-b"
                                    href={el.link}
                                  >
                                    View project
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </section>
                    </Tabs.Panel>
                    <Tabs.Panel value="rate">
                      <section>
                        {data?.crew.fee ? (
                          <div className="mt-6">
                            <p className="text-[#A5A5A5]">Fee</p>
                            <p>
                              <span className="font-medium">NGN</span>{" "}
                              {data.crew.fee}
                            </p>
                          </div>
                        ) : (
                          <p>
                            <div className="mt-10 text-[#4B5563]">
                              <p>No Specified Fees</p>
                            </div>
                          </p>
                        )}
                      </section>
                    </Tabs.Panel>
                  </Tabs>
                </section>
              </>
            )}
          </section>
        </div>
      </HomeLayout>
    </>
  );
};

export default CrewProfile;
