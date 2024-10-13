"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import Field from "@/components/Field/Field";
import { RootState } from "@/lib/store";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

type Props = {
  successRoute: string;
  forgotPasswordLink?: string;
};

const LoginForm = (props: Props) => {
  const router = useRouter();
  const service = useSelector(
    (state: RootState) => state.persistedState.services.service
  );
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={() => {
        router.push(props.successRoute);
      }}
    >
      {({ isValid, dirty }) => (
        <Form>
          <div className="mt-10">
            <Field
              name="email"
              classname="w-full"
              label="Email"
              placeholder=""
            />
          </div>
          <div className="mt-4">
            <Field
              name="password"
              classname="w-full"
              label="Password"
              placeholder=""
            />
          </div>
          <div className="flex items-center text-black-5 mt-8">
            <div className="mr-auto">
              <CheckboxComponent
                label={
                  <p className="text-[0.88rem] font-medium">Remember me</p>
                }
              />
            </div>
            <Link href={props.forgotPasswordLink || "/auth/forgot-password"}>
              <p className="text-[0.88rem] font-semibold">Forgot Password?</p>
            </Link>
          </div>
          <UnstyledButton
            // clicked={() => router.push("/")}
            disabled={!(dirty && isValid)}
            class="flex hover:bg-blue-1 mt-[7rem] py-2 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
          >
            <p className="mr-2">Sign in</p>
            <FaArrowRight className="text-[0.7rem]" />
          </UnstyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
