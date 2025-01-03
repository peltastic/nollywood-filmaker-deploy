import DropZoneComponent from "@/components/DropZone/DropZone";
import Field from "@/components/Field/Field";
import SelectComponent from "@/components/Select/SelectComponent";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UploadImage from "/public/assets/consultant/cloud-upload.svg";
import { BsUpload } from "react-icons/bs";
import {
  IJoinCompany,
  useJoinCompanyMutation,
} from "@/lib/features/users/filmmaker-database/filmmaker-database";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";
import Spinner from "@/app/Spinner/Spinner";
import { companyVerificationSchema } from "@/utils/validation/fimmaker";
type Props = {
  prevStep: () => void;
  data: IJoinCompany;
  updateCompany: (val: IJoinCompany) => void;
};

const CompanyVerification = ({ data, prevStep, updateCompany }: Props) => {
  const router = useRouter();
  const [joinCompany, result] = useJoinCompanyMutation();
  const [file, setFile] = useState<File | null>(data.doc || null);
  const [documentType, setDocumentType] = useState<string>(
    data.verificationDocType || ""
  );
  const [formData, setFormData] = useState<{
    address: string;
    city: string;
    state: string;
    country: string;
    identification: string;
    cac: string;
  }>({
    address: data.location?.address || "",
    city: data.location?.city || "",
    state: data.location?.state || "",
    country: data.location?.country || "",
    identification: data.idNumber || "",
    cac: data.cacNumber || "",
  });
  useEffect(() => {
    if (result.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (result.error as any).data?.message || "An Error Occured"
      );
    }

    if (result.isSuccess) {
      // notify("success", "Information uploaded successfully!")
      nprogress.complete();
      router.push("/success-page/filmaker-database");
    }
  }, [result.isError, result.isSuccess]);
  return (
    <div>
      <Formik
        initialValues={{
          address: data.location?.address || "",
          city: data.location?.city || "",
          state: data.location?.state || "",
          country: data.location?.country || "",
          identification: data.idNumber || "",
          cac: data.cacNumber || "",
        }}
        onSubmit={({ address, cac, city, country, identification, state }) => {
          const payload: IJoinCompany = {
            location: {
              address,
              city,
              country,
              state,
            },
            cacNumber: cac,
            idNumber: identification,
            bio: data.bio,
            clientele: data.clientele,
            doc: file,
            email: data.email,
            fee: data.fee,
            file: data.file,
            mobile: data.mobile,
            name: data.name,
            rateCard: data.rateCard,
            useRateCard: data.useRateCard,
            type: data.type,
            verificationDocType: documentType,
            website: data.website,
          };
          nprogress.start()
          joinCompany(payload)

        }}
        validationSchema={companyVerificationSchema}
      >
        {({ isValid }) => (
          <Form>
            <div className="grid grid-cols-2 gap-8">
              <Field
                label="Address"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="address"
                placeholder="Enter address"
                required
                changed={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
              />
              <Field
                required
                label="City"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="city"
                placeholder="Enter your city"
                changed={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
              />
              <Field
                required
                label="State"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="state"
                placeholder="Enter your state"
                changed={(e) =>
                  setFormData((prev) => ({ ...prev, state: e.target.value }))
                }
              />
              <Field
                required
                label="Country"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="country"
                placeholder="Enter your country"
                changed={(e) =>
                  setFormData((prev) => ({ ...prev, country: e.target.value }))
                }
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
                  setValueProps={(val) => {
                    if (val) {
                      setDocumentType(val);
                    }
                  }}
                  value={documentType}
                  size="lg"
                />
                <div className="mt-10">
                  <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                    <p>Upload a copy of your selected ID</p>
                    <p>*</p>
                  </div>
                  <DropZoneComponent
                    setFiles={(files) => {}}
                    setSingleFile={(file) => {
                      if (file) {
                        setFile(file);
                      }
                    }}
                    single
                  >
                    <div
                      className={` text-center text-[#4B5563]  mt-6 rounded-2xl border-black-2 w-full py-10`}
                    >
                      {file ? (
                        <div className="">{file.name}</div>
                      ) : (
                        <>
                          <BsUpload className="text-center mx-auto mb-6" />
                          <p className="">Drag and Drop here to upload</p>

                          <p className="text-[0.88rem] mt-6">
                            Or click to browse file
                          </p>
                        </>
                      )}
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
                    changed={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        identification: e.target.value,
                      }))
                    }
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
                    changed={(e) =>
                      setFormData((prev) => ({ ...prev, cac: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-[4rem]">
              <UnstyledButton
                type="button"
                clicked={() => {
                  const payload: IJoinCompany = {
                    location: {
                      address: formData.address,
                      city: formData.city,
                      country: formData.country,
                      state: formData.state,
                    },
                    doc: file,
                    verificationDocType: documentType,
                    idNumber: formData.identification,
                    cacNumber: formData.cac,
                  };
                  updateCompany(payload);
                  prevStep();
                }}
                class="mb-4 xs:mb-0 py-2 rounded-md px-6 border-stroke-2 w-full xs:w-auto border  xs:mr-4"
              >
                Back
              </UnstyledButton>

              <UnstyledButton
                type="submit"
                disabled={!isValid || !file || !documentType || result.isLoading}
                class="ml-auto w-[7rem] flex hover:bg-blue-1 py-2 px-4 disabled:opacity-50 transition-all rounded-lg justify-center items-center text-white border border-black-3  bg-black-3 "
              >
                {result.isLoading ? (
                  <div className="py-1 w-[1rem]">
                    <Spinner />
                  </div>
                ) : (
                  <p>Submit</p>
                )}
              </UnstyledButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyVerification;
