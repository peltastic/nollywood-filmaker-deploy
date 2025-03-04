import { ICompanyOrCrewData } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import { AspectRatio, Tabs } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileBanner from "/public/assets/filmmaker-database/filmmaker-profile-banner.png";
import { IoBriefcaseOutline, IoLocationOutline } from "react-icons/io5";
import UnstyledButton from "../Button/UnstyledButton";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import ModalComponent from "../Modal/Modal";
import {
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { notify } from "@/utils/notification";
import { IoMdClipboard } from "react-icons/io";
import CancelImg from "/public/assets/cancel.svg";
import { CiStar } from "react-icons/ci";
import VerifyFMDatabaseModal from "./VerifyFMDatabaseModal";

type Props = {
  data: ICompanyOrCrewData;
  refetch: () => void;
  admin?: boolean;
  verfied?: boolean;
};

const FilmmakerDatabaseProfileDrawer = (props: Props) => {
  const [tabs_list, setTabList] = useState<string[]>([]);

  useEffect(() => {
    if (props.admin) {
      setTabList(["About", "Jobs", "Rate", "Documents"]);
    } else {
      setTabList(["About", "Jobs", "Rate"]);
    }
  }, [props.admin]);
  const [opened, { open, close }] = useDisclosure();
  const [verificationOpened, verfiecation] = useDisclosure();
  const origin =
    window.origin +
    "/filmmaker-database" +
    "/profile" +
    "/crew" +
    "/" +
    props.data.userId;
  return (
    <>
      <ModalComponent
        centered
        onClose={close}
        opened={verificationOpened}
        withCloseButton={false}
        size="xl"
      >
        <VerifyFMDatabaseModal
          title={
            props.data.apiVetting
              ? "Complete verification"
              : " Verify Crew Documents"
          }
          refetch={props.refetch}
          close={verfiecation.close}
          type="crew"
          id={props.data.userId}
          final={props.data.apiVetting ? true : false}
          info="By completing this verification process, this profile will be added to  nollywood filmmaker database"
        />
      </ModalComponent>
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
      <div>
        <section className="">
          <>
            {" "}
            <div
              className="w-full  h-[15rem] rounded-lg"
              style={{
                backgroundImage: `url(${ProfileBanner.src})`,
                backgroundSize: "cover",
              }}
            ></div>
            <div className="flex items-start px-4  ">
              <div className="flex items-center mr-auto flex-wrap w-[25rem] ">
                <div className="h-[6rem]  -mt-10 w-[6rem] ml-[2rem]  rounded-full bg-black-2 border-white flex items-center justify-center border">
                  <AspectRatio ratio={1800 / 1800}>
                    <Image
                      src={props.data.propic}
                      width={100}
                      height={100}
                      className="w-full h-full rounded-full"
                      alt="profile-pic"
                    />
                  </AspectRatio>
                </div>
                <div className="text-black-2  mt-4  mr-auto w-full ">
                  <p className="font-bold text-[1.6rem]">
                    {props.data.firstName} {props.data.lastName}
                  </p>
                  <div className="flex  items-center mt-3">
                    <IoBriefcaseOutline className="text-xl mr-3" />
                    <div className="flex items-center">
                      {props.data ? (
                        <div className="flex items-center flex-wrap">
                          {props.data.department.map((el, index) => {
                            return (
                              <p key={el}>
                                {el}
                                <span>
                                  {index === props.data.department.length - 1
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
                    <IoLocationOutline className="text-xl mr-3" />
                    <p className="text-md">
                      {props.data.location.state},{props.data.location.country}
                    </p>
                  </div>
                </div>
              </div>
              <UnstyledButton
                clicked={open}
                class="bg-black-2 transition-all text-sm hover:bg-blue-1 text-white py-2 px-4 mt-6 rounded-md"
              >
                Share profile
              </UnstyledButton>
            </div>
            {!props.verfied && (
              <>
                {props.data.apiVetting ? (
                  <div className="mt-8">
                    <UnstyledButton
                      clicked={verfiecation.open}
                      class="text-[0.88rem] border py-3 px-4 bg-black-2 transition-all hover:bg-black-9 text-white rounded-md flex items-center"
                    >
                      <p className="mr-2">Complete verification</p>
                      <CiStar className="text-green-500 text-2xl" />
                    </UnstyledButton>
                  </div>
                ) : (
                  <div className="mt-8">
                    <UnstyledButton
                      clicked={verfiecation.open}
                      class="text-[0.88rem] border py-3 px-4 bg-black-2 transition-all hover:bg-black-9 text-white rounded-md flex items-center"
                    >
                      <p className="mr-2">Verify documents</p>
                      <CiStar className="text-green-500 text-2xl" />
                    </UnstyledButton>
                  </div>
                )}
              </>
            )}
            <section className="mt-10 mb-20">
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
                    {props.data.bio && (
                      <div className="mt-8">
                        <p className="text-[#A5A5A5]">Bio</p>
                        <p className="mt-2 text-[#4B5563]">{props.data.bio}</p>
                      </div>
                    )}
                    <div className="mt-8">
                      <p className="text-[#A5A5A5]">Email</p>
                      <p className="mt-2 text-[#4B5563]">{props.data.email}</p>
                    </div>
                    <div className="mt-8">
                      <p className="text-[#A5A5A5]">Mobile</p>
                      <p className="mt-2 text-[#4B5563]">{props.data.mobile}</p>
                    </div>
                    <div className="mt-8 ">
                      <p className="text-[#A5A5A5]">Roles</p>

                      <div className="flex flex-wrap items-center">
                        {props.data.role.map((el, index) => {
                          const islast = index === props.data.role.length - 1;
                          return (
                            <p className="mt-2 text-[#4B5563]" key={el}>
                              {el}
                              <span>{islast ? "." : ","}</span>&nbsp;
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                </Tabs.Panel>
                <Tabs.Panel value="jobs">
                  <section>
                    {props.data.works.length === 0 ? (
                      <div className="mt-10 text-[#4B5563]">
                        <p>No Works</p>
                      </div>
                    ) : (
                      <div className="">
                        {props.data.works.map((el) => (
                          <div className="mt-6" key={el._id}>
                            {el.year && (
                              <p className="text-[#A5A5A5] mb-1">{el.year}</p>
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
                    {props.data.fee ? (
                      <div className="mt-6">
                        <p className="text-[#A5A5A5]">Fee</p>
                        <p>
                          <span className="font-medium">NGN</span>{" "}
                          {props.data.fee}
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
                {props.admin && (
                  <Tabs.Panel value="documents">
                    <section>
                      <div className="mt-8">
                        <p className="text-[#A5A5A5]">ID number</p>
                        <p className="mt-2 text-[#4B5563]">
                          {props.data.idNumber}
                        </p>
                      </div>
                      {props.data.cacNumber && (
                        <div className="mt-8">
                          <p className="text-[#A5A5A5]">CAC number</p>
                          <p className="mt-2 text-[#4B5563]">
                            {props.data.cacNumber}
                          </p>
                        </div>
                      )}

                      <div className="mt-8">
                        <p className="text-[#A5A5A5]">ID type</p>
                        <p className="mt-2 text-[#4B5563]">
                          {props.data.verificationDocType}
                        </p>
                      </div>
                      <div className="mt-8">
                        <p className="text-[#A5A5A5]">ID document</p>
                        <Link href={props.data.document} target="_blank">
                          <UnstyledButton class="bg-black-2 text-white py-2 px-4 rounded-md mt-3 text-[0.88rem]">
                            Download
                          </UnstyledButton>
                        </Link>
                      </div>
                    </section>
                  </Tabs.Panel>
                )}
              </Tabs>
            </section>
          </>
        </section>
      </div>
    </>
  );
};

export default FilmmakerDatabaseProfileDrawer;
