"use client";
import React, { useEffect } from "react";
import Logo from "/public/assets/logo2.png";
import Image from "next/image";
import ProfileBanner from "/public/assets/filmmaker-database/filmmaker-profile-banner.png";
import { FaUser } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { AspectRatio, Tabs } from "@mantine/core";
import { useLazyFetchCompanyDataQuery } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { useParams } from "next/navigation";
import FilmmakerSkeletonProfile from "@/components/Skeletons/FilmmakerSkeletonProfile";
import Link from "next/link";
import { RiAttachment2 } from "react-icons/ri";
import UnstyledButton from "@/components/Button/UnstyledButton";
import {
  TwitterShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import ModalComponent from "@/components/Modal/Modal";
import { notify } from "@/utils/notification";
import { IoMdClipboard } from "react-icons/io";
import { useDisclosure } from "@mantine/hooks";
import CancelImg from "/public/assets/cancel.svg"

type Props = {};

const tabs_list = ["About", "Clientele", "Rate"];
const CompanyProfile = (props: Props) => {
  const origin = window.location.href;
  const [fetchCompanyData, { isFetching, data }] =
    useLazyFetchCompanyDataQuery();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      fetchCompanyData(params.id);
    }
  }, [params.id]);
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
          <div className="my-4 bg-gray-bg-3 w-fit py-2 px-4 rounded-md cursor-pointer flex items-center">
            <p>{origin}</p>
          </div>
          <div className="flex gap-6 mt-8">
            <TwitterShareButton url={origin}>
              <XIcon size={40} />
            </TwitterShareButton>
            <WhatsappShareButton url={origin}>
              <WhatsappIcon size={40} />
            </WhatsappShareButton>
            <div
              onClick={() => {
                navigator.clipboard.writeText(origin);
                notify("success", "", "copied")
              }}
              className="flex items-center w-fit cursor-pointer bg-gray-bg-3 px-3 py-1 rounded-md"
            >
              <p className="text-lg mr-2">Copy to clipboard</p>
              <IoMdClipboard className="text-xl" />
            </div>
          </div>
        </div>
      </ModalComponent>
      <div className="">
        <nav className="py-8 px-10">
          <div className="w-[4rem]">
            <Image src={Logo} alt="logo" />
          </div>
        </nav>

        <section className="w-[70%] mx-auto">
          {isFetching ? (
            <FilmmakerSkeletonProfile />
          ) : (
            <>
              <div
                className="w-full  h-[15rem] rounded-lg"
                style={{
                  backgroundImage: `url(${ProfileBanner.src})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="flex items-start px-16 ">
                <div className="h-[9rem] -mt-10 w-[9rem] rounded-full bg-black-2 border-white flex items-center justify-center border">
                  {data?.company.propic ? (
                    <AspectRatio ratio={1800 / 1800}>
                      <Image
                        src={data.company.propic}
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
                <div className="text-black-2  mt-4 ml-4 mr-auto">
                  <p className="font-bold text-[1.8rem]">
                    {data?.company.name}
                  </p>
                  <div className="flex  items-center mt-3">
                    <IoBriefcaseOutline className="text-2xl mr-3" />
                    <p className="text-lg">{data?.company.type}</p>
                  </div>
                  <div className="flex items-center mt-3">
                    <IoLocationOutline className="text-2xl mr-3" />
                    <p className="text-lg">
                      {data?.company.location.state},{" "}
                      {data?.company.location.country}
                    </p>
                  </div>
                </div>
                <UnstyledButton class="bg-black-2 hover:bg-blue-1 transition-all text-white py-2 px-4 mt-6 rounded-md">
                  Share profile
                </UnstyledButton>
              </div>
              <section className="mt-16 mb-20">
                <Tabs color="#181818" defaultValue={"about"}>
                  <Tabs.List>
                    {tabs_list.map((el) => (
                      <Tabs.Tab value={el.toLowerCase()}>
                        <p className="text-lg px-6">{el}</p>
                      </Tabs.Tab>
                    ))}
                  </Tabs.List>
                  <Tabs.Panel value="about">
                    <section>
                      {data?.company.bio && (
                        <div className="mt-8">
                          <p className="text-[#A5A5A5]">Bio</p>
                          <p className="mt-2 text-[#4B5563]">
                            {data.company.bio}
                          </p>
                        </div>
                      )}
                      <div className="mt-8">
                        <p className="text-[#A5A5A5]">Email</p>
                        <p className="mt-2 text-[#4B5563]">
                          {data?.company.email}
                        </p>
                      </div>
                      <div className="mt-8">
                        <p className="text-[#A5A5A5]">Mobile</p>
                        <p className="mt-2 text-[#4B5563]">
                          {data?.company.mobile}
                        </p>
                      </div>
                      <div className="mt-8 ">
                        <p className="text-[#A5A5A5]">Company Type</p>
                        <p className="mt-2 text-[#4B5563]">
                          {data?.company.type}
                        </p>
                      </div>
                    </section>
                  </Tabs.Panel>
                  <Tabs.Panel value="clientele">
                    <section>
                      {data?.company.clientele.length === 0 ? (
                        <div className="mt-10 text-[#4B5563]">
                          <p>No Cliente yet</p>
                        </div>
                      ) : (
                        <div className="">
                          {data?.company.clientele.map((el) => (
                            <div className="mt-6" key={el._id}>
                              <p className="text-[#A5A5A5]">{el.year}</p>
                              <p>{el.title}</p>
                              <Link
                                target="_blank"
                                className="text-[#4B5563] border-b"
                                href={el.link}
                              >
                                View project
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  </Tabs.Panel>
                  <Tabs.Panel value="rate">
                    <section>
                      {data?.company.fee ? (
                        <div className="mt-6">
                          <p className="text-[#A5A5A5]">Fee</p>
                          <p>
                            <span className="font-medium">NGN</span>{" "}
                            {data.company.fee}
                          </p>
                        </div>
                      ) : data?.company.rateCard ? (
                        <div className="">
                          <div className="w-fit rounded-lg border-2 mt-6 mb-10 px-5 py-2 items-center flex">
                            <RiAttachment2 className="text-xl mr-4" />
                            <p>{data.company.name}'s Rate Card</p>
                          </div>
                          <Link
                            target="_blank"
                            className="bg-black-2 text-white py-2 px-4 transition-all hover:bg-blue-1  rounded-md"
                            href={data.company.rateCard}
                          >
                            Download ratecard
                          </Link>
                        </div>
                      ) : (
                        <p>
                          <div className="mt-10 text-[#4B5563]">
                            <p>No ratecard</p>
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
    </>
  );
};

export default CompanyProfile;
