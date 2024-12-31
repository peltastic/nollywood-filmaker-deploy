import React, { useState } from "react";
import Field from "@/components/Field/Field";
import { Form, Formik } from "formik";
import { DateInput, YearPickerInput } from "@mantine/dates";
import SelectComponent from "../Select/SelectComponent";
import { JobsDoneList } from "./JobsDone";
import { MdAdd } from "react-icons/md";

type Props = {
  roles?: string[];
  addJob: (val: JobsDoneList) => void;
  defaultVal?: JobsDoneList;
  edit?: boolean;
  removeEdit?: (val: boolean) => void;
  company?: boolean;
};

const JobsDoneInput = ({
  roles,
  addJob,
  defaultVal,
  edit,
  removeEdit,
  company,
}: Props) => {
  const [dateInput, setDateInput] = useState<Date | null>(
    defaultVal?.date || null
  );
  const [role, setRole] = useState<string>(defaultVal?.role || "");

  return (
    <Formik
      initialValues={{
        title: (defaultVal && defaultVal?.title) || "",
        link: (defaultVal && defaultVal?.link) || "",
      }}
      onSubmit={({ link, title }, { resetForm }) => {
        if (!dateInput) return;
        addJob({
          date: dateInput,
          link,
          role,
          title,
        });
        removeEdit && removeEdit(false);
        resetForm();
        setDateInput(null);
        setRole("");
      }}
    >
      {({ isValid }) => (
        <Form>
          <div className="grid grid-cols-2 mt-8 gap-8">
            <Field
              label="Production title"
              labelColor="text-[#A5A5A5]"
              classname="w-full"
              name="title"
              placeholder="Production title"
              required
            />
            {!company && roles && (
              <div className="">
                <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                  <p>Role</p>
                  <p>*</p>
                </div>
                <SelectComponent
                  data={roles.map((el) => {
                    return {
                      label: el,
                      value: el,
                    };
                  })}
                  label=""
                  placeholder=""
                  setValueProps={(val) => {
                    if (val) setRole(val);
                  }}
                  size="lg"
                  value={role || null}
                />
              </div>
            )}
            <Field
              label="Link"
              labelColor="text-[#A5A5A5]"
              classname="w-full"
              name="link"
              placeholder="Link"
              required
            />
            <div className="">
              <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
                <p>Year</p>
                <p>*</p>
              </div>
              <YearPickerInput
                value={dateInput}
                onChange={setDateInput}
                placeholder="Year"
                size="lg"
              />
            </div>
          </div>
          <button
            disabled={
              company ? !isValid || !dateInput : !isValid || !dateInput || !role
            }
            className="flex items-center text-[0.88rem] mt-6 disabled:cursor-not-allowed"
          >
            {!edit && <MdAdd />}
            <p className="ml-1">{edit ? "Update" : "Add a new job"}</p>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default JobsDoneInput;
