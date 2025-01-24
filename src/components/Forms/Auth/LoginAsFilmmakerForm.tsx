"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Field from "@/components/Field/Field";
import { useLoginAsFilmmakerMutation } from "@/lib/features/users/auth/auth";
import { successColor } from "@/utils/constants/constants";
import { loginSchema } from "@/utils/validation/auth";
import { notifications } from "@mantine/notifications";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import classes from "@/app/styles/SuccessNotification.module.css";
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { CancelSvg } from "@/components/CustomSvgs/CustomSvgs";

type Props = {
  forgotPasswordLink?: string;
  admin?: boolean;
};

const LoginAsFilmmakerForm = (props: Props) => {
  const [login, { isLoading, isSuccess, isError, error, data }] =
    useLoginAsFilmmakerMutation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      setErrorMessage((error as any).data?.message || "An Error Occured");
    }
    if (isSuccess) {
      notifications.show({
        title: "Login successful",
        message: "",
        color: successColor,
        classNames: classes,
        position: "top-right",
      });
      nprogress.complete();
      console.log(data);
      sessionStorage.setItem("filmmaker_token", data.token)
        router.push(`/filmmaker-database/user/${data.crewCompany.id}`);
    }
  }, [isSuccess, isError]);

  return (
    <>
      {errorMessage && (
        <div className="flex px-4 rounded-sm mt-4 text-dark-red items-center bg-light-red py-3 w-full">
          <p className=" mr-auto text-sm  font-medium">{errorMessage}</p>
          <div className="cursor-pointer" onClick={() => setErrorMessage("")}>
            <CancelSvg fill="#BD002A" />
          </div>
        </div>
      )}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={({ email, password }) => {
          nprogress.start();
          login({
            password,
            usernameOrEmail: email,
          });
        }}
        validationSchema={loginSchema}
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
                password
              />
            </div>

            <UnstyledButton
              // clicked={() => router.push("/")}
              disabled={!(dirty && isValid) || isLoading}
              class="flex justify-center w-[6.5rem] hover:bg-blue-1 mt-[7rem] py-2 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
            >
              {isLoading ? (
                <div className="">
                  <div className="w-[1rem] py-1">
                    <Spinner />
                  </div>
                </div>
              ) : (
                <>
                  <p className="mr-2">Sign in</p>
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

export default LoginAsFilmmakerForm;
