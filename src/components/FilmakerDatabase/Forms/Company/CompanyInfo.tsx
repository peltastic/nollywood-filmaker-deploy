import imageCompression from 'browser-image-compression';
import Field from "@/components/Field/Field";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import TextArea from "@/components/TextArea/TextArea";
import PhotoImg from "/public/assets/filmmaker-database/photo-bg-img.svg";
import Image from "next/image";
import UnstyledButton from "@/components/Button/UnstyledButton";
import FileButtonComponent from "@/components/FileButton/FileButtonComponent";
import { AspectRatio } from "@mantine/core";
import { IJoinCompany } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { companyInfoSchema } from "@/utils/validation/fimmaker";

type Props = {
  updateCompany: (val: IJoinCompany) => void;
  data: IJoinCompany;
  updatePfp: (val: string) => void;
  pfp: string;
  nextStep: () => void;
};

const options = {
  maxSizeMB: 1, // Target max size (adjust as needed)
  maxWidthOrHeight: 1024, // Resize image to max width/height
  useWebWorker: true, // Use web worker for better performance
};


const CompanyInfo = ({
  data,
  updateCompany,
  pfp,
  updatePfp,
  nextStep,
}: Props) => {
  const [aboutval, setAboutVal] = useState<string>(data.bio || "");
  const [file, setFile] = useState<File | null>(data.file || null);
  return (
    <div className="">
      <h1 className="font-medium py-8">Company Information</h1>
      <Formik
        initialValues={{
          name: data.name || "",
          email: data.email || "",
          website: data.website || "",
          phone: data.mobile || ""
        }}
        validationSchema={companyInfoSchema}
        onSubmit={({ email, name, website, phone }) => {
          const payload: IJoinCompany = {
            name,
            email,
            website,
            mobile: phone,
            bio: aboutval,
            file,
            
          };
          updateCompany(payload);
          nextStep();
        }}
      >
        {({ isValid }) => (
          <Form>
            <Field
              label="Company name"
              labelColor="text-[#A5A5A5]"
              classname="w-full"
              name="name"
              placeholder="Enter your registered company name"
              required
            />
            <div className="grid mid:grid-cols-2 gap-x-8 gap-y-8 mt-10">
              <Field
                required
                label="Company email address"
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
        
            </div>
            <div className="mt-10">
              <Field
                label="Company website"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="website"
                placeholder="Enter your registered company website"
              />
            </div>
            <div className="mb-2 mt-10 flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>Company info</p>
              <p>*</p>
            </div>
            <TextArea
              changed={(val) => setAboutVal(val)}
              value={aboutval}
              className="outline-none  px-4 py-4 h-[10rem]"
            />
            <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>Company logo</p>
              <p>*</p>
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
                setFile={ async (file) => {
                  setFile(file);
                  if (file) {

                    const compressedFile = await imageCompression(file, options);
                    const objectUrl = URL.createObjectURL(compressedFile);
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
                disabled={!isValid || !aboutval || !file}
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

export default CompanyInfo;
