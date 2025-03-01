import { Form, Formik } from "formik";
import React, { useState } from "react";
import Field from "../Field/Field";
import SelectComponent from "../Select/SelectComponent";
import { DateInput } from "@mantine/dates";
import Link from "next/link";
import moment from "moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiEdit2Line } from "react-icons/ri";
import JobsDoneInput from "./JobsDoneInput";

export interface JobsDoneList {
  title: string;
  role?: string;
  link: string;
  date?: Date | null;
}
type Props = {
  val: JobsDoneList;
  editJob: (val: JobsDoneList, index: number) => void;
  deleteJob: (index: number) => void;
  index: number;
  roles?: string[];
  company?: boolean;
};

const JobsDone = ({
  val,
  deleteJob,
  editJob,
  index,
  roles,
  company,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <>
      {edit ? (
        <JobsDoneInput
          defaultVal={val}
          roles={roles}
          addJob={(val) => editJob(val, index)}
          edit
          removeEdit={(el) => setEdit(el)}
          company={company}
        />
      ) : (
        <div className="flex items-center border-b py-8">
          <div className="text-[0.88rem]">
            <h1 className="font-medium">{val.title}</h1>
            {val.role && <p className="text-[#4B5563]">{val.role}</p>}
            {val.date && (
              <p className="text-[#A5A5A5]">
                {moment(val.date).format("YYYY")}
              </p>
            )}
            {val.link && (
              <Link
                target="_blank"
                className="text-[#4B5563] border-b"
                href={val.link}
              >
                View project
              </Link>
            )}
          </div>
          <div className="flex items-center ml-auto text-[#4b556398] text-xl cursor-pointer">
            <div className="" onClick={() => deleteJob(index)}>
              <RiDeleteBin6Line className="mr-2" />
            </div>
            <div className="" onClick={() => setEdit(true)}>
              <RiEdit2Line />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobsDone;
