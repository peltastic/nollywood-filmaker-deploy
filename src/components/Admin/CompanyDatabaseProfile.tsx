import { ICompanyOrCrewData } from "@/interfaces/admin/filmmaker-database/filmmaker-database";
import React, { useEffect, useState } from "react";
import ProfileBanner from "/public/assets/filmmaker-database/filmmaker-profile-banner.png";
import { AspectRatio, Tabs } from "@mantine/core";
import Image from "next/image";
import { IoBriefcaseOutline, IoLocationOutline } from "react-icons/io5";
import UnstyledButton from "../Button/UnstyledButton";
import Link from "next/link";
import { RiAttachment2 } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
import ModalComponent from "../Modal/Modal";
import CancelImg from "/public/assets/cancel.svg";
import {
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { notify } from "@/utils/notification";
import { IoMdClipboard } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import VerifyFMDatabaseModal from "./VerifyFMDatabaseModal";
import RenderTextAreaInput from "../RenderTextAreaInput/RenderTextAreaInput";

type Props = {
  data: ICompanyOrCrewData;
  refetch: () => void;
  admin?: boolean;
  verfied?: boolean;
};

const tabs_list = ["About", "Clientele", "Rate"];

const CompanyDatabaseProfile = ({ data, refetch, admin, verfied }: Props) => {
  const [tabs_list, setTabList] = useState<string[]>([]);

  useEffect(() => {
    if (admin) {
      setTabList(["About", "Clientele", "Rate", "Documents"]);
    } else {
      setTabList(["About", "Clientele", "Rate"]);
    }
  }, [admin]);

  const [opened, { open, close }] = useDisclosure();
  const [verificationOpened, verfiecation] = useDisclosure();
  const origin =
    window.origin +
    "/filmmaker-database" +
    "/profile" +
    "/company" +
    "/" +
    data.userId;
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
            data.apiVetting
              ? "Complete verification"
              : " Verify Company Documents"
          }
          refetch={refetch}
          close={verfiecation.close}
          type="company"
          id={data.userId}
          final={data.apiVetting ? true : false}
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
        <section>
          <div
            className="w-full  h-[15rem] rounded-lg"
            style={{
              backgroundImage: `url(${ProfileBanner.src})`,
              backgroundSize: "cover",
            }}
          ></div>

          <div className="flex items-start px-4">
            <div className="flex flex-wrap mr-auto w-[24rem]">
              <div className="h-[6rem] -mt-10 w-[6rem] rounded-full bg-black-2 border-white flex items-center justify-center border">
                <AspectRatio ratio={1800 / 1800}>
                  <Image
                    src={data.propic}
                    width={100}
                    height={100}
                    className="w-full h-full rounded-full"
                    alt="profile-pic"
                  />
                </AspectRatio>
              </div>
              <div className="text-black-2  mt-4  mr-auto w-full">
                <p className="font-bold text-[1.6rem]">{data.name}</p>
                <div className="flex  items-center mt-3">
                  <IoBriefcaseOutline className="text-xl mr-3" />
                  <p className="text-md">{data.type}</p>
                </div>
                <div className="flex items-center mt-3">
                  <IoLocationOutline className="text-xl mr-3" />
                  <p className="text-md">
                    {data.location.state}, {data.location.country}
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <UnstyledButton
                clicked={open}
                class="bg-black-2 text-sm hover:bg-blue-1 transition-all text-white py-2 px-4 mt-6 rounded-md"
              >
                Share profile
              </UnstyledButton>
              <div className="mt-4 nolly-notes text-center">
                <h1 className="text-[0.88rem] font-medium">NF SCORE</h1>
                <p className="text-5xl">{data?.nfscore || "0"}</p>
              </div>
            </div>
          </div>
          {!verfied && (
            <>
              {data.apiVetting ? (
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
                  {data.bio && (
                    <div className="mt-8">
                      <p className="text-[#A5A5A5]">Bio</p>
                      <div className="mt-2 text-[#4B5563]">
                        <RenderTextAreaInput text={data.bio} />
                      </div>
                    </div>
                  )}
                  <div className="mt-8">
                    <p className="text-[#A5A5A5]">Email</p>
                    <p className="mt-2 text-[#4B5563]">{data.email}</p>
                  </div>
                  <div className="mt-8">
                    <p className="text-[#A5A5A5]">Mobile</p>
                    <p className="mt-2 text-[#4B5563]">{data.mobile}</p>
                  </div>
                  <div className="mt-8 ">
                    <p className="text-[#A5A5A5]">Company Type</p>
                    <p className="mt-2 text-[#4B5563]">{data.type}</p>
                  </div>
                </section>
              </Tabs.Panel>
              <Tabs.Panel value="clientele">
                <section>
                  {data.clientele.length === 0 ? (
                    <div className="mt-10 text-[#4B5563]">
                      <p>No Cliente yet</p>
                    </div>
                  ) : (
                    <div className="">
                      {data.clientele.map((el) => (
                        <div className="mt-6" key={el._id}>
                          {el.year && (
                            <p className="text-[#A5A5A5]">{el.year}</p>
                          )}
                          <p>{el.title}</p>
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
                  {data.fee ? (
                    <div className="mt-6">
                      <p className="text-[#A5A5A5]">Fee</p>
                      <p>
                        <span className="font-medium">NGN</span> {data.fee}
                      </p>
                    </div>
                  ) : data.rateCard ? (
                    <div className="">
                      <div className="w-fit rounded-lg border-2 mt-6 mb-10 px-5 py-2 items-center flex">
                        <RiAttachment2 className="text-xl mr-4" />
                        <p>{data.name}'s Rate Card</p>
                      </div>
                      <Link
                        target="_blank"
                        className="bg-black-2 text-white py-2 px-4 transition-all hover:bg-blue-1  rounded-md"
                        href={data.rateCard}
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
              {admin && (
                <Tabs.Panel value="documents">
                  <section>
                    <div className="mt-8">
                      <p className="text-[#A5A5A5]">ID number</p>
                      <p className="mt-2 text-[#4B5563]">{data.idNumber}</p>
                    </div>
                    {data.cacNumber && (
                      <div className="mt-8">
                        <p className="text-[#A5A5A5]">CAC number</p>
                        <p className="mt-2 text-[#4B5563]">{data.cacNumber}</p>
                      </div>
                    )}

                    <div className="mt-8">
                      <p className="text-[#A5A5A5]">ID type</p>
                      <p className="mt-2 text-[#4B5563]">
                        {data.verificationDocType}
                      </p>
                    </div>
                    <div className="mt-8">
                      <p className="text-[#A5A5A5]">ID document</p>
                      <Link href={data.document} target="_blank">
                        <UnstyledButton class="bg-black-2 text-white py-2 px-4 rounded-md mt-3 text-[0.88rem]">
                          Download
                        </UnstyledButton>
                      </Link>
                    </div>
                    <div className="mt-8">
                      <p className="text-[#A5A5A5]">CAC document</p>
                      <Link href={data.cacdoc} target="_blank">
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
        </section>
      </div>
    </>
  );
};

export default CompanyDatabaseProfile;
