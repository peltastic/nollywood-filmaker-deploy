"use client";
import Spinner from "@/app/Spinner/Spinner";
import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import Field from "@/components/Field/Field";
import { secureAccountSchema } from "@/utils/validation/auth";
import { nprogress } from "@mantine/nprogress";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  buttonContent?: string;
  successRoute: string;
  token?: string;
  isLoading?: boolean;
  resetPasswordProps?: (password: string) => void;
};

const ResetPasswordForm = (props: Props) => {

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={secureAccountSchema}
      onSubmit={({ password }) => {
        nprogress.start()
        props.resetPasswordProps && props.resetPasswordProps(password);
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
            disabled={!(dirty && isValid) || props.isLoading}
            class="flex mt-[7rem] w-[12rem] justify-center hover:bg-blue-1 py-2 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
          >
            {props.isLoading ? (
              <div className="w-[1rem] py-1">
                <Spinner />
              </div>
            ) : (
              <>
                <p className="mr-2">
                  {props.buttonContent || "Save new password"}
                </p>
                <FaArrowRight className="text-[0.7rem]" />
              </>
            )}
          </UnstyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
