import SelectComponent from "@/components/Select/SelectComponent";
import { departmentList, film_crew_values } from "@/utils/constants/constants";
import { Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import classes from "@/app/styles/Select.module.css";
import JobsDone, { JobsDoneList } from "../../JobsDone";
import JobsDoneInput from "../../JobsDoneInput";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IJoinCrew } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import moment from "moment";

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  updateCrew: (val: IJoinCrew) => void;
  data: IJoinCrew;
  active: number;
};

const icon = <IoIosArrowDown className="text-gray-4" />;

const ContactDetails = ({
  prevStep,
  nextStep,
  data,
  updateCrew,
  active,
}: Props) => {
  const [department, setDepartment] = useState<string[]>(data.department || []);
  const [departmentVal, setDepartmentVal] = useState<string>("");
  const [departmentListState, setDepartmentListState] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>(data.role || []);
  const [rolesList, setRolesList] = useState<string[]>([]);
  const [allDeptRoles, setAllDeptRoles] = useState<string[]>([]); // New state for all roles
  const [val, setValue] = useState<string>("");
  const [budget, setBudget] = useState<string>(data.fee || "");
  const [jobsDoneList, setJobsDoneList] = useState<JobsDoneList[]>(
    data.works
      ? data.works.map((el) => ({
          date: new Date(el.year),
          link: el.link,
          title: el.title,
          role: el.role,
        }))
      : []
  );

  // Initialize department list
  useEffect(() => {
    const availableDepartments = departmentList
      .map((el) => el.label)
      .filter((dept) => !department.includes(dept));
    setDepartmentListState(availableDepartments);
  }, [department]);

  // Update roles list for selection (excludes selected roles)
  useEffect(() => {
    const availableRoles = department
      .flatMap((dept) => {
        const deptData = film_crew_values.find((el) => el.key === dept);
        return deptData ? deptData.value : [];
      })
      .filter((role) => !roles.includes(role));
    setRolesList(availableRoles);
  }, [department, roles]);

  // Update all department roles (immune to selection)
  useEffect(() => {
    const allRoles = department
      .flatMap((dept) => {
        const deptData = film_crew_values.find((el) => el.key === dept);
        return deptData ? deptData.value : [];
      })
      // Remove duplicates if any
      .filter((role, index, self) => self.indexOf(role) === index);
    setAllDeptRoles(allRoles);
  }, [department]);

  const addJobDoneHandler = (val: JobsDoneList) => {
    setJobsDoneList((prev) => [...prev, val]);
  };

  const editJobDoneHandler = (val: JobsDoneList, index: number) => {
    const editedValue = [...jobsDoneList];
    editedValue[index] = val;
    setJobsDoneList(editedValue);
  };

  const deleteJobDoneHandler = (index: number) => {
    const editedValue = [...jobsDoneList];
    editedValue.splice(index, 1);
    setJobsDoneList(editedValue);
  };

  const nextPageHandler = () => {
    const payload: IJoinCrew = {
      department,
      role: roles,
      fee: budget,
    };
    if (jobsDoneList.length > 0) {
      payload.works = jobsDoneList.map((el) => ({
        link: el.link,
        role: el.role || "",
        title: el.title,
        year: moment(el.date).format("YYYY"),
      }));
    }
    updateCrew(payload);
    nextStep();
  };

  const handleDepartmentRemove = (index: number) => {
    const removedDept = department[index];
    const newDepartments = department.filter((_, i) => i !== index);
    setDepartment(newDepartments);

    const removedDeptRoles =
      film_crew_values.find((el) => el.key === removedDept)?.value || [];
    setRoles((prevRoles) => {
      return prevRoles.filter((role) => {
        const isRoleInOtherDepts = newDepartments.some((dept) => {
          const deptRoles =
            film_crew_values.find((el) => el.key === dept)?.value || [];
          return deptRoles.includes(role);
        });
        return isRoleInOtherDepts || !removedDeptRoles.includes(role);
      });
    });
  };

  return (
    <div>
      <div className="">
        <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
          <p>Department (you can select multiple departments)</p>
          <p>*</p>
        </div>
        <Select
          data={departmentListState}
          classNames={{ input: classes.input }}
          rightSection={icon}
          value={departmentVal}
          onChange={(val) => {
            if (val && !department.includes(val)) {
              setDepartmentVal("");
              setDepartment((prev) => [...prev, val]);
            }
          }}
          placeholder="Select a department"
          size="lg"
          className="border border-stroke-9 rounded-md"
        />
      </div>
      <div className="flex flex-wrap mt-3 gap-4 text-[0.88rem]">
        {department.map((el, index) => (
          <div
            key={el}
            className="border flex items-center border-gray-2 py-2 px-2 rounded-md"
          >
            <p className="mr-2">{el}</p>
            <div
              className="w-[.7rem] cursor-pointer"
              onClick={() => handleDepartmentRemove(index)}
            >
              <Image src={CancelImg} alt="cancel" />
            </div>
          </div>
        ))}
      </div>

      {rolesList.length > 0 && (
        <div className="">
          <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
            <p>Roles (you can select multiple roles)</p>
            <p>*</p>
          </div>
          <Select
            data={rolesList.map((el) => ({ label: el, value: el }))}
            classNames={{ input: classes.input }}
            rightSection={icon}
            value={val}
            onChange={(val) => {
              if (val && !roles.includes(val)) {
                setValue("");
                setRoles((prev) => [...prev, val]);
              }
            }}
            placeholder="Select a role"
            size="lg"
            className="border border-stroke-9 rounded-md"
          />
          <div className="flex flex-wrap mt-3 gap-4 text-[0.88rem]">
            {roles.map((el, index) => (
              <div
                key={el}
                className="border flex items-center border-gray-2 py-2 px-2 rounded-md"
              >
                <p className="mr-2">{el}</p>
                <div
                  className="w-[.7rem] cursor-pointer"
                  onClick={() => {
                    const newRoles = roles.filter((_, i) => i !== index);
                    setRoles(newRoles);
                  }}
                >
                  <Image src={CancelImg} alt="cancel" />
                </div>
              </div>
            ))}
          </div>

          {roles.length > 0 && (
            <div className="mt-8">
              <h1 className="font-medium">Jobs done (add additional jobs done after clicking the save button)</h1>
              {jobsDoneList.map((el, index) => (
                <JobsDone
                  key={el.title + el.link}
                  val={el}
                  deleteJob={deleteJobDoneHandler}
                  editJob={editJobDoneHandler}
                  index={index}
                  roles={allDeptRoles} // Use allDeptRoles instead of rolesList
                />
              ))}
              <JobsDoneInput
                roles={allDeptRoles} // Use allDeptRoles instead of rolesList
                addJob={addJobDoneHandler}
              />
              <div className="mt-8">
                <div className="mb-2 flex font-medium text-[0.88rem] text-[#A5A5A5]">
                  <p>Fee range</p>
                </div>
                <SelectComponent
                  label=""
                  placeholder=""
                  data={[
                    { label: "0 - 500k", value: "0 - 500k" },
                    { label: "500k - 2m", value: "500k - 2m" },
                    { label: "2m - 5m", value: "2m - 5m" },
                    { label: "5m+", value: "5m+" },
                  ]}
                  setValueProps={(val) => {
                    if (val) {
                      setBudget(val);
                    }
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
            const payload: IJoinCrew = { department, role: roles, fee: budget };
            if (jobsDoneList.length > 0) {
              payload.works = jobsDoneList.map((el) => ({
                link: el.link,
                role: el.role || "",
                title: el.title,
                year: moment(el.date).format("YYYY"),
              }));
            }
            updateCrew(payload);
            prevStep();
          }}
          class="py-2 rounded-md px-6 border-stroke-2 border xs:mr-4"
        >
          Back
        </UnstyledButton>
        <UnstyledButton
          clicked={nextPageHandler}
          disabled={department.length === 0 || roles.length === 0}
          class="ml-auto w-[7rem] flex hover:bg-blue-1 py-2 px-4 disabled:opacity-50 transition-all rounded-lg justify-center items-center text-white border border-black-3 bg-black-3"
        >
          Continue
        </UnstyledButton>
      </div>
    </div>
  );
};

export default ContactDetails;
