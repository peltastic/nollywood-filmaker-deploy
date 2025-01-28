"use client";
import {
  ICompanyDataResponse,
  useEditCompanyMutation,
} from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import JobsDone, { JobsDoneList } from "../../JobsDone";
import Field from "@/components/Field/Field";
import SelectComponent from "@/components/Select/SelectComponent";
import { companyTypeList } from "@/utils/constants/constants";
import JobsDoneInput from "../../JobsDoneInput";
import DropZoneComponent from "@/components/DropZone/DropZone";
import { BsUpload } from "react-icons/bs";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";
import TextArea from "@/components/TextArea/TextArea";
import moment from "moment";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Spinner from "@/app/Spinner/Spinner";

type Props = {
  data: ICompanyDataResponse;
  id: string;
};

const EditCompanyForm = ({ data, id }: Props) => {
  const router = useRouter();
  const [editCompany, result] = useEditCompanyMutation();
  const [type, setType] = useState<string>(data.company.type || "");
  const [rateCard, setRateCard] = useState<File | null>(null);
  const [bio, setBio] = useState<string>(data.company.bio || "");
  const [rateCardQuestion, setRateCardQuestion] = useState<string>(
    data.company.useRateCard ? "Yes" : "No"
  );
  const [budget, setBudget] = useState<string>(data.company.fee || "");
  const [jobsDoneList, setJobsDoneList] = useState<JobsDoneList[]>(
    data.company.clientele
      ? data.company.clientele.map((el) => {
          return {
            date: new Date(el.year),
            link: el.link,
            title: el.title,
          };
        })
      : []
  );
  const addJobDoneHandler = (val: JobsDoneList) => {
    setJobsDoneList((prev) => [...prev, val]);
  };
  const editJobDoneHandler = (val: JobsDoneList, index: number) => {
    const editedValue = [...jobsDoneList];
    editedValue.splice(index, 1, val);
    setJobsDoneList(editedValue);
  };
  const deleteJobDoneHandler = (index: number) => {
    const editedValue = [...jobsDoneList];
    editedValue.splice(index, 1);
    setJobsDoneList(editedValue);
  };

  useEffect(() => {
    if (result.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (result.error as any).data?.message || "An Error Occcured"
      );
    }

    if (result.isSuccess) {
      notify("success", "Profile updated successfully");
      nprogress.complete();
      router.push(`/filmmaker-database/user/${id}`);
    }
  }, [result.isError, result.isSuccess]);

  return (
    <div className="text-left">
      <h2 className="text-left font-medium text-xl py-8">Job details</h2>
      <div className="">
        <div className="mb-2 mt-10 flex font-medium text-[0.88rem] text-[#A5A5A5]">
          <p>Company type</p>
          <p>*</p>
        </div>
        <SelectComponent
          data={companyTypeList}
          label=""
          placeholder=""
          value={type}
          setValueProps={(val) => {
            if (val) setType(val);
          }}
          size="lg"
        />
      </div>
      {type && (
        <div className="mt-8">
          <h1 className="font-medium ">Clientele details</h1>
          {jobsDoneList.map((el, index) => (
            <JobsDone
              key={el.title + el.link}
              val={el}
              deleteJob={deleteJobDoneHandler}
              editJob={editJobDoneHandler}
              index={index}
              company
            />
          ))}
          <JobsDoneInput addJob={addJobDoneHandler} company />
          <div className="mt-10">
            <h1 className="font-medium ">Fee range</h1>
          </div>
          <div className="mt-6">
            <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>Do you have a rate card?</p>
              <p>*</p>
            </div>
            <SelectComponent
              data={[
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
              ]}
              label=""
              placeholder=""
              setValueProps={(val) => {
                if (val) {
                  if (val === "Yes") {
                    setBudget("");
                  } else {
                    setRateCard(null);
                  }
                  setRateCardQuestion(val);
                }
              }}
              value={rateCardQuestion || null}
              size="lg"
            />
          </div>

          {rateCardQuestion === "Yes" ? (
            <div className="mt-10">
              <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                <p>Upload a copy of your rate card</p>
                <p>*</p>
              </div>
              <DropZoneComponent
                setSingleFile={(file) => {
                  if (file) {
                    setRateCard(file);
                  }
                }}
                single
                setFiles={(files) => {}}
              >
                <div
                  className={` text-center text-[#4B5563]  mt-6 rounded-2xl border-black-2 w-full py-10`}
                >
                  {rateCard ? (
                    <div className="">{rateCard.name}</div>
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
          ) : (
            <div className="">
              <div className="mt-8">
                <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                  <p>Fee range</p>
                </div>
                <SelectComponent
                  data={[
                    {
                      label: "0 - 500k",
                      value: "0 - 500k",
                    },
                    {
                      label: "500k - 2m",
                      value: "500k - 2m",
                    },
                    {
                      label: "2m - 5m",
                      value: "2m - 5m",
                    },
                    {
                      label: "5m+",
                      value: "5m+",
                    },
                  ]}
                  label=""
                  placeholder=""
                  setValueProps={(val) => {
                    if (val) setBudget(val);
                  }}
                  value={budget || null}
                  size="lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
      <Formik
        initialValues={{
          name: data.company.name || "",
          mobile: data.company.mobile || "",
          website: data.company.website || "",
          address: data.company.location.address || "",
          city: data.company.location.city || "",
          state: data.company.location.state || "",
          country: data.company.location.country || "",
        }}
        onSubmit={(values) => {
          editCompany({
            location: {
              address: values.address,
              city: values.city,
              country: values.country,
              state: values.state,
            },
            userId: id,
            bio,
            type,
            clientele: jobsDoneList.map((el) => {
              return {
                link: el.link,
                title: el.link,
                year: moment(el.date).format("YYYY"),
              };
            }),
            fee: budget,
            mobile: values.mobile,
            rateCard,
            useRateCard: rateCardQuestion,
            website: values.website
          });
        }}
      >
        <Form>
          <div className="mt-8">
            <h2 className="text-left font-medium text-xl py-8">User details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Field
                required
                label="Company name"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="name"
                placeholder="Enter com"
              />

              <Field
                required
                label="Phone number"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="mobile"
                placeholder="+234 819 2727 973"
              />
              <Field
                required
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
              changed={(val) => setBio(val)}
              value={bio}
              className="outline-none  px-4 py-4 h-[10rem]"
            />
            <h2 className="text-left font-medium text-xl py-8">Location</h2>
            <div className="grid md:grid-cols-2 gap-8">
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
          </div>
          <div className="flex mt-10 mb-10">
            <UnstyledButton
              type="submit"
              disabled={result.isLoading}
              class="ml-auto w-[7rem] flex hover:bg-blue-1 py-2 px-4 disabled:opacity-50 transition-all rounded-lg justify-center items-center text-white border border-black-3  bg-black-3 "
            >
              {result.isLoading ? (
                <div className="py-1 w-[1rem]">
                  <Spinner />
                </div>
              ) : (
                <p>Update</p>
              )}
            </UnstyledButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditCompanyForm;
