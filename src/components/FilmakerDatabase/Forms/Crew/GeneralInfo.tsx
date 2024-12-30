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

type Props = {};

const GeneralInfo = (props: Props) => {
  const [phoneInputVal, setPhoneInputVal] = useState("");
  const [dateInput, setDateInput] = useState<Date | null>(null);
  const [aboutval, setAboutVal] = useState<string>("");
  const [tempUrl, setTempUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="">
      <h1 className="font-medium py-8">Personal Information</h1>
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          email: "",
        }}
        onSubmit={() => {}}
      >
        {({}) => (
          <Form>
            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
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
                name="enail"
                placeholder="Enter your email address"
              />
              <div className="">
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
              </div>
            </div>
            <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>Date of birth</p>
              <p>*</p>
            </div>
            <DateInput
              value={dateInput}
              onChange={setDateInput}
              placeholder="Date input"
              size="lg"
            />
            <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>About you</p>
              <p>*</p>
            </div>
            <TextArea
              changed={(val) => setAboutVal(val)}
              value={aboutval}
              className="outline-none  px-4 py-4 h-[10rem]"
            />
            <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>Profile photo</p>
              <p>*</p>
            </div>
            <div className="flex items-center mt-10">
              <div className="w-[10rem] h-[10rem]">
                <AspectRatio ratio={1800/1800}>
                  <Image src={tempUrl || PhotoImg} alt="photo-img" width={100} height={100} className="h-full w-full rounded-full" />
                </AspectRatio>
              </div>
              <FileButtonComponent
                accept="image/*"
                setFile={(file) => {
                  setFile(file);
                  if (file) {
                    const objectUrl = URL.createObjectURL(file);
                    setTempUrl(objectUrl);
                  }
                }}
              >
                <UnstyledButton class="border border-[#A5A5A5] text-black-4 rounded-md py-2 px-6 ml-8">
                  Add Photo
                </UnstyledButton>
              </FileButtonComponent>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralInfo;
