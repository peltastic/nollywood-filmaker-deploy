import React, { useEffect, useState } from "react";
import Field from "@/components/Field/Field";
import { Form, Formik } from "formik";
import {
  ICrewDataResponse,
  useEditCrewMutation,
} from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { departmentList, film_crew_values } from "@/utils/constants/constants";
import { Select } from "@mantine/core";
import classes from "@/app/styles/Select.module.css";
import { IoIosArrowDown } from "react-icons/io";
import JobsDoneInput from "../../JobsDoneInput";
import JobsDone, { JobsDoneList } from "../../JobsDone";
import Image from "next/image";
import CancelImg from "/public/assets/cancel.svg";
import SelectComponent from "@/components/Select/SelectComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import moment from "moment";
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";

type Props = {
  data: ICrewDataResponse;
  id: string;
};

const icon = <IoIosArrowDown className="text-gray-4" />;

const EditCrewForm = ({ data, id }: Props) => {
  const router = useRouter();
  const [updateCrew, result] = useEditCrewMutation();

  const [department, setDepartment] = useState<string[]>(
    data.crew.department || []
  );

  const [departmentVal, setDepartmentVal] = useState<string>("");
  const [departmentListState, setDepartmentListState] = useState<string[]>([]);
  const [rolesList, setRolesList] = useState<string[] | null>(null);
  const [persistedRolesList, setPersistedRolesList] = useState<string[]>([]);
  const [val, setValue] = useState<string>("");
  const [roles, setRoles] = useState<string[]>(data.crew.role || []);
  const [budget, setBudget] = useState<string>(data.crew.fee || "");
  const [jobsDoneList, setJobsDoneList] = useState<JobsDoneList[]>(
    data.crew.works
      ? data.crew.works.map((el) => {
          return {
            date: new Date(el.year),
            link: el.link,
            title: el.title,
            role: el.role,
          };
        })
      : []
  );

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

  useEffect(() => {
    if (departmentVal) {
      const list = film_crew_values.filter((el) => el.key === departmentVal);
      if (rolesList) {
        setPersistedRolesList([
          ...rolesList,
          ...list[0].value.filter((item) => !data.crew.role?.includes(item)),
        ]);
        setRolesList([
          ...rolesList,
          ...list[0].value.filter((item) => !data.crew.role?.includes(item)),
        ]);
      } else {
        setPersistedRolesList(
          list[0].value.filter((item) => !data.crew.role?.includes(item))
        );
        setRolesList(
          list[0].value.filter((item) => !data.crew.role?.includes(item))
        );
      }
    } else {
      const stateData = [];
      for (const val of department) {
        const list = film_crew_values.filter((el) => el.key === val);
        stateData.push(
          ...list[0].value.filter((item) => !data.crew.role?.includes(item))
        );
        setRolesList(stateData);
      }
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
    <div className="">
      <h2 className="text-left font-medium text-xl py-8">Job details</h2>
      <div className="">
        <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
          <p>Department (you can select multiple department)</p>
          <p>*</p>
        </div>
        <Select
          data={departmentList}
          classNames={{
            input: classes.input,
          }}
          label=""
          placeholder=""
          rightSection={icon}
          value={departmentVal}
          className="border border-stroke-9 rounded-md"
          defaultValue={departmentVal}
          onChange={(val) => {
            if (val) {
              if (department.includes(val)) {
                return;
              }
              setDepartmentVal(val);
              // setRoles([]);
              setDepartment([...department, val]);
              const newDepartmentList = [...departmentListState];
              const valIndex = departmentListState.findIndex(
                (el) => val === el
              );
              newDepartmentList.splice(valIndex, 1);
              setDepartmentListState(newDepartmentList);
            }
            // if (val) setDepartment(val);
          }}
          size="lg"
        />
      </div>
      <div className="flex flex-wrap mt-3 gap-4 text-[0.88rem]">
        {department.map((el, index) => (
          <div
            key={el}
            className="border flex items-center border-gray-2 py-2 px-2 rounded-md "
          >
            <p className="mr-2">{el}</p>
            <div
              className="w-[.7rem] cursor-pointer"
              onClick={() => {
                setDepartmentVal("");
                const newRoles = [...department];
                newRoles.splice(index, 1);
                setDepartment(newRoles);
                if (departmentListState) {
                  setDepartmentListState((prev) => prev && [...prev, el]);
                }
              }}
            >
              <Image src={CancelImg} alt="cancel" className="" />
            </div>
          </div>
        ))}
      </div>
      {rolesList && (
        <div className="">
          <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
            <p>Roles (you can select multiple roles)</p>
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
          {roles.length > 0 && (
            <div className="mt-8 text-left">
              <h1 className="font-medium ">Jobs done</h1>
              {jobsDoneList.map((el, index) => (
                <JobsDone
                  key={el.title + el.link}
                  val={el}
                  deleteJob={deleteJobDoneHandler}
                  editJob={editJobDoneHandler}
                  index={index}
                  roles={persistedRolesList}
                />
              ))}
              <JobsDoneInput
                roles={persistedRolesList}
                addJob={addJobDoneHandler}
              />
            </div>
          )}
        </div>
      )}
      <Formik
        initialValues={{
          bio: data.crew.bio || "",
          mobile: data.crew.mobile || "",
          fname: data.crew.firstName || "",
          lname: data.crew.lastName || "",
          address: data.crew.location.address || "",
          city: data.crew.location.city || "",
          state: data.crew.location.state || "",
          country: data.crew.location.country || "",
        }}
        onSubmit={(values) => {
          nprogress.start();
          updateCrew({
            location: {
              address: values.address,
              city: values.city,
              country: values.country,
              state: values.state,
            },
            userId: id,
            bio: values.bio,
            department,
            firstName: values.fname,
            lastName: values.lname,
            mobile: values.mobile,
            role: roles,
            works: jobsDoneList?.map((el) => {
              return {
                link: el.link,
                role: el.role || "",
                title: el.title,
                year: moment(el.date).format("YYYY"),
              };
            }),
          });
        }}
      >
        <Form>
          <div className="mt-8">
            <h2 className="text-left font-medium text-xl py-8">User details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Field
                label="First name"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="fname"
                placeholder="Enter your first name"
              />
              <Field
                label="Last name"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="lname"
                placeholder="Enter your surname"
              />
              <Field
                required
                label="Phone number"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="mobile"
                placeholder="+234 819 2727 973"
              />
            </div>
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
          <div className="flex items-center mt-10 mb-10">
            <UnstyledButton
              type="button"
              clicked={() => {
                router.back();
              }}
              class=" xs:mb-0 py-2 rounded-md px-6 border-stroke-2   border  "
            >
              Back
            </UnstyledButton>
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

export default EditCrewForm;
