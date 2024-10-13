"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import Field from "@/components/Field/Field";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  buttonContent?: string;
  successRoute: string
};

const ResetPasswordForm = (props: Props) => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      onSubmit={() => {
        router.push(props.successRoute)
      }}
    >
      {({ isValid, dirty }) => (
        <Form>
          <div className="mt-10">
            <Field
              name="password"
              classname="w-full"
              label="Choose a password"
              placeholder=""
              password
            />
          </div>
          <div className="mt-4">
            <Field
              name="confirmPassword"
              classname="w-full"
              label="Retype password"
              placeholder=""
              password
            />
          </div>

          <UnstyledButton
            // clicked={() => router.push("/auth/login")}
            disabled={!(dirty && isValid)}
            class="flex mt-[7rem] hover:bg-blue-1 py-2 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
          >
            <p className="mr-2">{props.buttonContent || "Save new password"}</p>
            <FaArrowRight className="text-[0.7rem]" />
          </UnstyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
