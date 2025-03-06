import React, { useEffect, useState } from "react";
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
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";

import { Country, State } from "country-state-city";
import TextArea from "@/components/TextArea/TextArea";
import moment from "moment";

type Props = {
  data: ICrewDataResponse;
  id: string;
};

const icon = <IoIosArrowDown className="text-gray-4" />;

const EditCrewForm = ({ data, id }: Props) => {
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
  const [countriesVal, setCountriesVal] = useState<string>("");
  const [statesVal, setStatesVal] = useState<string>(data.crew.location.state);
  const [countryName, setCountryName] = useState<string>(
    data.crew.location.country
  );
  const [stateName, setStateName] = useState<string>(data.crew.location.state);

  const [bio, setBio] = useState<string>(data.crew.bio);

  const router = useRouter();
  const [updateCrew, result] = useEditCrewMutation();

  const [department, setDepartment] = useState<string[]>(
    data.crew.department || []
  );

  const [departmentVal, setDepartmentVal] = useState<string>("");
  const [departmentListState, setDepartmentListState] = useState<string[]>([]);
  const [rolesList, setRolesList] = useState<string[]>([]);
  const [val, setValue] = useState<string>("");
  const [roles, setRoles] = useState<string[]>(data.crew.role || []);
  const [allDeptRoles, setAllDeptRoles] = useState<string[]>([]); // New state for all roles
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
    const countriesData: { label: string; value: string }[] =
      Country.getAllCountries().map((el) => {
        return {
          label: el.name,
          value: `${el.isoCode} ${el.name}`,
        };
      });
    const userLocation = Country.getAllCountries().filter(
      (el) => el.name === data.crew.location.country
    );
    if (userLocation[0]) {
      setCountriesVal(`${userLocation[0].isoCode} ${userLocation[0].name}`);
    }
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

  const updateProfile = () => {
    nprogress.start();
    updateCrew({
      location: {
        address: "",
        city: "",
        country: countryName,
        state: stateName,
      },
      userId: id,
      bio: bio,
      department,
      // firstName: values.fname,
      // lastName: values.lname,
      // mobile: values.mobile,
      role: roles,
      works: jobsDoneList?.map((el) => {
        return {
          link: el.link || "",
          role: el.role || "",
          title: el.title,
          year: el.date ? moment(el.date).format("YYYY") : "",
        };
      }),
    });
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
          data={departmentListState}
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
            if (val && !department.includes(val)) {
              setDepartmentVal("");
              setDepartment((prev) => [...prev, val]);
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
                handleDepartmentRemove(index);
              }}
            >
              <Image src={CancelImg} alt="cancel" className="" />
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
              if (val && !roles.includes(val)) {
                setValue("");
                setRoles((prev) => [...prev, val]);
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
                  roles={allDeptRoles}
                />
              ))}
              <JobsDoneInput roles={allDeptRoles} addJob={addJobDoneHandler} />
            </div>
          )}
        </div>
      )}

      {/* onSubmit={(values) => {
          nprogress.start();
          updateCrew({
            location: {
              address: "",
              city: "",
              country: values.country,
              state: values.state,
            },
            userId: id,
            bio: values.bio,
            department,
            // firstName: values.fname,
            // lastName: values.lname,
            // mobile: values.mobile,
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
        }} */}
      <div className="mb-2 mt-8 flex font-medium text-[0.88rem] text-[#A5A5A5]">
        <p>About you</p>
        {/* <p>*</p> */}
      </div>
      <TextArea
        changed={(val) => setBio(val)}
        value={bio}
        className="outline-none  px-4 py-4 h-[10rem]"
      />

      <p className="mb-2 font-medium mt-8 text-[#A5A5A5] text-left">
        Search country
      </p>
      <div className="">
        <SelectComponent
          data={countriesData}
          placeholder="Search for country"
          label=""
          value={countriesVal}
          setValueProps={(val) => {
            if (val) {
              const country_name = val.split(" ")[1];
              setCountryName(country_name);
              // setFormData((prev) => ({ ...prev, country: country_name }));
              setCountriesVal(val);
            }
          }}
          size="lg"
          searchable
        />
      </div>

      {countriesVal && (
        <div className="">
          <p className="mb-2 font-medium mt-8 text-[#A5A5A5] text-left">
            Search state
          </p>
          <div className="">
            <SelectComponent
              data={statesData}
              placeholder="Search for state"
              label=""
              setValueProps={(val) => {
                if (val) {
                  setStateName(val);
                  setStatesVal(val);
                  // setFormData((prev) => ({ ...prev, state: val }));
                }
              }}
              searchable
              value={statesVal}
              size="lg"
            />
          </div>
        </div>
      )}

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
          clicked={updateProfile}
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
    </div>
  );
};

export default EditCrewForm;
