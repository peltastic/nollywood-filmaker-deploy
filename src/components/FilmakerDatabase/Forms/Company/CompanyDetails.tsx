import SelectComponent from "@/components/Select/SelectComponent";
import { companyTypeList } from "@/utils/constants/constants";
import React, { useState } from "react";
import JobsDone, { JobsDoneList } from "../../JobsDone";
import JobsDoneInput from "../../JobsDoneInput";
import DropZoneComponent from "@/components/DropZone/DropZone";
import { BsUpload } from "react-icons/bs";

type Props = {};

const CompanyDetails = (props: Props) => {
  const [type, setType] = useState<string>("");
  const [rateCard, setRateCard] = useState<string>("");
  const [jobsDoneList, setJobsDoneList] = useState<JobsDoneList[]>([]);
  const addJobDoneHandler = (val: JobsDoneList) => {
    setJobsDoneList((prev) => [...prev, val]);
  };
  const [budget, setBudget] = useState<string>("");
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
            <h1 className="font-medium ">Clientele details</h1>
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
                if (val) setRateCard(val);
              }}
              value={rateCard || null}
              size="lg"
            />
          </div>

          {rateCard === "Yes" ? (
            <div className="mt-10">
              <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                <p>Upload a copy of your rate card</p>
                <p>*</p>
              </div>
              <DropZoneComponent setFiles={(files) => {}}>
                <div
                  className={` text-center text-[#4B5563]  mt-6 rounded-2xl border-black-2 w-full py-10`}
                >
                  <BsUpload className="text-center mx-auto mb-6" />
                  <p className="">Drag and Drop here to upload</p>

                  <p className="text-[0.88rem] mt-6">Or click to browse file</p>
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
    </div>
  );
};

export default CompanyDetails;
