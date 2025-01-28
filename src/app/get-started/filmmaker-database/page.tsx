"use client";
import React, { useState } from "react";
import Image from "next/image";
import SingleStepper from "@/components/Stepper/SingleStepper";
import GeneralInfo from "@/components/FilmakerDatabase/Forms/Crew/GeneralInfo";
import CrewImg from "/public/assets/filmmaker-database/film-crew.svg";
import CrewImgInactive from "/public/assets/filmmaker-database/film-crew-inactive.svg";
import CompanyImg from "/public/assets/filmmaker-database/film-company.svg";
import CompanyImgInactive from "/public/assets/filmmaker-database/film-company-inactive.svg";
import { FaCircleDot } from "react-icons/fa6";
import ContactDetails from "@/components/FilmakerDatabase/Forms/Crew/ContactDetails";
import Verification from "@/components/FilmakerDatabase/Forms/Crew/Verification";
import CompanyInfo from "@/components/FilmakerDatabase/Forms/Company/CompanyInfo";
import CompanyDetails from "@/components/FilmakerDatabase/Forms/Company/CompanyDetails";
import CompanyVerification from "@/components/FilmakerDatabase/Forms/Company/CompanyVerification";
import {
  IJoinCompany,
  IJoinCrew,
} from "@/lib/features/users/filmmaker-database/filmmaker-database";
import Link from "next/link";
import HomeLayout from "@/components/Layouts/HomeLayout";

type Props = {};

const FilmakerDatabasePage = (props: Props) => {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const [formType, setFormType] = useState<"film-crew" | "film-company">(
    "film-crew"
  );

  const [crewData, setCrewData] = useState<IJoinCrew>({
    department: [],
    dob: "",
    doc: null,
    email: "",
    firstName: "",
    idNumber: "",
    lastName: "",
    location: {
      address: "",
      city: "",
      country: "",
      state: "",
    },
    mobile: "",
    file: null,
    role: [],
    verificationDocType: "",
    bio: "",
    fee: "",
    works: [],
  });
  const [companyData, setCompanyData] = useState<IJoinCompany>({
    doc: null,
    bio: "",
    cacNumber: "",
    clientele: [],
    email: "",
    fee: "",
    file: null,
    idNumber: "",
    location: {
      address: "",
      city: "",
      country: "",
      state: "",
    },
    mobile: "",
    name: "",
    rateCard: null,
    type: "",
    useRateCard: null,
    verificationDocType: "",
    website: "",
  });
  const [pfpUrl, setPfpUrl] = useState<string>("");
  const [companyPfpUrl, setCompanyPfpUrl] = useState<string>("");

  const updateCrewDataHandler = (val: IJoinCrew) => {
    setCrewData((prev) => {
      return {
        ...prev,
        ...val,
      };
    });
  };

  const updateCompanyDataHandler = (val: IJoinCompany) => {
    setCompanyData((prev) => {
      return { ...prev, ...val };
    });
  };

  return (
    <div className="">
      <HomeLayout>
        <div className="px-8 mt-10">
          <h1 className="text-3xl mid:text-4xl font-bold text-center">
            Nollywood Filmaker Database
          </h1>
        </div>
        <section className="bg-[#FAFAFA] min-h-screen mt-8 py-8">
          <div className="w-[90%] lg:w-fit mx-auto max-w-[100rem]">
            <div className="">
              <h2 className="text-black-2 text-[1.57rem] font-semibold">
                Let us capture your information
              </h2>
              <p>A fully filled form makes it easier to find you</p>
            </div>
            <div className="lg:flex items-center mt-[4rem]">
              <SingleStepper value={1} active={active} text="General info" />
              <div className="w-[9rem] border-t border-stroke-12 hidden lg:block"></div>
              <SingleStepper value={2} active={active} text="Contact details" />

              <div className="w-[9rem] border-t border-stroke-12 hidden lg:block"></div>
              <SingleStepper value={3} active={active} text="Verification" />
            </div>
            <div className="mt-[4rem]">
              <p className="text-[#A5A5A5]">Step {active}</p>
              <p className="text-[1.4rem] font-semibold">
                {active === 1
                  ? "General Info"
                  : active === 2
                  ? "Job details"
                  : "Verification"}
              </p>
              <div className="w-full border-t border-t-stroke-12 my-6"></div>
              <div className="">
                {formType === "film-crew" ? (
                  <h1 className="font-medium mb-6">
                    {active === 1
                      ? "What are you?"
                      : active === 2
                      ? "What department are you in"
                      : "Location"}
                  </h1>
                ) : (
                  <h1 className="font-medium mb-6">
                    {active === 1
                      ? "What are you?"
                      : active === 2
                      ? "What type of company are you?"
                      : "Company location"}
                  </h1>
                )}
                {active === 1 && (
                  <div className="flex flex-wrap">
                    <div
                      onClick={() => setFormType("film-crew")}
                      className={`${
                        formType === "film-crew"
                          ? "border-stepper-green text-stepper-green"
                          : "border-[#A5A5A5] text-[#A5A5A5]"
                      } border rounded-md flex items-center px-4 py-4 mr-8 cursor-pointer transition-all w-[80%] sm:w-[50%] mid:w-auto`}
                    >
                      <Image
                        src={
                          formType === "film-crew" ? CrewImg : CrewImgInactive
                        }
                        alt="film-crew"
                        className="w-[1.3rem] mr-2"
                      />
                      <p className="font-medium mr-auto mid:mr-12">Film Crew</p>
                      <div className="w-[1rem]">
                        {formType === "film-crew" ? <FaCircleDot /> : null}
                      </div>
                    </div>
                    <div
                      onClick={() => setFormType("film-company")}
                      className={`${
                        formType === "film-company"
                          ? "border-stepper-green text-stepper-green"
                          : "border-[#A5A5A5] text-[#A5A5A5]"
                      } border rounded-md flex items-center px-4 py-4 cursor-pointer transition-all w-[80%] sm:w-[50%] mid:w-auto mt-8 mid:mt-0`}
                    >
                      <Image
                        src={
                          formType === "film-company"
                            ? CompanyImg
                            : CompanyImgInactive
                        }
                        alt="film-crew"
                        className="w-[1.3rem] mr-2"
                      />
                      <p className="font-medium mr-auto mid:mr-4">
                        Film Company
                      </p>
                      <div className="w-[1rem]">
                        {formType === "film-company" ? <FaCircleDot /> : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {formType === "film-crew" && (
                <>
                  {active === 1 ? (
                    <GeneralInfo
                      data={crewData}
                      pfp={pfpUrl}
                      updatePfp={(el) => setPfpUrl(el)}
                      nextStep={nextStep}
                      updateCrew={updateCrewDataHandler}
                    />
                  ) : active === 2 ? (
                    <ContactDetails
                      data={crewData}
                      updateCrew={updateCrewDataHandler}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      active={active}
                    />
                  ) : (
                    <Verification
                      updateCrew={updateCrewDataHandler}
                      data={crewData}
                      prevStep={prevStep}
                    />
                  )}
                </>
              )}

              {formType === "film-company" && (
                <>
                  {active === 1 ? (
                    <CompanyInfo
                      pfp={companyPfpUrl}
                      updatePfp={(el) => setCompanyPfpUrl(el)}
                      data={companyData}
                      updateCompany={updateCompanyDataHandler}
                      nextStep={nextStep}
                    />
                  ) : active === 2 ? (
                    <CompanyDetails
                      active={active}
                      data={companyData}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      updateCompany={updateCompanyDataHandler}
                    />
                  ) : (
                    <CompanyVerification
                      data={companyData}
                      prevStep={prevStep}
                      updateCompany={updateCompanyDataHandler}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </HomeLayout>
    </div>
  );
};

export default FilmakerDatabasePage;
