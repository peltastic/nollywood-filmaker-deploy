import UnstyledButton from "@/components/Button/UnstyledButton";
import Field from "@/components/Field/Field";
import { IRegisterdata } from "@/interfaces/auth/auth";
import { userDetailsSchema } from "@/utils/validation/auth";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";

type Props = {
  setPageProps: (value: string) => void;
  setDataProps: (data: {
    email: string;
    lname: string;
    fname: string;
    phone: string;
  }) => void;
  data: IRegisterdata;
};

const UserDetails = ({ setPageProps, setDataProps, data }: Props) => {
  const [phoneInputVal, setPhoneInputVal] = useState("");
  return (
    <div>
      <div className="text-black-2 mt-20">
        <h1 className="font-bold text-[1.5rem]">
          Let’s start with your details
        </h1>
        <h2 className="text-[1.13rem]">
          Give us some information about yourself
        </h2>
      </div>
      <Formik
        initialValues={{
          fname: data.fname,
          lname: data.lname,
          phone: data.phone,
          email: data.email,
        }}
        onSubmit={(values) => {
          setDataProps({
            email: values.email,
            fname: values.fname,
            lname: values.lname,
            phone: values.phone,
          });
          setPageProps("3");
        }}
        validationSchema={userDetailsSchema}
      >
        {({ dirty, isValid }) => (
          <Form className="mt-10">
            <div className="grid md:grid-cols-2 gap-8">
              <Field
                label="First name"
                labelColor="text-black-2"
                classname="w-full"
                name="fname"
                placeholder="Enter your first name"
              />
              <Field
                label="Last name"
                labelColor="text-black-2"
                classname="w-full"
                name="lname"
                placeholder="Enter your first name "
              />
              <Field
                label="Email"
                labelColor="text-black-2"
                classname="w-full"
                name="email"
                placeholder="example@email.com"
              />

              <Field
                label="Phone"
                labelColor="text-black-2"
                classname="w-full"
                name="phone"
                placeholder="+234 819 2727 973"
              />
            </div>
            <div className="w-full flex mt-28 mb-8 sm:mb-0">
              <UnstyledButton
                type="button"
                clicked={() => setPageProps("1")}
                class="rounded-md transition-all hover:bg-gray-bg-1 px-4 border-stroke-2 border"
              >
                Back
              </UnstyledButton>
              <UnstyledButton
                type="submit"
                disabled={!isValid}
                class="flex py-2 hover:bg-blue-1 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
              >
                <p className="mr-2">Next</p>
                <FaArrowRight className="text-[0.7rem]" />
              </UnstyledButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserDetails;
