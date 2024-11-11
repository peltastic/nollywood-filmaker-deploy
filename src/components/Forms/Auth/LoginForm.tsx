"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import Field from "@/components/Field/Field";
import { useLoginMutation } from "@/lib/features/users/auth/auth";
import { RootState } from "@/lib/store";
import { successColor } from "@/utils/constants/constants";
import { loginSchema } from "@/utils/validation/auth";
import { notifications } from "@mantine/notifications";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classes from "@/app/styles/SuccessNotification.module.css";
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { CancelSvg } from "@/components/CustomSvgs/CustomSvgs";
import { setAuthStatus } from "@/lib/slices/authSlice";
import { setConsultantToken, setCookie, setTokenCookie } from "@/utils/storage";
import { setUserInfo } from "@/lib/slices/userSlice";
import { setLogoutType } from "@/lib/slices/logoutSlice";
import { useLoginConsultantMutation } from "@/lib/features/consultants/auth/auth";
import { setConsultantAuthStatus } from "@/lib/slices/consultants/authSlice";
import { setConsultantInfo } from "@/lib/slices/consultants/consultantSlice";

type Props = {
  successRoute: string;
  forgotPasswordLink?: string;
  admin?: boolean;
  loginType: "user" | "admin" | "consultant";
};

const LoginForm = (props: Props) => {
  const [loginUser, { isLoading, isSuccess, isError, error, data }] =
    useLoginMutation();
  const [loginConsultant, result] = useLoginConsultantMutation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const fallBackRoute = useSelector(
    (state: RootState) => state.persistedState.route.fallbackRoute
  );

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
      dispatch(setAuthStatus("LOGGED_IN"));
      dispatch(setLogoutType("triggered"));
      dispatch(setUserInfo(data.user));
      setCookie("refresh", data.refreshToken, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      setTokenCookie(data.accessToken);

      router.push(fallBackRoute || "/user/dashboard");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (result.isError) {
      nprogress.complete();
      setErrorMessage((result.error as any).data?.message || "An Error Occured");
    }
    if (result.isSuccess) {
      notifications.show({
        title: "Login successful",
        message: "",
        color: successColor,
        classNames: classes,
        position: "top-right",
      });
      nprogress.complete();
      dispatch(setConsultantAuthStatus("LOGGED_IN"));
      dispatch(setConsultantInfo(result.data.user));
      setCookie("con_refresh", result.data.refreshToken, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      setConsultantToken(result.data.accessToken);
      router.push("/consultants/dashboard")
    }
  }, [result.isError, result.isSuccess]);

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
          if (props.loginType === "consultant") {
            loginConsultant({
              email,
              password,
            });
          } else {
            loginUser({
              email,
              password,
            });
          }

          // router.push(props.successRoute);
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
            {props.admin && (
              <div className="flex items-center text-black-5 mt-8">
                <div className="mr-auto">
                  <CheckboxComponent
                    label={
                      <p className="text-[0.88rem] font-medium">Remember me</p>
                    }
                  />
                </div>
                <Link
                  href={props.forgotPasswordLink || "/auth/forgot-password"}
                >
                  <p className="text-[0.88rem] font-semibold">
                    Forgot Password?
                  </p>
                </Link>
              </div>
            )}
            <UnstyledButton
              // clicked={() => router.push("/")}
              disabled={!(dirty && isValid) || isLoading || result.isLoading}
              class="flex justify-center w-[6.5rem] hover:bg-blue-1 mt-[7rem] py-2 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
            >
              {isLoading || result.isLoading ? (
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

export default LoginForm;
