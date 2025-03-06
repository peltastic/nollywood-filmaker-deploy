import DropZoneComponent from "@/components/DropZone/DropZone";
import Field from "@/components/Field/Field";
import SelectComponent from "@/components/Select/SelectComponent";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import {
  IJoinCompany,
  useCreateCrewOrCompanyMutation,
  useJoinCompanyMutation,
} from "@/lib/features/users/filmmaker-database/filmmaker-database";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";
import Spinner from "@/app/Spinner/Spinner";
import { companyVerificationSchema } from "@/utils/validation/fimmaker";
import { Country, State, IState, ICountry } from "country-state-city";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
type Props = {
  prevStep: () => void;
  data: IJoinCompany;
  updateCompany: (val: IJoinCompany) => void;
};

const CompanyVerification = ({ data, prevStep, updateCompany }: Props) => {
  const [countriesData, setCountriesData] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [statesData, setStatesData] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [countriesVal, setCountriesVal] = useState<string>("NG Nigeria");
  const [idData, setIdData] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();
  const [joinCompany, result] = useJoinCompanyMutation();
  const [file, setFile] = useState<File | null>(data.doc || null);
  const [cacDoc, setCacDoc] = useState<File | null>(data.cacdoc || null);
  // const [createCompany, companyRes] = useCreateCrewOrCompanyMutation();
  const [documentType, setDocumentType] = useState<string>(
    data.verificationDocType || ""
  );
  const [formData, setFormData] = useState<{
    address: string;
    city: string;
    state: string;
    country: string;
    identification: string;
    // cac: string;
    password: string;
    confirmPassword: string;
    username: string;
  }>({
    address: data.location?.address || "",
    city: data.location?.city || "",
    state: data.location?.state || "",
    country: data.location?.country || "",
    identification: data.idNumber || "",
    password: data.password || "",
    confirmPassword: data.confirmPassword || "",
    username: data.username || "",
  });
  // cac: data.cacNumber || "",

  useEffect(() => {
    const countriesData: { label: string; value: string }[] =
      Country.getAllCountries().map((el) => {
        return {
          label: el.name,
          value: `${el.isoCode} ${el.name}`,
        };
      });
    setCountriesData(countriesData);
  }, []);

  useEffect(() => {
    if (countriesVal) {
      const stateData: { label: string; value: string }[] =
        State.getStatesOfCountry(countriesVal.split(" ")[0]).map((el) => {
          return {
            label: el.name,
            value: el.name,
          };
        });
      setStatesData(stateData);
    }
  }, [countriesVal]);

  // useEffect(() => {
  //   if (companyRes.isError) {
  //     nprogress.complete();
  //     notify(
  //       "error",
  //       "",
  //       (companyRes.error as any).data?.message || "An Error Occured"
  //     );
  //   }
  //   if (companyRes.isSuccess) {
  //     const payload: IJoinCompany = {
  //       location: {
  //         address: formData.address,
  //         city: formData.city,
  //         country: formData.country,
  //         state: formData.state,
  //       },
  //       // cacNumber: formData.cac,
  //       idNumber: formData.identification,
  //       bio: data.bio,
  //       clientele: data.clientele,
  //       doc: file,
  //       email: data.email?.trim().toLowerCase(),
  //       fee: data.fee,
  //       file: data.file,
  //       mobile: data.mobile,
  //       name: data.name,
  //       rateCard: data.rateCard,
  //       useRateCard: data.useRateCard,
  //       type: data.type,
  //       verificationDocType: documentType,
  //       website: data.website,
  //       userId: companyRes.data.crewCompany.id,
  //       cacdoc: cacDoc,
  //     };
  //     setIdData(companyRes.data.crewCompany.id);
  //     joinCompany(payload);
  //   }
  // }, [companyRes.isSuccess, companyRes.isError]);
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
      router.push(`/success-page/filmaker-database`);
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
          // cac: data.cacNumber || "",
          password: data.password || "",
          confirmPassword: data.confirmPassword || "",
          username: data.username || "",
        }}
        onSubmit={({ password, username }) => {
          if (data.email) {
            nprogress.start();
            if (data.email) {
              const payload: IJoinCompany = {
                location: {
                  address: formData.address,
                  city: formData.city,
                  country: formData.country,
                  state: formData.state,
                },
                // cacNumber: formData.cac,
                idNumber: formData.identification,
                bio: data.bio,
                clientele: data.clientele,
                doc: file,
                email: data.email?.trim().toLowerCase(),
                fee: data.fee,
                file: data.file,
                mobile: data.mobile,
                name: data.name,
                rateCard: data.rateCard,
                useRateCard: data.useRateCard,
                type: data.type,
                verificationDocType: documentType,
                website: data.website,
                cacdoc: cacDoc,
                username,
                password,
              };
              joinCompany(payload);

              // createCompany({
              //   email: data.email,
              //   password,
              //   username,
              // });
            }
          }
        }}
        validationSchema={companyVerificationSchema}
      >
        {({ isValid }) => (
          <Form>
            {/* <div className="grid md:grid-cols-2 gap-8">
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
            </div> */}
            <p className="mb-2 font-medium mt-8 text-[#A5A5A5]">
              Search country
            </p>
            <div className="">
              <SelectComponent
                data={countriesData}
                placeholder="Search for country"
                label=""
                setValueProps={(val) => {
                  if (val) {
                    const country_name = val.split(" ")[1];
                    setFormData((prev) => ({ ...prev, country: country_name }));
                    setCountriesVal(val);
                  }
                }}
                size="lg"
                searchable
              />
            </div>
            {countriesVal && (
              <div className="">
                <p className="mb-2 font-medium mt-8 text-[#A5A5A5]">
                  Search state
                </p>
                <div className="">
                  <SelectComponent
                    data={statesData}
                    placeholder="Search for state"
                    label=""
                    setValueProps={(val) => {
                      if (val) {
                        setFormData((prev) => ({ ...prev, state: val }));
                      }
                    }}
                    searchable
                    size="lg"
                  />
                </div>
              </div>
            )}
            <div className="mt-8">
              <p className="mb-6 font-medium">Documents</p>
              <div className="mt-8">
                <div className="mb-2 font-medium text-[0.88rem] text-[#A5A5A5]">
                  <div className="flex items-center">
                    <p>
                      Select ID type (Driver&apos;s license, NIN, International
                      passport)
                    </p>
                    <p>*</p>
                  </div>
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
                {/* <div className="mt-10">
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
                </div> */}

                <div className="mt-10">
                  <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                    <p>
                      Upload your CAC registration documents (Certificate and
                      Status report)
                    </p>
                    <p>*</p>
                  </div>
                  <DropZoneComponent
                    setFiles={(files) => {}}
                    setSingleFile={(file) => {
                      if (file) {
                        setCacDoc(file);
                      }
                    }}
                    single
                  >
                    <div
                      className={` text-center text-[#4B5563]  mt-6 rounded-2xl border-black-2 w-full py-10`}
                    >
                      {cacDoc ? (
                        <div className="">{cacDoc.name}</div>
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

                <div className=" mt-8">
                  <p className="mb-2 font-medium">Create Account</p>
                  <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                    <p>Create an account in order to save your profile</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Field
                    required
                    label="Username"
                    labelColor="text-[#A5A5A5]"
                    classname="w-full"
                    name="username"
                    placeholder=""
                    changed={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mt-8">
                  <Field
                    required
                    label="Password"
                    labelColor="text-[#A5A5A5]"
                    classname="w-full"
                    name="password"
                    placeholder=""
                    password
                    changed={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mt-8">
                  <Field
                    required
                    label="Confirm Password"
                    labelColor="text-[#A5A5A5]"
                    classname="w-full"
                    name="confirmPassword"
                    placeholder=""
                    password
                    changed={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="mt-4 w-full">
                <CheckboxComponent
                  setCheckedProps={(val) => setChecked(val)}
                  checked={checked}
                  label={
                    <p className="max-w-[40rem] text-gray-3">
                      By proceeding with this upload, I confirm that I have
                      read, understood, and agree to the{" "}
                      <span className="font-semibold">
                        Terms and Conditions
                      </span>{" "}
                      and <span className="font-semibold">privacy policy</span>{" "}
                      of the service. I voluntarily consent to the collection,
                      storage, and use of my data in accordance with the stated
                      terms, including its inclusion in the database and any
                      permitted uses by the data collector.
                    </p>
                  }
                />
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
                    // cacNumber: formData.cac,
                    confirmPassword: formData.confirmPassword,
                    password: formData.password,
                    username: formData.username,
                    cacdoc: cacDoc,
                  };
                  updateCompany(payload);
                  prevStep();
                }}
                class="mb-4 xs:mb-0 py-2 rounded-md px-6 border-stroke-2   border  xs:mr-4"
              >
                Back
              </UnstyledButton>

              <UnstyledButton
                type="submit"
                disabled={
                  !isValid ||
                  !file ||
                  !cacDoc ||
                  !formData.country ||
                  !formData.state ||
                  !documentType ||
                  !checked ||
                  result.isLoading
                }
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
