import { useLazyFetchCompanyDataQuery } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { useDisclosure } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ModalComponent from "../Modal/Modal";
import Image from "next/image";
import CancelImg from "/public/assets/cancel.svg";
import {
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { notify } from "@/utils/notification";
import { IoMdClipboard } from "react-icons/io";
import ProfileBanner from "/public/assets/filmmaker-database/filmmaker-profile-banner.png";
import FilmmakerSkeletonProfile from "../Skeletons/FilmmakerSkeletonProfile";
import { IoBriefcaseOutline, IoLocationOutline } from "react-icons/io5";
import UnstyledButton from "../Button/UnstyledButton";
import { AspectRatio, Tabs } from "@mantine/core";
import { RiAttachment2 } from "react-icons/ri";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import RenderTextAreaInput from "../RenderTextAreaInput/RenderTextAreaInput";

type Props = {};

const tabs_list = ["About", "Clientele", "Rate"];
const CompanyProfileView = (props: Props) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const origin =
    window.origin +
    "/filmmaker-database" +
    "/profile" +
    "/company" +
    "/" +
    params.id;
  const [fetchCompanyData, { isFetching, data }] =
    useLazyFetchCompanyDataQuery();

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

      <div className="">
        <section className="mt-10">
          {isFetching ? (
            <div className="w-full sm:w-[90%] lg:w-[70%] mx-auto max-w-[1200px]">
              <FilmmakerSkeletonProfile />
            </div>
          ) : data?.company ? (
            <div className="w-full mx-auto sm:w-[90%] lg:w-[70%]">
              <div
                className="w-full h-[7rem] sm:h-[15rem] rounded-lg"
                style={{
                  backgroundImage: `url(${ProfileBanner.src})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="flex items-start px-4 lg:px-16 flex-wrap">
                <div className="flex items-center mr-auto flex-wrap ">
                  <div className="h-[6rem] mid:h-[9rem] -mt-10 mid:w-[9rem] rounded-full bg-black-2 border-white flex items-center justify-center border">
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
                  <div className="text-black-2  mt-4 md:ml-4 mr-auto w-full md:w-auto">
                    <p className="font-bold text-[1.4rem] sm:text-[1.8rem]">
                      {data?.company.name}
                    </p>
                    <div className="flex  items-center mt-3">
                      <IoBriefcaseOutline className="text-2xl mr-3" />
                      <p className="text-lg">{data?.company.type}</p>
                    </div>
                    <div className="flex items-center mt-3">
                      <IoLocationOutline className="text-2xl mr-3" />
                      <p className="text-sm md:text-lg">
                        {data?.company.location.state},{" "}
                        {data?.company.location.country}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start mt-14 sm:mt-6">
                  <div className="">
                    <UnstyledButton
                      clicked={open}
                      class="bg-black-2 hover:bg-blue-1 transition-all text-white py-2 px-4 rounded-md"
                    >
                      Share profile
                    </UnstyledButton>
                    <div className="mt-4 nolly-notes text-center">
                      <h1 className="text-[0.88rem] font-medium">NF SCORE</h1>
                      <p className="text-5xl">{data?.company.nfscore || "0"}</p>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      router.push(
                        `/filmmaker-database/user/${params.id}/edit/company`
                      )
                    }
                    className="flex ml-4 items-center hover:bg-gray-bg-9 py-2 px-4 rounded-md transition-all cursor-pointer"
                  >
                    <p className="mr-2">Edit</p>
                    <TbEdit className="text-2xl" />
                  </div>
                </div>
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
                      {data?.company.bio && (
                        <div className="mt-8">
                          <p className="text-[#A5A5A5]">Bio</p>
                          <div className="mt-2 text-[#4B5563]">
                            <RenderTextAreaInput text={data?.company.bio} />
                          </div>
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
            </div>
          ) : (
            <h1>No company profile for this account</h1>
          )}
        </section>
      </div>
    </>
  );
};

export default CompanyProfileView;
