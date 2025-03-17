import Spinner from "@/app/Spinner/Spinner";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Field from "@/components/Field/Field";
import {
  useForgotPasswordConsultantMutation,
  useForgotPasswordMutation,
} from "@/lib/features/users/auth/auth";
import { useForgotDatabasePasswordMutation } from "@/lib/features/users/filmmaker-database/filmmaker-database";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  successRoute: string;
  consultant?: boolean;
  database?: boolean;
  setIssuccessful?: (val: boolean) => void;
};

const ForgotPasswordForm = (props: Props) => {
  const [forgotPassword, { isLoading, isError, isSuccess, error }] =
    useForgotPasswordMutation();
  const [forgotPasswordAsConsultant, result] =
    useForgotPasswordConsultantMutation();
  const [forgotDatabasePassword, database] =
    useForgotDatabasePasswordMutation();
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

  useEffect(() => {
    if (database.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (database.error as any).data?.message || "An Error Occcured"
      );
    }
    if (database.isSuccess) {
      nprogress.complete();
      props.setIssuccessful && props.setIssuccessful(true);
    }
  }, [database.isSuccess, database.isError]);

  useEffect(() => {
    if (result.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (result.error as any).data?.message || "An Error Occcured"
      );
    }
    if (result.isSuccess) {
      nprogress.complete();
      props.setIssuccessful && props.setIssuccessful(true);
    }
  }, [result.isSuccess, result.isError]);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={({ email }) => {
          nprogress.start();
          if (props.consultant) {
            forgotPasswordAsConsultant(email);
          } else if (props.database) {
            forgotDatabasePassword(email);
          } else {
            forgotPassword(email);
          }
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
              disabled={
                !(dirty && isValid) ||
                isLoading ||
                result.isLoading ||
                database.isLoading
              }
              class="flex mt-[13rem] w-[11rem] justify-center hover:bg-blue-1 py-2 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
            >
              {isLoading || result.isLoading || database.isLoading ? (
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
