import UnstyledButton from "@/components/Button/UnstyledButton";
import Field from "@/components/Field/Field";
import { IRegisterdata } from "@/interfaces/auth/auth";
import { userDetailsSchema } from "@/utils/validation/auth";
import { Form, Formik } from "formik";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  setPageProps: (value: string) => void;
  setDataProps: (data: {
    email: string;
    l_name: string;
    f_name: string;
    phone: string;
  }) => void;
  data: IRegisterdata;
};

const UserDetails = ({ setPageProps, setDataProps, data }: Props) => {
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
          f_name: data.f_name,
          l_name: data.l_name,
          phone: data.phone,
          email: data.email,
        }}
        onSubmit={(values) => {
          setDataProps(values);
          setPageProps("3");
        }}
        validationSchema={userDetailsSchema}
      >
        {({ dirty, isValid }) => (
          <Form className="mt-10">
            <div className="grid grid-cols-2 gap-8">
              <Field
                label="First name"
                labelColor="text-black-2"
                classname="w-full"
                name="f_name"
                placeholder=""
              />
              <Field
                label="Last name"
                labelColor="text-black-2"
                classname="w-full"
                name="l_name"
                placeholder=""
              />
              <Field
                label="Email"
                labelColor="text-black-2"
                classname="w-full"
                name="email"
                placeholder=""
              />
              <Field
                label="Phone"
                labelColor="text-black-2"
                classname="w-full"
                name="phone"
                placeholder=""
              />
            </div>
            <div className="w-full flex mt-28">
              <UnstyledButton
                type="button"
                clicked={() => setPageProps("1")}
                class="rounded-md transition-all hover:bg-gray-bg-1 px-4 border-stroke-2 border"
              >
                Back
              </UnstyledButton>
              <UnstyledButton
                type="submit"
                disabled={!(isValid)}
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
