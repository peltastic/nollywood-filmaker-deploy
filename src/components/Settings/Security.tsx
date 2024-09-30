import { Form, Formik } from "formik";
import React from "react";
import Field from "../Field/Field";
import SwitchComponent from "../Switch/SwitchComponent";
import UnstyledButton from "../Button/UnstyledButton";

type Props = {};

const SecuritySettings = (props: Props) => {
  return (
    <div className="bg-white border mt-10 py-20 px-3 sm:px-10 rounded-md flex flex-wrap items-start border-stroke-10">
      <h1 className="text-[17px] font-medium text-black-3 mb-10 ">Change Password</h1>
      <Formik
        initialValues={{
          current_password: "",
          new_password: "",
        }}
        onSubmit={() => {}}
      >
        <Form className="flex flex-wrap w-full">
          <div className="w-full md:w-[60%]">
            <div className="w-full md:w-[80%]">
              <div className="mt-6">
                <Field
                  password
                  label="Current Password"
                  classname="w-full"
                  name="current_password"
                  placeholder=""
                />
              </div>
              <div className="mt-6">
                <Field
                  password
                  label="New Password"
                  classname="w-full"
                  name="new_password"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-2 w-full md:w-[40%] my-10 md:my-0">
            <h1 className="text-[17px] font-medium text-black-3">
              Two-factor Authentication
            </h1>
            <div className="mt-4">
              <SwitchComponent
                color="#181818"
                size="md"
                label={
                  <p className="ml-4">
                    Enable or disable two factor authentication
                  </p>
                }
              />
            </div>
          </div>
          <UnstyledButton class="text-[0.88rem] font-medium mt-8 bg-black-2 text-white px-4 py-2 rounded-md ">
            Update
          </UnstyledButton>
        </Form>
      </Formik>
    </div>
  );
};

export default SecuritySettings;
