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

  // Update roles list based on selected departments
  useEffect(() => {
    const allRoles = department
      .flatMap((dept) => {
        const deptData = film_crew_values.find((el) => el.key === dept);
        return deptData ? deptData.value : [];
      })
      .filter((role) => !roles.includes(role));
    setRolesList(allRoles);
  }, [department, roles]);

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

    // Get roles affiliated with the removed department
    const removedDeptRoles =
      film_crew_values.find((el) => el.key === removedDept)?.value || [];

    // Deselect roles that are only affiliated with the removed department
    setRoles((prevRoles) => {
      return prevRoles.filter((role) => {
        // Keep the role if it belongs to any remaining department
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
              setDepartmentVal(""); // Reset dropdown after selection
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
                setValue(""); // Reset dropdown after selection
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
              <h1 className="font-medium">Jobs done</h1>
              {jobsDoneList.map((el, index) => (
                <JobsDone
                  key={el.title + el.link}
                  val={el}
                  deleteJob={deleteJobDoneHandler}
                  editJob={editJobDoneHandler}
                  index={index}
                  roles={rolesList}
                />
              ))}
              <JobsDoneInput roles={rolesList} addJob={addJobDoneHandler} />
              <div className="mt-8">
                <div className="mb-2 flex font-medium text-[0.88rem] text-[#A5A5A5]">
                  <p>Fee range</p>
                </div>
                <SelectComponent
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
                  placeholder=""
                  label=""
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

// import SelectComponent from "@/components/Select/SelectComponent";
// import { departmentList, film_crew_values } from "@/utils/constants/constants";
// import { MultiSelect, Select } from "@mantine/core";
// import React, { act, useEffect, useState } from "react";
// import CancelImg from "/public/assets/cancel.svg";
// import Image from "next/image";
// import { IoIosArrowDown } from "react-icons/io";

// import classes from "@/app/styles/Select.module.css";
// import JobsDone, { JobsDoneList } from "../../JobsDone";
// import JobsDoneInput from "../../JobsDoneInput";
// import UnstyledButton from "@/components/Button/UnstyledButton";
// import { IJoinCrew } from "@/lib/features/users/filmmaker-database/filmmaker-database";
// import moment from "moment";

// type Props = {
//   prevStep: () => void;
//   nextStep: () => void;
//   updateCrew: (val: IJoinCrew) => void;
//   data: IJoinCrew;
//   active: number;
// };

// const icon = <IoIosArrowDown className="text-gray-4" />;
// const ContactDetails = ({
//   prevStep,
//   nextStep,
//   data,
//   updateCrew,
//   active,
// }: Props) => {
//   const [department, setDepartment] = useState<string[]>(data.department || []);
//   const [departmentVal, setDepartmentVal] = useState<string>("");
//   const [departmentListState, setDepartmentListState] = useState<string[]>([]);
//   const [roles, setRoles] = useState<string[]>(data.role || []);
//   const [rolesList, setRolesList] = useState<string[] | null>(null);
//   const [persistedRolesList, setPersistedRolesList] = useState<string[]>([]);
//   const [val, setValue] = useState<string>("");
//   const [budget, setBudget] = useState<string>(data.fee || "");

//   const [jobsDoneList, setJobsDoneList] = useState<JobsDoneList[]>(
//     data.works
//       ? data.works.map((el) => {
//           return {
//             date: new Date(el.year),
//             link: el.link,
//             title: el.title,
//             role: el.role,
//           };
//         })
//       : []
//   );

//   useEffect(() => {
//     const list = departmentList.map((el) => el.label);
//     setDepartmentListState(list);
//   }, []);

//   useEffect(() => {
//     if (departmentVal) {
//       console.log("i ran");
//       const list = film_crew_values.filter((el) => el.key === departmentVal);
//       if (rolesList) {
//         setPersistedRolesList([
//           ...rolesList,
//           ...list[0].value.filter((item) => !data.role?.includes(item)),
//         ]);
//         setRolesList([
//           ...rolesList,
//           ...list[0].value.filter((item) => !data.role?.includes(item)),
//         ]);
//       } else {
//         setPersistedRolesList(
//           list[0].value.filter((item) => !data.role?.includes(item))
//         );
//         setRolesList(
//           list[0].value.filter((item) => !data.role?.includes(item))
//         );
//       }
//     } else {
//       const stateData = [];
//       for (const val of department) {
//         const list = film_crew_values.filter((el) => el.key === val);
//         stateData.push(
//           ...list[0].value.filter((item) => !data.role?.includes(item))
//         );
//         setRolesList(stateData);
//       }
//       if (stateData.length < 1) {
//         setRolesList(stateData);
//       }
//     }
//   }, [department, active]);

//   const addJobDoneHandler = (val: JobsDoneList) => {
//     setJobsDoneList((prev) => [...prev, val]);
//   };
//   const editJobDoneHandler = (val: JobsDoneList, index: number) => {
//     const editedValue = [...jobsDoneList];
//     editedValue.splice(index, 1, val);
//     setJobsDoneList(editedValue);
//   };
//   const deleteJobDoneHandler = (index: number) => {
//     const editedValue = [...jobsDoneList];
//     editedValue.splice(index, 1);
//     setJobsDoneList(editedValue);
//   };
//   const nextPageHandler = () => {
//     const payload: IJoinCrew = {
//       department,
//       role: roles,
//       fee: budget,
//     };
//     if (jobsDoneList.length > 0) {
//       payload.works = jobsDoneList.map((el) => {
//         return {
//           link: el.link,
//           role: el.role || "",
//           title: el.title,
//           year: moment(el.date).format("YYYY"),
//         };
//       });
//     }
//     updateCrew(payload);
//     nextStep();
//   };
//   return (
//     <div>
//       <div className="">
//         <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
//           <p>Department (you can select multiple department)</p>
//           <p>*</p>
//         </div>
//         <Select
//           data={departmentList}
//           classNames={{
//             input: classes.input,
//           }}
//           label=""
//           placeholder=""
//           rightSection={icon}
//           value={departmentVal}
//           className="border border-stroke-9 rounded-md"
//           defaultValue={departmentVal}
//           onChange={(val) => {
//             if (val) {
//               if (department.includes(val)) {
//                 return;
//               }
//               setDepartmentVal(val);
//               setDepartment([...department, val]);
//               const newDepartmentList = [...departmentListState];
//               const valIndex = departmentListState.findIndex(
//                 (el) => val === el
//               );
//               newDepartmentList.splice(valIndex, 1);
//               setDepartmentListState(newDepartmentList);
//             }
//             // if (val) setDepartment(val);
//           }}
//           size="lg"
//         />
//       </div>
//       <div className="flex flex-wrap mt-3 gap-4 text-[0.88rem]">
//         {department.map((el, index) => (
//           <div
//             key={el}
//             className="border flex items-center border-gray-2 py-2 px-2 rounded-md "
//           >
//             <p className="mr-2">{el}</p>
//             <div
//               className="w-[.7rem] cursor-pointer"
//               onClick={() => {
//                 setDepartmentVal(""); // Reset selected department

//                 const newDepartments = [...department];
//                 newDepartments.splice(index, 1);
//                 setDepartment(newDepartments);

//                 // Get roles associated with the removed department
//                 const removedRoles =
//                   film_crew_values.find(
//                     (dept) => dept.key === department[index]
//                   )?.value || [];

//                 // Remove affiliated roles from `roles` (selected roles)
//                 setRoles((prevRoles) =>
//                   prevRoles.filter((role) => !removedRoles.includes(role))
//                 );

//                 // Remove affiliated roles from `rolesList`
//                 setRolesList((prevRolesList) =>
//                   prevRolesList
//                     ? prevRolesList.filter(
//                         (role) => !removedRoles.includes(role)
//                       )
//                     : []
//                 );

//                 // Restore department to departmentListState
//                 if (departmentListState) {
//                   setDepartmentListState((prev) => prev && [...prev, el]);
//                 }
//                 // setDepartmentVal("");
//                 // const newRoles = [...department];
//                 // newRoles.splice(index, 1);
//                 // setDepartment(newRoles);

//                 // if (departmentListState) {
//                 //   setDepartmentListState((prev) => prev && [...prev, el]);
//                 // }
//               }}
//             >
//               <Image src={CancelImg} alt="cancel" className="" />
//             </div>
//           </div>
//         ))}
//       </div>
//       {rolesList && (
//         <div className="">
//           <div className="mb-2 mt-6 flex font-medium text-[0.88rem] text-[#A5A5A5]">
//             <p>Roles (you can select multiple roles)</p>
//             <p>*</p>
//           </div>
//           <Select
//             data={rolesList.map((el) => {
//               return {
//                 label: el,
//                 value: el,
//               };
//             })}
//             classNames={{
//               input: classes.input,
//             }}
//             label=""
//             value={val}
//             defaultValue={val}
//             placeholder=""
//             rightSection={icon}
//             className="border border-stroke-9 rounded-md"
//             onChange={(val) => {
//               if (val) {
//                 setValue(val);
//                 setRoles([...roles, val]);
//                 const newRoleList = [...rolesList];
//                 const valIndex = rolesList.findIndex((el) => val === el);
//                 newRoleList.splice(valIndex, 1);
//                 setRolesList(newRoleList);
//               }
//             }}
//             radius={"md"}
//             size="lg"
//           />
//           <div className="flex flex-wrap mt-3 gap-4 text-[0.88rem]">
//             {roles.map((el, index) => (
//               <div
//                 key={el}
//                 className="border flex items-center border-gray-2 py-2 px-2 rounded-md "
//               >
//                 <p className="mr-2">{el}</p>
//                 <div
//                   className="w-[.7rem] cursor-pointer"
//                   onClick={() => {
//                     setValue("");
//                     const newRoles = [...roles];
//                     newRoles.splice(index, 1);
//                     setRoles(newRoles);
//                     if (rolesList.length > 0) {
//                       setRolesList((prev) => prev && [...prev, el]);
//                     }
//                   }}
//                 >
//                   <Image src={CancelImg} alt="cancel" className="" />
//                 </div>
//               </div>
//             ))}
//           </div>
//           {roles.length > 0 && (
//             <div className="mt-8">
//               <h1 className="font-medium ">Jobs done</h1>
//               {jobsDoneList.map((el, index) => (
//                 <JobsDone
//                   key={el.title + el.link}
//                   val={el}
//                   deleteJob={deleteJobDoneHandler}
//                   editJob={editJobDoneHandler}
//                   index={index}
//                   roles={persistedRolesList}
//                 />
//               ))}
//               <JobsDoneInput
//                 roles={persistedRolesList}
//                 addJob={addJobDoneHandler}
//               />
//               <div className="mt-8 ">
//                 <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
//                   <p>Fee range</p>
//                 </div>
//                 <SelectComponent
//                   data={[
//                     {
//                       label: "0 - 500k",
//                       value: "0 - 500k",
//                     },
//                     {
//                       label: "500k - 2m",
//                       value: "500k - 2m",
//                     },
//                     {
//                       label: "2m - 5m",
//                       value: "2m - 5m",
//                     },
//                     {
//                       label: "5m+",
//                       value: "5m+",
//                     },
//                   ]}
//                   label=""
//                   placeholder=""
//                   setValueProps={(val) => {
//                     if (val) setBudget(val);
//                   }}
//                   value={budget || null}
//                   size="lg"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//       <div className="flex items-center justify-between mt-[4rem]">
//         <UnstyledButton
//           clicked={() => {
//             const payload: IJoinCrew = {
//               department,
//               role: roles,
//               fee: budget,
//             };
//             if (jobsDoneList.length > 0) {
//               payload.works = jobsDoneList.map((el) => {
//                 return {
//                   link: el.link,
//                   role: el.role || "",
//                   title: el.title,
//                   year: moment(el.date).format("YYYY"),
//                 };
//               });
//             }
//             updateCrew(payload);
//             prevStep();
//           }}
//           class="py-2 rounded-md px-6 border-stroke-2  border  xs:mr-4"
//         >
//           Back
//         </UnstyledButton>

//         <UnstyledButton
//           clicked={nextPageHandler}
//           disabled={!department || roles.length === 0}
//           class="ml-auto w-[7rem] flex hover:bg-blue-1 py-2 px-4 disabled:opacity-50 transition-all rounded-lg justify-center items-center text-white border border-black-3  bg-black-3 "
//         >
//           Continue
//         </UnstyledButton>
//       </div>
//     </div>
//   );
// };

// export default ContactDetails;
