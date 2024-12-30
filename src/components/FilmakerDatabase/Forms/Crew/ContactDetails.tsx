import SelectComponent from "@/components/Select/SelectComponent";
import { departmentList, film_crew_values } from "@/utils/constants/constants";
import { MultiSelect, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

import classes from "@/app/styles/Select.module.css";
import JobsDone, { JobsDoneList } from "../../JobsDone";
import JobsDoneInput from "../../JobsDoneInput";

type Props = {};

const icon = <IoIosArrowDown className="text-gray-4" />;
const ContactDetails = (props: Props) => {
  const [department, setDepartment] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [rolesList, setRolesList] = useState<string[] | null>(null);
  const [val, setValue] = useState<string>("");
  const [budget, setBudget] = useState<string>("");

  const [jobsDoneList, setJobsDoneList] = useState<JobsDoneList[]>([]);

  useEffect(() => {
    if (department) {
      const list = film_crew_values.filter((el) => el.key === department);
      setRolesList(list[0].value);
    }
  }, [department]);

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
  return (
    <div>
      <div className="">
        <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
          <p>Department</p>
          <p>*</p>
        </div>
        <SelectComponent
          data={departmentList}
          label=""
          placeholder=""
          value={department}
          setValueProps={(val) => {
            setRoles([]);
            if (val) setDepartment(val);
          }}
          size="lg"
        />
      </div>
      {rolesList && (
        <div className="">
          <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
            <p>Role</p>
            <p>*</p>
          </div>
          <Select
            data={rolesList.map((el) => {
              return {
                label: el,
                value: el,
              };
            })}
            classNames={{
              input: classes.input,
            }}
            label=""
            value={val}
            defaultValue={val}
            placeholder=""
            rightSection={icon}
            className="border border-stroke-9 rounded-md"
            onChange={(val) => {
              if (val) {
                setValue(val);
                setRoles([...roles, val]);
                const newRoleList = [...rolesList];
                const valIndex = rolesList.findIndex((el) => val === el);
                newRoleList.splice(valIndex, 1);
                setRolesList(newRoleList);
              }
            }}
            radius={"md"}
            size="lg"
          />
          <div className="flex flex-wrap mt-3 gap-4 text-[0.88rem]">
            {roles.map((el, index) => (
              <div
                key={el}
                className="border flex items-center border-gray-2 py-2 px-2 rounded-md "
              >
                <p className="mr-2">{el}</p>
                <div
                  className="w-[.7rem] cursor-pointer"
                  onClick={() => {
                    setValue("");
                    const newRoles = [...roles];
                    newRoles.splice(index, 1);
                    setRoles(newRoles);
                    if (rolesList) {
                      setRolesList((prev) => prev && [...prev, el]);
                    }
                  }}
                >
                  <Image src={CancelImg} alt="cancel" className="" />
                </div>
              </div>
            ))}
          </div>
          {val && (
            <div className="mt-8">
              <h1 className="font-medium ">Jobs done</h1>
              {jobsDoneList.map((el, index) => (
                <JobsDone
                  key={el.title + el.link}
                  val={el}
                  deleteJob={deleteJobDoneHandler}
                  editJob={editJobDoneHandler}
                  index={index}
                  roles={
                    film_crew_values.filter((el) => el.key === department)[0]
                      .value
                  }
                />
              ))}
              <JobsDoneInput
                roles={
                  film_crew_values.filter((el) => el.key === department)[0]
                    .value
                }
                addJob={addJobDoneHandler}
              />
              <div className="mt-8">
                <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                  <p>Budget</p>
                  <p>*</p>
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

export default ContactDetails;
