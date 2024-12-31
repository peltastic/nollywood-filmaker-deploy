"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "/public/assets/nav/logo.svg";
import { Stepper } from "@mantine/core";
import SingleStepper from "@/components/Stepper/SingleStepper";
import GeneralInfo from "@/components/FilmakerDatabase/Forms/Crew/GeneralInfo";
import CrewImg from "/public/assets/filmmaker-database/film-crew.svg";
import CrewImgInactive from "/public/assets/filmmaker-database/film-crew-inactive.svg";
import CompanyImg from "/public/assets/filmmaker-database/film-company.svg";
import CompanyImgInactive from "/public/assets/filmmaker-database/film-company-inactive.svg";
import { FaCircleDot } from "react-icons/fa6";
import UnstyledButton from "@/components/Button/UnstyledButton";
import ContactDetails from "@/components/FilmakerDatabase/Forms/Crew/ContactDetails";
import Verification from "@/components/FilmakerDatabase/Forms/Crew/Verification";
import CompanyInfo from "@/components/FilmakerDatabase/Forms/Company/CompanyInfo";
import CompanyDetails from "@/components/FilmakerDatabase/Forms/Company/CompanyDetails";
import CompanyVerification from "@/components/FilmakerDatabase/Forms/Company/CompanyVerification";

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

  return (
    <div className="">
      <nav className="py-4 px-4">
        <div className="">
          <Image src={Logo} alt="logo" className="w-[7rem]" />
        </div>
      </nav>
      <h1 className="text-4xl font-bold text-center">
        Nollywood Filmaker Database
      </h1>
      <section className="bg-[#FAFAFA] min-h-screen mt-8 py-8">
        <div className="w-fit mx-auto max-w-[60%]">
          <div className="">
            <h2 className="text-black-2 text-[1.57rem] font-semibold">
              Let us capture your information
            </h2>
            <p>A fully filled form makes it easier to find you</p>
          </div>
          <div className="flex items-center mt-[4rem]">
            <SingleStepper value={1} active={active} text="General info" />
            <div className="w-[9rem] border-t border-stroke-12"></div>
            <SingleStepper value={2} active={active} text="Contact details" />

            <div className="w-[9rem] border-t border-stroke-12"></div>
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
            {formType === "film-crew" ?  <h1 className="font-medium mb-6">
                {active === 1
                  ? "What are you?"
                  : active === 2
                  ? "What department are you in"
                  : "Location"}
              </h1>: <h1 className="font-medium mb-6">
                {active === 1
                  ? "What are you?"
                  : active === 2
                  ? "What type of company are you?"
                  : "Company location"}
              </h1> }
              {active === 1 && (
                <div className="flex">
                  <div
                    onClick={() => setFormType("film-crew")}
                    className={`${
                      formType === "film-crew"
                        ? "border-stepper-green text-stepper-green"
                        : "border-[#A5A5A5] text-[#A5A5A5]"
                    } border rounded-md flex items-center px-4 py-4 mr-8 cursor-pointer transition-all`}
                  >
                    <Image
                      src={formType === "film-crew" ? CrewImg : CrewImgInactive}
                      alt="film-crew"
                      className="w-[1.3rem] mr-2"
                    />
                    <p className="font-medium mr-12">Film Crew</p>
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
                    } border rounded-md flex items-center px-4 py-4 cursor-pointer transition-all`}
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
                    <p className="font-medium mr-10">Film Company</p>
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
                  <GeneralInfo />
                ) : active === 2 ? (
                  <ContactDetails />
                ) : (
                  <Verification />
                )}
              </>
            )}

            {formType === "film-company" && (
              <>
                {active === 1 ? (
                  <CompanyInfo />
                ) : active === 2 ? (
                  <CompanyDetails />
                ) : <CompanyVerification />}
              </>
            )}
          </div>
          <div className="flex items-center justify-between mt-[4rem]">
            {active === 1 ? null : (
              <UnstyledButton
                clicked={prevStep}
                class="mb-4 xs:mb-0 py-2 rounded-md px-6 border-stroke-2 w-full xs:w-auto border  xs:mr-4"
              >
                Back
              </UnstyledButton>
            )}
            <UnstyledButton
              clicked={nextStep}
              class="ml-auto w-[7rem] flex hover:bg-blue-1 py-2 px-4 disabled:opacity-50 transition-all rounded-lg justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 "
            >
              Continue
            </UnstyledButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilmakerDatabasePage;
