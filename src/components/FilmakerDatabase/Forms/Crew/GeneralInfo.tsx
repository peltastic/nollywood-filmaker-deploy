import Field from "@/components/Field/Field";
import { Form, Formik } from "formik";
import PhoneInput from "react-phone-number-input";
import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import TextArea from "@/components/TextArea/TextArea";
import PhotoImg from "/public/assets/filmmaker-database/photo-bg-img.svg";
import Image from "next/image";
import UnstyledButton from "@/components/Button/UnstyledButton";
import FileButtonComponent from "@/components/FileButton/FileButtonComponent";
import { AspectRatio } from "@mantine/core";
import { IJoinCrew } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { crewInfoSchema } from "@/utils/validation/fimmaker";
import moment from "moment";

type Props = {
  updateCrew: (val: IJoinCrew) => void;
  data: IJoinCrew;
  updatePfp: (val: string) => void;
  pfp: string;
  nextStep: () => void;
};

const GeneralInfo = ({ nextStep, updateCrew, updatePfp, data, pfp }: Props) => {
  const [dateInput, setDateInput] = useState<Date | null>(
    data.dob ? new Date(data.dob) : null
  );
  const [aboutval, setAboutVal] = useState<string>(data.bio || "");
  const [file, setFile] = useState<File | null>(data.file || null);
  return (
    <div className="">
      <h1 className="font-medium py-8">Personal Information</h1>
      <Formik
        initialValues={{
          fname: data.firstName || "",
          lname: data.lastName || "",
          email: data.email || "",
          phone: data.mobile || ""
        }}
        validationSchema={crewInfoSchema}
        onSubmit={({ fname, lname, email, phone }) => {
          const payload: IJoinCrew = {
            firstName: fname,
            lastName: lname,
            email,
            file: file || data.file,
            dob: (dateInput && moment(dateInput).format("YYYY-MM-DD")) || "",
            mobile: phone,
            bio: aboutval,
          };
          updateCrew(payload);
          nextStep();
        }}
      >
        {({ isValid }) => (
          <Form>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
              <Field
                label="First name"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="fname"
                placeholder="Enter your first name"
                required
              />
              <Field
                required
                label="Last name"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="lname"
                placeholder="Enter your surname"
              />
              <Field
                required
                label="Email"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="email"
                placeholder="Enter your email address"
              />
              <Field
                required
                label="Phone number"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="phone"
                placeholder="+234 819 2727 973"
              />
              {/* <div className="">
                <div className="mb-2 flex font-medium text-[0.88rem] text-[#A5A5A5]">
                  <p>Mobile number</p>
                  <p>*</p>
                </div>
                <PhoneInput
                  className="border outline-none"
                  style={{}}
                  value={phoneInputVal}
                  onChange={(val) => {
                    if (val) {
                      setPhoneInputVal(val.toString());
                    }
                  }}
                />
              </div> */}
            </div>
            <div className="mb-2 mt-8 flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>Date of birth</p>
              <p>*</p>
            </div>
            <DateInput
              value={dateInput}
              onChange={setDateInput}
              placeholder="Date input"
              size="lg"
            />
            <div className="mb-2 mt-8 flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>About you</p>
              {/* <p>*</p> */}
            </div>
            <TextArea
              changed={(val) => setAboutVal(val)}
              value={aboutval}
              className="outline-none  px-4 py-4 h-[10rem]"
            />
            <div className="mb-2 mt-8 flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>Profile photo</p>
              {/* <p>*</p> */}
            </div>
            <div className="flex items-center mt-10">
              <div className="w-[10rem] h-[10rem]">
                <AspectRatio ratio={1800 / 1800}>
                  <Image
                    src={pfp || PhotoImg}
                    alt="photo-img"
                    width={100}
                    height={100}
                    className="h-full w-full rounded-full"
                  />
                </AspectRatio>
              </div>
              <FileButtonComponent
                accept="image/*"
                setFile={(file) => {
                  setFile(file);
                  if (file) {
                    const objectUrl = URL.createObjectURL(file);
                    updatePfp(objectUrl);
                  }
                }}
              >
                <UnstyledButton
                  type="button"
                  class="border border-[#A5A5A5] text-black-4 rounded-md py-2 px-6 ml-8"
                >
                  Add Photo
                </UnstyledButton>
              </FileButtonComponent>
            </div>
            <div className="flex items-center justify-between mt-[4rem]">
              <UnstyledButton
                disabled={!isValid || !dateInput || !file}
                type="submit"
                // clicked={nextStep}
                class="ml-auto w-[7rem] flex hover:bg-blue-1 py-2 px-4 disabled:opacity-50 transition-all rounded-lg justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 "
              >
                Continue
              </UnstyledButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralInfo;
