import SelectComponent from "@/components/Select/SelectComponent";
import { companyTypeList } from "@/utils/constants/constants";
import React, { useState } from "react";
import JobsDone, { JobsDoneList } from "../../JobsDone";
import JobsDoneInput from "../../JobsDoneInput";
import DropZoneComponent from "@/components/DropZone/DropZone";
import { BsUpload } from "react-icons/bs";
import { IJoinCompany } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import UnstyledButton from "@/components/Button/UnstyledButton";
import moment from "moment";

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  updateCompany: (val: IJoinCompany) => void;
  data: IJoinCompany;
  active: number;
};

const CompanyDetails = ({
  active,
  data,
  nextStep,
  prevStep,
  updateCompany,
}: Props) => {
  const [type, setType] = useState<string>(data.type || "");
  const [rateCard, setRateCard] = useState<File | null>(data.rateCard || null);
  const [rateCardQuestion, setRateCardQuestion] = useState<string>(
    data.useRateCard ? "Yes" : "No"
  );
  const [budget, setBudget] = useState<string>(data.fee || "");
  const [jobsDoneList, setJobsDoneList] = useState<JobsDoneList[]>(
    data.clientele
      ? data.clientele.map((el) => {
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

  const nextPageHandler = () => {
    const payload: IJoinCompany = {
      type,
      fee: budget,
      useRateCard: rateCardQuestion === "Yes" ? true : false,
      rateCard: rateCard,
    };
    if (jobsDoneList.length > 0) {
      payload.clientele = jobsDoneList.map((el) => {
        return {
          link: el.link,
          title: el.title,
          year: moment(el.date).format("YYYY"),
        };
      });
    }
    updateCompany(payload);
    nextStep();
  };
  return (
    <div className="">
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
              //   data={[
              //     {
              //       label: "0 - 500k",
              //       value: "0 - 500k",
              //     },
              //     {
              //       label: "500k - 2m",
              //       value: "500k - 2m",
              //     },
              //     {
              //       label: "2m - 5m",
              //       value: "2m - 5m",
              //     },
              //     {
              //       label: "5m+",
              //       value: "5m+",
              //     },
              //   ]}
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
      <div className="flex items-center justify-between mt-[4rem]">
        <UnstyledButton
          clicked={() => {
            const payload: IJoinCompany = {
              type,
              fee: budget,
              useRateCard: rateCardQuestion === "Yes" ? true : false,
              rateCard: rateCard,
            };
            if (jobsDoneList.length > 0) {
              payload.clientele = jobsDoneList.map((el) => {
                return {
                  link: el.link,
                  title: el.title,
                  year: moment(el.date).format("YYYY"),
                };
              });
            }
            updateCompany(payload);
            prevStep();
          }}
          class="py-2 rounded-md px-6 border-stroke-2  border  xs:mr-4"
        >
          Back
        </UnstyledButton>

        <UnstyledButton
          clicked={nextPageHandler}
          disabled={
            !type ||
            !rateCardQuestion ||
            (rateCardQuestion === "Yes" && !rateCard)
          }
          class="ml-auto w-[7rem] flex hover:bg-blue-1 py-2 px-4 disabled:opacity-50 transition-all rounded-lg justify-center items-center text-white border border-black-3  bg-black-3 "
        >
          Continue
        </UnstyledButton>
      </div>
    </div>
  );
};

export default CompanyDetails;
