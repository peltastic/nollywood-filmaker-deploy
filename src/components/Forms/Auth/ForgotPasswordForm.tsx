import Spinner from "@/app/Spinner/Spinner";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Field from "@/components/Field/Field";
import { useForgotPasswordMutation } from "@/lib/features/users/auth/auth";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

type Props = {
  successRoute: string;

  setIssuccessful?: (val: boolean) => void;
};

const ForgotPasswordForm = (props: Props) => {
  const [forgotPassword, { isLoading, isError, isSuccess, error }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      nprogress.complete();
      props.setIssuccessful && props.setIssuccessful(true);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={({ email }) => {
          nprogress.start()
          forgotPassword(email);
        }}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div className="mt-10">
              <Field
                name="email"
                classname="w-full"
                label="Email"
                placeholder="example@email.com"
              />
            </div>

            <UnstyledButton
              disabled={!(dirty && isValid) || isLoading}
              class="flex mt-[13rem] w-[11rem] justify-center hover:bg-blue-1 py-2 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
            >
              {isLoading ? (
                <div className="w-[1rem] py-1">
                  <Spinner />
                </div>
              ) : (
                <>
                  <p className="mr-2">Send reset link</p>
                  <FaArrowRight className="text-[0.7rem]" />
                </>
              )}
            </UnstyledButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
