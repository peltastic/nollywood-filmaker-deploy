import DropZoneComponent from "@/components/DropZone/DropZone";
import Field from "@/components/Field/Field";
import SelectComponent from "@/components/Select/SelectComponent";
import { Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import UploadImage from "/public/assets/consultant/cloud-upload.svg";
import { BsUpload } from "react-icons/bs";
type Props = {};

const CompanyVerification = (props: Props) => {
  return (
    <div>
      <Formik
        initialValues={{
          address: "",
          city: "",
          state: "",
          country: "",
          identification: "",
          cac: ""
        }}
        onSubmit={() => {}}
      >
        {({}) => (
          <Form>
            <div className="grid grid-cols-2 gap-8">
              <Field
                label="Address"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="address"
                placeholder="Enter address"
                required
              />
              <Field
                required
                label="City"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="city"
                placeholder="Enter your city"
              />
              <Field
                required
                label="State"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="state"
                placeholder="Enter your state"
              />
              <Field
                required
                label="Country"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="country"
                placeholder="Enter your country"
              />
            </div>
            <div className="mt-8">
              <p className="mb-6 font-medium">Documents</p>
              <div className="mt-8">
                <div className="mb-2 font-medium text-[0.88rem] text-[#A5A5A5]">
                  <p>
                    Select ID type (Driver&apos;s license, NIN, International
                    passport)
                  </p>
                  <p>
                    Note: The name used for registration must match the name on
                    the document.
                  </p>
                </div>
                <SelectComponent
                  data={[
                    {
                      label: "Driver's License",
                      value: "Driver's License",
                    },
                    {
                      label: "NIN",
                      value: "NIN",
                    },
                    {
                      label: "International passport",
                      value: "International passport",
                    },
                  ]}
                  label=""
                  placeholder="Select"
                  setValueProps={(val) => {}}
                  value={""}
                  size="lg"
                />
                <div className="mt-10">
                  <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                    <p>Upload a copy of your selected ID</p>
                    <p>*</p>
                  </div>
                  <DropZoneComponent setFiles={(files) => {}}>
                    <div
                      className={` text-center text-[#4B5563]  mt-6 rounded-2xl border-black-2 w-full py-10`}
                    >
                      <BsUpload className="text-center mx-auto mb-6" />
                      <p className="">Drag and Drop here to upload</p>

                      <p className="text-[0.88rem] mt-6">
                        Or click to browse file
                      </p>
                    </div>
                  </DropZoneComponent>
                </div>
                <div className="mt-10">
                  <Field
                    required
                    label="ID number"
                    labelColor="text-[#A5A5A5]"
                    classname="w-full"
                    name="identification"
                    placeholder="Enter your ID number"
                  />
                </div>
                <div className="mt-10">
                  <Field
                    required
                    label="CAC number"
                    labelColor="text-[#A5A5A5]"
                    classname="w-full"
                    name="cac"
                    placeholder="Enter your CAC number"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyVerification;
